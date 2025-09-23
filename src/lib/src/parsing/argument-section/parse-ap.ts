import * as T from "../../../../types";
import { mapParser, parserCombOr } from "../utils";
import { parseAdverb } from "./parse-adverb";
import { parseSandwich } from "./parse-sandwich";

export const parseAP = (possesor: T.PossesorSelection | undefined) =>
  mapParser(
    (selection): T.APSelection => ({
      type: "AP",
      selection,
    }),
    parserCombOr<T.APSelection["selection"]>([
      ...(!possesor ? [parseAdverb] : []),
      parseSandwich(possesor),
    ]),
  );
