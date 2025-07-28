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
      ty<string>().is(ty.satisfies<string>());
      ty<string>().is(ty.satisfies<string | undefined>());
      ty<string | undefined>().is(ty.satisfies<string | undefined>());
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
    }

    // Union
    {
      ty<string>().is(ty.satisfiedBy<string>());
      ty<string | undefined>().is(ty.satisfiedBy<string>());
      ty<string | undefined>().is(ty.satisfiedBy<string | undefined>());
      ty<string | number | undefined>().is(
        ty.satisfiedBy<string | undefined>()
      );
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
      ty<string>().is(ty.extends<string>());
      ty<string>().is(ty.extends<string | undefined>());
      ty<string | undefined>().is(ty.extends<string | undefined>());
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
    }

    // Union
    {
      ty<string>().is(ty.extendedBy<string>());
      ty<string | undefined>().is(ty.extendedBy<string>());
      ty<string | undefined>().is(ty.extendedBy<string | undefined>());
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

  //#region ty.satisfies
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<unknown>());
      ty<any>().is.not(ty.satisfies<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfies<unknown>());
      ty<unknown>().is.not(ty.satisfies<never>());
      ty<unknown>().is.not(ty.satisfies<void>());
      ty<unknown>().is.not(ty.satisfies<null>());
      ty<unknown>().is.not(ty.satisfies<undefined>());
      ty<unknown>().is.not(ty.satisfies<$.Value>());
      ty<unknown>().is.not(ty.satisfies<{}>());
      ty<unknown>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<object>());

      ty<any>().is.not(ty.satisfies<never>());
      ty<unknown>().is.not(ty.satisfies<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<never>());
      ty<void>().is.not(ty.satisfies<never>());
      ty<null>().is.not(ty.satisfies<never>());
      ty<undefined>().is.not(ty.satisfies<never>());
      ty<$.Value>().is.not(ty.satisfies<never>());
      ty<{}>().is.not(ty.satisfies<never>());
      ty<object>().is.not(ty.satisfies<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfies<unknown>());
      ty<void>().is.not(ty.satisfies<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfies<void>());
      ty<void>().is.not(ty.satisfies<null>());
      ty<void>().is.not(ty.satisfies<undefined>());
      ty<void>().is.not(ty.satisfies<$.Value>());
      ty<void>().is.not(ty.satisfies<{}>());
      ty<void>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<void>());
      ty<unknown>().is.not(ty.satisfies<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfies<void>());
      ty<null>().is.not(ty.satisfies<void>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<void>());
      ty<$.Value>().is.not(ty.satisfies<void>());
      ty<{}>().is.not(ty.satisfies<void>());
      ty<object>().is.not(ty.satisfies<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfies<unknown>());
      ty<null>().is.not(ty.satisfies<never>());
      ty<null>().is.not(ty.satisfies<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfies<null>());
      ty<null>().is.not(ty.satisfies<undefined>());
      ty<null>().is.not(ty.satisfies<$.Value>());
      ty<null>().is.not(ty.satisfies<{}>());
      ty<null>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<null>());
      ty<unknown>().is.not(ty.satisfies<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<null>());
      ty<void>().is.not(ty.satisfies<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfies<null>());
      ty<undefined>().is.not(ty.satisfies<null>());
      ty<$.Value>().is.not(ty.satisfies<null>());
      ty<{}>().is.not(ty.satisfies<null>());
      ty<object>().is.not(ty.satisfies<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<unknown>());
      ty<undefined>().is.not(ty.satisfies<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<void>());
      ty<undefined>().is.not(ty.satisfies<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<undefined>());
      ty<undefined>().is.not(ty.satisfies<$.Value>());
      ty<undefined>().is.not(ty.satisfies<{}>());
      ty<undefined>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<undefined>());
      ty<unknown>().is.not(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<undefined>());
      ty<void>().is.not(ty.satisfies<undefined>());
      ty<null>().is.not(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfies<undefined>());
      ty<$.Value>().is.not(ty.satisfies<undefined>());
      ty<{}>().is.not(ty.satisfies<undefined>());
      ty<object>().is.not(ty.satisfies<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<unknown>());
      ty<$.Value>().is.not(ty.satisfies<never>());
      ty<$.Value>().is.not(ty.satisfies<void>());
      ty<$.Value>().is.not(ty.satisfies<null>());
      ty<$.Value>().is.not(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<{}>());
      ty<$.Value>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<$.Value>());
      ty<unknown>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<$.Value>());
      ty<void>().is.not(ty.satisfies<$.Value>());
      ty<null>().is.not(ty.satisfies<$.Value>());
      ty<undefined>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<$.Value>());
      ty<{}>().is.not(ty.satisfies<$.Value>());
      ty<object>().is.not(ty.satisfies<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<unknown>());
      ty<{}>().is.not(ty.satisfies<never>());
      ty<{}>().is.not(ty.satisfies<void>());
      ty<{}>().is.not(ty.satisfies<null>());
      ty<{}>().is.not(ty.satisfies<undefined>());
      ty<{}>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<{}>());
      ty<unknown>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<{}>());
      ty<void>().is.not(ty.satisfies<{}>());
      ty<null>().is.not(ty.satisfies<{}>());
      ty<undefined>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<unknown>());
      ty<object>().is.not(ty.satisfies<never>());
      ty<object>().is.not(ty.satisfies<void>());
      ty<object>().is.not(ty.satisfies<null>());
      ty<object>().is.not(ty.satisfies<undefined>());
      ty<object>().is.not(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfies<object>());
      ty<unknown>().is.not(ty.satisfies<object>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfies<object>());
      ty<void>().is.not(ty.satisfies<object>());
      ty<null>().is.not(ty.satisfies<object>());
      ty<undefined>().is.not(ty.satisfies<object>());
      ty<$.Value>().is.not(ty.satisfies<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfies<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfies<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.satisfies<string>());
      // @ts-expect-error
      ty<string>().is.not(ty.satisfies<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.satisfies<string | undefined>());
      ty<string | undefined>().is.not(
        // @ts-expect-error
        ty.satisfies<string | number | undefined>()
      );
      ty<string>().is.not(ty.satisfies<number | undefined>());
      ty<string | number>().is.not(ty.satisfies<string>());
    }
  }
  //#endregion

  //#region ty.satisfiedBy
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<any>());
      ty<never>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<any>());

      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<object>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<unknown>());
      ty<never>().is.not(ty.satisfiedBy<unknown>());
      ty<void>().is.not(ty.satisfiedBy<unknown>());
      ty<null>().is.not(ty.satisfiedBy<unknown>());
      ty<undefined>().is.not(ty.satisfiedBy<unknown>());
      ty<$.Value>().is.not(ty.satisfiedBy<unknown>());
      ty<{}>().is.not(ty.satisfiedBy<unknown>());
      ty<object>().is.not(ty.satisfiedBy<unknown>());

      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<object>());
    }

    // never
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<never>());

      ty<never>().is.not(ty.satisfiedBy<any>());
      ty<never>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.satisfiedBy<never>());
      ty<never>().is.not(ty.satisfiedBy<void>());
      ty<never>().is.not(ty.satisfiedBy<null>());
      ty<never>().is.not(ty.satisfiedBy<undefined>());
      ty<never>().is.not(ty.satisfiedBy<$.Value>());
      ty<never>().is.not(ty.satisfiedBy<{}>());
      ty<never>().is.not(ty.satisfiedBy<object>());
    }

    // void
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<void>());
      ty<never>().is.not(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<void>());
      ty<null>().is.not(ty.satisfiedBy<void>());
      ty<undefined>().is.not(ty.satisfiedBy<void>());
      ty<$.Value>().is.not(ty.satisfiedBy<void>());
      ty<{}>().is.not(ty.satisfiedBy<void>());
      ty<object>().is.not(ty.satisfiedBy<void>());

      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<any>());
      ty<void>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<void>());
      ty<void>().is.not(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<undefined>());
      ty<void>().is.not(ty.satisfiedBy<$.Value>());
      ty<void>().is.not(ty.satisfiedBy<{}>());
      ty<void>().is.not(ty.satisfiedBy<object>());
    }

    // null
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<null>());
      ty<never>().is.not(ty.satisfiedBy<null>());
      ty<void>().is.not(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfiedBy<null>());
      ty<undefined>().is.not(ty.satisfiedBy<null>());
      ty<$.Value>().is.not(ty.satisfiedBy<null>());
      ty<{}>().is.not(ty.satisfiedBy<null>());
      ty<object>().is.not(ty.satisfiedBy<null>());

      // @ts-expect-error
      ty<null>().is.not(ty.satisfiedBy<any>());
      ty<null>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfiedBy<never>());
      ty<null>().is.not(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.satisfiedBy<null>());
      ty<null>().is.not(ty.satisfiedBy<undefined>());
      ty<null>().is.not(ty.satisfiedBy<$.Value>());
      ty<null>().is.not(ty.satisfiedBy<{}>());
      ty<null>().is.not(ty.satisfiedBy<object>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<undefined>());
      ty<never>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<void>().is.not(ty.satisfiedBy<undefined>());
      ty<null>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfiedBy<undefined>());
      ty<$.Value>().is.not(ty.satisfiedBy<undefined>());
      ty<{}>().is.not(ty.satisfiedBy<undefined>());
      ty<object>().is.not(ty.satisfiedBy<undefined>());

      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfiedBy<any>());
      ty<undefined>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfiedBy<never>());
      ty<undefined>().is.not(ty.satisfiedBy<void>());
      ty<undefined>().is.not(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.satisfiedBy<undefined>());
      ty<undefined>().is.not(ty.satisfiedBy<$.Value>());
      ty<undefined>().is.not(ty.satisfiedBy<{}>());
      ty<undefined>().is.not(ty.satisfiedBy<object>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<$.Value>());
      ty<never>().is.not(ty.satisfiedBy<$.Value>());
      ty<void>().is.not(ty.satisfiedBy<$.Value>());
      ty<null>().is.not(ty.satisfiedBy<$.Value>());
      ty<undefined>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<$.Value>());
      ty<object>().is.not(ty.satisfiedBy<$.Value>());

      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfiedBy<any>());
      ty<$.Value>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfiedBy<never>());
      ty<$.Value>().is.not(ty.satisfiedBy<void>());
      ty<$.Value>().is.not(ty.satisfiedBy<null>());
      ty<$.Value>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.satisfiedBy<$.Value>());
      ty<$.Value>().is.not(ty.satisfiedBy<{}>());
      ty<$.Value>().is.not(ty.satisfiedBy<object>());
    }

    // {}
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<{}>());
      ty<never>().is.not(ty.satisfiedBy<{}>());
      ty<void>().is.not(ty.satisfiedBy<{}>());
      ty<null>().is.not(ty.satisfiedBy<{}>());
      ty<undefined>().is.not(ty.satisfiedBy<{}>());
      ty<$.Value>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<{}>());

      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<any>());
      ty<{}>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<never>());
      ty<{}>().is.not(ty.satisfiedBy<void>());
      ty<{}>().is.not(ty.satisfiedBy<null>());
      ty<{}>().is.not(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<object>());
    }

    // object
    {
      // @ts-expect-error
      ty<any>().is.not(ty.satisfiedBy<object>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.satisfiedBy<object>());
      ty<never>().is.not(ty.satisfiedBy<object>());
      ty<void>().is.not(ty.satisfiedBy<object>());
      ty<null>().is.not(ty.satisfiedBy<object>());
      ty<undefined>().is.not(ty.satisfiedBy<object>());
      ty<$.Value>().is.not(ty.satisfiedBy<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.satisfiedBy<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<object>());

      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<any>());
      ty<object>().is.not(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<never>());
      ty<object>().is.not(ty.satisfiedBy<void>());
      ty<object>().is.not(ty.satisfiedBy<null>());
      ty<object>().is.not(ty.satisfiedBy<undefined>());
      ty<object>().is.not(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.satisfiedBy<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.satisfiedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.satisfiedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.satisfiedBy<string | undefined>());
      ty<string | number | undefined>().is.not(
        // @ts-expect-error
        ty.satisfiedBy<string | undefined>()
      );
      ty<number | undefined>().is.not(ty.satisfiedBy<string>());
      ty<string>().is.not(ty.satisfiedBy<string | number>());
    }
  }
  //#endregion

  //#region ty.extends
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extends<unknown>());
      ty<unknown>().is.not(ty.extends<never>());
      ty<unknown>().is.not(ty.extends<void>());
      ty<unknown>().is.not(ty.extends<null>());
      ty<unknown>().is.not(ty.extends<undefined>());
      ty<unknown>().is.not(ty.extends<$.Value>());
      ty<unknown>().is.not(ty.extends<{}>());
      ty<unknown>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<never>());
      ty<unknown>().is.not(ty.extends<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<never>());
      ty<void>().is.not(ty.extends<never>());
      ty<null>().is.not(ty.extends<never>());
      ty<undefined>().is.not(ty.extends<never>());
      ty<$.Value>().is.not(ty.extends<never>());
      ty<{}>().is.not(ty.extends<never>());
      ty<object>().is.not(ty.extends<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.extends<unknown>());
      ty<void>().is.not(ty.extends<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.extends<void>());
      ty<void>().is.not(ty.extends<null>());
      ty<void>().is.not(ty.extends<undefined>());
      ty<void>().is.not(ty.extends<$.Value>());
      ty<void>().is.not(ty.extends<{}>());
      ty<void>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<void>());
      ty<unknown>().is.not(ty.extends<void>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.extends<void>());
      ty<null>().is.not(ty.extends<void>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<void>());
      ty<$.Value>().is.not(ty.extends<void>());
      ty<{}>().is.not(ty.extends<void>());
      ty<object>().is.not(ty.extends<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.extends<unknown>());
      ty<null>().is.not(ty.extends<never>());
      ty<null>().is.not(ty.extends<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.extends<null>());
      ty<null>().is.not(ty.extends<undefined>());
      ty<null>().is.not(ty.extends<$.Value>());
      ty<null>().is.not(ty.extends<{}>());
      ty<null>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<null>());
      ty<unknown>().is.not(ty.extends<null>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<null>());
      ty<void>().is.not(ty.extends<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.extends<null>());
      ty<undefined>().is.not(ty.extends<null>());
      ty<$.Value>().is.not(ty.extends<null>());
      ty<{}>().is.not(ty.extends<null>());
      ty<object>().is.not(ty.extends<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<unknown>());
      ty<undefined>().is.not(ty.extends<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<void>());
      ty<undefined>().is.not(ty.extends<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<undefined>());
      ty<undefined>().is.not(ty.extends<$.Value>());
      ty<undefined>().is.not(ty.extends<{}>());
      ty<undefined>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<undefined>());
      ty<unknown>().is.not(ty.extends<undefined>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<undefined>());
      ty<void>().is.not(ty.extends<undefined>());
      ty<null>().is.not(ty.extends<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extends<undefined>());
      ty<$.Value>().is.not(ty.extends<undefined>());
      ty<{}>().is.not(ty.extends<undefined>());
      ty<object>().is.not(ty.extends<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<unknown>());
      ty<$.Value>().is.not(ty.extends<never>());
      ty<$.Value>().is.not(ty.extends<void>());
      ty<$.Value>().is.not(ty.extends<null>());
      ty<$.Value>().is.not(ty.extends<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<{}>());
      ty<$.Value>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<$.Value>());
      ty<unknown>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<$.Value>());
      ty<void>().is.not(ty.extends<$.Value>());
      ty<null>().is.not(ty.extends<$.Value>());
      ty<undefined>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<$.Value>());
      ty<{}>().is.not(ty.extends<$.Value>());
      ty<object>().is.not(ty.extends<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<unknown>());
      ty<{}>().is.not(ty.extends<never>());
      ty<{}>().is.not(ty.extends<void>());
      ty<{}>().is.not(ty.extends<null>());
      ty<{}>().is.not(ty.extends<undefined>());
      ty<{}>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<{}>());
      ty<unknown>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<{}>());
      ty<void>().is.not(ty.extends<{}>());
      ty<null>().is.not(ty.extends<{}>());
      ty<undefined>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().is.not(ty.extends<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<unknown>());
      ty<object>().is.not(ty.extends<never>());
      ty<object>().is.not(ty.extends<void>());
      ty<object>().is.not(ty.extends<null>());
      ty<object>().is.not(ty.extends<undefined>());
      ty<object>().is.not(ty.extends<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<object>());

      // @ts-expect-error
      ty<any>().is.not(ty.extends<object>());
      ty<unknown>().is.not(ty.extends<object>());
      // @ts-expect-error
      ty<never>().is.not(ty.extends<object>());
      ty<void>().is.not(ty.extends<object>());
      ty<null>().is.not(ty.extends<object>());
      ty<undefined>().is.not(ty.extends<object>());
      ty<$.Value>().is.not(ty.extends<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extends<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.extends<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.extends<string>());
      // @ts-expect-error
      ty<string>().is.not(ty.extends<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.extends<string | undefined>());
      ty<string | undefined>().is.not(
        // @ts-expect-error
        ty.extends<string | number | undefined>()
      );
      ty<string>().is.not(ty.extends<number | undefined>());
      ty<string | number>().is.not(ty.extends<string>());
    }
  }
  //#endregion

  //#region ty.extendedBy
  {
    // any
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<never>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<null>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<any>());

      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<void>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<null>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<object>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<unknown>());
      ty<never>().is.not(ty.extendedBy<unknown>());
      ty<void>().is.not(ty.extendedBy<unknown>());
      ty<null>().is.not(ty.extendedBy<unknown>());
      ty<undefined>().is.not(ty.extendedBy<unknown>());
      ty<$.Value>().is.not(ty.extendedBy<unknown>());
      ty<{}>().is.not(ty.extendedBy<unknown>());
      ty<object>().is.not(ty.extendedBy<unknown>());

      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<any>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<object>());
    }

    // never
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<never>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<null>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<never>());

      // @ts-expect-error
      ty<never>().is.not(ty.extendedBy<any>());
      ty<never>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<never>().is.not(ty.extendedBy<never>());
      ty<never>().is.not(ty.extendedBy<void>());
      ty<never>().is.not(ty.extendedBy<null>());
      ty<never>().is.not(ty.extendedBy<undefined>());
      ty<never>().is.not(ty.extendedBy<$.Value>());
      ty<never>().is.not(ty.extendedBy<{}>());
      ty<never>().is.not(ty.extendedBy<object>());
    }

    // void
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<void>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<void>());
      ty<never>().is.not(ty.extendedBy<void>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<void>());
      ty<null>().is.not(ty.extendedBy<void>());
      ty<undefined>().is.not(ty.extendedBy<void>());
      ty<$.Value>().is.not(ty.extendedBy<void>());
      ty<{}>().is.not(ty.extendedBy<void>());
      ty<object>().is.not(ty.extendedBy<void>());

      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<any>());
      ty<void>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<never>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<void>());
      ty<void>().is.not(ty.extendedBy<null>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<undefined>());
      ty<void>().is.not(ty.extendedBy<$.Value>());
      ty<void>().is.not(ty.extendedBy<{}>());
      ty<void>().is.not(ty.extendedBy<object>());
    }

    // null
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<null>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<null>());
      ty<never>().is.not(ty.extendedBy<null>());
      ty<void>().is.not(ty.extendedBy<null>());
      // @ts-expect-error
      ty<null>().is.not(ty.extendedBy<null>());
      ty<undefined>().is.not(ty.extendedBy<null>());
      ty<$.Value>().is.not(ty.extendedBy<null>());
      ty<{}>().is.not(ty.extendedBy<null>());
      ty<object>().is.not(ty.extendedBy<null>());

      // @ts-expect-error
      ty<null>().is.not(ty.extendedBy<any>());
      ty<null>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<null>().is.not(ty.extendedBy<never>());
      ty<null>().is.not(ty.extendedBy<void>());
      // @ts-expect-error
      ty<null>().is.not(ty.extendedBy<null>());
      ty<null>().is.not(ty.extendedBy<undefined>());
      ty<null>().is.not(ty.extendedBy<$.Value>());
      ty<null>().is.not(ty.extendedBy<{}>());
      ty<null>().is.not(ty.extendedBy<object>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<undefined>());
      ty<never>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<void>().is.not(ty.extendedBy<undefined>());
      ty<null>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extendedBy<undefined>());
      ty<$.Value>().is.not(ty.extendedBy<undefined>());
      ty<{}>().is.not(ty.extendedBy<undefined>());
      ty<object>().is.not(ty.extendedBy<undefined>());

      // @ts-expect-error
      ty<undefined>().is.not(ty.extendedBy<any>());
      ty<undefined>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extendedBy<never>());
      ty<undefined>().is.not(ty.extendedBy<void>());
      ty<undefined>().is.not(ty.extendedBy<null>());
      // @ts-expect-error
      ty<undefined>().is.not(ty.extendedBy<undefined>());
      ty<undefined>().is.not(ty.extendedBy<$.Value>());
      ty<undefined>().is.not(ty.extendedBy<{}>());
      ty<undefined>().is.not(ty.extendedBy<object>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<$.Value>());
      ty<never>().is.not(ty.extendedBy<$.Value>());
      ty<void>().is.not(ty.extendedBy<$.Value>());
      ty<null>().is.not(ty.extendedBy<$.Value>());
      ty<undefined>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<$.Value>());
      ty<object>().is.not(ty.extendedBy<$.Value>());

      // @ts-expect-error
      ty<$.Value>().is.not(ty.extendedBy<any>());
      ty<$.Value>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extendedBy<never>());
      ty<$.Value>().is.not(ty.extendedBy<void>());
      ty<$.Value>().is.not(ty.extendedBy<null>());
      ty<$.Value>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<$.Value>().is.not(ty.extendedBy<$.Value>());
      ty<$.Value>().is.not(ty.extendedBy<{}>());
      ty<$.Value>().is.not(ty.extendedBy<object>());
    }

    // {}
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<{}>());
      ty<never>().is.not(ty.extendedBy<{}>());
      ty<void>().is.not(ty.extendedBy<{}>());
      ty<null>().is.not(ty.extendedBy<{}>());
      ty<undefined>().is.not(ty.extendedBy<{}>());
      ty<$.Value>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<{}>());

      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<any>());
      ty<{}>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<never>());
      ty<{}>().is.not(ty.extendedBy<void>());
      ty<{}>().is.not(ty.extendedBy<null>());
      ty<{}>().is.not(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<object>());
    }

    // object
    {
      // @ts-expect-error
      ty<any>().is.not(ty.extendedBy<object>());
      // @ts-expect-error
      ty<unknown>().is.not(ty.extendedBy<object>());
      ty<never>().is.not(ty.extendedBy<object>());
      ty<void>().is.not(ty.extendedBy<object>());
      ty<null>().is.not(ty.extendedBy<object>());
      ty<undefined>().is.not(ty.extendedBy<object>());
      ty<$.Value>().is.not(ty.extendedBy<object>());
      // @ts-expect-error
      ty<{}>().is.not(ty.extendedBy<object>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<object>());

      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<any>());
      ty<object>().is.not(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<never>());
      ty<object>().is.not(ty.extendedBy<void>());
      ty<object>().is.not(ty.extendedBy<null>());
      ty<object>().is.not(ty.extendedBy<undefined>());
      ty<object>().is.not(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<object>().is.not(ty.extendedBy<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().is.not(ty.extendedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.extendedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().is.not(ty.extendedBy<string | undefined>());
      ty<string | number | undefined>().is.not(
        // @ts-expect-error
        ty.extendedBy<string | undefined>()
      );
      ty<number | undefined>().is.not(ty.extendedBy<string>());
      ty<string>().is.not(ty.extendedBy<string | number>());
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

//#region ty.satisfies
{
  // Variance
  {
    let variance = ty.satisfies<string>();
    variance = ty.satisfies({} as string);
  }
}
//#endregion

//#region ty.satisfiedBy
{
  // Variance
  {
    let variance = ty.satisfiedBy<string>();
    variance = ty.satisfiedBy({} as string);
  }
}
//#endregion

//#region ty.extends
{
  // Variance
  {
    let variance = ty.extends<string>();
    variance = ty.extends({} as string);
  }
}
//#endregion

//#region ty.extendedBy
{
  // Variance
  {
    let variance = ty.extendedBy<string>();
    variance = ty.extendedBy({} as string);
  }
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
