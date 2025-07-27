import type { $ } from "tdollar";

// TODO: Replicate the structure, so that it works in runtime
export const ty = {} as Tyst.Ty;

export namespace Tyst {
  //#region Ty

  export interface Ty {
    <RawType>(
      value: RawType,
      callback?: Tyst.Builder.Callback<RawType>
    ): Tyst.Builder.Signature<Tyst.Type<RawType>>;

    <RawType>(
      callback?: Tyst.Builder.Callback<RawType>
    ): Tyst.Builder.Signature<Tyst.Type<RawType>>;

    exactly<RawType>(): Tyst.Signature<Tyst.Type<RawType>, "expected">;

    satisfies<RawType>(
      type?: RawType
    ): Tyst.Signature.Supertype<RawType, "expected">;

    satisfiedBy<RawType>(
      type?: RawType
    ): Tyst.Signature.Subtype<RawType, "expected">;

    extends<RawType>(
      type?: RawType
    ): Tyst.Signature.DistributiveSupertype<RawType, "expected">;

    extendedBy<RawType>(
      type?: RawType
    ): Tyst.Signature.DistributiveSubtype<RawType, "expected">;

    as<RawType>(): RawType;
  }

  //#endregion

  //#region Builder

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

  //#endregion

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

    //#region Supertype

    export interface Supertype<RawType, Position extends Signature.Position> {
      (
        // Allows to replicate satisfies behavior.
        type: RawType
      ): void;

      [supertypePhantom]: true;
    }

    declare const supertypePhantom: unique symbol;

    //#endregion

    //#region Subtype

    export interface Subtype<RawType, Position extends Signature.Position> {
      // Allows to replicate flipped satisfies behavior.
      type: RawType;

      [subtypePhantom]: true;
    }

    declare const subtypePhantom: unique symbol;

    //#endregion

    //#region DistributiveSupertype

    export interface DistributiveSupertype<
      RawType,
      Position extends Signature.Position
    > extends Supertype<RawType, Position> {
      (
        // Allows to replicate extends's behavior. Note that it includes both
        // then and else branches. E.g. `any extends never ? true : false`
        // resolves `boolean` unlike `any extends any ? true : false` that
        // just resolves `true`. Supertype will not produce error as long as
        // then branch is satisfied, regardless of else branch behavior.
        type: RawType
      ): void;

      [distributiveSupertypePhantom]: true;
    }

    declare const distributiveSupertypePhantom: unique symbol;

    export namespace DistributiveSupertype {
      export type Arg<RawType, Position extends Signature.Position> =
        // As `any` doesn't satisfy `never`, but `any extends never` resolves
        // both branches, we have to add `never` supertype to union to make
        // the matcher work correctly.
        $.Is.Any<RawType> extends true
          ?
              | DistributiveSupertype<any, Position>
              | DistributiveSupertype<never, Position>
          : DistributiveSupertype<RawType, Position>;
    }

    //#endregion

    //#region DistributiveSubtype

    export interface DistributiveSubtype<
      RawType,
      Position extends Signature.Position
    > {
      // Allows to replicate flipped extends behavior.
      type: RawType;

      [distributiveSubtypePhantom]: true;
    }

    declare const distributiveSubtypePhantom: unique symbol;

    export namespace DistributiveSubtype {
      export type Arg<RawType, Position extends Signature.Position> =
        // Naive approach checking if `never` is extended by `any` results in
        // `Type 'any' is not assignable to type 'never'.` due to the fact that
        // `any` is not assignable to `never`. It conforms `satisfiedBy`
        // behavior, but since `any extends never` resolves both branches, we
        // have to to wrap `never` in `Tyst.Type`, so that it is treated as
        // a proper type.
        $.Is.Never<RawType> extends true
          ? DistributiveSubtype<Tyst.Type<never>, Position>
          : DistributiveSubtype<RawType, Position>;
    }

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
        | Signature.Supertype<Tyst.Type.Raw<Type>, "received">
        | Signature.Subtype<Tyst.Type.Raw<Type>, "received">
        | Signature.DistributiveSupertype.Arg<Tyst.Type.Raw<Type>, "received">
        | Signature.DistributiveSubtype.Arg<Tyst.Type.Raw<Type>, "received">
    ): Builder.Signature<Type>;

    undefined: Is.Undefined<Type>;
  }

  export namespace Is {
    export type Undefined<Type> = $.Is.Undefined<Type> extends true
      ? Undefined.Fn<Type>
      : Mismatch<undefined, Type>;

    export namespace Undefined {
      export interface Fn<Type> {
        (): Builder.Signature<Type>;
      }
    }

    export type Mismatch<Expected, Received> = $.Transparent<{
      expected: Expected;
      received: Received;
    }>;
  }

  //#endregion

  //#region New

  export interface New {
    <RawType>(): RawType;
  }

  //#endregion
}
