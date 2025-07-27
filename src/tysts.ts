import type { $ } from "tdollar";
import { ty } from "./index.ts";

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

// ty.is
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
    // @ts-expect-error
    ty<void>().is(ty.extends<never>());
    ty<void>().is(ty.extends<void>());
    // @ts-expect-error
    ty<void>().is(ty.extends<null>());
    // @ts-expect-error
    ty<void>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<void>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<void>().is(ty.extends<{}>());
    // @ts-expect-error
    ty<void>().is(ty.extends<object>());

    ty<any>().is(ty.extends<void>());
    // @ts-expect-error
    ty<unknown>().is(ty.extends<void>());
    ty<never>().is(ty.extends<void>());
    ty<void>().is(ty.extends<void>());
    // @ts-expect-error
    ty<null>().is(ty.extends<void>());
    ty<undefined>().is(ty.extends<void>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<void>());
    // @ts-expect-error
    ty<{}>().is(ty.extends<void>());
    // @ts-expect-error
    ty<object>().is(ty.extends<void>());
  }

  // null
  {
    ty<null>().is(ty.extends<any>());
    ty<null>().is(ty.extends<unknown>());
    // @ts-expect-error
    ty<null>().is(ty.extends<never>());
    // @ts-expect-error
    ty<null>().is(ty.extends<void>());
    ty<null>().is(ty.extends<null>());
    // @ts-expect-error
    ty<null>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<null>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<null>().is(ty.extends<{}>());
    // @ts-expect-error
    ty<null>().is(ty.extends<object>());

    ty<any>().is(ty.extends<null>());
    // @ts-expect-error
    ty<unknown>().is(ty.extends<null>());
    ty<never>().is(ty.extends<null>());
    // @ts-expect-error
    ty<void>().is(ty.extends<null>());
    ty<null>().is(ty.extends<null>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<null>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<null>());
    // @ts-expect-error
    ty<{}>().is(ty.extends<null>());
    // @ts-expect-error
    ty<object>().is(ty.extends<null>());
  }

  // undefined
  {
    ty<undefined>().is(ty.extends<any>());
    ty<undefined>().is(ty.extends<unknown>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<never>());
    ty<undefined>().is(ty.extends<void>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<null>());
    ty<undefined>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<{}>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<object>());

    ty<any>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<unknown>().is(ty.extends<undefined>());
    ty<never>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<void>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<null>().is(ty.extends<undefined>());
    ty<undefined>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<{}>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<object>().is(ty.extends<undefined>());
  }

  // Non-nullable primitives
  {
    ty<$.Value>().is(ty.extends<any>());
    ty<$.Value>().is(ty.extends<unknown>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<never>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<void>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<null>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<undefined>());
    ty<$.Value>().is(ty.extends<$.Value>());
    ty<$.Value>().is(ty.extends<{}>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<object>());

    ty<any>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<unknown>().is(ty.extends<$.Value>());
    ty<never>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<void>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<null>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<$.Value>());
    ty<$.Value>().is(ty.extends<$.Value>());
    // @ts-expect-error
    ty<{}>().is(ty.extends<$.Value>());
    // @ts-expect-error
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
    // @ts-expect-error
    ty<object>().is(ty.extends<never>());
    // @ts-expect-error
    ty<object>().is(ty.extends<void>());
    // @ts-expect-error
    ty<object>().is(ty.extends<null>());
    // @ts-expect-error
    ty<object>().is(ty.extends<undefined>());
    // @ts-expect-error
    ty<object>().is(ty.extends<$.Value>());
    ty<object>().is(ty.extends<{}>());
    ty<object>().is(ty.extends<object>());

    ty<any>().is(ty.extends<object>());
    // @ts-expect-error
    ty<unknown>().is(ty.extends<object>());
    ty<never>().is(ty.extends<object>());
    // @ts-expect-error
    ty<void>().is(ty.extends<object>());
    // @ts-expect-error
    ty<null>().is(ty.extends<object>());
    // @ts-expect-error
    ty<undefined>().is(ty.extends<object>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extends<object>());
    ty<{}>().is(ty.extends<object>());
    ty<object>().is(ty.extends<object>());
  }

  // Union
  {
    ty<string>().is(ty.extends<string | undefined>());
    ty<string | undefined>().is(ty.extends<string | number | undefined>());
    // @ts-expect-error
    ty<string>().is(ty.extends<number | undefined>());
    // @ts-expect-error
    ty<string | number>().is(ty.extends<string>());
  }
}
