import type { $ } from "tdollar";

export const ty: Ty = function tyst<Type>(): Tyst<Type> {
  return Object.assign(
    (() => ({})) as unknown as Tyst.Signature<Type, "received">,
    { is: () => {} }
  );
};

interface Ty {
  <Type>(value: Type): Tyst<Type>;

  <Type>(): Tyst<Type>;
}

export interface Tyst<
  Type,
  Position extends Tyst.Signature.Position = "expected"
> extends Tyst.Signature<Type, Position> {
  is: Tyst.Is<Type>;
}

namespace Tyst {
  export interface Signature<Type, Position extends Signature.Position> {
    (
      // Allows to differentiate top types and proper types.
      type: Signature.Type<Type>
    ): // Allows to differentiate unions of different size,
    // i.e. (`string | undefined` and `string`)
    Signature.Type<Type>;
  }

  export namespace Signature {
    export type Position = "expected" | "received";

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
  }

  export type Is<Received> = Is.Exact<Received>;

  export namespace Is {
    export interface Exact<Received> {
      (signature: Signature<Received, "received">): void;
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
}
