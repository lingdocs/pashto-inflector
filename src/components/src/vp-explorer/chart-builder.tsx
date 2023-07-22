import { renderVerb } from "../../../lib/src/new-verb-engine/render-verb";
import * as T from "../../../types";
import { equals } from "rambda";
import { isPastTense, renderNPSelection } from "../../library";
import { getPersonFromNP } from "../../../lib/src/phrase-building/vp-tools";

export function buildVerbChart({
  verb,
  tense,
  transitivity,
  voice,
  imperative,
  negative,
  objectNP,
}: {
  verb: T.VerbEntry;
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
  transitivity: T.Transitivity;
  imperative: boolean;
  voice: T.VerbSelection["voice"];
  negative: boolean;
  objectNP: T.NPSelection | undefined;
}): {
  objNP: T.Rendered<T.NPSelection> | undefined;
  vbs: T.OptionalPersonInflections<T.SingleOrLengthOpts<T.RenderVerbOutput[]>>;
} {
  const allPersons = imperative
    ? [
        T.Person.SecondSingMale,
        T.Person.SecondSingFemale,
        T.Person.SecondPlurMale,
        T.Person.SecondPlurFemale,
      ]
    : ([...Array(12).keys()] as T.Person[]);
  const isPast = isPastTense(tense);
  const objNP: T.Rendered<T.NPSelection> | undefined = objectNP
    ? renderNPSelection(objectNP, false, false, "object", "none", false)
    : undefined;
  function conjugateAllPers(
    p?: T.Person
  ): T.SingleOrLengthOpts<T.RenderVerbOutput[]> {
    const ps = allPersons.map((person) => {
      const { subject, object } =
        transitivity === "intransitive"
          ? { subject: person, object: undefined }
          : transitivity === "transitive" && isPast
          ? { object: person, subject: 0 }
          : { subject: person, object: p ?? 0 };
      return renderVerb({
        verb,
        tense,
        subject,
        object,
        voice,
        negative,
      });
    });
    return pullOutLengths(ps);
  }
  if (transitivity === "transitive" && !isPast) {
    return {
      objNP,
      vbs: conflateIfNoCompGenNumDiff({
        mascSing: conjugateAllPers(T.Person.FirstSingMale),
        mascPlur: conjugateAllPers(T.Person.FirstPlurMale),
        femSing: conjugateAllPers(T.Person.FirstSingFemale),
        femPlur: conjugateAllPers(T.Person.FirstPlurFemale),
      }),
    };
  } else if (objNP && isPast) {
    return {
      objNP,
      vbs: pullOutLengths([
        renderVerb({
          verb,
          tense,
          subject: 0,
          object: getPersonFromNP(objNP),
          voice,
          negative,
        }),
      ]),
    };
  } else if (isPast && transitivity === "grammatically transitive") {
    return {
      objNP,
      vbs: pullOutLengths([
        renderVerb({
          verb,
          tense,
          subject: 0,
          object: T.Person.ThirdPlurMale,
          voice,
          negative,
        }),
      ]),
    };
  } else {
    return {
      objNP: undefined,
      vbs: conjugateAllPers(),
    };
  }
}

const vIsLength =
  (length: T.Length) =>
  ({ vbs: [ph, [v]] }: T.RenderVerbOutput): boolean => {
    // there are a number of parts of the verb that could be considered
    // to be length variations
    // but we will take the first main verb block as the point of length variation
    // w reg verbs - wahúlm vs. wahúm
    //   (when welded, the right side of the block)
    // w ability or perfect - kawúley shum vs. kawéy shum
    function checkVBForLengths(v: T.VB): boolean {
      if (v.type === "welded") {
        return checkVBForLengths(v.right);
      }
      if (length === "mini" && "mini" in v.ps && v.ps.mini) {
        return true;
      }
      return length in v.ps;
    }
    return checkVBForLengths(v);
  };

function grabLength(
  length: T.Length,
  { hasBa, vbs: [ph, v] }: T.RenderVerbOutput
): T.RenderVerbOutput {
  function grabVBLength<V extends T.VB | T.VBE>(vb: V): V {
    if (vb.type === "welded") {
      return {
        ...vb,
        right: grabVBLength(vb.right) as T.VBBasic | T.VBGenNum,
      };
    }
    if (!(length in vb.ps)) {
      return vb;
    }
    return {
      ...vb,
      // @ts-ignore
      ps: vb.ps[length],
    };
  }
  if (v.length === 2) {
    const [vb, vbe] = v;
    return {
      hasBa,
      vbs: [ph, [grabVBLength(vb), vbe]],
    };
  }
  return {
    hasBa,
    vbs: [ph, [grabVBLength(v[0])]],
  };
}

function pullOutLengths(
  ps: T.RenderVerbOutput[]
): T.SingleOrLengthOpts<T.RenderVerbOutput[]> {
  const hasLengths = vIsLength("long")(ps[0]);
  const hasMini = vIsLength("mini")(ps[0]);
  if (!hasLengths) {
    return ps;
  }
  const wLengths: T.LengthOptions<T.RenderVerbOutput[]> = {
    long: [],
    short: [],
  };
  ps.forEach((x) => {
    wLengths.long.push(grabLength("long", x));
    wLengths.short.push(grabLength("short", x));
  });
  if (hasMini) {
    wLengths.mini = [];
    ps.forEach((x) => {
      // @ts-ignore
      wLengths.mini.push(grabLength("mini", x));
    });
  }
  return wLengths;
}

function conflateIfNoCompGenNumDiff(
  v: T.PersonInflections<T.SingleOrLengthOpts<T.RenderVerbOutput[]>>
): T.OptionalPersonInflections<T.SingleOrLengthOpts<T.RenderVerbOutput[]>> {
  const toCheck = [
    "femSing",
    "femPlur",
    "mascPlur",
  ] as T.PersonInflectionsField[];
  const diffExists = toCheck.some((f) => !equals(v[f], v.mascSing));
  return diffExists ? v : v.mascSing;
}
