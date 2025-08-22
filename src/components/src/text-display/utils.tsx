import { mapPsString } from "../../../lib/src/p-text-helpers";
import * as T from "../../../types";
import { PsJSX, psJSXMap2 } from "./jsx-map";
//import { psJSXMap } from "./jsx-map";

/**
 * Adds an error marking to ps text for intentionally incorrect examples etc.
 *
 * ❌ زه ځې ❌
 *
 */
export function addErrorToPs<P extends T.PsString | PsJSX>(ps: P): P {
  const addXs = (x: string) => `❌ ${x} ❌`;
  if (typeof ps.p === "object") {
    // @ts-expect-error - this is right
    return psJSXMap2(ps, addXs, true);
  }
  // @ts-expect-error
  const wError = mapPsString(addXs, ps);
  // @ts-expect-error - ts is wrong here
  return wError;
}
