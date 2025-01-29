import * as T from "../../../types";
import { getVerbEnding } from "./parse-verb-helpers";
import { kedulDyn, kedulStat } from "./irreg-verbs";
import { returnParseResults } from "./utils";
import { getImperativeVerbEnding } from "./misc";

export function parseKedul(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedVBE>[] {
  const [first, ...rest] = tokens;
  const start = first.s.slice(0, -1);
  const ending = first.s.at(-1) || "";
  const people = getVerbEnding(ending);
  const imperativePeople = getImperativeVerbEnding(ending);
  if (first.s === "شو") {
    return returnParseResults<T.ParsedVBE>(rest, [
      ...[
        T.Person.ThirdSingMale,
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
      ].flatMap((person) =>
        [kedulStat, kedulDyn].map<T.ParsedVBE>((verb) => ({
          type: "VB",
          info: {
            aspect: "perfective",
            base: "root",
            type: "verb",
            verb,
          },
          person,
        }))
      ),
      ...[T.Person.FirstPlurMale, T.Person.FirstPlurFemale].flatMap((person) =>
        [kedulStat, kedulDyn].map<T.ParsedVBE>((verb) => ({
          type: "VB",
          info: {
            aspect: "perfective",
            base: "stem",
            type: "verb",
            verb,
          },
          person,
        }))
      ),
    ]);
  }
  if (start === "کېږ") {
    return returnParseResults<T.ParsedVBE>(
      rest,
      people.stem.flatMap<T.ParsedVBE>((person) => [
        {
          type: "VB",
          info: {
            aspect: "imperfective",
            base: "stem",
            type: "verb",
            verb: kedulStat,
          },
          person,
        },
        {
          type: "VB",
          info: {
            aspect: "imperfective",
            base: "stem",
            type: "verb",
            verb: kedulDyn,
          },
          person,
        },
      ])
    );
  }
  if (start === "کېد" || (start === "کېدل" && ending !== "ل")) {
    return returnParseResults<T.ParsedVBE>(
      rest,
      people.root.flatMap<T.ParsedVBE>((person) => [
        {
          type: "VB",
          info: {
            aspect: "imperfective",
            base: "root",
            type: "verb",
            verb: kedulStat,
          },
          person,
        },
        {
          type: "VB",
          info: {
            aspect: "imperfective",
            base: "root",
            type: "verb",
            verb: kedulDyn,
          },
          person,
        },
      ])
    );
  }
  if (start === "ش") {
    const imperative = imperativePeople.flatMap<T.ParsedVBE>((person) => [
      {
        type: "VB",
        info: {
          aspect: "perfective",
          base: "stem",
          type: "verb",
          imperative: true,
          verb: kedulStat,
        },
        person,
      },
      {
        type: "VB",
        info: {
          aspect: "perfective",
          base: "stem",
          type: "verb",
          imperative: true,
          verb: kedulDyn,
        },
        person,
      },
    ]);
    const nonImperative = people.stem.flatMap<T.ParsedVBE>((person) => [
      {
        type: "VB",
        info: {
          aspect: "perfective",
          base: "stem",
          type: "verb",
          verb: kedulStat,
        },
        person,
      },
      {
        type: "VB",
        info: {
          aspect: "perfective",
          base: "stem",
          type: "verb",
          verb: kedulDyn,
        },
        person,
      },
    ]);
    return returnParseResults<T.ParsedVBE>(rest, [
      ...nonImperative,
      ...imperative,
    ]);
  }
  if (start === "شو" || (start === "شول" && ending !== "ل")) {
    return returnParseResults<T.ParsedVBE>(
      rest,
      people.root.flatMap<T.ParsedVBE>((person) => [
        {
          type: "VB",
          info: {
            aspect: "perfective",
            base: "root",
            type: "verb",
            verb: kedulStat,
          },
          person,
        },
        {
          type: "VB",
          info: {
            aspect: "perfective",
            base: "root",
            type: "verb",
            verb: kedulDyn,
          },
          person,
        },
      ])
    );
  }
  return [];
}
