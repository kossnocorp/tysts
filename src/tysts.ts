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

//#region ty.isnt
{
  //#region ty
  {
    // any
    {
      // @ts-expect-error
      ty<any>().isnt(ty<any>());
      ty<any>().isnt(ty<unknown>());
      ty<any>().isnt(ty<never>());
      ty<any>().isnt(ty<void>());
      ty<any>().isnt(ty<null>());
      ty<any>().isnt(ty<undefined>());
      ty<any>().isnt(ty<$.Value>());
      ty<any>().isnt(ty<{}>());
      ty<any>().isnt(ty<object>());

      // @ts-expect-error
      ty<any>().isnt(ty<any>());
      ty<unknown>().isnt(ty<any>());
      ty<never>().isnt(ty<any>());
      ty<void>().isnt(ty<any>());
      ty<null>().isnt(ty<any>());
      ty<undefined>().isnt(ty<any>());
      ty<$.Value>().isnt(ty<any>());
      ty<{}>().isnt(ty<any>());
      ty<object>().isnt(ty<any>());
    }

    // unknown
    {
      ty<unknown>().isnt(ty<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty<unknown>());
      ty<unknown>().isnt(ty<never>());
      ty<unknown>().isnt(ty<void>());
      ty<unknown>().isnt(ty<null>());
      ty<unknown>().isnt(ty<undefined>());
      ty<unknown>().isnt(ty<$.Value>());
      ty<unknown>().isnt(ty<{}>());
      ty<unknown>().isnt(ty<object>());

      ty<any>().isnt(ty<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty<unknown>());
      ty<never>().isnt(ty<unknown>());
      ty<void>().isnt(ty<unknown>());
      ty<null>().isnt(ty<unknown>());
      ty<undefined>().isnt(ty<unknown>());
      ty<$.Value>().isnt(ty<unknown>());
      ty<{}>().isnt(ty<unknown>());
      ty<object>().isnt(ty<unknown>());
    }

    // never
    {
      ty<never>().isnt(ty<any>());
      ty<never>().isnt(ty<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty<never>());
      ty<never>().isnt(ty<void>());
      ty<never>().isnt(ty<null>());
      ty<never>().isnt(ty<undefined>());
      ty<never>().isnt(ty<$.Value>());
      ty<never>().isnt(ty<{}>());
      ty<never>().isnt(ty<object>());

      ty<any>().isnt(ty<never>());
      ty<unknown>().isnt(ty<never>());
      // @ts-expect-error
      ty<never>().isnt(ty<never>());
      ty<void>().isnt(ty<never>());
      ty<null>().isnt(ty<never>());
      ty<undefined>().isnt(ty<never>());
      ty<$.Value>().isnt(ty<never>());
      ty<{}>().isnt(ty<never>());
      ty<object>().isnt(ty<never>());
    }

    // void
    {
      ty<void>().isnt(ty<any>());
      ty<void>().isnt(ty<unknown>());
      ty<void>().isnt(ty<never>());
      // @ts-expect-error
      ty<void>().isnt(ty<void>());
      ty<void>().isnt(ty<null>());
      ty<void>().isnt(ty<undefined>());
      ty<void>().isnt(ty<$.Value>());
      ty<void>().isnt(ty<{}>());
      ty<void>().isnt(ty<object>());

      ty<any>().isnt(ty<void>());
      ty<unknown>().isnt(ty<void>());
      ty<never>().isnt(ty<void>());
      // @ts-expect-error
      ty<void>().isnt(ty<void>());
      ty<null>().isnt(ty<void>());
      ty<undefined>().isnt(ty<void>());
      ty<$.Value>().isnt(ty<void>());
      ty<{}>().isnt(ty<void>());
      ty<object>().isnt(ty<void>());
    }

    // null
    {
      ty<null>().isnt(ty<any>());
      ty<null>().isnt(ty<unknown>());
      ty<null>().isnt(ty<never>());
      ty<null>().isnt(ty<void>());
      // @ts-expect-error
      ty<null>().isnt(ty<null>());
      ty<null>().isnt(ty<undefined>());
      ty<null>().isnt(ty<$.Value>());
      ty<null>().isnt(ty<{}>());
      ty<null>().isnt(ty<object>());

      ty<any>().isnt(ty<null>());
      ty<unknown>().isnt(ty<null>());
      ty<never>().isnt(ty<null>());
      ty<void>().isnt(ty<null>());
      // @ts-expect-error
      ty<null>().isnt(ty<null>());
      ty<undefined>().isnt(ty<null>());
      ty<$.Value>().isnt(ty<null>());
      ty<{}>().isnt(ty<null>());
      ty<object>().isnt(ty<null>());
    }

    // undefined
    {
      ty<undefined>().isnt(ty<any>());
      ty<undefined>().isnt(ty<unknown>());
      ty<undefined>().isnt(ty<never>());
      ty<undefined>().isnt(ty<void>());
      ty<undefined>().isnt(ty<null>());
      // @ts-expect-error
      ty<undefined>().isnt(ty<undefined>());
      ty<undefined>().isnt(ty<$.Value>());
      ty<undefined>().isnt(ty<{}>());
      ty<undefined>().isnt(ty<object>());

      ty<any>().isnt(ty<undefined>());
      ty<unknown>().isnt(ty<undefined>());
      ty<never>().isnt(ty<undefined>());
      ty<void>().isnt(ty<undefined>());
      ty<null>().isnt(ty<undefined>());
      // @ts-expect-error
      ty<undefined>().isnt(ty<undefined>());
      ty<$.Value>().isnt(ty<undefined>());
      ty<{}>().isnt(ty<undefined>());
      ty<object>().isnt(ty<undefined>());
    }

    // Non-nullable primitives
    {
      ty<$.Value>().isnt(ty<any>());
      ty<$.Value>().isnt(ty<unknown>());
      ty<$.Value>().isnt(ty<never>());
      ty<$.Value>().isnt(ty<void>());
      ty<$.Value>().isnt(ty<null>());
      ty<$.Value>().isnt(ty<undefined>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty<$.Value>());
      ty<$.Value>().isnt(ty<{}>());
      ty<$.Value>().isnt(ty<object>());

      ty<any>().isnt(ty<$.Value>());
      ty<unknown>().isnt(ty<$.Value>());
      ty<never>().isnt(ty<$.Value>());
      ty<void>().isnt(ty<$.Value>());
      ty<null>().isnt(ty<$.Value>());
      ty<undefined>().isnt(ty<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty<$.Value>());
      ty<{}>().isnt(ty<$.Value>());
      ty<object>().isnt(ty<$.Value>());
    }

    // {}
    {
      ty<{}>().isnt(ty<any>());
      ty<{}>().isnt(ty<unknown>());
      ty<{}>().isnt(ty<never>());
      ty<{}>().isnt(ty<void>());
      ty<{}>().isnt(ty<null>());
      ty<{}>().isnt(ty<undefined>());
      ty<{}>().isnt(ty<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty<{}>());
      ty<{}>().isnt(ty<object>());

      ty<any>().isnt(ty<{}>());
      ty<unknown>().isnt(ty<{}>());
      ty<never>().isnt(ty<{}>());
      ty<void>().isnt(ty<{}>());
      ty<null>().isnt(ty<{}>());
      ty<undefined>().isnt(ty<{}>());
      ty<$.Value>().isnt(ty<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty<{}>());
      ty<object>().isnt(ty<{}>());
    }

    // object
    {
      ty<object>().isnt(ty<any>());
      ty<object>().isnt(ty<unknown>());
      ty<object>().isnt(ty<never>());
      ty<object>().isnt(ty<void>());
      ty<object>().isnt(ty<null>());
      ty<object>().isnt(ty<undefined>());
      ty<object>().isnt(ty<$.Value>());
      ty<object>().isnt(ty<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty<object>());

      ty<any>().isnt(ty<object>());
      ty<unknown>().isnt(ty<object>());
      ty<never>().isnt(ty<object>());
      ty<void>().isnt(ty<object>());
      ty<null>().isnt(ty<object>());
      ty<undefined>().isnt(ty<object>());
      ty<$.Value>().isnt(ty<object>());
      ty<{}>().isnt(ty<object>());
      // @ts-expect-error
      ty<object>().isnt(ty<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().isnt(ty<string>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty<string | undefined>());
      ty<string>().isnt(ty<string | undefined>());
      ty<string | undefined>().isnt(ty<string | number | undefined>());
      ty<string>().isnt(ty<number | undefined>());
      ty<string | number>().isnt(ty<string>());
    }
  }
  //#endregion

  //#region ty.satisfies
  {
    // any
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<unknown>());
      ty<any>().isnt(ty.satisfies<never>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<void>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<null>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfies<unknown>());
      ty<unknown>().isnt(ty.satisfies<never>());
      ty<unknown>().isnt(ty.satisfies<void>());
      ty<unknown>().isnt(ty.satisfies<null>());
      ty<unknown>().isnt(ty.satisfies<undefined>());
      ty<unknown>().isnt(ty.satisfies<$.Value>());
      ty<unknown>().isnt(ty.satisfies<{}>());
      ty<unknown>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<never>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<void>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<null>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<object>());

      ty<any>().isnt(ty.satisfies<never>());
      ty<unknown>().isnt(ty.satisfies<never>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<never>());
      ty<void>().isnt(ty.satisfies<never>());
      ty<null>().isnt(ty.satisfies<never>());
      ty<undefined>().isnt(ty.satisfies<never>());
      ty<$.Value>().isnt(ty.satisfies<never>());
      ty<{}>().isnt(ty.satisfies<never>());
      ty<object>().isnt(ty.satisfies<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfies<unknown>());
      ty<void>().isnt(ty.satisfies<never>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfies<void>());
      ty<void>().isnt(ty.satisfies<null>());
      ty<void>().isnt(ty.satisfies<undefined>());
      ty<void>().isnt(ty.satisfies<$.Value>());
      ty<void>().isnt(ty.satisfies<{}>());
      ty<void>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<void>());
      ty<unknown>().isnt(ty.satisfies<void>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<void>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfies<void>());
      ty<null>().isnt(ty.satisfies<void>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<void>());
      ty<$.Value>().isnt(ty.satisfies<void>());
      ty<{}>().isnt(ty.satisfies<void>());
      ty<object>().isnt(ty.satisfies<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfies<unknown>());
      ty<null>().isnt(ty.satisfies<never>());
      ty<null>().isnt(ty.satisfies<void>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfies<null>());
      ty<null>().isnt(ty.satisfies<undefined>());
      ty<null>().isnt(ty.satisfies<$.Value>());
      ty<null>().isnt(ty.satisfies<{}>());
      ty<null>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<null>());
      ty<unknown>().isnt(ty.satisfies<null>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<null>());
      ty<void>().isnt(ty.satisfies<null>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfies<null>());
      ty<undefined>().isnt(ty.satisfies<null>());
      ty<$.Value>().isnt(ty.satisfies<null>());
      ty<{}>().isnt(ty.satisfies<null>());
      ty<object>().isnt(ty.satisfies<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<unknown>());
      ty<undefined>().isnt(ty.satisfies<never>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<void>());
      ty<undefined>().isnt(ty.satisfies<null>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<undefined>());
      ty<undefined>().isnt(ty.satisfies<$.Value>());
      ty<undefined>().isnt(ty.satisfies<{}>());
      ty<undefined>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<undefined>());
      ty<unknown>().isnt(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<undefined>());
      ty<void>().isnt(ty.satisfies<undefined>());
      ty<null>().isnt(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfies<undefined>());
      ty<$.Value>().isnt(ty.satisfies<undefined>());
      ty<{}>().isnt(ty.satisfies<undefined>());
      ty<object>().isnt(ty.satisfies<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<unknown>());
      ty<$.Value>().isnt(ty.satisfies<never>());
      ty<$.Value>().isnt(ty.satisfies<void>());
      ty<$.Value>().isnt(ty.satisfies<null>());
      ty<$.Value>().isnt(ty.satisfies<undefined>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<{}>());
      ty<$.Value>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<$.Value>());
      ty<unknown>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<$.Value>());
      ty<void>().isnt(ty.satisfies<$.Value>());
      ty<null>().isnt(ty.satisfies<$.Value>());
      ty<undefined>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<$.Value>());
      ty<{}>().isnt(ty.satisfies<$.Value>());
      ty<object>().isnt(ty.satisfies<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<unknown>());
      ty<{}>().isnt(ty.satisfies<never>());
      ty<{}>().isnt(ty.satisfies<void>());
      ty<{}>().isnt(ty.satisfies<null>());
      ty<{}>().isnt(ty.satisfies<undefined>());
      ty<{}>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<{}>());
      ty<unknown>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<{}>());
      ty<void>().isnt(ty.satisfies<{}>());
      ty<null>().isnt(ty.satisfies<{}>());
      ty<undefined>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<any>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<unknown>());
      ty<object>().isnt(ty.satisfies<never>());
      ty<object>().isnt(ty.satisfies<void>());
      ty<object>().isnt(ty.satisfies<null>());
      ty<object>().isnt(ty.satisfies<undefined>());
      ty<object>().isnt(ty.satisfies<$.Value>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfies<object>());
      ty<unknown>().isnt(ty.satisfies<object>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfies<object>());
      ty<void>().isnt(ty.satisfies<object>());
      ty<null>().isnt(ty.satisfies<object>());
      ty<undefined>().isnt(ty.satisfies<object>());
      ty<$.Value>().isnt(ty.satisfies<object>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfies<object>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfies<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().isnt(ty.satisfies<string>());
      // @ts-expect-error
      ty<string>().isnt(ty.satisfies<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.satisfies<string | undefined>());
      ty<string | undefined>().isnt(
        // @ts-expect-error
        ty.satisfies<string | number | undefined>()
      );
      ty<string>().isnt(ty.satisfies<number | undefined>());
      ty<string | number>().isnt(ty.satisfies<string>());
    }
  }
  //#endregion

  //#region ty.satisfiedBy
  {
    // any
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<any>());
      ty<never>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<any>());

      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<object>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<unknown>());
      ty<never>().isnt(ty.satisfiedBy<unknown>());
      ty<void>().isnt(ty.satisfiedBy<unknown>());
      ty<null>().isnt(ty.satisfiedBy<unknown>());
      ty<undefined>().isnt(ty.satisfiedBy<unknown>());
      ty<$.Value>().isnt(ty.satisfiedBy<unknown>());
      ty<{}>().isnt(ty.satisfiedBy<unknown>());
      ty<object>().isnt(ty.satisfiedBy<unknown>());

      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<object>());
    }

    // never
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<never>());

      ty<never>().isnt(ty.satisfiedBy<any>());
      ty<never>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty.satisfiedBy<never>());
      ty<never>().isnt(ty.satisfiedBy<void>());
      ty<never>().isnt(ty.satisfiedBy<null>());
      ty<never>().isnt(ty.satisfiedBy<undefined>());
      ty<never>().isnt(ty.satisfiedBy<$.Value>());
      ty<never>().isnt(ty.satisfiedBy<{}>());
      ty<never>().isnt(ty.satisfiedBy<object>());
    }

    // void
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<void>());
      ty<never>().isnt(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<void>());
      ty<null>().isnt(ty.satisfiedBy<void>());
      ty<undefined>().isnt(ty.satisfiedBy<void>());
      ty<$.Value>().isnt(ty.satisfiedBy<void>());
      ty<{}>().isnt(ty.satisfiedBy<void>());
      ty<object>().isnt(ty.satisfiedBy<void>());

      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<any>());
      ty<void>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<never>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<void>());
      ty<void>().isnt(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<undefined>());
      ty<void>().isnt(ty.satisfiedBy<$.Value>());
      ty<void>().isnt(ty.satisfiedBy<{}>());
      ty<void>().isnt(ty.satisfiedBy<object>());
    }

    // null
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<null>());
      ty<never>().isnt(ty.satisfiedBy<null>());
      ty<void>().isnt(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfiedBy<null>());
      ty<undefined>().isnt(ty.satisfiedBy<null>());
      ty<$.Value>().isnt(ty.satisfiedBy<null>());
      ty<{}>().isnt(ty.satisfiedBy<null>());
      ty<object>().isnt(ty.satisfiedBy<null>());

      // @ts-expect-error
      ty<null>().isnt(ty.satisfiedBy<any>());
      ty<null>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfiedBy<never>());
      ty<null>().isnt(ty.satisfiedBy<void>());
      // @ts-expect-error
      ty<null>().isnt(ty.satisfiedBy<null>());
      ty<null>().isnt(ty.satisfiedBy<undefined>());
      ty<null>().isnt(ty.satisfiedBy<$.Value>());
      ty<null>().isnt(ty.satisfiedBy<{}>());
      ty<null>().isnt(ty.satisfiedBy<object>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<undefined>());
      ty<never>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<void>().isnt(ty.satisfiedBy<undefined>());
      ty<null>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfiedBy<undefined>());
      ty<$.Value>().isnt(ty.satisfiedBy<undefined>());
      ty<{}>().isnt(ty.satisfiedBy<undefined>());
      ty<object>().isnt(ty.satisfiedBy<undefined>());

      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfiedBy<any>());
      ty<undefined>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfiedBy<never>());
      ty<undefined>().isnt(ty.satisfiedBy<void>());
      ty<undefined>().isnt(ty.satisfiedBy<null>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.satisfiedBy<undefined>());
      ty<undefined>().isnt(ty.satisfiedBy<$.Value>());
      ty<undefined>().isnt(ty.satisfiedBy<{}>());
      ty<undefined>().isnt(ty.satisfiedBy<object>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<$.Value>());
      ty<never>().isnt(ty.satisfiedBy<$.Value>());
      ty<void>().isnt(ty.satisfiedBy<$.Value>());
      ty<null>().isnt(ty.satisfiedBy<$.Value>());
      ty<undefined>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<$.Value>());
      ty<object>().isnt(ty.satisfiedBy<$.Value>());

      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfiedBy<any>());
      ty<$.Value>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfiedBy<never>());
      ty<$.Value>().isnt(ty.satisfiedBy<void>());
      ty<$.Value>().isnt(ty.satisfiedBy<null>());
      ty<$.Value>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.satisfiedBy<$.Value>());
      ty<$.Value>().isnt(ty.satisfiedBy<{}>());
      ty<$.Value>().isnt(ty.satisfiedBy<object>());
    }

    // {}
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<{}>());
      ty<never>().isnt(ty.satisfiedBy<{}>());
      ty<void>().isnt(ty.satisfiedBy<{}>());
      ty<null>().isnt(ty.satisfiedBy<{}>());
      ty<undefined>().isnt(ty.satisfiedBy<{}>());
      ty<$.Value>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<{}>());

      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<any>());
      ty<{}>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<never>());
      ty<{}>().isnt(ty.satisfiedBy<void>());
      ty<{}>().isnt(ty.satisfiedBy<null>());
      ty<{}>().isnt(ty.satisfiedBy<undefined>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<object>());
    }

    // object
    {
      // @ts-expect-error
      ty<any>().isnt(ty.satisfiedBy<object>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.satisfiedBy<object>());
      ty<never>().isnt(ty.satisfiedBy<object>());
      ty<void>().isnt(ty.satisfiedBy<object>());
      ty<null>().isnt(ty.satisfiedBy<object>());
      ty<undefined>().isnt(ty.satisfiedBy<object>());
      ty<$.Value>().isnt(ty.satisfiedBy<object>());
      // @ts-expect-error
      ty<{}>().isnt(ty.satisfiedBy<object>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<object>());

      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<any>());
      ty<object>().isnt(ty.satisfiedBy<unknown>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<never>());
      ty<object>().isnt(ty.satisfiedBy<void>());
      ty<object>().isnt(ty.satisfiedBy<null>());
      ty<object>().isnt(ty.satisfiedBy<undefined>());
      ty<object>().isnt(ty.satisfiedBy<$.Value>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.satisfiedBy<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().isnt(ty.satisfiedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.satisfiedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.satisfiedBy<string | undefined>());
      ty<string | number | undefined>().isnt(
        // @ts-expect-error
        ty.satisfiedBy<string | undefined>()
      );
      ty<number | undefined>().isnt(ty.satisfiedBy<string>());
      ty<string>().isnt(ty.satisfiedBy<string | number>());
    }
  }
  //#endregion

  //#region ty.extends
  {
    // any
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<never>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<void>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<null>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<undefined>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<any>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<void>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<null>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<any>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<unknown>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extends<unknown>());
      ty<unknown>().isnt(ty.extends<never>());
      ty<unknown>().isnt(ty.extends<void>());
      ty<unknown>().isnt(ty.extends<null>());
      ty<unknown>().isnt(ty.extends<undefined>());
      ty<unknown>().isnt(ty.extends<$.Value>());
      ty<unknown>().isnt(ty.extends<{}>());
      ty<unknown>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<void>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<null>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<unknown>());
    }

    // never
    {
      // @ts-expect-error
      ty<never>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<never>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<void>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<null>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<undefined>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<never>());
      ty<unknown>().isnt(ty.extends<never>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<never>());
      ty<void>().isnt(ty.extends<never>());
      ty<null>().isnt(ty.extends<never>());
      ty<undefined>().isnt(ty.extends<never>());
      ty<$.Value>().isnt(ty.extends<never>());
      ty<{}>().isnt(ty.extends<never>());
      ty<object>().isnt(ty.extends<never>());
    }

    // void
    {
      // @ts-expect-error
      ty<void>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<void>().isnt(ty.extends<unknown>());
      ty<void>().isnt(ty.extends<never>());
      // @ts-expect-error
      ty<void>().isnt(ty.extends<void>());
      ty<void>().isnt(ty.extends<null>());
      ty<void>().isnt(ty.extends<undefined>());
      ty<void>().isnt(ty.extends<$.Value>());
      ty<void>().isnt(ty.extends<{}>());
      ty<void>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<void>());
      ty<unknown>().isnt(ty.extends<void>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<void>());
      // @ts-expect-error
      ty<void>().isnt(ty.extends<void>());
      ty<null>().isnt(ty.extends<void>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<void>());
      ty<$.Value>().isnt(ty.extends<void>());
      ty<{}>().isnt(ty.extends<void>());
      ty<object>().isnt(ty.extends<void>());
    }

    // null
    {
      // @ts-expect-error
      ty<null>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<null>().isnt(ty.extends<unknown>());
      ty<null>().isnt(ty.extends<never>());
      ty<null>().isnt(ty.extends<void>());
      // @ts-expect-error
      ty<null>().isnt(ty.extends<null>());
      ty<null>().isnt(ty.extends<undefined>());
      ty<null>().isnt(ty.extends<$.Value>());
      ty<null>().isnt(ty.extends<{}>());
      ty<null>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<null>());
      ty<unknown>().isnt(ty.extends<null>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<null>());
      ty<void>().isnt(ty.extends<null>());
      // @ts-expect-error
      ty<null>().isnt(ty.extends<null>());
      ty<undefined>().isnt(ty.extends<null>());
      ty<$.Value>().isnt(ty.extends<null>());
      ty<{}>().isnt(ty.extends<null>());
      ty<object>().isnt(ty.extends<null>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<unknown>());
      ty<undefined>().isnt(ty.extends<never>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<void>());
      ty<undefined>().isnt(ty.extends<null>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<undefined>());
      ty<undefined>().isnt(ty.extends<$.Value>());
      ty<undefined>().isnt(ty.extends<{}>());
      ty<undefined>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<undefined>());
      ty<unknown>().isnt(ty.extends<undefined>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<undefined>());
      ty<void>().isnt(ty.extends<undefined>());
      ty<null>().isnt(ty.extends<undefined>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extends<undefined>());
      ty<$.Value>().isnt(ty.extends<undefined>());
      ty<{}>().isnt(ty.extends<undefined>());
      ty<object>().isnt(ty.extends<undefined>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<unknown>());
      ty<$.Value>().isnt(ty.extends<never>());
      ty<$.Value>().isnt(ty.extends<void>());
      ty<$.Value>().isnt(ty.extends<null>());
      ty<$.Value>().isnt(ty.extends<undefined>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<{}>());
      ty<$.Value>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<$.Value>());
      ty<unknown>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<$.Value>());
      ty<void>().isnt(ty.extends<$.Value>());
      ty<null>().isnt(ty.extends<$.Value>());
      ty<undefined>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<$.Value>());
      ty<{}>().isnt(ty.extends<$.Value>());
      ty<object>().isnt(ty.extends<$.Value>());
    }

    // {}
    {
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<unknown>());
      ty<{}>().isnt(ty.extends<never>());
      ty<{}>().isnt(ty.extends<void>());
      ty<{}>().isnt(ty.extends<null>());
      ty<{}>().isnt(ty.extends<undefined>());
      ty<{}>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<{}>());
      ty<unknown>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<{}>());
      ty<void>().isnt(ty.extends<{}>());
      ty<null>().isnt(ty.extends<{}>());
      ty<undefined>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<{}>());
    }

    // object
    {
      // @ts-expect-error
      ty<object>().isnt(ty.extends<any>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<unknown>());
      ty<object>().isnt(ty.extends<never>());
      ty<object>().isnt(ty.extends<void>());
      ty<object>().isnt(ty.extends<null>());
      ty<object>().isnt(ty.extends<undefined>());
      ty<object>().isnt(ty.extends<$.Value>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<object>());

      // @ts-expect-error
      ty<any>().isnt(ty.extends<object>());
      ty<unknown>().isnt(ty.extends<object>());
      // @ts-expect-error
      ty<never>().isnt(ty.extends<object>());
      ty<void>().isnt(ty.extends<object>());
      ty<null>().isnt(ty.extends<object>());
      ty<undefined>().isnt(ty.extends<object>());
      ty<$.Value>().isnt(ty.extends<object>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extends<object>());
      // @ts-expect-error
      ty<object>().isnt(ty.extends<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().isnt(ty.extends<string>());
      // @ts-expect-error
      ty<string>().isnt(ty.extends<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.extends<string | undefined>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.extends<string | number | undefined>());
      ty<string>().isnt(ty.extends<number | undefined>());
      ty<string | number>().isnt(ty.extends<string>());
    }
  }
  //#endregion

  //#region ty.extendedBy
  {
    // any
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<never>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<null>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<any>());

      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<void>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<null>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<object>());
    }

    // unknown
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<unknown>());
      ty<never>().isnt(ty.extendedBy<unknown>());
      ty<void>().isnt(ty.extendedBy<unknown>());
      ty<null>().isnt(ty.extendedBy<unknown>());
      ty<undefined>().isnt(ty.extendedBy<unknown>());
      ty<$.Value>().isnt(ty.extendedBy<unknown>());
      ty<{}>().isnt(ty.extendedBy<unknown>());
      ty<object>().isnt(ty.extendedBy<unknown>());

      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<any>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<void>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<null>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<object>());
    }

    // never
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<never>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<null>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<never>());

      // @ts-expect-error
      ty<never>().isnt(ty.extendedBy<any>());
      ty<never>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<never>().isnt(ty.extendedBy<never>());
      ty<never>().isnt(ty.extendedBy<void>());
      ty<never>().isnt(ty.extendedBy<null>());
      ty<never>().isnt(ty.extendedBy<undefined>());
      ty<never>().isnt(ty.extendedBy<$.Value>());
      ty<never>().isnt(ty.extendedBy<{}>());
      ty<never>().isnt(ty.extendedBy<object>());
    }

    // void
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<void>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<void>());
      ty<never>().isnt(ty.extendedBy<void>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<void>());
      ty<null>().isnt(ty.extendedBy<void>());
      ty<undefined>().isnt(ty.extendedBy<void>());
      ty<$.Value>().isnt(ty.extendedBy<void>());
      ty<{}>().isnt(ty.extendedBy<void>());
      ty<object>().isnt(ty.extendedBy<void>());

      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<any>());
      ty<void>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<never>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<void>());
      ty<void>().isnt(ty.extendedBy<null>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<undefined>());
      ty<void>().isnt(ty.extendedBy<$.Value>());
      ty<void>().isnt(ty.extendedBy<{}>());
      ty<void>().isnt(ty.extendedBy<object>());
    }

    // null
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<null>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<null>());
      ty<never>().isnt(ty.extendedBy<null>());
      ty<void>().isnt(ty.extendedBy<null>());
      // @ts-expect-error
      ty<null>().isnt(ty.extendedBy<null>());
      ty<undefined>().isnt(ty.extendedBy<null>());
      ty<$.Value>().isnt(ty.extendedBy<null>());
      ty<{}>().isnt(ty.extendedBy<null>());
      ty<object>().isnt(ty.extendedBy<null>());

      // @ts-expect-error
      ty<null>().isnt(ty.extendedBy<any>());
      ty<null>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<null>().isnt(ty.extendedBy<never>());
      ty<null>().isnt(ty.extendedBy<void>());
      // @ts-expect-error
      ty<null>().isnt(ty.extendedBy<null>());
      ty<null>().isnt(ty.extendedBy<undefined>());
      ty<null>().isnt(ty.extendedBy<$.Value>());
      ty<null>().isnt(ty.extendedBy<{}>());
      ty<null>().isnt(ty.extendedBy<object>());
    }

    // undefined
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<undefined>());
      ty<never>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<void>().isnt(ty.extendedBy<undefined>());
      ty<null>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extendedBy<undefined>());
      ty<$.Value>().isnt(ty.extendedBy<undefined>());
      ty<{}>().isnt(ty.extendedBy<undefined>());
      ty<object>().isnt(ty.extendedBy<undefined>());

      // @ts-expect-error
      ty<undefined>().isnt(ty.extendedBy<any>());
      ty<undefined>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extendedBy<never>());
      ty<undefined>().isnt(ty.extendedBy<void>());
      ty<undefined>().isnt(ty.extendedBy<null>());
      // @ts-expect-error
      ty<undefined>().isnt(ty.extendedBy<undefined>());
      ty<undefined>().isnt(ty.extendedBy<$.Value>());
      ty<undefined>().isnt(ty.extendedBy<{}>());
      ty<undefined>().isnt(ty.extendedBy<object>());
    }

    // Non-nullable primitives
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<$.Value>());
      ty<never>().isnt(ty.extendedBy<$.Value>());
      ty<void>().isnt(ty.extendedBy<$.Value>());
      ty<null>().isnt(ty.extendedBy<$.Value>());
      ty<undefined>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<$.Value>());
      ty<object>().isnt(ty.extendedBy<$.Value>());

      // @ts-expect-error
      ty<$.Value>().isnt(ty.extendedBy<any>());
      ty<$.Value>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extendedBy<never>());
      ty<$.Value>().isnt(ty.extendedBy<void>());
      ty<$.Value>().isnt(ty.extendedBy<null>());
      ty<$.Value>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<$.Value>().isnt(ty.extendedBy<$.Value>());
      ty<$.Value>().isnt(ty.extendedBy<{}>());
      ty<$.Value>().isnt(ty.extendedBy<object>());
    }

    // {}
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<{}>());
      ty<never>().isnt(ty.extendedBy<{}>());
      ty<void>().isnt(ty.extendedBy<{}>());
      ty<null>().isnt(ty.extendedBy<{}>());
      ty<undefined>().isnt(ty.extendedBy<{}>());
      ty<$.Value>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<{}>());

      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<any>());
      ty<{}>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<never>());
      ty<{}>().isnt(ty.extendedBy<void>());
      ty<{}>().isnt(ty.extendedBy<null>());
      ty<{}>().isnt(ty.extendedBy<undefined>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<object>());
    }

    // object
    {
      // @ts-expect-error
      ty<any>().isnt(ty.extendedBy<object>());
      // @ts-expect-error
      ty<unknown>().isnt(ty.extendedBy<object>());
      ty<never>().isnt(ty.extendedBy<object>());
      ty<void>().isnt(ty.extendedBy<object>());
      ty<null>().isnt(ty.extendedBy<object>());
      ty<undefined>().isnt(ty.extendedBy<object>());
      ty<$.Value>().isnt(ty.extendedBy<object>());
      // @ts-expect-error
      ty<{}>().isnt(ty.extendedBy<object>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<object>());

      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<any>());
      ty<object>().isnt(ty.extendedBy<unknown>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<never>());
      ty<object>().isnt(ty.extendedBy<void>());
      ty<object>().isnt(ty.extendedBy<null>());
      ty<object>().isnt(ty.extendedBy<undefined>());
      ty<object>().isnt(ty.extendedBy<$.Value>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<{}>());
      // @ts-expect-error
      ty<object>().isnt(ty.extendedBy<object>());
    }

    // Union
    {
      // @ts-expect-error
      ty<string>().isnt(ty.extendedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.extendedBy<string>());
      // @ts-expect-error
      ty<string | undefined>().isnt(ty.extendedBy<string | undefined>());
      ty<string | number | undefined>().isnt(
        // @ts-expect-error
        ty.extendedBy<string | undefined>()
      );
      ty<number | undefined>().isnt(ty.extendedBy<string>());
      ty<string>().isnt(ty.extendedBy<string | number>());
    }
  }
  //#endregion

  //#region ty#isnt.undefined
  {
    // Basics
    {
      ty<any>().isnt.undefined();
      ty<unknown>().isnt.undefined();
      ty<never>().isnt.undefined();
      ty<void>().isnt.undefined();
      ty<null>().isnt.undefined();
      // @ts-expect-error
      ty<undefined>().isnt.undefined();
      ty<$.Value>().isnt.undefined();
      ty<{}>().isnt.undefined();
      ty<object>().isnt.undefined();
    }

    // Union
    {
      ty<any | undefined>().isnt.undefined();
      ty<string | undefined>().isnt.undefined();
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
