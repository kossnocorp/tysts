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

  satisfies<RawType>(): Tyst.Signature.Subtype<RawType, "expected">;

  implements<RawType>(): Tyst.Signature.Subtype<RawType, "expected">;

  extends<RawType>(): Tyst.Signature.Supertype<RawType, "expected">;

  narrows<RawType>(): Tyst.Signature.Supertype<RawType, "expected">;
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

    export interface Subtype<RawType, Position extends Signature.Position> {
      (
        // Allows to replicate satisfies behavior.
        type: RawType
      ): void;

      [subtypePhantom]: true;
    }

    declare const subtypePhantom: unique symbol;
  }

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

  export interface Is<Type> {
    (
      signature:
        | Signature<Type, "received">
        | Signature.Subtype<Tyst.Type.Raw<Type>, "received">
        | Signature.Supertype.Arg<Tyst.Type.Raw<Type>, "received">
    ): Builder.Signature<Type>;
  }
}

// @tysts: ty
{
  // API
  {
    // Basic
    {
      ty({} as string | number).is(ty({} as string | number));
      ty<null>().is(ty(null));
      ty<undefined>().is(ty<undefined>());

      // @ts-expect-error
      ty({} as string | number).is(ty(1));
      // @ts-expect-error
      ty<null>().is(undefined);
      // @ts-expect-error
      ty<undefined>().is(ty<void>());
    }

    // Chaining
    {
      ty<undefined>()
        .is(ty<undefined>())
        .is(
          // @ts-expect-error
          ty<string | undefined>()
        )
        .is(ty<undefined>());
    }

    // Nesting
    {
      ty<undefined>(($) => {
        $.is(ty<undefined>());
        // @ts-expect-error
        $.is(ty<string | undefined>());
      });

      ty(undefined, ($) => {
        $.is(ty<undefined>());
        // @ts-expect-error
        $.is(ty<string | undefined>());
      });
    }
  }

  // ty/ty.exactly
  {
    // any
    {
      ty<any>().is(ty<any>());

      // @ts-expect-error
      ty<unknown>().is(ty<any>());
      // @ts-expect-error
      ty<never>().is(ty<any>());
      // @ts-expect-error
      ty<string>().is(ty<any>());

      let variance = ty<any>();
      variance = ty({} as any);

      // @ts-expect-error
      variance = ty<unknown>();
      // @ts-expect-error
      variance = ty<never>();
      // @ts-expect-error
      variance = ty<string>();
    }

    // unknown
    {
      ty<unknown>().is(ty<unknown>());

      // @ts-expect-error
      ty<any>().is(ty<unknown>());
      // @ts-expect-error
      ty<never>().is(ty<unknown>());
      // @ts-expect-error
      ty<string>().is(ty<unknown>());

      let variance = ty<unknown>();
      variance = ty({} as unknown);

      // @ts-expect-error
      variance = ty({} as any);
      // @ts-expect-error
      variance = ty<never>();
      // @ts-expect-error
      variance = ty<string>();
    }

    // never
    {
      ty<never>().is(ty<never>());

      // @ts-expect-error
      ty<any>().is(ty<never>());
      // @ts-expect-error
      ty<any>().is(ty<never>());
      // @ts-expect-error
      ty<any>().is(ty<never>());

      let variance = ty<never>();
      variance = ty({} as never);

      // @ts-expect-error
      variance = ty<any>();
      // @ts-expect-error
      variance = ty<unknown>();
      // @ts-expect-error
      variance = ty<string>();
    }

    // void
    {
      ty<void>().is(ty<void>());
      ty<void | string>().is(ty<string | void>());

      // @ts-expect-error
      ty<any>().is(ty<void>());
      // @ts-expect-error
      ty<unknown>().is(ty<void>());
      // @ts-expect-error
      ty<never>().is(ty<void>());
      // @ts-expect-error
      ty<string>().is(ty<string | void>());

      let variance = ty<void>();
      variance = ty(void 0 as void);

      // @ts-expect-error
      variance = ty<any>();
      // @ts-expect-error
      variance = ty<unknown>();
      // @ts-expect-error
      variance = ty<never>();
      // @ts-expect-error
      variance = ty<string>();
    }

    // undefined
    {
      ty<undefined>().is(ty<undefined>());
      ty<string | undefined>().is(ty<string | undefined>());

      // @ts-expect-error
      ty<any>().is(ty<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty<undefined>());
      // @ts-expect-error
      ty<never>().is(ty<undefined>());
      // @ts-expect-error
      ty<string>().is(ty<string | undefined>());

      let variance = ty<undefined>();
      variance = ty(undefined);

      // @ts-expect-error
      variance = ty<any>();
      // @ts-expect-error
      variance = ty<unknown>();
      // @ts-expect-error
      variance = ty<never>();
      // @ts-expect-error
      variance = ty<string>();
    }

    // Alias
    {
      ty<undefined>().is(ty.exactly<undefined>());
      ty<string | undefined>().is(ty.exactly<string | undefined>());

      // @ts-expect-error
      ty<undefined>().is(ty.exactly<void>());
      // @ts-expect-error
      ty<string | undefined>().is(ty.exactly<string>());
    }
  }

  // ty.satisfies
  {
    // any
    {
      ty<any>().is(ty.satisfies<any>());
      ty<any>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<any>().is(ty.satisfies<never>());
      ty<any>().is(ty.satisfies<void>());
      ty<any>().is(ty.satisfies<null>());
      ty<any>().is(ty.satisfies<undefined>());
      ty<any>().is(ty.satisfies<$.Value>());
      ty<any>().is(ty.satisfies<{}>());
      ty<any>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<any>());
      ty<unknown>().is(ty.satisfies<any>());
      ty<never>().is(ty.satisfies<any>());
      ty<void>().is(ty.satisfies<any>());
      ty<null>().is(ty.satisfies<any>());
      ty<undefined>().is(ty.satisfies<any>());
      ty<$.Value>().is(ty.satisfies<any>());
      ty<{}>().is(ty.satisfies<any>());
      ty<object>().is(ty.satisfies<any>());
    }

    // unknown
    {
      ty<unknown>().is(ty.satisfies<any>());
      ty<unknown>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<unknown>());
      ty<unknown>().is(ty.satisfies<unknown>());
      ty<never>().is(ty.satisfies<unknown>());
      ty<void>().is(ty.satisfies<unknown>());
      ty<null>().is(ty.satisfies<unknown>());
      ty<undefined>().is(ty.satisfies<unknown>());
      ty<$.Value>().is(ty.satisfies<unknown>());
      ty<{}>().is(ty.satisfies<unknown>());
      ty<object>().is(ty.satisfies<unknown>());
    }

    // never
    {
      ty<never>().is(ty.satisfies<any>());
      ty<never>().is(ty.satisfies<unknown>());
      ty<never>().is(ty.satisfies<never>());
      ty<never>().is(ty.satisfies<void>());
      ty<never>().is(ty.satisfies<null>());
      ty<never>().is(ty.satisfies<undefined>());
      ty<never>().is(ty.satisfies<$.Value>());
      ty<never>().is(ty.satisfies<{}>());
      ty<never>().is(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<never>());
      ty<never>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<never>());
    }

    // void
    {
      ty<void>().is(ty.satisfies<any>());
      ty<void>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<never>());
      ty<void>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<void>());
      ty<never>().is(ty.satisfies<void>());
      ty<void>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<void>());
      ty<undefined>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<void>());
    }

    // null
    {
      ty<null>().is(ty.satisfies<any>());
      ty<null>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<void>());
      ty<null>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<null>());
      ty<never>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<null>());
      ty<null>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<null>());
    }

    // undefined
    {
      ty<undefined>().is(ty.satisfies<any>());
      ty<undefined>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<never>());
      ty<undefined>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<null>());
      ty<undefined>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<undefined>());
      ty<never>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<undefined>());
      ty<undefined>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<undefined>());
    }

    // Non-nullable primitives
    {
      ty<$.Value>().is(ty.satisfies<any>());
      ty<$.Value>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<undefined>());
      ty<$.Value>().is(ty.satisfies<$.Value>());
      ty<$.Value>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<$.Value>());
      ty<never>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<$.Value>());
      ty<$.Value>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<$.Value>());
    }

    // {}
    {
      ty<{}>().is(ty.satisfies<any>());
      ty<{}>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.satisfies<$.Value>());
      ty<{}>().is(ty.satisfies<{}>());
      ty<{}>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<{}>());
      ty<never>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<{}>());
      ty<$.Value>().is(ty.satisfies<{}>());
      ty<{}>().is(ty.satisfies<{}>());
      ty<object>().is(ty.satisfies<{}>());
    }

    // object
    {
      ty<object>().is(ty.satisfies<any>());
      ty<object>().is(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<never>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<void>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<null>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.satisfies<$.Value>());
      ty<object>().is(ty.satisfies<{}>());
      ty<object>().is(ty.satisfies<object>());

      ty<any>().is(ty.satisfies<object>());
      // @ts-expect-error
      ty<unknown>().is(ty.satisfies<object>());
      ty<never>().is(ty.satisfies<object>());
      // @ts-expect-error
      ty<void>().is(ty.satisfies<object>());
      // @ts-expect-error
      ty<null>().is(ty.satisfies<object>());
      // @ts-expect-error
      ty<undefined>().is(ty.satisfies<object>());
      // @ts-expect-error
      ty<$.Value>().is(ty.satisfies<object>());
      ty<{}>().is(ty.satisfies<object>());
      ty<object>().is(ty.satisfies<object>());
    }

    // Union
    {
      ty<string>().is(ty.satisfies<string | undefined>());
      ty<string | undefined>().is(ty.satisfies<string | number | undefined>());
      // @ts-expect-error
      ty<string>().is(ty.satisfies<number | undefined>());
      // @ts-expect-error
      ty<string | number>().is(ty.satisfies<string>());
    }

    // Alias
    {
      ty<string>().is(ty.implements<string | undefined>());
      ty<string | undefined>().is(ty.implements<string | number | undefined>());
      // @ts-expect-error
      ty<string>().is(ty.implements<number | undefined>());
      // @ts-expect-error
      ty<string | number>().is(ty.implements<string>());
    }
  }

  // ty.extends
  {
    // any
    {
      ty<any>().is(ty.extends<any>());
      ty<any>().is(ty.extends<unknown>());
      ty<any>().is(ty.extends<never>());
      ty<any>().is(ty.extends<void>());
      ty<any>().is(ty.extends<null>());
      ty<any>().is(ty.extends<undefined>());
      ty<any>().is(ty.extends<$.Value>());
      ty<any>().is(ty.extends<{}>());
      ty<any>().is(ty.extends<object>());

      ty<any>().is(ty.extends<any>());
      ty<unknown>().is(ty.extends<any>());
      ty<never>().is(ty.extends<any>());
      ty<void>().is(ty.extends<any>());
      ty<null>().is(ty.extends<any>());
      ty<undefined>().is(ty.extends<any>());
      ty<$.Value>().is(ty.extends<any>());
      ty<{}>().is(ty.extends<any>());
      ty<object>().is(ty.extends<any>());
    }

    // unknown
    {
      ty<unknown>().is(ty.extends<any>());
      ty<unknown>().is(ty.extends<unknown>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<object>());

      ty<any>().is(ty.extends<unknown>());
      ty<unknown>().is(ty.extends<unknown>());
      ty<never>().is(ty.extends<unknown>());
      ty<void>().is(ty.extends<unknown>());
      ty<null>().is(ty.extends<unknown>());
      ty<undefined>().is(ty.extends<unknown>());
      ty<$.Value>().is(ty.extends<unknown>());
      ty<{}>().is(ty.extends<unknown>());
      ty<object>().is(ty.extends<unknown>());
    }

    // never
    {
      ty<never>().is(ty.extends<any>());
      ty<never>().is(ty.extends<unknown>());
      ty<never>().is(ty.extends<never>());
      ty<never>().is(ty.extends<void>());
      ty<never>().is(ty.extends<null>());
      ty<never>().is(ty.extends<undefined>());
      ty<never>().is(ty.extends<$.Value>());
      ty<never>().is(ty.extends<{}>());
      ty<never>().is(ty.extends<object>());

      ty<any>().is(ty.extends<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<never>());
      ty<never>().is(ty.extends<never>());
      // @ts-expect-error
      ty<void>().is(ty.extends<never>());
      // @ts-expect-error
      ty<null>().is(ty.extends<never>());
      // @ts-expect-error
      ty<undefined>().is(ty.extends<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.extends<never>());
      // @ts-expect-error
      ty<{}>().is(ty.extends<never>());
      // @ts-expect-error
      ty<object>().is(ty.extends<never>());
    }

    // void
    {
      ty<void>().is(ty.extends<any>());
      ty<void>().is(ty.extends<unknown>());
      ty<void>().is(ty.extends<never>());
      ty<void>().is(ty.extends<void>());
      ty<void>().is(ty.extends<null>());
      ty<void>().is(ty.extends<undefined>());
      ty<void>().is(ty.extends<$.Value>());
      ty<void>().is(ty.extends<{}>());
      ty<void>().is(ty.extends<object>());

      ty<any>().is(ty.extends<void>());
      ty<unknown>().is(ty.extends<void>());
      ty<never>().is(ty.extends<void>());
      ty<void>().is(ty.extends<void>());
      ty<null>().is(ty.extends<void>());
      ty<undefined>().is(ty.extends<void>());
      ty<$.Value>().is(ty.extends<void>());
      ty<{}>().is(ty.extends<void>());
      ty<object>().is(ty.extends<void>());
    }

    // null
    {
      ty<null>().is(ty.extends<any>());
      ty<null>().is(ty.extends<unknown>());
      ty<null>().is(ty.extends<never>());
      ty<null>().is(ty.extends<void>());
      ty<null>().is(ty.extends<null>());
      ty<null>().is(ty.extends<undefined>());
      ty<null>().is(ty.extends<$.Value>());
      ty<null>().is(ty.extends<{}>());
      ty<null>().is(ty.extends<object>());

      ty<any>().is(ty.extends<null>());
      ty<unknown>().is(ty.extends<null>());
      ty<never>().is(ty.extends<null>());
      ty<void>().is(ty.extends<null>());
      ty<null>().is(ty.extends<null>());
      ty<undefined>().is(ty.extends<null>());
      ty<$.Value>().is(ty.extends<null>());
      ty<{}>().is(ty.extends<null>());
      ty<object>().is(ty.extends<null>());
    }

    // undefined
    {
      ty<undefined>().is(ty.extends<any>());
      ty<undefined>().is(ty.extends<unknown>());
      ty<undefined>().is(ty.extends<never>());
      ty<undefined>().is(ty.extends<void>());
      ty<undefined>().is(ty.extends<null>());
      ty<undefined>().is(ty.extends<undefined>());
      ty<undefined>().is(ty.extends<$.Value>());
      ty<undefined>().is(ty.extends<{}>());
      ty<undefined>().is(ty.extends<object>());

      ty<any>().is(ty.extends<undefined>());
      ty<unknown>().is(ty.extends<undefined>());
      ty<never>().is(ty.extends<undefined>());
      ty<void>().is(ty.extends<undefined>());
      ty<null>().is(ty.extends<undefined>());
      ty<undefined>().is(ty.extends<undefined>());
      ty<$.Value>().is(ty.extends<undefined>());
      ty<{}>().is(ty.extends<undefined>());
      ty<object>().is(ty.extends<undefined>());
    }

    // Non-nullable primitives
    {
      ty<$.Value>().is(ty.extends<any>());
      ty<$.Value>().is(ty.extends<unknown>());
      ty<$.Value>().is(ty.extends<never>());
      ty<$.Value>().is(ty.extends<void>());
      ty<$.Value>().is(ty.extends<null>());
      ty<$.Value>().is(ty.extends<undefined>());
      ty<$.Value>().is(ty.extends<$.Value>());
      ty<$.Value>().is(ty.extends<{}>());
      ty<$.Value>().is(ty.extends<object>());

      ty<any>().is(ty.extends<$.Value>());
      ty<unknown>().is(ty.extends<$.Value>());
      ty<never>().is(ty.extends<$.Value>());
      ty<void>().is(ty.extends<$.Value>());
      ty<null>().is(ty.extends<$.Value>());
      ty<undefined>().is(ty.extends<$.Value>());
      ty<$.Value>().is(ty.extends<$.Value>());
      ty<{}>().is(ty.extends<$.Value>());
      ty<object>().is(ty.extends<$.Value>());
    }

    // {}
    {
      ty<{}>().is(ty.extends<any>());
      ty<{}>().is(ty.extends<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty.extends<never>());
      // @ts-expect-error
      ty<{}>().is(ty.extends<void>());
      // @ts-expect-error
      ty<{}>().is(ty.extends<null>());
      // @ts-expect-error
      ty<{}>().is(ty.extends<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.extends<$.Value>());
      ty<{}>().is(ty.extends<{}>());
      ty<{}>().is(ty.extends<object>());

      ty<any>().is(ty.extends<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.extends<{}>());
      ty<never>().is(ty.extends<{}>());
      // @ts-expect-error
      ty<void>().is(ty.extends<{}>());
      // @ts-expect-error
      ty<null>().is(ty.extends<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.extends<{}>());
      ty<$.Value>().is(ty.extends<{}>());
      ty<{}>().is(ty.extends<{}>());
      ty<object>().is(ty.extends<{}>());
    }

    // object
    {
      ty<object>().is(ty.extends<any>());
      ty<object>().is(ty.extends<unknown>());
      ty<object>().is(ty.extends<never>());
      ty<object>().is(ty.extends<void>());
      ty<object>().is(ty.extends<null>());
      ty<object>().is(ty.extends<undefined>());
      ty<object>().is(ty.extends<$.Value>());
      ty<object>().is(ty.extends<{}>());
      ty<object>().is(ty.extends<object>());

      ty<any>().is(ty.extends<object>());
      ty<unknown>().is(ty.extends<object>());
      ty<never>().is(ty.extends<object>());
      ty<void>().is(ty.extends<object>());
      ty<null>().is(ty.extends<object>());
      ty<undefined>().is(ty.extends<object>());
      ty<$.Value>().is(ty.extends<object>());
      ty<{}>().is(ty.extends<object>());
      ty<object>().is(ty.extends<object>());
    }

    // Union
    {
      ty<string>().is(ty.extends<string | undefined>());
      // @ts-expect-error
      ty<string>().is(ty.extends<number | undefined>());
    }

    // Alias
    {
      ty<string>().is(ty.narrows<string | undefined>());
      ty<string | undefined>().is(ty.narrows<string | number | undefined>());
      // @ts-expect-error
      ty<string>().is(ty.narrows<number | undefined>());
      // @ts-expect-error
      ty<string | number>().is(ty.narrows<string>());
    }
  }
}
