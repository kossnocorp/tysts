import { $ } from "tdollar";

// @ts-expect-error -- WIP
export const ty: Tyst = Object.assign(function tyst<Type>(
  value: Type
): Tyst.Signature<Type> {
  // @ts-expect-error -- WIP
  return {};
},
{});

interface Tyst {
  <Type>(value: Type): Tyst.Signature<Type>;

  <Type>(): Tyst.Signature<Type>;

  supertype: Tyst.Supertype;

  exactly: Tyst.Exactly;
}

namespace Tyst {
  export interface Signature<Type> {
    is: Is<Type>;
  }

  export type Is<Supertype> = Expectation.Exactly<Supertype> & {
    undefined: Expectation.Proper<Supertype, undefined>;
  };

  export interface Supertype {
    <Type>(type: Type, callback: Supertype.Callback<Type>): void;

    <Type>(callback: Supertype.Callback<Type>): void;
  }

  export namespace Supertype {
    export interface Callback<Supertype> {
      ($: $<Supertype>): void;
    }

    export interface $<Supertype> {
      of(signature: SignatureWIP<Supertype>): void;

      exact<Type extends Supertype>(): SignatureWIP<Type>;
    }
  }

  export interface Exactly {
    <Type>(): SignatureWIP<Type>;
  }

  export interface SignatureWIP<Type> {
    (value: Type): Type;
  }

  export namespace Expectation {
    export type Proper<Received, Expected> = $.Is.Extreme<Received> extends true
      ? never
      : [Received] extends [Expected]
      ? Fn
      : never;

    export interface Exactly<Expected> {
      <Received>(
        ...args: $.Or<$.Is.Any<Expected>, $.Is.Any<Received>> extends true
          ? $.And<$.Is.Any<Expected>, $.Is.Any<Received>> extends true
            ? []
            : [Unexpected]
          : $.Or<$.Is.Never<Expected>, $.Is.Never<Received>> extends true
          ? $.And<$.Is.Never<Expected>, $.Is.Never<Received>> extends true
            ? []
            : [Unexpected]
          : [Received, Expected] extends [Expected, Received]
          ? []
          : [Unexpected]
      ): void;
    }

    type Unexpected = typeof unexpected;

    declare const unexpected: unique symbol;

    export interface Fn {
      (): void;
    }
  }
}

// @tysts
{
  // tyst
  {
    // undefined
    {
      ty(undefined).is<undefined>();
      ty({} as string | undefined).is<string | undefined>();

      // @ts-expect-error
      ty({} as any).is<undefined>();
      // @ts-expect-error
      ty({} as unknown).is<undefined>();
      // @ts-expect-error
      ty({} as never).is<undefined>();
      // @ts-expect-error
      ty({} as string).is<string | undefined>();
    }

    // any
    {
      ty({} as any).is<any>();

      // @ts-expect-error
      ty({} as unknown).is<any>();
      // @ts-expect-error
      ty({} as never).is<any>();
      // @ts-expect-error
      ty({} as string).is<any>();
    }

    // unknown
    {
      ty({} as unknown).is<unknown>();

      // @ts-expect-error
      ty({} as any).is<unknown>();
      // @ts-expect-error
      ty({} as never).is<unknown>();
      // @ts-expect-error
      ty({} as string).is<unknown>();
    }

    // never
    {
      ty({} as never).is<never>();

      // @ts-expect-error
      ty({} as any).is<never>();
      // @ts-expect-error
      ty({} as unknown).is<never>();
      // @ts-expect-error
      ty({} as string).is<never>();
    }

    // void
    {
      ty(void 0 as void).is<void>();
      ty({} as string | void).is<string | void>();

      // @ts-expect-error
      ty({} as any).is<void>();
      // @ts-expect-error
      ty({} as unknown).is<void>();
      // @ts-expect-error
      ty({} as never).is<void>();
      // @ts-expect-error
      ty({} as string).is<string | void>();
    }
  }

  // tyst.undefined
  {
    ty(undefined).is.undefined();

    // @ts-expect-error
    ty({} as any).is.undefined();
    // @ts-expect-error
    ty({} as unknown).is.undefined();
    // @ts-expect-error
    ty({} as never).is.undefined();
    // @ts-expect-error
    ty({} as string | undefined).undefined();
  }
}
