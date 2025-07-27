import type { $ } from "tdollar";

// TODO: Replicate the structure, so that it works in runtime
export const ty = {} as Ty;

interface Ty {
  <RawType>(
    value: RawType,
    callback?: Tyst.Builder.Callback<RawType>
  ): Tyst.Builder.Signature<Tyst.Type<RawType>>;

  <RawType>(callback?: Tyst.Builder.Callback<RawType>): Tyst.Builder.Signature<
    Tyst.Type<RawType>
  >;

  exactly<RawType>(): Tyst.Signature<Tyst.Type<RawType>, "expected">;

  // TODO: It is not subtype, really, but I can't find a better name yet.
  satisfies<RawType>(): Tyst.Signature.Subtype<RawType, "expected">;

  extends<RawType>(): Tyst.Signature.Supertype<RawType, "expected">;
}

namespace Tyst {
  export namespace Builder {
    export interface Signature<
      Type,
      Position extends Tyst.Signature.Position = "expected"
    > extends Tyst.Signature<Type, Position> {
      is: Tyst.Is<Type>;
    }

    export interface Callback<Type> {
      ($: Builder.Signature<Type, "received">): void;
    }
  }

  //#region Signature

  export interface Signature<Type, Position extends Signature.Position> {
    (
      // Allows to differentiate top types and proper types.
      type: Type
    ): // Allows to differentiate unions of different size,
    // i.e. (`string | undefined` and `string`).
    Type;

    [signaturePhantom]: true;
  }

  declare const signaturePhantom: unique symbol;

  export namespace Signature {
    export type Position = "expected" | "received";

    //#region Subtype

    export interface Subtype<RawType, Position extends Signature.Position> {
      (
        // Allows to replicate satisfies behavior.
        type: RawType
      ): void;

      [subtypePhantom]: true;
    }

    declare const subtypePhantom: unique symbol;

    //#endregion

    //#region Supertype

    export interface Supertype<RawType, Position extends Signature.Position> {
      (
        // Allows to replicate extends's behavior. Note that it includes both
        // then and else branches. E.g. `any extends never ? true : false`
        // resolves `boolean` unlike `any extends any ? true : false` that
        // just resolves `true`. Supertype will not produce error as long as
        // then branch is satisfied, regardless of else branch behavior.
        type: RawType
      ): void;

      [supertypePhantom]: true;
    }

    export namespace Supertype {
      export type Arg<
        RawType,
        Position extends Signature.Position
      > = $.Is.Any<RawType> extends true
        ? // As any doesn't satisfy never, but any extends never, we have to add
          // `never` supertype to union to make the matcher work correctly.
          Supertype<any, Position> | Supertype<never, Position>
        : Supertype<RawType, Position>;
    }

    declare const supertypePhantom: unique symbol;

    //#endregion
  }

  //#endregion

  //#region Type

  export type Type<RawType> = $.Is.Any<RawType> extends true
    ? Type.Any
    : $.Is.Unknown<RawType> extends true
    ? Type.Unknown
    : $.Is.Never<RawType> extends true
    ? Type.Never
    : RawType;

  export namespace Type {
    export type Raw<Type> = Type extends Type.Any
      ? any
      : Type extends Type.Unknown
      ? unknown
      : Type extends Type.Never
      ? never
      : Type;

    export type Any = $.Branded<"any", typeof any>;
    declare const any: unique symbol;

    export type Unknown = $.Branded<"unknown", typeof unknown>;
    declare const unknown: unique symbol;

    export type Never = $.Branded<"never", typeof never>;
    declare const never: unique symbol;
  }

  //#endregion

  //#region Is

  export interface Is<Type> {
    (
      signature:
        | Signature<Type, "received">
        | Signature.Subtype<Tyst.Type.Raw<Type>, "received">
        | Signature.Supertype.Arg<Tyst.Type.Raw<Type>, "received">
    ): Builder.Signature<Type>;

    undefined: Is.Undefined<Type>;
  }

  export namespace Is {
    export type Undefined<Type> = $.Is.Undefined<Type> extends true
      ? Undefined.Fn<Type>
      : $.Transparent<Mismatch<undefined, Type>>;

    export namespace Undefined {
      export interface Fn<Type> {
        (): Builder.Signature<Type>;
      }
    }
  }

  //#endregion

  export interface Mismatch<Expected, Received> {
    expected: Expected;
    received: Received;
  }
}
