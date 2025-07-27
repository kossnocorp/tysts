import type { $ } from "tdollar";
import { ty } from "./index.ts";

//#region API
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
//#endregion

//#region ty.is
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
//#endregion

//#region ty.satisfies
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

    let variance = ty.satisfies<any>();
    variance = ty.satisfies({} as any);
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

    let variance = ty.satisfies<unknown>();
    variance = ty.satisfies({} as unknown);
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

    let variance = ty.satisfies<never>();
    variance = ty.satisfies({} as never);
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

    let variance = ty.satisfies<void>();
    variance = ty.satisfies(void 0 as void);
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

    let variance = ty.satisfies<null>();
    variance = ty.satisfies(null);
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

    let variance = ty.satisfies<undefined>();
    variance = ty.satisfies(undefined);
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

    let variance = ty.satisfies<$.Value>();
    variance = ty.satisfies({} as $.Value);
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

    let variance = ty.satisfies<{}>();
    variance = ty.satisfies({} as {});
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

    let variance = ty.satisfies<object>();
    variance = ty.satisfies({} as object);
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
//#endregion

//#region ty.satisfiedBy
{
  // any
  {
    ty<any>().is(ty.satisfiedBy<any>());
    ty<unknown>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<any>());
    ty<void>().is(ty.satisfiedBy<any>());
    ty<null>().is(ty.satisfiedBy<any>());
    ty<undefined>().is(ty.satisfiedBy<any>());
    ty<$.Value>().is(ty.satisfiedBy<any>());
    ty<{}>().is(ty.satisfiedBy<any>());
    ty<object>().is(ty.satisfiedBy<any>());

    ty<any>().is(ty.satisfiedBy<any>());
    ty<any>().is(ty.satisfiedBy<unknown>());
    ty<any>().is(ty.satisfiedBy<never>());
    ty<any>().is(ty.satisfiedBy<void>());
    ty<any>().is(ty.satisfiedBy<null>());
    ty<any>().is(ty.satisfiedBy<undefined>());
    ty<any>().is(ty.satisfiedBy<$.Value>());
    ty<any>().is(ty.satisfiedBy<{}>());
    ty<any>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<any>();
    variance = ty.satisfiedBy({} as any);
  }

  // unknown
  {
    ty<any>().is(ty.satisfiedBy<unknown>());
    ty<unknown>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<unknown>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<unknown>());

    ty<unknown>().is(ty.satisfiedBy<any>());
    ty<unknown>().is(ty.satisfiedBy<unknown>());
    ty<unknown>().is(ty.satisfiedBy<never>());
    ty<unknown>().is(ty.satisfiedBy<void>());
    ty<unknown>().is(ty.satisfiedBy<null>());
    ty<unknown>().is(ty.satisfiedBy<undefined>());
    ty<unknown>().is(ty.satisfiedBy<$.Value>());
    ty<unknown>().is(ty.satisfiedBy<{}>());
    ty<unknown>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<unknown>();
    variance = ty.satisfiedBy({} as unknown);
  }

  // never
  {
    ty<any>().is(ty.satisfiedBy<never>());
    ty<unknown>().is(ty.satisfiedBy<never>());
    ty<never>().is(ty.satisfiedBy<never>());
    ty<void>().is(ty.satisfiedBy<never>());
    ty<null>().is(ty.satisfiedBy<never>());
    ty<undefined>().is(ty.satisfiedBy<never>());
    ty<$.Value>().is(ty.satisfiedBy<never>());
    ty<{}>().is(ty.satisfiedBy<never>());
    ty<object>().is(ty.satisfiedBy<never>());

    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<unknown>());
    ty<never>().is(ty.satisfiedBy<never>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<never>();
    variance = ty.satisfiedBy({} as never);
  }

  // void
  {
    ty<any>().is(ty.satisfiedBy<void>());
    ty<unknown>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<void>());
    ty<void>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<void>());

    ty<void>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<unknown>());
    ty<void>().is(ty.satisfiedBy<never>());
    ty<void>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<null>());
    ty<void>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<void>();
    variance = ty.satisfiedBy(void 0 as void);
  }

  // null
  {
    ty<any>().is(ty.satisfiedBy<null>());
    ty<unknown>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<null>());
    ty<null>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<null>());

    ty<null>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<unknown>());
    ty<null>().is(ty.satisfiedBy<never>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<void>());
    ty<null>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<null>();
    variance = ty.satisfiedBy(null);
  }

  // undefined
  {
    ty<any>().is(ty.satisfiedBy<undefined>());
    ty<unknown>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<undefined>());
    ty<void>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<undefined>());
    ty<undefined>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<undefined>());

    ty<undefined>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<unknown>());
    ty<undefined>().is(ty.satisfiedBy<never>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<null>());
    ty<undefined>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<undefined>();
    variance = ty.satisfiedBy(undefined);
  }

  // Non-nullable primitives
  {
    ty<any>().is(ty.satisfiedBy<$.Value>());
    ty<unknown>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<$.Value>());
    ty<$.Value>().is(ty.satisfiedBy<$.Value>());
    ty<{}>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<$.Value>());

    ty<$.Value>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<unknown>());
    ty<$.Value>().is(ty.satisfiedBy<never>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<undefined>());
    ty<$.Value>().is(ty.satisfiedBy<$.Value>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<$.Value>();
    variance = ty.satisfiedBy({} as $.Value);
  }

  // {}
  {
    ty<any>().is(ty.satisfiedBy<{}>());
    ty<unknown>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<{}>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<{}>());
    ty<{}>().is(ty.satisfiedBy<{}>());
    ty<object>().is(ty.satisfiedBy<{}>());

    ty<{}>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<unknown>());
    ty<{}>().is(ty.satisfiedBy<never>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<{}>().is(ty.satisfiedBy<undefined>());
    ty<{}>().is(ty.satisfiedBy<$.Value>());
    ty<{}>().is(ty.satisfiedBy<{}>());
    ty<{}>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<{}>();
    variance = ty.satisfiedBy({} as {});
  }

  // object
  {
    ty<any>().is(ty.satisfiedBy<object>());
    ty<unknown>().is(ty.satisfiedBy<object>());
    // @ts-expect-error
    ty<never>().is(ty.satisfiedBy<object>());
    // @ts-expect-error
    ty<void>().is(ty.satisfiedBy<object>());
    // @ts-expect-error
    ty<null>().is(ty.satisfiedBy<object>());
    // @ts-expect-error
    ty<undefined>().is(ty.satisfiedBy<object>());
    // @ts-expect-error
    ty<$.Value>().is(ty.satisfiedBy<object>());
    ty<{}>().is(ty.satisfiedBy<object>());
    ty<object>().is(ty.satisfiedBy<object>());

    ty<object>().is(ty.satisfiedBy<any>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<unknown>());
    ty<object>().is(ty.satisfiedBy<never>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<void>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<null>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<undefined>());
    // @ts-expect-error
    ty<object>().is(ty.satisfiedBy<$.Value>());
    ty<object>().is(ty.satisfiedBy<{}>());
    ty<object>().is(ty.satisfiedBy<object>());

    let variance = ty.satisfiedBy<object>();
    variance = ty.satisfiedBy({} as object);
  }

  // Union
  {
    ty<string | undefined>().is(ty.satisfiedBy<string>());
    ty<string | number | undefined>().is(ty.satisfiedBy<string | undefined>());
    // @ts-expect-error
    ty<number | undefined>().is(ty.satisfiedBy<string>());
    // @ts-expect-error
    ty<string>().is(ty.satisfiedBy<string | number>());
  }
}
//#endregion

//#region ty.extends
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

    let variance = ty.extends<any>();
    variance = ty.extends({} as any);
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

    let variance = ty.extends<unknown>();
    variance = ty.extends({} as unknown);
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

    let variance = ty.extends<never>();
    variance = ty.extends({} as never);
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

    let variance = ty.extends<void>();
    variance = ty.extends(void 0 as void);
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

    let variance = ty.extends<null>();
    variance = ty.extends(null);
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

    let variance = ty.extends<undefined>();
    variance = ty.extends(undefined);
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

    let variance = ty.extends<$.Value>();
    variance = ty.extends({} as $.Value);
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

    let variance = ty.extends<{}>();
    variance = ty.extends({} as {});
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

    let variance = ty.extends<object>();
    variance = ty.extends({} as object);
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
//#endregion

//#region ty.extendedBy
{
  // any
  {
    ty<any>().is(ty.extendedBy<any>());
    ty<unknown>().is(ty.extendedBy<any>());
    ty<never>().is(ty.extendedBy<any>());
    ty<void>().is(ty.extendedBy<any>());
    ty<null>().is(ty.extendedBy<any>());
    ty<undefined>().is(ty.extendedBy<any>());
    ty<$.Value>().is(ty.extendedBy<any>());
    ty<{}>().is(ty.extendedBy<any>());
    ty<object>().is(ty.extendedBy<any>());

    ty<any>().is(ty.extendedBy<any>());
    ty<any>().is(ty.extendedBy<unknown>());
    ty<any>().is(ty.extendedBy<never>());
    ty<any>().is(ty.extendedBy<void>());
    ty<any>().is(ty.extendedBy<null>());
    ty<any>().is(ty.extendedBy<undefined>());
    ty<any>().is(ty.extendedBy<$.Value>());
    ty<any>().is(ty.extendedBy<{}>());
    ty<any>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<any>();
    variance = ty.extendedBy({} as any);
  }

  // unknown
  {
    ty<any>().is(ty.extendedBy<unknown>());
    ty<unknown>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<unknown>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<unknown>());

    ty<unknown>().is(ty.extendedBy<any>());
    ty<unknown>().is(ty.extendedBy<unknown>());
    ty<unknown>().is(ty.extendedBy<never>());
    ty<unknown>().is(ty.extendedBy<void>());
    ty<unknown>().is(ty.extendedBy<null>());
    ty<unknown>().is(ty.extendedBy<undefined>());
    ty<unknown>().is(ty.extendedBy<$.Value>());
    ty<unknown>().is(ty.extendedBy<{}>());
    ty<unknown>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<unknown>();
    variance = ty.extendedBy({} as unknown);
  }

  // never
  {
    ty<any>().is(ty.extendedBy<never>());
    ty<unknown>().is(ty.extendedBy<never>());
    ty<never>().is(ty.extendedBy<never>());
    ty<void>().is(ty.extendedBy<never>());
    ty<null>().is(ty.extendedBy<never>());
    ty<undefined>().is(ty.extendedBy<never>());
    ty<$.Value>().is(ty.extendedBy<never>());
    ty<{}>().is(ty.extendedBy<never>());
    ty<object>().is(ty.extendedBy<never>());

    ty<never>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<unknown>());
    ty<never>().is(ty.extendedBy<never>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<never>();
    variance = ty.extendedBy({} as never);
  }

  // void
  {
    ty<any>().is(ty.extendedBy<void>());
    ty<unknown>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<void>());
    ty<void>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<void>());

    ty<void>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<unknown>());
    ty<void>().is(ty.extendedBy<never>());
    ty<void>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<null>());
    ty<void>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<void>();
    variance = ty.extendedBy(void 0 as void);
  }

  // null
  {
    ty<any>().is(ty.extendedBy<null>());
    ty<unknown>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<null>());
    ty<null>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<null>());

    ty<null>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<unknown>());
    ty<null>().is(ty.extendedBy<never>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<void>());
    ty<null>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<null>();
    variance = ty.extendedBy(null);
  }

  // undefined
  {
    ty<any>().is(ty.extendedBy<undefined>());
    ty<unknown>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<undefined>());
    ty<void>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<undefined>());
    ty<undefined>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<undefined>());

    ty<undefined>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<unknown>());
    ty<undefined>().is(ty.extendedBy<never>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<null>());
    ty<undefined>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<undefined>();
    variance = ty.extendedBy(undefined);
  }

  // Non-nullable primitives
  {
    ty<any>().is(ty.extendedBy<$.Value>());
    ty<unknown>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<$.Value>());
    ty<$.Value>().is(ty.extendedBy<$.Value>());
    ty<{}>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<$.Value>());

    ty<$.Value>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<unknown>());
    ty<$.Value>().is(ty.extendedBy<never>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<undefined>());
    ty<$.Value>().is(ty.extendedBy<$.Value>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<$.Value>();
    variance = ty.extendedBy({} as $.Value);
  }

  // {}
  {
    ty<any>().is(ty.extendedBy<{}>());
    ty<unknown>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<{}>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<{}>());
    ty<{}>().is(ty.extendedBy<{}>());
    ty<object>().is(ty.extendedBy<{}>());

    ty<{}>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<unknown>());
    ty<{}>().is(ty.extendedBy<never>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<{}>().is(ty.extendedBy<undefined>());
    ty<{}>().is(ty.extendedBy<$.Value>());
    ty<{}>().is(ty.extendedBy<{}>());
    ty<{}>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<{}>();
    variance = ty.extendedBy({} as {});
  }

  // object
  {
    ty<any>().is(ty.extendedBy<object>());
    ty<unknown>().is(ty.extendedBy<object>());
    // @ts-expect-error
    ty<never>().is(ty.extendedBy<object>());
    // @ts-expect-error
    ty<void>().is(ty.extendedBy<object>());
    // @ts-expect-error
    ty<null>().is(ty.extendedBy<object>());
    // @ts-expect-error
    ty<undefined>().is(ty.extendedBy<object>());
    // @ts-expect-error
    ty<$.Value>().is(ty.extendedBy<object>());
    ty<{}>().is(ty.extendedBy<object>());
    ty<object>().is(ty.extendedBy<object>());

    ty<object>().is(ty.extendedBy<any>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<unknown>());
    ty<object>().is(ty.extendedBy<never>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<void>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<null>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<undefined>());
    // @ts-expect-error
    ty<object>().is(ty.extendedBy<$.Value>());
    ty<object>().is(ty.extendedBy<{}>());
    ty<object>().is(ty.extendedBy<object>());

    let variance = ty.extendedBy<object>();
    variance = ty.extendedBy({} as object);
  }

  // Union
  {
    ty<string | undefined>().is(ty.extendedBy<string>());
    ty<string | number | undefined>().is(ty.extendedBy<string | undefined>());
    // @ts-expect-error
    ty<number | undefined>().is(ty.extendedBy<string>());
    // @ts-expect-error
    ty<string>().is(ty.extendedBy<string | number>());
  }
}
//#endregion

//#region ty#is.undefined
{
  ty<undefined>().is.undefined();

  // @ts-expect-error
  ty<any>().is.undefined();
  // @ts-expect-error
  ty<unknown>().is.undefined();
  // @ts-expect-error
  ty<never>().is.undefined();
  // @ts-expect-error
  ty<string>().is.undefined();
  // @ts-expect-error
  ty<void>().is.undefined();
  // @ts-expect-error
  ty<null>().is.undefined();
  // @ts-expect-error
  ty<string | undefined>().is.undefined();
}
//#endregion

//#region ty.as
{
  const null_ = ty.as<null>();

  ty(null_).is(ty.satisfies<any>());
  ty(null_).is(ty.satisfies<unknown>());
  // @ts-expect-error
  ty(null_).is(ty.satisfies<never>());
  // @ts-expect-error
  ty(null_).is(ty.satisfies<void>());
  ty(null_).is(ty.satisfies<null>());
  // @ts-expect-error
  ty(null_).is(ty.satisfies<undefined>());
  // @ts-expect-error
  ty(null_).is(ty.satisfies<$.Value>());
  // @ts-expect-error
  ty(null_).is(ty.satisfies<{}>());
  // @ts-expect-error
  ty(null_).is(ty.satisfies<object>());
}
//#endregion
