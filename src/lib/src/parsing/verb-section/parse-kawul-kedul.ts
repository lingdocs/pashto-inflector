import * as T from "../../../../types";
import { getVerbEnding } from "./parse-verb-helpers";
import { kawulStat, kawulDyn, kedulStat, kedulDyn } from "./irreg-verbs";
import { returnParseResults } from "../utils";
import { getImperativeVerbEnding } from "./misc";

// TODO: WHY DOES کېدلې only provide 3rd f. pl. for stat

// TODO: this might be a lot of unnecessary currying
const getForm =
  (hasOo: boolean) =>
  (kawulKedul: "kawul" | "kedul") =>
  (aspect: T.Aspect) =>
  (base: "stem" | "root") =>
  (person: T.Person): T.ParsedVBE[] => {
    return validVerbs(hasOo, kawulKedul, aspect).map((verb) => {
      return {
        type: "VB",
        info: {
          aspect,
          base,
          type: "verb",
          verb,
        } as const,
        person,
      } as const;
    });
  };

// TODO: what about وکولم etc

export function parseKawulKedul(
  tokens: Readonly<T.Token[]>,
  hasOo: boolean
): T.ParseResult<T.ParsedVBE>[] {
  const [first, ...rest] = tokens;
  if (first.s[0] !== "ک" && first.s[0] !== "ش") {
    return [];
  }
  const start = first.s.slice(0, -1);
  const ending = first.s.at(-1) || "";
  const getF = getForm(hasOo);
  const oneBase =
    (kawulKedul: "kawul" | "kedul") =>
    (base: "root" | "stem") =>
    (aspect: T.Aspect) =>
    (people: T.Person[]) => {
      return returnParseResults<T.ParsedVBE>(
        rest,
        people.flatMap(getF(kawulKedul)(aspect)(base))
      );
    };
  const rootAndStem =
    (kawulKedul: "kawul" | "kedul") =>
    (aspect: T.Aspect) =>
    (people: {
      people: ReturnType<typeof getVerbEnding>;
      imperativePeople: ReturnType<typeof getImperativeVerbEnding>;
    }) => {
      return returnParseResults<T.ParsedVBE>(rest, [
        ...people.people.stem.flatMap(getF(kawulKedul)(aspect)("stem")),
        ...people.people.root.flatMap(getF(kawulKedul)(aspect)("root")),
        ...people.imperativePeople.flatMap<T.ParsedVBE>((person) =>
          getF(kawulKedul)(aspect)("stem")(person).map(addImperative)
        ),
      ]);
    };
  if (first.s === "کړ") {
    return oneBase("kawul")("root")("perfective")([T.Person.ThirdSingMale]);
  }
  if (first.s === "کاوه") {
    return oneBase("kawul")("root")("imperfective")([T.Person.ThirdSingMale]);
  }
  if (first.s === "شو") {
    return [
      ...oneBase("kedul")("stem")("perfective")([
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
      ]),
      ...oneBase("kedul")("root")("perfective")([
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
        T.Person.ThirdSingMale,
        T.Person.ThirdPlurMale,
      ]),
    ];
  }
  const people = getVerbEnding(ending);
  const imperativePeople = getImperativeVerbEnding(ending);
  if (!people.root.length && !people.stem.length && !imperativePeople.length) {
    return [];
  }
  if (start === "کړ" || start === "ک") {
    return rootAndStem("kawul")("perfective")({ people, imperativePeople });
  }
  if (start === "کړل" && ending !== "ل") {
    return oneBase("kawul")("root")("perfective")(people.root);
  }
  if (start === "کو") {
    return rootAndStem("kawul")("imperfective")({
      people: removePeople(people, {
        stem: [],
        root: [T.Person.ThirdSingMale],
      }),
      imperativePeople,
    });
  }
  if (start === "کول" && ending !== "ل") {
    return [
      ...oneBase("kawul")("root")("imperfective")(people.root),
      ...(hasOo ? oneBase("kawul")("root")("perfective")(people.root) : []),
    ];
  }
  if (start === "کېږ") {
    const imperative = returnParseResults(
      rest,
      imperativePeople
        .flatMap(getF("kedul")("imperfective")("stem"))
        .map(addImperative)
    );
    return [
      ...oneBase("kedul")("stem")("imperfective")(people.stem),
      ...imperative,
    ];
  }
  if (start === "کېد" && ending !== "ل") {
    return oneBase("kedul")("root")("imperfective")(people.root);
  }
  if (start === "ش") {
    const imperative = returnParseResults(
      rest,
      imperativePeople
        .flatMap(getF("kedul")("perfective")("stem"))
        .map(addImperative)
    );
    return [
      ...oneBase("kedul")("stem")("perfective")(people.stem),
      ...imperative,
    ];
  }
  if (start === "شول" && ending !== "ل") {
    return oneBase("kedul")("root")("perfective")(people.root);
  }
  if (start === "شو") {
    // TODO: check to make sure we're removing enough people here??
    return oneBase("kedul")("root")("perfective")(
      people.root.filter((p) => p !== T.Person.ThirdSingMale)
    );
  }
  return [];
}

// TODO: This is no longer needed because we only need to remove the root
// people above??
function removePeople(
  people: ReturnType<typeof getVerbEnding>,
  peopleToRemove: ReturnType<typeof getVerbEnding>
): ReturnType<typeof getVerbEnding> {
  return {
    stem: people.stem.filter((p) => !peopleToRemove.stem.includes(p)),
    root: people.root.filter((p) => !peopleToRemove.root.includes(p)),
  };
}

function addImperative(v: T.ParsedVBE): T.ParsedVBE {
  if (v.info.type === "equative") {
    throw new Error("tried to make an imperative verb equative");
  }
  return {
    ...v,
    info: {
      ...v.info,
      imperative: true,
    },
  };
}

function validVerbs(
  hasOo: boolean,
  kawulKedul: "kawul" | "kedul",
  aspect: T.Aspect
): T.VerbEntry[] {
  if (aspect === "imperfective" && hasOo) {
    return [];
  }
  if (aspect === "perfective" && hasOo) {
    return kawulKedul === "kawul"
      ? [kawulDyn]
      : [
          kedulDyn,
          // because the oo could also be for an ability VBP to come after
          // in which case the kedulDyn will be eliminated by ensureVBEAuxOk
          // in parse-blocks
          kedulStat,
        ];
  }
  if (aspect === "imperfective" && !hasOo) {
    return [];
  }
  if (aspect === "perfective" && !hasOo) {
    return kawulKedul === "kawul" ? [kawulStat] : [kedulStat];
  }
  throw new Error("should be unreachable");
}
