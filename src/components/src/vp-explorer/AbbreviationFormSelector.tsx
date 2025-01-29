import ButtonSelect from "../selects/ButtonSelect";
import * as T from "../../../types";
import { roleIcon } from "../role-icons";
import classNames from "classnames";

const options = [
  {
    label: "Full",
    value: "full",
  },
  {
    label: <div className="m1-2">No {roleIcon.king}</div>,
    value: "noKing",
  },
  {
    label: <div>Mini {roleIcon.servant}</div>,
    value: "shrinkServant",
  },
  {
    label: <div>Both</div>,
    value: "shortest",
  },
];
const b = {
  blocks: [
    {
      key: 0.200389418248619,
      block: {
        type: "subjectSelection",
        selection: {
          type: "NP",
          selection: {
            type: "noun",
            entry: {
              i: 13304,
              ts: 1527812828,
              p: "کور",
              f: "kor",
              g: "kor",
              e: "house, home",
              r: 4,
              a: 1,
              c: "n. m.",
            },
            gender: "masc",
            genderCanChange: false,
            number: "singular",
            numberCanChange: true,
            adjectives: [],
            dynamicComplement: false,
            genStativeComplement: false,
            determiners: {
              type: "determiners",
              withNoun: true,
              determiners: [
                {
                  type: "determiner",
                  determiner: {
                    p: "دا",
                    f: "daa",
                    type: "det",
                    demonstrative: true,
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      key: 0.16909686763985587,
      block: { type: "objectSelection", selection: "none" },
    },
  ],
  verb: {
    type: "verb",
    verb: {
      entry: {
        i: 2146,
        ts: 1527813842,
        p: "بلېدل",
        f: "baledul",
        g: "baledul",
        e: "to burn, catch fire",
        r: 4,
        l: 1527813841,
        c: "v. stat. comp. intrans.",
        ec: "burn,burns,burning,burnt,burned",
      },
      complement: {
        i: 2095,
        ts: 1527813841,
        p: "بل",
        f: "bal",
        g: "bal",
        e: "on fire, burning",
        r: 4,
        c: "adj.",
      },
    },
    verbTense: "presentVerb",
    perfectTense: "habitualPerfect",
    imperativeTense: "imperfectiveImperative",
    tenseCategory: "basic",
    transitivity: "intransitive",
    isCompound: "stative",
    voice: "active",
    negative: false,
    canChangeTransitivity: false,
    canChangeVoice: false,
    canChangeStatDyn: false,
  },
  form: { removeKing: false, shrinkServant: false },
};
function formToValue(f: T.FormVersion) {
  if (f.removeKing === false && f.shrinkServant === false) {
    return "full";
  }
  if (f.removeKing === true && f.shrinkServant === false) {
    return "noKing";
  }
  if (f.removeKing === false && f.shrinkServant === true) {
    return "shrinkServant";
  }
  if (f.removeKing === true && f.shrinkServant === true) {
    return "shortest";
  }
  throw new Error("unrecognized abbreviation form");
}

function limitOptions(adjustable: "both" | "king" | "servant") {
  if (adjustable === "both") {
    return options;
  }
  if (adjustable === "king") {
    return options.filter(
      (o) => !["shrinkServant", "shortest"].includes(o.value)
    );
  }
  if (adjustable === "servant") {
    return options.filter((o) => !["noKing", "shortest"].includes(o.value));
  }
}

function limitValue(value: string, adjustable: "both" | "king" | "servant") {
  if (adjustable === "both") return value;
  if (adjustable === "king") {
    return value === "shortest"
      ? "noKing"
      : value === "shrinkServant"
      ? "full"
      : value;
  }
  if (adjustable === "servant") {
    return value === "shortest"
      ? "shrinkServant"
      : value === "noKing"
      ? "full"
      : value;
  }
  throw new Error("unrecognized adjustable value");
}

function AbbreviationFormSelector({
  form,
  onChange,
  adjustable,
  inline,
}: {
  form: T.FormVersion;
  onChange: (f: T.FormVersion) => void;
  adjustable: "both" | "king" | "servant";
  inline?: boolean;
}) {
  function handleChange(f: "full" | "noKing" | "shrinkServant" | "shortest") {
    if (f === "full") {
      onChange({ removeKing: false, shrinkServant: false });
    } else if (f === "noKing") {
      onChange({ removeKing: true, shrinkServant: false });
    } else if (f === "shrinkServant") {
      onChange({ removeKing: false, shrinkServant: true });
    } else if (f === "shortest") {
      onChange({ removeKing: true, shrinkServant: true });
    }
  }
  // TODO: limit display of shrinking options based on the verb type
  return (
    <div className={classNames("mx-3", { "mb-3": !inline })}>
      {/* <div className="text-center text-small mb-2">Abbreviation Options</div> */}
      <ButtonSelect
        faded={inline}
        small
        // @ts-expect-error slight mismatch but its ok
        value={limitValue(formToValue(form), adjustable)}
        // @ts-expect-error slight mismatch but its ok
        options={limitOptions(adjustable)}
        handleChange={handleChange}
      />
    </div>
  );
}

export default AbbreviationFormSelector;
