import type { $ } from "tdollar";

export const ty: Ty = function ty<Type>(): Tyst.Builder.Signature<
  Tyst.Type<Type>
> {
  const signature: Tyst.Builder.Signature<Tyst.Type<Type>> = Object.assign(
    (() => ({})) as unknown as Tyst.Signature<Tyst.Type<Type>, "received">,
    { is: () => signature }
  );
  return signature;
};

interface Ty {
  <Type>(
    value: Type,
    callback?: Tyst.Builder.Callback<Type>
  ): Tyst.Builder.Signature<Tyst.Type<Type>>;

  <Type>(callback?: Tyst.Builder.Callback<Type>): Tyst.Builder.Signature<
    Tyst.Type<Type>
  >;
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
    // i.e. (`string | undefined` and `string`) void //
    Type;
  }

  export namespace Signature {
    export type Position = "expected" | "received";
  }

  export type Type<Type> = $.Is.Any<Type> extends true
    ? Any
    : $.Is.Never<Type> extends true
    ? Never
    : $.Is.Unknown<Type> extends true
    ? Unknown
    : Type;

  type Any = $.Branded<"any", typeof any>;
  declare const any: unique symbol;

  type Never = $.Branded<"never", typeof never>;
  declare const never: unique symbol;

  type Unknown = $.Branded<"unknown", typeof unknown>;
  declare const unknown: unique symbol;

  export type Is<Type> = Is.Exact<Type>;

  export namespace Is {
    export interface Exact<Type> {
      (signature: Signature<Type, "received">): Builder.Signature<Type>;
    }
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
}
