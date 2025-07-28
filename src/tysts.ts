import type { $ } from "tdollar";
import { ty } from "./index.ts";

//#region ty
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

  let variance = ty<string>();
  variance = ty({} as string);

  // @ts-expect-error
  variance = ty<any>();
  // @ts-expect-error
  variance = ty<unknown>();
  // @ts-expect-error
  variance = ty<never>();
}
//#endregion

//#region ty.is
{
  //#region ty
  {
    // any
    {
      ty<any>().is(ty<any>());
      // @ts-expect-error
      ty<any>().is(ty<unknown>());
      // @ts-expect-error
      ty<any>().is(ty<never>());
      // @ts-expect-error
      ty<any>().is(ty<void>());
      // @ts-expect-error
      ty<any>().is(ty<null>());
      // @ts-expect-error
      ty<any>().is(ty<undefined>());
      // @ts-expect-error
      ty<any>().is(ty<$.Value>());
      // @ts-expect-error
      ty<any>().is(ty<{}>());
      // @ts-expect-error
      ty<any>().is(ty<object>());

      ty<any>().is(ty<any>());
      // @ts-expect-error
      ty<unknown>().is(ty<any>());
      // @ts-expect-error
      ty<never>().is(ty<any>());
      // @ts-expect-error
      ty<void>().is(ty<any>());
      // @ts-expect-error
      ty<null>().is(ty<any>());
      // @ts-expect-error
      ty<undefined>().is(ty<any>());
      // @ts-expect-error
      ty<$.Value>().is(ty<any>());
      // @ts-expect-error
      ty<{}>().is(ty<any>());
      // @ts-expect-error
      ty<object>().is(ty<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().is(ty<any>());
      ty<unknown>().is(ty<unknown>());
      // @ts-expect-error
      ty<unknown>().is(ty<never>());
      // @ts-expect-error
      ty<unknown>().is(ty<void>());
      // @ts-expect-error
      ty<unknown>().is(ty<null>());
      // @ts-expect-error
      ty<unknown>().is(ty<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<unknown>());
      ty<unknown>().is(ty<unknown>());
      // @ts-expect-error
      ty<never>().is(ty<unknown>());
      // @ts-expect-error
      ty<void>().is(ty<unknown>());
      // @ts-expect-error
      ty<null>().is(ty<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty<unknown>());
      // @ts-expect-error
      ty<object>().is(ty<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().is(ty<any>());
      // @ts-expect-error
      ty<never>().is(ty<unknown>());
      ty<never>().is(ty<never>());
      // @ts-expect-error
      ty<never>().is(ty<void>());
      // @ts-expect-error
      ty<never>().is(ty<null>());
      // @ts-expect-error
      ty<never>().is(ty<undefined>());
      // @ts-expect-error
      ty<never>().is(ty<$.Value>());
      // @ts-expect-error
      ty<never>().is(ty<{}>());
      // @ts-expect-error
      ty<never>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<never>());
      // @ts-expect-error
      ty<unknown>().is(ty<never>());
      ty<never>().is(ty<never>());
      // @ts-expect-error
      ty<void>().is(ty<never>());
      // @ts-expect-error
      ty<null>().is(ty<never>());
      // @ts-expect-error
      ty<undefined>().is(ty<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty<never>());
      // @ts-expect-error
      ty<{}>().is(ty<never>());
      // @ts-expect-error
      ty<object>().is(ty<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().is(ty<any>());
      // @ts-expect-error
      ty<void>().is(ty<unknown>());
      // @ts-expect-error
      ty<void>().is(ty<never>());
      ty<void>().is(ty<void>());
      // @ts-expect-error
      ty<void>().is(ty<null>());
      // @ts-expect-error
      ty<void>().is(ty<undefined>());
      // @ts-expect-error
      ty<void>().is(ty<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty<{}>());
      // @ts-expect-error
      ty<void>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<void>());
      // @ts-expect-error
      ty<unknown>().is(ty<void>());
      // @ts-expect-error
      ty<never>().is(ty<void>());
      ty<void>().is(ty<void>());
      // @ts-expect-error
      ty<null>().is(ty<void>());
      // @ts-expect-error
      ty<undefined>().is(ty<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty<void>());
      // @ts-expect-error
      ty<{}>().is(ty<void>());
      // @ts-expect-error
      ty<object>().is(ty<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().is(ty<any>());
      // @ts-expect-error
      ty<null>().is(ty<unknown>());
      // @ts-expect-error
      ty<null>().is(ty<never>());
      // @ts-expect-error
      ty<null>().is(ty<void>());
      ty<null>().is(ty<null>());
      // @ts-expect-error
      ty<null>().is(ty<undefined>());
      // @ts-expect-error
      ty<null>().is(ty<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty<{}>());
      // @ts-expect-error
      ty<null>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<null>());
      // @ts-expect-error
      ty<unknown>().is(ty<null>());
      // @ts-expect-error
      ty<never>().is(ty<null>());
      // @ts-expect-error
      ty<void>().is(ty<null>());
      ty<null>().is(ty<null>());
      // @ts-expect-error
      ty<undefined>().is(ty<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty<null>());
      // @ts-expect-error
      ty<{}>().is(ty<null>());
      // @ts-expect-error
      ty<object>().is(ty<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().is(ty<any>());
      // @ts-expect-error
      ty<undefined>().is(ty<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty<never>());
      // @ts-expect-error
      ty<undefined>().is(ty<void>());
      // @ts-expect-error
      ty<undefined>().is(ty<null>());
      ty<undefined>().is(ty<undefined>());
      // @ts-expect-error
      ty<undefined>().is(ty<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty<undefined>());
      // @ts-expect-error
      ty<never>().is(ty<undefined>());
      // @ts-expect-error
      ty<void>().is(ty<undefined>());
      // @ts-expect-error
      ty<null>().is(ty<undefined>());
      ty<undefined>().is(ty<undefined>());
      // @ts-expect-error
      ty<$.Value>().is(ty<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty<undefined>());
      // @ts-expect-error
      ty<object>().is(ty<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().is(ty<any>());
      // @ts-expect-error
      ty<$.Value>().is(ty<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty<undefined>());
      ty<$.Value>().is(ty<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is(ty<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty<$.Value>());
      // @ts-expect-error
      ty<never>().is(ty<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty<$.Value>());
      ty<$.Value>().is(ty<$.Value>());
      // @ts-expect-error
      ty<{}>().is(ty<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().is(ty<any>());
      // @ts-expect-error
      ty<{}>().is(ty<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty<never>());
      // @ts-expect-error
      ty<{}>().is(ty<void>());
      // @ts-expect-error
      ty<{}>().is(ty<null>());
      // @ts-expect-error
      ty<{}>().is(ty<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty<$.Value>());
      ty<{}>().is(ty<{}>());
      // @ts-expect-error
      ty<{}>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty<{}>());
      // @ts-expect-error
      ty<never>().is(ty<{}>());
      // @ts-expect-error
      ty<void>().is(ty<{}>());
      // @ts-expect-error
      ty<null>().is(ty<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty<{}>());
      ty<{}>().is(ty<{}>());
      // @ts-expect-error
      ty<object>().is(ty<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().is(ty<any>());
      // @ts-expect-error
      ty<object>().is(ty<unknown>());
      // @ts-expect-error
      ty<object>().is(ty<never>());
      // @ts-expect-error
      ty<object>().is(ty<void>());
      // @ts-expect-error
      ty<object>().is(ty<null>());
      // @ts-expect-error
      ty<object>().is(ty<undefined>());
      // @ts-expect-error
      ty<object>().is(ty<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty<{}>());
      ty<object>().is(ty<object>());

      // @ts-expect-error
      ty<any>().is(ty<object>());
      // @ts-expect-error
      ty<unknown>().is(ty<object>());
      // @ts-expect-error
      ty<never>().is(ty<object>());
      // @ts-expect-error
      ty<void>().is(ty<object>());
      // @ts-expect-error
      ty<null>().is(ty<object>());
      // @ts-expect-error
      ty<undefined>().is(ty<object>());
      // @ts-expect-error
      ty<$.Value>().is(ty<object>());
      // @ts-expect-error
      ty<{}>().is(ty<object>());
      ty<object>().is(ty<object>());
    }

    // Union
    {
      ty<string>().is(ty<string>());
      ty<string | undefined>().is(ty<string | undefined>());
      // @ts-expect-error
      ty<string>().is(ty<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().is(ty<string | number | undefined>());
      // @ts-expect-error
      ty<string>().is(ty<number | undefined>());
      // @ts-expect-error
      ty<string | number>().is(ty<string>());
    }
  }
  //#endregion

  //#region ty.assignableTo
  {
    // any
    {
      ty<any>().is(ty.assignableTo<any>());
      ty<any>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<any>().is(ty.assignableTo<never>());
      ty<any>().is(ty.assignableTo<void>());
      ty<any>().is(ty.assignableTo<null>());
      ty<any>().is(ty.assignableTo<undefined>());
      ty<any>().is(ty.assignableTo<$.Value>());
      ty<any>().is(ty.assignableTo<{}>());
      ty<any>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<any>());
      ty<unknown>().is(ty.assignableTo<any>());
      ty<never>().is(ty.assignableTo<any>());
      ty<void>().is(ty.assignableTo<any>());
      ty<null>().is(ty.assignableTo<any>());
      ty<undefined>().is(ty.assignableTo<any>());
      ty<$.Value>().is(ty.assignableTo<any>());
      ty<{}>().is(ty.assignableTo<any>());
      ty<object>().is(ty.assignableTo<any>());
    }

    // unknown
    {
      ty<unknown>().is(ty.assignableTo<any>());
      ty<unknown>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<unknown>());
      ty<unknown>().is(ty.assignableTo<unknown>());
      ty<never>().is(ty.assignableTo<unknown>());
      ty<void>().is(ty.assignableTo<unknown>());
      ty<null>().is(ty.assignableTo<unknown>());
      ty<undefined>().is(ty.assignableTo<unknown>());
      ty<$.Value>().is(ty.assignableTo<unknown>());
      ty<{}>().is(ty.assignableTo<unknown>());
      ty<object>().is(ty.assignableTo<unknown>());
    }

    // never
    {
      ty<never>().is(ty.assignableTo<any>());
      ty<never>().is(ty.assignableTo<unknown>());
      ty<never>().is(ty.assignableTo<never>());
      ty<never>().is(ty.assignableTo<void>());
      ty<never>().is(ty.assignableTo<null>());
      ty<never>().is(ty.assignableTo<undefined>());
      ty<never>().is(ty.assignableTo<$.Value>());
      ty<never>().is(ty.assignableTo<{}>());
      ty<never>().is(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<never>());
      ty<never>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<never>());
    }

    // void
    {
      ty<void>().is(ty.assignableTo<any>());
      ty<void>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<never>());
      ty<void>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<void>());
      ty<never>().is(ty.assignableTo<void>());
      ty<void>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<void>());
      ty<undefined>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<void>());
    }

    // null
    {
      ty<null>().is(ty.assignableTo<any>());
      ty<null>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<void>());
      ty<null>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<null>());
      ty<never>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<null>());
      ty<null>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<null>());
    }

    // undefined
    {
      ty<undefined>().is(ty.assignableTo<any>());
      ty<undefined>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<never>());
      ty<undefined>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<null>());
      ty<undefined>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<undefined>());
      ty<never>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<undefined>());
      ty<undefined>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<undefined>());
    }

    // Non-nullable primitives
    {
      ty<$.Value>().is(ty.assignableTo<any>());
      ty<$.Value>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<undefined>());
      ty<$.Value>().is(ty.assignableTo<$.Value>());
      ty<$.Value>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<$.Value>());
      ty<never>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<$.Value>());
      ty<$.Value>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<$.Value>());
    }

    // {}
    {
      ty<{}>().is(ty.assignableTo<any>());
      ty<{}>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableTo<$.Value>());
      ty<{}>().is(ty.assignableTo<{}>());
      ty<{}>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<{}>());
      ty<never>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<{}>());
      ty<$.Value>().is(ty.assignableTo<{}>());
      ty<{}>().is(ty.assignableTo<{}>());
      ty<object>().is(ty.assignableTo<{}>());
    }

    // object
    {
      ty<object>().is(ty.assignableTo<any>());
      ty<object>().is(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<never>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<void>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<null>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.assignableTo<$.Value>());
      ty<object>().is(ty.assignableTo<{}>());
      ty<object>().is(ty.assignableTo<object>());

      ty<any>().is(ty.assignableTo<object>());
      // @ts-expect-error
      ty<unknown>().is(ty.assignableTo<object>());
      ty<never>().is(ty.assignableTo<object>());
      // @ts-expect-error
      ty<void>().is(ty.assignableTo<object>());
      // @ts-expect-error
      ty<null>().is(ty.assignableTo<object>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableTo<object>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableTo<object>());
      ty<{}>().is(ty.assignableTo<object>());
      ty<object>().is(ty.assignableTo<object>());
    }

    // Union
    {
      ty<string>().is(ty.assignableTo<string>());
      ty<string>().is(ty.assignableTo<string | undefined>());
      ty<string | undefined>().is(ty.assignableTo<string | undefined>());
      ty<string | undefined>().is(
        ty.assignableTo<string | number | undefined>()
      );
      // @ts-expect-error
      ty<string>().is(ty.assignableTo<number | undefined>());
      // @ts-expect-error
      ty<string | number>().is(ty.assignableTo<string>());
    }
  }
  //#endregion

  //#region ty.assignableFrom
  {
    // any
    {
      ty<any>().is(ty.assignableFrom<any>());
      ty<unknown>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<any>());
      ty<void>().is(ty.assignableFrom<any>());
      ty<null>().is(ty.assignableFrom<any>());
      ty<undefined>().is(ty.assignableFrom<any>());
      ty<$.Value>().is(ty.assignableFrom<any>());
      ty<{}>().is(ty.assignableFrom<any>());
      ty<object>().is(ty.assignableFrom<any>());

      ty<any>().is(ty.assignableFrom<any>());
      ty<any>().is(ty.assignableFrom<unknown>());
      ty<any>().is(ty.assignableFrom<never>());
      ty<any>().is(ty.assignableFrom<void>());
      ty<any>().is(ty.assignableFrom<null>());
      ty<any>().is(ty.assignableFrom<undefined>());
      ty<any>().is(ty.assignableFrom<$.Value>());
      ty<any>().is(ty.assignableFrom<{}>());
      ty<any>().is(ty.assignableFrom<object>());
    }

    // unknown
    {
      ty<any>().is(ty.assignableFrom<unknown>());
      ty<unknown>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<unknown>());

      ty<unknown>().is(ty.assignableFrom<any>());
      ty<unknown>().is(ty.assignableFrom<unknown>());
      ty<unknown>().is(ty.assignableFrom<never>());
      ty<unknown>().is(ty.assignableFrom<void>());
      ty<unknown>().is(ty.assignableFrom<null>());
      ty<unknown>().is(ty.assignableFrom<undefined>());
      ty<unknown>().is(ty.assignableFrom<$.Value>());
      ty<unknown>().is(ty.assignableFrom<{}>());
      ty<unknown>().is(ty.assignableFrom<object>());
    }

    // never
    {
      ty<any>().is(ty.assignableFrom<never>());
      ty<unknown>().is(ty.assignableFrom<never>());
      ty<never>().is(ty.assignableFrom<never>());
      ty<void>().is(ty.assignableFrom<never>());
      ty<null>().is(ty.assignableFrom<never>());
      ty<undefined>().is(ty.assignableFrom<never>());
      ty<$.Value>().is(ty.assignableFrom<never>());
      ty<{}>().is(ty.assignableFrom<never>());
      ty<object>().is(ty.assignableFrom<never>());

      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<unknown>());
      ty<never>().is(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<object>());
    }

    // void
    {
      ty<any>().is(ty.assignableFrom<void>());
      ty<unknown>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<void>());
      ty<void>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<void>());

      ty<void>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<unknown>());
      ty<void>().is(ty.assignableFrom<never>());
      ty<void>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<null>());
      ty<void>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<object>());
    }

    // null
    {
      ty<any>().is(ty.assignableFrom<null>());
      ty<unknown>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<null>());
      ty<null>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<null>());

      ty<null>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<unknown>());
      ty<null>().is(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<void>());
      ty<null>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<object>());
    }

    // undefined
    {
      ty<any>().is(ty.assignableFrom<undefined>());
      ty<unknown>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<undefined>());
      ty<void>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<undefined>());
      ty<undefined>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<undefined>());

      ty<undefined>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<unknown>());
      ty<undefined>().is(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<null>());
      ty<undefined>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<object>());
    }

    // Non-nullable primitives
    {
      ty<any>().is(ty.assignableFrom<$.Value>());
      ty<unknown>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<$.Value>());
      ty<$.Value>().is(ty.assignableFrom<$.Value>());
      ty<{}>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<$.Value>());

      ty<$.Value>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<unknown>());
      ty<$.Value>().is(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<undefined>());
      ty<$.Value>().is(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<object>());
    }

    // {}
    {
      ty<any>().is(ty.assignableFrom<{}>());
      ty<unknown>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<{}>());
      ty<{}>().is(ty.assignableFrom<{}>());
      ty<object>().is(ty.assignableFrom<{}>());

      ty<{}>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<unknown>());
      ty<{}>().is(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<{}>().is(ty.assignableFrom<undefined>());
      ty<{}>().is(ty.assignableFrom<$.Value>());
      ty<{}>().is(ty.assignableFrom<{}>());
      ty<{}>().is(ty.assignableFrom<object>());
    }

    // object
    {
      ty<any>().is(ty.assignableFrom<object>());
      ty<unknown>().is(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<never>().is(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<void>().is(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<null>().is(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<undefined>().is(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<$.Value>().is(ty.assignableFrom<object>());
      ty<{}>().is(ty.assignableFrom<object>());
      ty<object>().is(ty.assignableFrom<object>());

      ty<object>().is(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<unknown>());
      ty<object>().is(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.assignableFrom<$.Value>());
      ty<object>().is(ty.assignableFrom<{}>());
      ty<object>().is(ty.assignableFrom<object>());
    }

    // Union
    {
      ty<string>().is(ty.assignableFrom<string>());
      ty<string | undefined>().is(ty.assignableFrom<string>());
      ty<string | undefined>().is(ty.assignableFrom<string | undefined>());
      ty<string | number | undefined>().is(
        ty.assignableFrom<string | undefined>()
      );
      // @ts-expect-error
      ty<number | undefined>().is(ty.assignableFrom<string>());
      // @ts-expect-error
      ty<string>().is(ty.assignableFrom<string | number>());
    }
  }
  //#endregion

  //#region ty.subtypeOf
  {
    // any
    {
      ty<any>().is(ty.subtypeOf<any>());
      ty<any>().is(ty.subtypeOf<unknown>());
      ty<any>().is(ty.subtypeOf<never>());
      ty<any>().is(ty.subtypeOf<void>());
      ty<any>().is(ty.subtypeOf<null>());
      ty<any>().is(ty.subtypeOf<undefined>());
      ty<any>().is(ty.subtypeOf<$.Value>());
      ty<any>().is(ty.subtypeOf<{}>());
      ty<any>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<any>());
      ty<unknown>().is(ty.subtypeOf<any>());
      ty<never>().is(ty.subtypeOf<any>());
      ty<void>().is(ty.subtypeOf<any>());
      ty<null>().is(ty.subtypeOf<any>());
      ty<undefined>().is(ty.subtypeOf<any>());
      ty<$.Value>().is(ty.subtypeOf<any>());
      ty<{}>().is(ty.subtypeOf<any>());
      ty<object>().is(ty.subtypeOf<any>());
    }

    // unknown
    {
      ty<unknown>().is(ty.subtypeOf<any>());
      ty<unknown>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<unknown>());
      ty<unknown>().is(ty.subtypeOf<unknown>());
      ty<never>().is(ty.subtypeOf<unknown>());
      ty<void>().is(ty.subtypeOf<unknown>());
      ty<null>().is(ty.subtypeOf<unknown>());
      ty<undefined>().is(ty.subtypeOf<unknown>());
      ty<$.Value>().is(ty.subtypeOf<unknown>());
      ty<{}>().is(ty.subtypeOf<unknown>());
      ty<object>().is(ty.subtypeOf<unknown>());
    }

    // never
    {
      ty<never>().is(ty.subtypeOf<any>());
      ty<never>().is(ty.subtypeOf<unknown>());
      ty<never>().is(ty.subtypeOf<never>());
      ty<never>().is(ty.subtypeOf<void>());
      ty<never>().is(ty.subtypeOf<null>());
      ty<never>().is(ty.subtypeOf<undefined>());
      ty<never>().is(ty.subtypeOf<$.Value>());
      ty<never>().is(ty.subtypeOf<{}>());
      ty<never>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<never>());
      ty<never>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<never>());
    }

    // void
    {
      ty<void>().is(ty.subtypeOf<any>());
      ty<void>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<never>());
      ty<void>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<void>());
      ty<never>().is(ty.subtypeOf<void>());
      ty<void>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<void>());
      ty<undefined>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<void>());
    }

    // null
    {
      ty<null>().is(ty.subtypeOf<any>());
      ty<null>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<void>());
      ty<null>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<null>());
      ty<never>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<null>());
      ty<null>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<null>());
    }

    // undefined
    {
      ty<undefined>().is(ty.subtypeOf<any>());
      ty<undefined>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<never>());
      ty<undefined>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<null>());
      ty<undefined>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<undefined>());
      ty<never>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<undefined>());
      ty<undefined>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<undefined>());
    }

    // Non-nullable primitives
    {
      ty<$.Value>().is(ty.subtypeOf<any>());
      ty<$.Value>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<undefined>());
      ty<$.Value>().is(ty.subtypeOf<$.Value>());
      ty<$.Value>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<$.Value>());
      ty<never>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<$.Value>());
      ty<$.Value>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<$.Value>());
    }

    // {}
    {
      ty<{}>().is(ty.subtypeOf<any>());
      ty<{}>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.subtypeOf<$.Value>());
      ty<{}>().is(ty.subtypeOf<{}>());
      ty<{}>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<{}>());
      ty<never>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<{}>());
      ty<$.Value>().is(ty.subtypeOf<{}>());
      ty<{}>().is(ty.subtypeOf<{}>());
      ty<object>().is(ty.subtypeOf<{}>());
    }

    // object
    {
      ty<object>().is(ty.subtypeOf<any>());
      ty<object>().is(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.subtypeOf<$.Value>());
      ty<object>().is(ty.subtypeOf<{}>());
      ty<object>().is(ty.subtypeOf<object>());

      ty<any>().is(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<unknown>().is(ty.subtypeOf<object>());
      ty<never>().is(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<void>().is(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<null>().is(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<undefined>().is(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<$.Value>().is(ty.subtypeOf<object>());
      ty<{}>().is(ty.subtypeOf<object>());
      ty<object>().is(ty.subtypeOf<object>());
    }

    // Union
    {
      ty<string>().is(ty.subtypeOf<string>());
      ty<string>().is(ty.subtypeOf<string | undefined>());
      ty<string | undefined>().is(ty.subtypeOf<string | undefined>());
      ty<string | undefined>().is(ty.subtypeOf<string | number | undefined>());
      // @ts-expect-error
      ty<string>().is(ty.subtypeOf<number | undefined>());
      // @ts-expect-error
      ty<string | number>().is(ty.subtypeOf<string>());
    }
  }
  //#endregion

  //#region ty.supertypeOf
  {
    // any
    {
      ty<any>().is(ty.supertypeOf<any>());
      ty<unknown>().is(ty.supertypeOf<any>());
      ty<never>().is(ty.supertypeOf<any>());
      ty<void>().is(ty.supertypeOf<any>());
      ty<null>().is(ty.supertypeOf<any>());
      ty<undefined>().is(ty.supertypeOf<any>());
      ty<$.Value>().is(ty.supertypeOf<any>());
      ty<{}>().is(ty.supertypeOf<any>());
      ty<object>().is(ty.supertypeOf<any>());

      ty<any>().is(ty.supertypeOf<any>());
      ty<any>().is(ty.supertypeOf<unknown>());
      ty<any>().is(ty.supertypeOf<never>());
      ty<any>().is(ty.supertypeOf<void>());
      ty<any>().is(ty.supertypeOf<null>());
      ty<any>().is(ty.supertypeOf<undefined>());
      ty<any>().is(ty.supertypeOf<$.Value>());
      ty<any>().is(ty.supertypeOf<{}>());
      ty<any>().is(ty.supertypeOf<object>());
    }

    // unknown
    {
      ty<any>().is(ty.supertypeOf<unknown>());
      ty<unknown>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<unknown>());

      ty<unknown>().is(ty.supertypeOf<any>());
      ty<unknown>().is(ty.supertypeOf<unknown>());
      ty<unknown>().is(ty.supertypeOf<never>());
      ty<unknown>().is(ty.supertypeOf<void>());
      ty<unknown>().is(ty.supertypeOf<null>());
      ty<unknown>().is(ty.supertypeOf<undefined>());
      ty<unknown>().is(ty.supertypeOf<$.Value>());
      ty<unknown>().is(ty.supertypeOf<{}>());
      ty<unknown>().is(ty.supertypeOf<object>());
    }

    // never
    {
      ty<any>().is(ty.supertypeOf<never>());
      ty<unknown>().is(ty.supertypeOf<never>());
      ty<never>().is(ty.supertypeOf<never>());
      ty<void>().is(ty.supertypeOf<never>());
      ty<null>().is(ty.supertypeOf<never>());
      ty<undefined>().is(ty.supertypeOf<never>());
      ty<$.Value>().is(ty.supertypeOf<never>());
      ty<{}>().is(ty.supertypeOf<never>());
      ty<object>().is(ty.supertypeOf<never>());

      ty<never>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<unknown>());
      ty<never>().is(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<object>());
    }

    // void
    {
      ty<any>().is(ty.supertypeOf<void>());
      ty<unknown>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<void>());
      ty<void>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<void>());

      ty<void>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<unknown>());
      ty<void>().is(ty.supertypeOf<never>());
      ty<void>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<null>());
      ty<void>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<object>());
    }

    // null
    {
      ty<any>().is(ty.supertypeOf<null>());
      ty<unknown>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<null>());
      ty<null>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<null>());

      ty<null>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<unknown>());
      ty<null>().is(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<void>());
      ty<null>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<object>());
    }

    // undefined
    {
      ty<any>().is(ty.supertypeOf<undefined>());
      ty<unknown>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<undefined>());
      ty<void>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<undefined>());
      ty<undefined>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<undefined>());

      ty<undefined>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<unknown>());
      ty<undefined>().is(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<null>());
      ty<undefined>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<object>());
    }

    // Non-nullable primitives
    {
      ty<any>().is(ty.supertypeOf<$.Value>());
      ty<unknown>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<$.Value>());
      ty<$.Value>().is(ty.supertypeOf<$.Value>());
      ty<{}>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<$.Value>());

      ty<$.Value>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<unknown>());
      ty<$.Value>().is(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<undefined>());
      ty<$.Value>().is(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<object>());
    }

    // {}
    {
      ty<any>().is(ty.supertypeOf<{}>());
      ty<unknown>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<{}>());
      ty<{}>().is(ty.supertypeOf<{}>());
      ty<object>().is(ty.supertypeOf<{}>());

      ty<{}>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<unknown>());
      ty<{}>().is(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<{}>().is(ty.supertypeOf<undefined>());
      ty<{}>().is(ty.supertypeOf<$.Value>());
      ty<{}>().is(ty.supertypeOf<{}>());
      ty<{}>().is(ty.supertypeOf<object>());
    }

    // object
    {
      ty<any>().is(ty.supertypeOf<object>());
      ty<unknown>().is(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<never>().is(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<void>().is(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<null>().is(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<undefined>().is(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<$.Value>().is(ty.supertypeOf<object>());
      ty<{}>().is(ty.supertypeOf<object>());
      ty<object>().is(ty.supertypeOf<object>());

      ty<object>().is(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<unknown>());
      ty<object>().is(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<object>().is(ty.supertypeOf<$.Value>());
      ty<object>().is(ty.supertypeOf<{}>());
      ty<object>().is(ty.supertypeOf<object>());
    }

    // Union
    {
      ty<string>().is(ty.supertypeOf<string>());
      ty<string | undefined>().is(ty.supertypeOf<string>());
      ty<string | undefined>().is(ty.supertypeOf<string | undefined>());
      ty<string | number | undefined>().is(
        ty.supertypeOf<string | undefined>()
      );
      // @ts-expect-error
      ty<number | undefined>().is(ty.supertypeOf<string>());
      // @ts-expect-error
      ty<string>().is(ty.supertypeOf<string | number>());
    }
  }
  //#endregion

  //#region ty#is.undefined
  {
    // Basics
    {
      // @ts-expect-error
      ty<any>().is.undefined();
      // @ts-expect-error
      ty<unknown>().is.undefined();
      // @ts-expect-error
      ty<never>().is.undefined();
      // @ts-expect-error
      ty<void>().is.undefined();
      // @ts-expect-error
      ty<null>().is.undefined();
      ty<undefined>().is.undefined();
      // @ts-expect-error
      ty<$.Value>().is.undefined();
      // @ts-expect-error
      ty<{}>().is.undefined();
      // @ts-expect-error
      ty<object>().is.undefined();
    }

    // Union
    {
      // @ts-expect-error
      ty<any | undefined>().is.undefined();
      // @ts-expect-error
      ty<string | undefined>().is.undefined();
    }
  }
  //#endregion
}
//#endregion

//#region ty.is.not
{
  //#region ty
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty<any>());
      ty<any>().is.not(ty<unknown>());
      ty<any>().is.not(ty<never>());
      ty<any>().is.not(ty<void>());
      ty<any>().is.not(ty<null>());
      ty<any>().is.not(ty<undefined>());
      ty<any>().is.not(ty<$.Value>());
      ty<any>().is.not(ty<{}>());
      ty<any>().is.not(ty<object>());

      // @ts-expect-error
      ty<any>().is.not(ty<any>());
      ty<unknown>().is.not(ty<any>());
      ty<never>().is.not(ty<any>());
      ty<void>().is.not(ty<any>());
      ty<null>().is.not(ty<any>());
      ty<undefined>().is.not(ty<any>());
      ty<$.Value>().is.not(ty<any>());
      ty<{}>().is.not(ty<any>());
      ty<object>().is.not(ty<any>());
    }

    // unknown
    {
      ty<unknown>().is.not(ty<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty<unknown>());
      ty<unknown>().is.not(ty<never>());
      ty<unknown>().is.not(ty<void>());
      ty<unknown>().is.not(ty<null>());
      ty<unknown>().is.not(ty<undefined>());
      ty<unknown>().is.not(ty<$.Value>());
      ty<unknown>().is.not(ty<{}>());
      ty<unknown>().is.not(ty<object>());

      ty<any>().is.not(ty<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty<unknown>());
      ty<never>().is.not(ty<unknown>());
      ty<void>().is.not(ty<unknown>());
      ty<null>().is.not(ty<unknown>());
      ty<undefined>().is.not(ty<unknown>());
      ty<$.Value>().is.not(ty<unknown>());
      ty<{}>().is.not(ty<unknown>());
      ty<object>().is.not(ty<unknown>());
    }

    // never
    {
      ty<never>().is.not(ty<any>());
      ty<never>().is.not(ty<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty<never>());
      ty<never>().is.not(ty<void>());
      ty<never>().is.not(ty<null>());
      ty<never>().is.not(ty<undefined>());
      ty<never>().is.not(ty<$.Value>());
      ty<never>().is.not(ty<{}>());
      ty<never>().is.not(ty<object>());

      ty<any>().is.not(ty<never>());
      ty<unknown>().is.not(ty<never>());
      // @ts-expect-error
      ty<never>().is.not(ty<never>());
      ty<void>().is.not(ty<never>());
      ty<null>().is.not(ty<never>());
      ty<undefined>().is.not(ty<never>());
      ty<$.Value>().is.not(ty<never>());
      ty<{}>().is.not(ty<never>());
      ty<object>().is.not(ty<never>());
    }

    // void
    {
      ty<void>().is.not(ty<any>());
      ty<void>().is.not(ty<unknown>());
      ty<void>().is.not(ty<never>());
      // @ts-expect-error
      ty<void>().is.not(ty<void>());
      ty<void>().is.not(ty<null>());
      ty<void>().is.not(ty<undefined>());
      ty<void>().is.not(ty<$.Value>());
      ty<void>().is.not(ty<{}>());
      ty<void>().is.not(ty<object>());

      ty<any>().is.not(ty<void>());
      ty<unknown>().is.not(ty<void>());
      ty<never>().is.not(ty<void>());
      // @ts-expect-error
      ty<void>().is.not(ty<void>());
      ty<null>().is.not(ty<void>());
      ty<undefined>().is.not(ty<void>());
      ty<$.Value>().is.not(ty<void>());
      ty<{}>().is.not(ty<void>());
      ty<object>().is.not(ty<void>());
    }

    // null
    {
      ty<null>().is.not(ty<any>());
      ty<null>().is.not(ty<unknown>());
      ty<null>().is.not(ty<never>());
      ty<null>().is.not(ty<void>());
      // @ts-expect-error
      ty<null>().is.not(ty<null>());
      ty<null>().is.not(ty<undefined>());
      ty<null>().is.not(ty<$.Value>());
      ty<null>().is.not(ty<{}>());
      ty<null>().is.not(ty<object>());

      ty<any>().is.not(ty<null>());
      ty<unknown>().is.not(ty<null>());
      ty<never>().is.not(ty<null>());
      ty<void>().is.not(ty<null>());
      // @ts-expect-error
      ty<null>().is.not(ty<null>());
      ty<undefined>().is.not(ty<null>());
      ty<$.Value>().is.not(ty<null>());
      ty<{}>().is.not(ty<null>());
      ty<object>().is.not(ty<null>());
    }

    // undefined
    {
      ty<undefined>().is.not(ty<any>());
      ty<undefined>().is.not(ty<unknown>());
      ty<undefined>().is.not(ty<never>());
      ty<undefined>().is.not(ty<void>());
      ty<undefined>().is.not(ty<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty<undefined>());
      ty<undefined>().is.not(ty<$.Value>());
      ty<undefined>().is.not(ty<{}>());
      ty<undefined>().is.not(ty<object>());

      ty<any>().is.not(ty<undefined>());
      ty<unknown>().is.not(ty<undefined>());
      ty<never>().is.not(ty<undefined>());
      ty<void>().is.not(ty<undefined>());
      ty<null>().is.not(ty<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty<undefined>());
      ty<$.Value>().is.not(ty<undefined>());
      ty<{}>().is.not(ty<undefined>());
      ty<object>().is.not(ty<undefined>());
    }

    // Non-nullable primitives
    {
      ty<$.Value>().is.not(ty<any>());
      ty<$.Value>().is.not(ty<unknown>());
      ty<$.Value>().is.not(ty<never>());
      ty<$.Value>().is.not(ty<void>());
      ty<$.Value>().is.not(ty<null>());
      ty<$.Value>().is.not(ty<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty<$.Value>());
      ty<$.Value>().is.not(ty<{}>());
      ty<$.Value>().is.not(ty<object>());

      ty<any>().is.not(ty<$.Value>());
      ty<unknown>().is.not(ty<$.Value>());
      ty<never>().is.not(ty<$.Value>());
      ty<void>().is.not(ty<$.Value>());
      ty<null>().is.not(ty<$.Value>());
      ty<undefined>().is.not(ty<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty<$.Value>());
      ty<{}>().is.not(ty<$.Value>());
      ty<object>().is.not(ty<$.Value>());
    }

    // {}
    {
      ty<{}>().is.not(ty<any>());
      ty<{}>().is.not(ty<unknown>());
      ty<{}>().is.not(ty<never>());
      ty<{}>().is.not(ty<void>());
      ty<{}>().is.not(ty<null>());
      ty<{}>().is.not(ty<undefined>());
      ty<{}>().is.not(ty<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty<{}>());
      ty<{}>().is.not(ty<object>());

      ty<any>().is.not(ty<{}>());
      ty<unknown>().is.not(ty<{}>());
      ty<never>().is.not(ty<{}>());
      ty<void>().is.not(ty<{}>());
      ty<null>().is.not(ty<{}>());
      ty<undefined>().is.not(ty<{}>());
      ty<$.Value>().is.not(ty<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty<{}>());
      ty<object>().is.not(ty<{}>());
    }

    // object
    {
      ty<object>().is.not(ty<any>());
      ty<object>().is.not(ty<unknown>());
      ty<object>().is.not(ty<never>());
      ty<object>().is.not(ty<void>());
      ty<object>().is.not(ty<null>());
      ty<object>().is.not(ty<undefined>());
      ty<object>().is.not(ty<$.Value>());
      ty<object>().is.not(ty<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty<object>());

      ty<any>().is.not(ty<object>());
      ty<unknown>().is.not(ty<object>());
      ty<never>().is.not(ty<object>());
      ty<void>().is.not(ty<object>());
      ty<null>().is.not(ty<object>());
      ty<undefined>().is.not(ty<object>());
      ty<$.Value>().is.not(ty<object>());
      ty<{}>().is.not(ty<object>());
      // @ts-expect-error
      ty<object>().is.not(ty<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty<string | undefined>());
      ty<string>().is.not(ty<string | undefined>());
      ty<string | undefined>().is.not(ty<string | number | undefined>());
      ty<string>().is.not(ty<number | undefined>());
      ty<string | number>().is.not(ty<string>());
    }
  }
  //#endregion

  //#region ty.assignableTo
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<unknown>());
      ty<any>().is.not(ty.assignableTo<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableTo<unknown>());
      ty<unknown>().is.not(ty.assignableTo<never>());
      ty<unknown>().is.not(ty.assignableTo<void>());
      ty<unknown>().is.not(ty.assignableTo<null>());
      ty<unknown>().is.not(ty.assignableTo<undefined>());
      ty<unknown>().is.not(ty.assignableTo<$.Value>());
      ty<unknown>().is.not(ty.assignableTo<{}>());
      ty<unknown>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<object>());

      ty<any>().is.not(ty.assignableTo<never>());
      ty<unknown>().is.not(ty.assignableTo<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<never>());
      ty<void>().is.not(ty.assignableTo<never>());
      ty<null>().is.not(ty.assignableTo<never>());
      ty<undefined>().is.not(ty.assignableTo<never>());
      ty<$.Value>().is.not(ty.assignableTo<never>());
      ty<{}>().is.not(ty.assignableTo<never>());
      ty<object>().is.not(ty.assignableTo<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableTo<unknown>());
      ty<void>().is.not(ty.assignableTo<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableTo<void>());
      ty<void>().is.not(ty.assignableTo<null>());
      ty<void>().is.not(ty.assignableTo<undefined>());
      ty<void>().is.not(ty.assignableTo<$.Value>());
      ty<void>().is.not(ty.assignableTo<{}>());
      ty<void>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<void>());
      ty<unknown>().is.not(ty.assignableTo<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableTo<void>());
      ty<null>().is.not(ty.assignableTo<void>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<void>());
      ty<$.Value>().is.not(ty.assignableTo<void>());
      ty<{}>().is.not(ty.assignableTo<void>());
      ty<object>().is.not(ty.assignableTo<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableTo<unknown>());
      ty<null>().is.not(ty.assignableTo<never>());
      ty<null>().is.not(ty.assignableTo<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableTo<null>());
      ty<null>().is.not(ty.assignableTo<undefined>());
      ty<null>().is.not(ty.assignableTo<$.Value>());
      ty<null>().is.not(ty.assignableTo<{}>());
      ty<null>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<null>());
      ty<unknown>().is.not(ty.assignableTo<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<null>());
      ty<void>().is.not(ty.assignableTo<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableTo<null>());
      ty<undefined>().is.not(ty.assignableTo<null>());
      ty<$.Value>().is.not(ty.assignableTo<null>());
      ty<{}>().is.not(ty.assignableTo<null>());
      ty<object>().is.not(ty.assignableTo<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<unknown>());
      ty<undefined>().is.not(ty.assignableTo<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<void>());
      ty<undefined>().is.not(ty.assignableTo<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<undefined>());
      ty<undefined>().is.not(ty.assignableTo<$.Value>());
      ty<undefined>().is.not(ty.assignableTo<{}>());
      ty<undefined>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<undefined>());
      ty<unknown>().is.not(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<undefined>());
      ty<void>().is.not(ty.assignableTo<undefined>());
      ty<null>().is.not(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableTo<undefined>());
      ty<$.Value>().is.not(ty.assignableTo<undefined>());
      ty<{}>().is.not(ty.assignableTo<undefined>());
      ty<object>().is.not(ty.assignableTo<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<unknown>());
      ty<$.Value>().is.not(ty.assignableTo<never>());
      ty<$.Value>().is.not(ty.assignableTo<void>());
      ty<$.Value>().is.not(ty.assignableTo<null>());
      ty<$.Value>().is.not(ty.assignableTo<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<{}>());
      ty<$.Value>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<$.Value>());
      ty<unknown>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<$.Value>());
      ty<void>().is.not(ty.assignableTo<$.Value>());
      ty<null>().is.not(ty.assignableTo<$.Value>());
      ty<undefined>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<$.Value>());
      ty<{}>().is.not(ty.assignableTo<$.Value>());
      ty<object>().is.not(ty.assignableTo<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<unknown>());
      ty<{}>().is.not(ty.assignableTo<never>());
      ty<{}>().is.not(ty.assignableTo<void>());
      ty<{}>().is.not(ty.assignableTo<null>());
      ty<{}>().is.not(ty.assignableTo<undefined>());
      ty<{}>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<{}>());
      ty<unknown>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<{}>());
      ty<void>().is.not(ty.assignableTo<{}>());
      ty<null>().is.not(ty.assignableTo<{}>());
      ty<undefined>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<unknown>());
      ty<object>().is.not(ty.assignableTo<never>());
      ty<object>().is.not(ty.assignableTo<void>());
      ty<object>().is.not(ty.assignableTo<null>());
      ty<object>().is.not(ty.assignableTo<undefined>());
      ty<object>().is.not(ty.assignableTo<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableTo<object>());
      ty<unknown>().is.not(ty.assignableTo<object>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableTo<object>());
      ty<void>().is.not(ty.assignableTo<object>());
      ty<null>().is.not(ty.assignableTo<object>());
      ty<undefined>().is.not(ty.assignableTo<object>());
      ty<$.Value>().is.not(ty.assignableTo<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableTo<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableTo<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.assignableTo<string>());
      // @ts-expect-error
      ty<string>().is.not(ty.assignableTo<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.assignableTo<string | undefined>());
      ty<string | undefined>().is.not(
        // @ts-expect-error
        ty.assignableTo<string | number | undefined>()
      );
      ty<string>().is.not(ty.assignableTo<number | undefined>());
      ty<string | number>().is.not(ty.assignableTo<string>());
    }
  }
  //#endregion

  //#region ty.assignableFrom
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<any>());
      ty<never>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<any>());

      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<object>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<unknown>());
      ty<never>().is.not(ty.assignableFrom<unknown>());
      ty<void>().is.not(ty.assignableFrom<unknown>());
      ty<null>().is.not(ty.assignableFrom<unknown>());
      ty<undefined>().is.not(ty.assignableFrom<unknown>());
      ty<$.Value>().is.not(ty.assignableFrom<unknown>());
      ty<{}>().is.not(ty.assignableFrom<unknown>());
      ty<object>().is.not(ty.assignableFrom<unknown>());

      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<object>());
    }

    // never
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<never>());

      ty<never>().is.not(ty.assignableFrom<any>());
      ty<never>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.assignableFrom<never>());
      ty<never>().is.not(ty.assignableFrom<void>());
      ty<never>().is.not(ty.assignableFrom<null>());
      ty<never>().is.not(ty.assignableFrom<undefined>());
      ty<never>().is.not(ty.assignableFrom<$.Value>());
      ty<never>().is.not(ty.assignableFrom<{}>());
      ty<never>().is.not(ty.assignableFrom<object>());
    }

    // void
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<void>());
      ty<never>().is.not(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<void>());
      ty<null>().is.not(ty.assignableFrom<void>());
      ty<undefined>().is.not(ty.assignableFrom<void>());
      ty<$.Value>().is.not(ty.assignableFrom<void>());
      ty<{}>().is.not(ty.assignableFrom<void>());
      ty<object>().is.not(ty.assignableFrom<void>());

      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<any>());
      ty<void>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<void>());
      ty<void>().is.not(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<undefined>());
      ty<void>().is.not(ty.assignableFrom<$.Value>());
      ty<void>().is.not(ty.assignableFrom<{}>());
      ty<void>().is.not(ty.assignableFrom<object>());
    }

    // null
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<null>());
      ty<never>().is.not(ty.assignableFrom<null>());
      ty<void>().is.not(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableFrom<null>());
      ty<undefined>().is.not(ty.assignableFrom<null>());
      ty<$.Value>().is.not(ty.assignableFrom<null>());
      ty<{}>().is.not(ty.assignableFrom<null>());
      ty<object>().is.not(ty.assignableFrom<null>());

      // @ts-expect-error
      ty<null>().is.not(ty.assignableFrom<any>());
      ty<null>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableFrom<never>());
      ty<null>().is.not(ty.assignableFrom<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.assignableFrom<null>());
      ty<null>().is.not(ty.assignableFrom<undefined>());
      ty<null>().is.not(ty.assignableFrom<$.Value>());
      ty<null>().is.not(ty.assignableFrom<{}>());
      ty<null>().is.not(ty.assignableFrom<object>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<undefined>());
      ty<never>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<void>().is.not(ty.assignableFrom<undefined>());
      ty<null>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableFrom<undefined>());
      ty<$.Value>().is.not(ty.assignableFrom<undefined>());
      ty<{}>().is.not(ty.assignableFrom<undefined>());
      ty<object>().is.not(ty.assignableFrom<undefined>());

      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableFrom<any>());
      ty<undefined>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableFrom<never>());
      ty<undefined>().is.not(ty.assignableFrom<void>());
      ty<undefined>().is.not(ty.assignableFrom<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.assignableFrom<undefined>());
      ty<undefined>().is.not(ty.assignableFrom<$.Value>());
      ty<undefined>().is.not(ty.assignableFrom<{}>());
      ty<undefined>().is.not(ty.assignableFrom<object>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<$.Value>());
      ty<never>().is.not(ty.assignableFrom<$.Value>());
      ty<void>().is.not(ty.assignableFrom<$.Value>());
      ty<null>().is.not(ty.assignableFrom<$.Value>());
      ty<undefined>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<$.Value>());
      ty<object>().is.not(ty.assignableFrom<$.Value>());

      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableFrom<any>());
      ty<$.Value>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableFrom<never>());
      ty<$.Value>().is.not(ty.assignableFrom<void>());
      ty<$.Value>().is.not(ty.assignableFrom<null>());
      ty<$.Value>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.assignableFrom<$.Value>());
      ty<$.Value>().is.not(ty.assignableFrom<{}>());
      ty<$.Value>().is.not(ty.assignableFrom<object>());
    }

    // {}
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<{}>());
      ty<never>().is.not(ty.assignableFrom<{}>());
      ty<void>().is.not(ty.assignableFrom<{}>());
      ty<null>().is.not(ty.assignableFrom<{}>());
      ty<undefined>().is.not(ty.assignableFrom<{}>());
      ty<$.Value>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<{}>());

      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<any>());
      ty<{}>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<never>());
      ty<{}>().is.not(ty.assignableFrom<void>());
      ty<{}>().is.not(ty.assignableFrom<null>());
      ty<{}>().is.not(ty.assignableFrom<undefined>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<object>());
    }

    // object
    {
      // @ts-expect-error
      ty<any>().is.not(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.assignableFrom<object>());
      ty<never>().is.not(ty.assignableFrom<object>());
      ty<void>().is.not(ty.assignableFrom<object>());
      ty<null>().is.not(ty.assignableFrom<object>());
      ty<undefined>().is.not(ty.assignableFrom<object>());
      ty<$.Value>().is.not(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.assignableFrom<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<object>());

      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<any>());
      ty<object>().is.not(ty.assignableFrom<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<never>());
      ty<object>().is.not(ty.assignableFrom<void>());
      ty<object>().is.not(ty.assignableFrom<null>());
      ty<object>().is.not(ty.assignableFrom<undefined>());
      ty<object>().is.not(ty.assignableFrom<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.assignableFrom<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.assignableFrom<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.assignableFrom<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.assignableFrom<string | undefined>());
      ty<string | number | undefined>().is.not(
        // @ts-expect-error
        ty.assignableFrom<string | undefined>()
      );
      ty<number | undefined>().is.not(ty.assignableFrom<string>());
      ty<string>().is.not(ty.assignableFrom<string | number>());
    }
  }
  //#endregion

  //#region ty.subtypeOf
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.subtypeOf<unknown>());
      ty<unknown>().is.not(ty.subtypeOf<never>());
      ty<unknown>().is.not(ty.subtypeOf<void>());
      ty<unknown>().is.not(ty.subtypeOf<null>());
      ty<unknown>().is.not(ty.subtypeOf<undefined>());
      ty<unknown>().is.not(ty.subtypeOf<$.Value>());
      ty<unknown>().is.not(ty.subtypeOf<{}>());
      ty<unknown>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<never>());
      ty<unknown>().is.not(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<never>());
      ty<void>().is.not(ty.subtypeOf<never>());
      ty<null>().is.not(ty.subtypeOf<never>());
      ty<undefined>().is.not(ty.subtypeOf<never>());
      ty<$.Value>().is.not(ty.subtypeOf<never>());
      ty<{}>().is.not(ty.subtypeOf<never>());
      ty<object>().is.not(ty.subtypeOf<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.subtypeOf<unknown>());
      ty<void>().is.not(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.subtypeOf<void>());
      ty<void>().is.not(ty.subtypeOf<null>());
      ty<void>().is.not(ty.subtypeOf<undefined>());
      ty<void>().is.not(ty.subtypeOf<$.Value>());
      ty<void>().is.not(ty.subtypeOf<{}>());
      ty<void>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<void>());
      ty<unknown>().is.not(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.subtypeOf<void>());
      ty<null>().is.not(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<void>());
      ty<$.Value>().is.not(ty.subtypeOf<void>());
      ty<{}>().is.not(ty.subtypeOf<void>());
      ty<object>().is.not(ty.subtypeOf<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.subtypeOf<unknown>());
      ty<null>().is.not(ty.subtypeOf<never>());
      ty<null>().is.not(ty.subtypeOf<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.subtypeOf<null>());
      ty<null>().is.not(ty.subtypeOf<undefined>());
      ty<null>().is.not(ty.subtypeOf<$.Value>());
      ty<null>().is.not(ty.subtypeOf<{}>());
      ty<null>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<null>());
      ty<unknown>().is.not(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<null>());
      ty<void>().is.not(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.subtypeOf<null>());
      ty<undefined>().is.not(ty.subtypeOf<null>());
      ty<$.Value>().is.not(ty.subtypeOf<null>());
      ty<{}>().is.not(ty.subtypeOf<null>());
      ty<object>().is.not(ty.subtypeOf<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<unknown>());
      ty<undefined>().is.not(ty.subtypeOf<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<void>());
      ty<undefined>().is.not(ty.subtypeOf<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<undefined>());
      ty<undefined>().is.not(ty.subtypeOf<$.Value>());
      ty<undefined>().is.not(ty.subtypeOf<{}>());
      ty<undefined>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<undefined>());
      ty<unknown>().is.not(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<undefined>());
      ty<void>().is.not(ty.subtypeOf<undefined>());
      ty<null>().is.not(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.subtypeOf<undefined>());
      ty<$.Value>().is.not(ty.subtypeOf<undefined>());
      ty<{}>().is.not(ty.subtypeOf<undefined>());
      ty<object>().is.not(ty.subtypeOf<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<unknown>());
      ty<$.Value>().is.not(ty.subtypeOf<never>());
      ty<$.Value>().is.not(ty.subtypeOf<void>());
      ty<$.Value>().is.not(ty.subtypeOf<null>());
      ty<$.Value>().is.not(ty.subtypeOf<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<{}>());
      ty<$.Value>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<$.Value>());
      ty<unknown>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<$.Value>());
      ty<void>().is.not(ty.subtypeOf<$.Value>());
      ty<null>().is.not(ty.subtypeOf<$.Value>());
      ty<undefined>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<$.Value>());
      ty<{}>().is.not(ty.subtypeOf<$.Value>());
      ty<object>().is.not(ty.subtypeOf<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<unknown>());
      ty<{}>().is.not(ty.subtypeOf<never>());
      ty<{}>().is.not(ty.subtypeOf<void>());
      ty<{}>().is.not(ty.subtypeOf<null>());
      ty<{}>().is.not(ty.subtypeOf<undefined>());
      ty<{}>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<{}>());
      ty<unknown>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<{}>());
      ty<void>().is.not(ty.subtypeOf<{}>());
      ty<null>().is.not(ty.subtypeOf<{}>());
      ty<undefined>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<unknown>());
      ty<object>().is.not(ty.subtypeOf<never>());
      ty<object>().is.not(ty.subtypeOf<void>());
      ty<object>().is.not(ty.subtypeOf<null>());
      ty<object>().is.not(ty.subtypeOf<undefined>());
      ty<object>().is.not(ty.subtypeOf<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.subtypeOf<object>());
      ty<unknown>().is.not(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<never>().is.not(ty.subtypeOf<object>());
      ty<void>().is.not(ty.subtypeOf<object>());
      ty<null>().is.not(ty.subtypeOf<object>());
      ty<undefined>().is.not(ty.subtypeOf<object>());
      ty<$.Value>().is.not(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.subtypeOf<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.subtypeOf<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.subtypeOf<string>());
      // @ts-expect-error
      ty<string>().is.not(ty.subtypeOf<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.subtypeOf<string | undefined>());
      ty<string | undefined>().is.not(
        // @ts-expect-error
        ty.subtypeOf<string | number | undefined>()
      );
      ty<string>().is.not(ty.subtypeOf<number | undefined>());
      ty<string | number>().is.not(ty.subtypeOf<string>());
    }
  }
  //#endregion

  //#region ty.supertypeOf
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<any>());

      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<object>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<unknown>());
      ty<never>().is.not(ty.supertypeOf<unknown>());
      ty<void>().is.not(ty.supertypeOf<unknown>());
      ty<null>().is.not(ty.supertypeOf<unknown>());
      ty<undefined>().is.not(ty.supertypeOf<unknown>());
      ty<$.Value>().is.not(ty.supertypeOf<unknown>());
      ty<{}>().is.not(ty.supertypeOf<unknown>());
      ty<object>().is.not(ty.supertypeOf<unknown>());

      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<object>());
    }

    // never
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<null>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<never>());

      // @ts-expect-error
      ty<never>().is.not(ty.supertypeOf<any>());
      ty<never>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.supertypeOf<never>());
      ty<never>().is.not(ty.supertypeOf<void>());
      ty<never>().is.not(ty.supertypeOf<null>());
      ty<never>().is.not(ty.supertypeOf<undefined>());
      ty<never>().is.not(ty.supertypeOf<$.Value>());
      ty<never>().is.not(ty.supertypeOf<{}>());
      ty<never>().is.not(ty.supertypeOf<object>());
    }

    // void
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<void>());
      ty<never>().is.not(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<void>());
      ty<null>().is.not(ty.supertypeOf<void>());
      ty<undefined>().is.not(ty.supertypeOf<void>());
      ty<$.Value>().is.not(ty.supertypeOf<void>());
      ty<{}>().is.not(ty.supertypeOf<void>());
      ty<object>().is.not(ty.supertypeOf<void>());

      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<any>());
      ty<void>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<void>());
      ty<void>().is.not(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<undefined>());
      ty<void>().is.not(ty.supertypeOf<$.Value>());
      ty<void>().is.not(ty.supertypeOf<{}>());
      ty<void>().is.not(ty.supertypeOf<object>());
    }

    // null
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<null>());
      ty<never>().is.not(ty.supertypeOf<null>());
      ty<void>().is.not(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.supertypeOf<null>());
      ty<undefined>().is.not(ty.supertypeOf<null>());
      ty<$.Value>().is.not(ty.supertypeOf<null>());
      ty<{}>().is.not(ty.supertypeOf<null>());
      ty<object>().is.not(ty.supertypeOf<null>());

      // @ts-expect-error
      ty<null>().is.not(ty.supertypeOf<any>());
      ty<null>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.supertypeOf<never>());
      ty<null>().is.not(ty.supertypeOf<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.supertypeOf<null>());
      ty<null>().is.not(ty.supertypeOf<undefined>());
      ty<null>().is.not(ty.supertypeOf<$.Value>());
      ty<null>().is.not(ty.supertypeOf<{}>());
      ty<null>().is.not(ty.supertypeOf<object>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<undefined>());
      ty<never>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<void>().is.not(ty.supertypeOf<undefined>());
      ty<null>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.supertypeOf<undefined>());
      ty<$.Value>().is.not(ty.supertypeOf<undefined>());
      ty<{}>().is.not(ty.supertypeOf<undefined>());
      ty<object>().is.not(ty.supertypeOf<undefined>());

      // @ts-expect-error
      ty<undefined>().is.not(ty.supertypeOf<any>());
      ty<undefined>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.supertypeOf<never>());
      ty<undefined>().is.not(ty.supertypeOf<void>());
      ty<undefined>().is.not(ty.supertypeOf<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.supertypeOf<undefined>());
      ty<undefined>().is.not(ty.supertypeOf<$.Value>());
      ty<undefined>().is.not(ty.supertypeOf<{}>());
      ty<undefined>().is.not(ty.supertypeOf<object>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<$.Value>());
      ty<never>().is.not(ty.supertypeOf<$.Value>());
      ty<void>().is.not(ty.supertypeOf<$.Value>());
      ty<null>().is.not(ty.supertypeOf<$.Value>());
      ty<undefined>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<$.Value>());
      ty<object>().is.not(ty.supertypeOf<$.Value>());

      // @ts-expect-error
      ty<$.Value>().is.not(ty.supertypeOf<any>());
      ty<$.Value>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.supertypeOf<never>());
      ty<$.Value>().is.not(ty.supertypeOf<void>());
      ty<$.Value>().is.not(ty.supertypeOf<null>());
      ty<$.Value>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.supertypeOf<$.Value>());
      ty<$.Value>().is.not(ty.supertypeOf<{}>());
      ty<$.Value>().is.not(ty.supertypeOf<object>());
    }

    // {}
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<{}>());
      ty<never>().is.not(ty.supertypeOf<{}>());
      ty<void>().is.not(ty.supertypeOf<{}>());
      ty<null>().is.not(ty.supertypeOf<{}>());
      ty<undefined>().is.not(ty.supertypeOf<{}>());
      ty<$.Value>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<{}>());

      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<any>());
      ty<{}>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<never>());
      ty<{}>().is.not(ty.supertypeOf<void>());
      ty<{}>().is.not(ty.supertypeOf<null>());
      ty<{}>().is.not(ty.supertypeOf<undefined>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<object>());
    }

    // object
    {
      // @ts-expect-error
      ty<any>().is.not(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.supertypeOf<object>());
      ty<never>().is.not(ty.supertypeOf<object>());
      ty<void>().is.not(ty.supertypeOf<object>());
      ty<null>().is.not(ty.supertypeOf<object>());
      ty<undefined>().is.not(ty.supertypeOf<object>());
      ty<$.Value>().is.not(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.supertypeOf<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<object>());

      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<any>());
      ty<object>().is.not(ty.supertypeOf<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<never>());
      ty<object>().is.not(ty.supertypeOf<void>());
      ty<object>().is.not(ty.supertypeOf<null>());
      ty<object>().is.not(ty.supertypeOf<undefined>());
      ty<object>().is.not(ty.supertypeOf<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.supertypeOf<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.supertypeOf<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.supertypeOf<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.supertypeOf<string | undefined>());
      ty<string | number | undefined>().is.not(
        // @ts-expect-error
        ty.supertypeOf<string | undefined>()
      );
      ty<number | undefined>().is.not(ty.supertypeOf<string>());
      ty<string>().is.not(ty.supertypeOf<string | number>());
    }
  }
  //#endregion

  //#region ty#is.not.undefined
  {
    // Basics
    {
      ty<any>().is.not.undefined();
      ty<unknown>().is.not.undefined();
      ty<never>().is.not.undefined();
      ty<void>().is.not.undefined();
      ty<null>().is.not.undefined();
      // @ts-expect-error
      ty<undefined>().is.not.undefined();
      ty<$.Value>().is.not.undefined();
      ty<{}>().is.not.undefined();
      ty<object>().is.not.undefined();
    }

    // Union
    {
      ty<any | undefined>().is.not.undefined();
      ty<string | undefined>().is.not.undefined();
    }
  }
  //#endregion
}
//#endregion

//#region ty.assignableTo
{
  // Variance
  {
    let variance = ty.assignableTo<string>();
    variance = ty.assignableTo({} as string);
  }
}
//#endregion

//#region ty.assignableFrom
{
  // Variance
  {
    let variance = ty.assignableFrom<string>();
    variance = ty.assignableFrom({} as string);
  }
}
//#endregion

//#region ty.subtypeOf
{
  // Variance
  {
    let variance = ty.subtypeOf<string>();
    variance = ty.subtypeOf({} as string);
  }
}
//#endregion

//#region ty.supertypeOf
{
  // Variance
  {
    let variance = ty.supertypeOf<string>();
    variance = ty.supertypeOf({} as string);
  }
}
//#endregion

//#region ty.as
{
  const null_ = ty.as<null>();

  ty(null_).is(ty.assignableTo<any>());
  ty(null_).is(ty.assignableTo<unknown>());
  // @ts-expect-error
  ty(null_).is(ty.assignableTo<never>());
  // @ts-expect-error
  ty(null_).is(ty.assignableTo<void>());
  ty(null_).is(ty.assignableTo<null>());
  // @ts-expect-error
  ty(null_).is(ty.assignableTo<undefined>());
  // @ts-expect-error
  ty(null_).is(ty.assignableTo<$.Value>());
  // @ts-expect-error
  ty(null_).is(ty.assignableTo<{}>());
  // @ts-expect-error
  ty(null_).is(ty.assignableTo<object>());
}
//#endregion
