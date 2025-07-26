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
        // Allows to differentiate types.
        type: RawType
      ): void;

      [supertypePhantom]: true;
    }

    declare const supertypePhantom: unique symbol;

    export type SupertypeWIP<Type> = Type extends Type.Any
      ? Type.Any.Supertype
      : Type extends Type.Unknown
      ? Type.Unknown.Supertype
      : Type extends Type.Never
      ? Type.Never.Supertype
      : never;
  }

  export type Type<RawType> = $.Is.Any<RawType> extends true
    ? Type.Any
    : $.Is.Unknown<RawType> extends true
    ? Type.Unknown
    : $.Is.Never<RawType> extends true
    ? Type.Never
    : RawType;

  export namespace Type {
    export type Supertype<RawType> = RawType;

    export type Any = $.Branded<"any", typeof any>;
    declare const any: unique symbol;

    export namespace Any {
      export type Supertype =
        | Signature<any, "expected">
        | Signature<unknown, "expected">;
    }

    export type Unknown = $.Branded<"unknown", typeof unknown>;
    declare const unknown: unique symbol;

    export namespace Unknown {
      // export type Narrows = Type.
      type Test = $.Is.Unknown<{} | null | undefined>;

      export type Supertype =
        | Signature<any, "expected">
        | Signature<unknown, "expected">;
    }

    export type Never = $.Branded<"never", typeof never>;
    declare const never: unique symbol;

    export namespace Never {
      export type Supertype = Signature<any, "expected">;
    }
  }

  export interface Is<Type> {
    (
      signature:
        | Signature<Type, "received">
        | Signature.Supertype<Type, "received">
    ): Builder.Signature<Type>;
  }
}

// @tysts: ty
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

  // Nested
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

  // ty.extends
  {
    // any
    {
      ty<any>().is(ty.extends<any>());

      ty<unknown>().is(ty.extends<any>());
      ty<never>().is(ty.extends<any>());
      ty<string>().is(ty.extends<any>());
    }

    // TODO: More tysts

    // Union
    {
      ty<string>().is(ty.extends<string | undefined>());

      // @ts-expect-error
      ty<string>().is(ty.extends<number | undefined>());
    }
  }
}
