import * as T from "../../../types";
import classNames from "classnames";
import { getEnglishFromRendered } from "../../../lib/src/phrase-building/np-tools";
import {
  getEnglishPersonInfo,
  getEnglishParticipleInflection,
  getEnglishGenNumInfo,
} from "../../../lib/src/misc-helpers";
import { useState } from "react";
import { getLength } from "../../../lib/src/p-text-helpers";
import { roleIcon } from "../role-icons";
import { negativeParticle } from "../../../lib/src/grammar-units";
import { flattenLengths } from "../../library";

function Block({
  opts,
  block,
  king,
  script,
}: {
  opts: T.TextOptions;
  block: T.Block;
  king?: "subject" | "object" | undefined;
  script: "p" | "f";
}) {
  if ("equative" in block.block) {
    return (
      <EquativeBlock opts={opts} eq={block.block.equative} script={script} />
    );
  }
  if (block.block.type === "AP") {
    const english = getEnglishFromRendered(block.block);
    return (
      <APBlock opts={opts} english={english} script={script}>
        {block.block}
      </APBlock>
    );
  }
  if (block.block.type === "subjectSelection") {
    const role =
      king === "subject" ? "king" : king === "object" ? "servant" : undefined;
    return (
      <SubjectBlock
        opts={opts}
        np={block.block.selection}
        role={role}
        script={script}
      />
    );
  }
  if (block.block.type === "objectSelection") {
    const role =
      king === "object" ? "king" : king === "subject" ? "servant" : undefined;
    return (
      <ObjectBlock
        opts={opts}
        obj={block.block.selection}
        role={role}
        script={script}
      />
    );
  }
  if (block.block.type === "predicateSelection") {
    const english = getEnglishFromRendered(block.block.selection);
    return (
      <div className="text-center">
        <div>
          <strong>Predicate</strong>
        </div>
        {block.block.selection.type === "complement" ? (
          <ComplementBlock
            opts={opts}
            comp={block.block.selection.selection}
            script={script}
          />
        ) : (
          <NPBlock opts={opts} english={english} script={script}>
            {block.block.selection}
          </NPBlock>
        )}
      </div>
    );
  }
  if (block.block.type === "negative") {
    return (
      <NegBlock
        opts={opts}
        imperative={block.block.imperative}
        script={script}
      />
    );
  }
  if (block.block.type === "PH") {
    return <PerfHeadBlock opts={opts} ps={block.block.ps} script={script} />;
  }
  if (block.block.type === "VB") {
    return <VBBlock opts={opts} block={block.block} script={script} />;
  }
  if (block.block.type === "complement") {
    return (
      <ComplementBlock
        opts={opts}
        comp={block.block.selection}
        script={script}
      />
    );
  }
  if (block.block.type === "NComp") {
    return <NCompBlock opts={opts} comp={block.block.comp} script={script} />;
  }
  return <WeldedBlock opts={opts} welded={block.block} script={script} />;
}

export default Block;

function Border({
  children,
  extraClassName,
  padding,
}: {
  children: JSX.Element | JSX.Element[] | string;
  extraClassName?: string;
  padding?: string;
}) {
  return (
    <div
      className={`block-border d-flex flex-row justify-content-center align-items-center ${
        extraClassName ? extraClassName : ""
      }`}
      style={{
        padding: padding ? padding : "1rem",
        textAlign: "center",
        gap: "0.5rem",
      }}
    >
      <>{children}</>
    </div>
  );
}

function VBBlock({
  // opts,
  block,
  script,
}: {
  opts: T.TextOptions;
  script: "p" | "f";
  block:
    | T.VBBasic
    | (T.VBBasic & (T.VBPartInfo | T.VBAbilityInfo))
    | (T.VBBasic & {
        person: T.Person;
      });
}) {
  const [length, setLength] = useState<T.Length>("long");
  const [version, setVersion] = useState<number>(0);
  const ps = getLength(block.ps, length);
  function changeVersion() {
    setVersion((o) => (o + 1) % ps.length);
  }
  function changeLength() {
    setLength((o) =>
      o === "long"
        ? "short"
        : o === "short" && "mini" in block.ps
        ? "mini"
        : "long"
    );
  }
  const infInfo =
    "info" in block && block.info.type === "ppart"
      ? getEnglishGenNumInfo(block.info.genNum.gender, block.info.genNum.number)
      : "person" in block
      ? getEnglishPersonInfo(block.person, "short")
      : "";
  return (
    <div className="text-center">
      <div className="d-flex flex-row justify-content-around">
        {"long" in block.ps && (
          <div className="clickable small mb-1" onClick={changeLength}>
            {length}
          </div>
        )}
        {ps.length > 1 && (
          <div className="clickable small mb-1" onClick={changeVersion}>
            v. {version + 1}
          </div>
        )}
      </div>
      <Border>
        <>{ps[version][script]}</>
      </Border>
      <div>VBlock</div>
      <SubText>{infInfo}</SubText>
    </div>
  );
}

function WeldedBlock({
  opts,
  welded,
  script,
}: {
  opts: T.TextOptions;
  script: "p" | "f";
  welded: T.Welded;
}) {
  return (
    <div className="text-center">
      <Border
        padding="0.5rem"
        extraClassName={script === "p" ? "flex-row-reverse" : ""}
      >
        {welded.left.type === "NComp" ? (
          <NCompBlock opts={opts} comp={welded.left.comp} script={script} />
        ) : welded.left.type === "VB" ? (
          <VBBlock opts={opts} block={welded.left} script={script} />
        ) : (
          <WeldedBlock opts={opts} welded={welded.left} script={script} />
        )}
        <VBBlock opts={opts} block={welded.right} script={script} />
      </Border>
    </div>
  );
}

// function VerbSBlock({ opts, v, script }: {
//     opts: T.TextOptions,
//     script: "p" | "f",
//     v: T.VerbRenderedBlock["block"] | T.PerfectParticipleBlock,
// }) {
//     const [length, setLength] = useState<T.Length>("long");
//     function changeLength() {
//         setLength(o => (
//             o === "long"
//                 ? "short"
//                 : o === "short" && "mini" in v.ps
//                 ? "mini"
//                 : "long"
//         ));
//     }
//     return <div className="text-center">
//         {"long" in v.ps && <div className="clickable small mb-1" onClick={changeLength}>{length}</div>}
//         <Border>
//             <>
//                 {(v.type === "verb" || v.type === "perfectParticipleBlock") && v.complementWelded && <span className="mx-2">
//                     <ComplementBlock opts={opts} comp={v.complementWelded.selection} script={script} inside />
//                 </span>}
//                 {getLength(v.ps, length)[0][script]}
//             </>
//         </Border>
//         <div>{v.type === "perfectParticipleBlock" ? "Past Partic." : "Verb"}</div>
//         <EnglishBelow>{(v.type === "perfectParticipleBlock"
//             ? getEnglishParticipleInflection
//             : getEnglishPersonInfo
//         )(v.person, "short")}</EnglishBelow>
//     </div>
// }

// function ModalVerbBlock({ opts, v, script }: {
//     opts: T.TextOptions,
//     script: "p" | "f",
//     v: T.ModalVerbBlock,
// }) {
//     const [length, setLength] = useState<T.Length>("long");
//     function changeLength() {
//         setLength(o => (
//             o === "long"
//                 ? "short"
//                 : "long"
//         ));
//     }
//     return <div className="text-center">
//         {"long" in v.ps && <div className="clickable small mb-1" onClick={changeLength}>{length}</div>}
//         <Border>
//             <>
//                 {v.complementWelded && <span className="mx-2">
//                     <ComplementBlock opts={opts} comp={v.complementWelded.selection} script={script} inside />
//                 </span>}
//                 {getLength(v.ps, length)[0][script]}
//             </>
//         </Border>
//         <div>Verb</div>
//         <EnglishBelow>Ability</EnglishBelow>
//     </div>
// }

function PerfHeadBlock({
  // opts,
  ps,
  script,
}: {
  opts: T.TextOptions;
  ps: T.PsString;
  script: "p" | "f";
}) {
  return (
    <div className="text-center">
      <Border>{ps[script]}</Border>
      <div>perf. head</div>
      <SubText>{"\u00A0"}</SubText>
    </div>
  );
}

// function ModalAuxBlock({ opts, aux, script }: {
//     opts: T.TextOptions,
//     aux: T.ModalVerbKedulPart,
//     script: "p" | "f",

// }) {
//     return <div className="text-center">
//         <Border>
//             {aux.ps[0][script]}
//         </Border>
//         <div>Abil. Aux</div>
//         <EnglishBelow>{getEnglishPersonInfo(aux.verb.block.person, "short")}</EnglishBelow>
//     </div>;
// }

function NegBlock({
  // opts,
  imperative,
  script,
}: {
  opts: T.TextOptions;
  imperative: boolean;
  script: "p" | "f";
}) {
  return (
    <div className="text-center">
      <Border>
        {negativeParticle[imperative ? "imperative" : "nonImperative"][script]}
      </Border>
      <div>Neg.</div>
      <SubText>{imperative ? "don't" : "not"}</SubText>
    </div>
  );
}

function EquativeBlock({
  // opts,
  eq,
  script,
}: {
  opts: T.TextOptions;
  eq: T.EquativeRendered;
  script: "p" | "f";
}) {
  const [length, setLength] = useState<T.Length>("long");
  function changeLength() {
    setLength((o) =>
      o === "long"
        ? "short"
        : o === "short" && "mini" in eq.ps
        ? "mini"
        : "long"
    );
  }
  return (
    <div className="text-center">
      {"long" in eq.ps && (
        <div className="clickable small mb-1" onClick={changeLength}>
          {length}
        </div>
      )}
      <Border>{getLength(eq.ps, length)[0][script]}</Border>
      <div>Equative</div>
      <SubText>{getEnglishPersonInfo(eq.person, "short")}</SubText>
    </div>
  );
}

function SubjectBlock({
  opts,
  np,
  role,
  script,
}: {
  opts: T.TextOptions;
  np: T.Rendered<T.NPSelection>;
  role: "king" | "servant" | undefined;
  script: "p" | "f";
}) {
  const english = getEnglishFromRendered(np);
  return (
    <div className="text-center">
      <div>
        <strong>Subject</strong>
        {role ? roleIcon[role] : ""}
      </div>
      <NPBlock opts={opts} english={english} script={script}>
        {np}
      </NPBlock>
    </div>
  );
}

function ObjectBlock({
  opts,
  obj,
  role,
  script,
}: {
  opts: T.TextOptions;
  obj: T.Rendered<T.ObjectSelectionComplete>["selection"];
  role: "king" | "servant" | undefined;
  script: "p" | "f";
}) {
  if (typeof obj !== "object") {
    return null;
  }
  const english = getEnglishFromRendered(obj);
  return (
    <div className="text-center">
      <div>
        <strong>Object</strong>
        {role ? roleIcon[role] : ""}
      </div>
      <NPBlock opts={opts} english={english} script={script}>
        {obj}
      </NPBlock>
    </div>
  );
}

function NCompBlock({
  // opts,
  comp,
  script,
}: {
  script: "p" | "f";
  opts: T.TextOptions;
  comp: T.Comp;
}) {
  return (
    <div className="text-center">
      <Border>{comp.ps[script]}</Border>
      {comp.type === "AdjComp" && (
        <div>
          <div>
            adj.{" "}
            <span className="text-muted small">
              {getEnglishGenNumInfo(comp.gender, comp.number)}
            </span>
          </div>
          <SubText>{comp.ps.e}</SubText>
        </div>
      )}
    </div>
  );
}

function ComplementBlock({
  opts,
  comp,
  script,
  inside,
}: {
  script: "p" | "f";
  opts: T.TextOptions;
  comp:
    | T.Rendered<T.ComplementSelection["selection"]>
    | T.Rendered<T.UnselectedComplementSelection>["selection"];
  inside?: boolean;
}) {
  function AdjectiveBlock({
    // opts,
    adj,
  }: {
    opts: T.TextOptions;
    adj: T.Rendered<T.AdjectiveSelection>;
  }) {
    return (
      <div className="text-center">
        <Border>{adj.ps[0][script]}</Border>
        <div>
          Adj.{" "}
          <span className="text-muted small">
            ({getEnglishParticipleInflection(adj.person, "short")})
          </span>
        </div>
        <SubText>{adj.e}</SubText>
      </div>
    );
  }

  function LocAdvBlock({
    // opts,
    adv,
  }: {
    opts: T.TextOptions;
    adv: T.Rendered<T.LocativeAdverbSelection>;
  }) {
    return (
      <div className="text-center">
        <Border>{flattenLengths(adv.ps)[0][script]}</Border>
        <div>Loc. Adv.</div>
        <SubText>{adv.e}</SubText>
      </div>
    );
  }
  return (
    <div className="text-center">
      <div>Complement</div>
      {comp.type === "adjective" ? (
        <AdjectiveBlock opts={opts} adj={comp} />
      ) : comp.type === "loc. adv." ? (
        <LocAdvBlock opts={opts} adv={comp} />
      ) : comp.type === "noun" ? (
        <CompNounBlock opts={opts} noun={comp} script={script} />
      ) : comp.type === "unselected" ? (
        <div>
          <Border>____</Border>
          {!inside && (
            <>
              <div>&nbsp;</div>
              <SubText>{comp.e}</SubText>
            </>
          )}
        </div>
      ) : (
        <div>
          <Sandwich opts={opts} sandwich={comp} script={script} />
          <div>Sandwich</div>
          <SubText>{comp.e}</SubText>
        </div>
      )}
    </div>
  );
}

export function APBlock({
  opts,
  children,
  english,
  script,
}: {
  opts: T.TextOptions;
  children: T.Rendered<T.APSelection>;
  english?: string;
  script: "p" | "f";
}) {
  const ap = children;
  if (ap.selection.type === "adverb") {
    return (
      <div className="text-center">
        <Border>{ap.selection.ps[0][script]}</Border>
        <div>AP</div>
        <SubText>{english}</SubText>
      </div>
    );
  }
  return (
    <div>
      <Sandwich opts={opts} sandwich={ap.selection} script={script} />
      <div>AP</div>
      <SubText>{english}</SubText>
    </div>
  );
}

function Sandwich({
  opts,
  sandwich,
  script,
}: {
  opts: T.TextOptions;
  sandwich: T.Rendered<T.SandwichSelection<T.Sandwich>>;
  script: "p" | "f";
}) {
  return (
    <div className="text-center">
      <div className="text-center">Sandwich 🥪</div>
      <Border padding="0.75rem 0.5rem 0.25rem 0.5rem">
        <div
          className={`d-flex flex-row${
            script === "p" ? "-reverse" : ""
          } justify-content-between align-items-end`}
        >
          <Possesors opts={opts} script={script}>
            {sandwich.inside.selection.type !== "pronoun"
              ? sandwich.inside.selection.possesor
              : undefined}
          </Possesors>
          <div className="mr-2 ml-1 mb-1">
            <strong>{sandwich.before ? sandwich.before[script] : ""}</strong>
          </div>
          <div>
            <NPBlock opts={opts} inside script={script}>
              {sandwich.inside}
            </NPBlock>
          </div>
          <div className="ml-2 mr-1 mb-1">
            <strong>{sandwich.after ? sandwich.after[script] : ""}</strong>
          </div>
        </div>
      </Border>
    </div>
  );
}

function Determiners({
  // opts,
  script,
  children,
}: {
  opts: T.TextOptions;
  script: "p" | "f";
  children: T.Rendered<T.DeterminersSelection> | undefined;
}) {
  if (!children || children.determiners.length === 0) {
    return null;
  }
  return (
    <div className="text-center">
      <div className={`d-flex flex-row${script === "p" ? "-reverse" : ""}`}>
        {children.determiners.map((d) => (
          <div className="mx-1">
            <Border padding={"1rem"}>{d.ps[0][script]}</Border>
            <div>{"demonstrative" in d.determiner ? "DEM" : "DET"}</div>
            <SubText>{d.e}</SubText>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompNounBlock({
  // opts,
  noun,
  script,
}: {
  opts: T.TextOptions;
  noun: T.Rendered<T.NounSelection>;
  script: "p" | "f";
}) {
  return (
    <div className="text-center">
      <Border
        // extraClassName={`${!inside && hasPossesor} ? "pt-2" : ""`}
        padding={"1rem"}
      >
        {flattenLengths(noun.ps)[0][script]}
      </Border>
      <div>Comp. Noun</div>
      <SubText>{noun.e}</SubText>
    </div>
  );
}

export function NPBlock({
  opts,
  children,
  inside,
  english,
  script,
}: {
  opts: T.TextOptions;
  children: T.Rendered<T.NPSelection>;
  inside?: boolean;
  english?: string;
  script: "p" | "f";
}) {
  const np = children;
  const hasPossesor = !!(
    np.selection.type !== "pronoun" &&
    np.selection.possesor &&
    !np.selection.possesor.shrunken
  );
  const detsWithoutNoun =
    np.selection.determiners && !np.selection.determiners.withNoun;
  const elements = [
    ...(!inside
      ? [
          <Possesors opts={opts} script={script}>
            {np.selection.type !== "pronoun"
              ? np.selection.possesor
              : undefined}
          </Possesors>,
        ]
      : []),
    <Determiners opts={opts} script={script}>
      {np.selection.determiners}
    </Determiners>,
    <div
      style={{
        opacity: detsWithoutNoun ? 0.5 : 1,
      }}
    >
      <Adjectives opts={opts} script={script}>
        {np.selection.adjectives}
      </Adjectives>
    </div>,
    <div
      style={{
        opacity: detsWithoutNoun ? 0.5 : 1,
      }}
      className={np.selection.adjectives?.length ? "mx-1" : ""}
    >
      {" "}
      {flattenLengths(np.selection.ps)[0][script]}
    </div>,
  ].filter((x) => {
    // @ts-expect-error yes I know
    return x !== " ";
  });
  const el = script === "p" ? elements.reverse() : elements;
  return (
    <div className="text-center">
      <Border
        // extraClassName={`!inside && hasPossesor ? "pt-2" : ""`}
        padding={
          inside
            ? "0.3rem"
            : hasPossesor
            ? "0.5rem 0.8rem 0.25rem 0.8rem"
            : "1rem"
        }
      >
        {el}
      </Border>
      <div className={inside ? "small" : ""}>
        NP
        {!inside ? (
          <>
            {` `}
            <span className="text-muted small">
              ({getEnglishPersonInfo(np.selection.person, "short")})
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
      {!inside && <SubText>{english}</SubText>}
    </div>
  );
}

function Possesors({
  opts,
  children,
  script,
}: {
  opts: T.TextOptions;
  children: { shrunken: boolean; np: T.Rendered<T.NPSelection> } | undefined;
  script: "p" | "f";
}) {
  if (!children) {
    return null;
  }
  if (children.shrunken) {
    return null;
  }
  const contraction = checkForContraction(children.np, script);
  return (
    <div
      className={`d-flex flex-row${
        script === "p" ? "-reverse" : ""
      } mr-1 align-items-end`}
      style={{
        marginBottom: "0.5rem",
        borderBottom: "1px solid grey",
      }}
    >
      {children.np.selection.type !== "pronoun" && (
        <Possesors opts={opts} script={script}>
          {children.np.selection.possesor}
        </Possesors>
      )}
      <div>
        {contraction && <div className="mb-1">({contraction})</div>}
        <div
          className={classNames(
            "d-flex",
            script === "f" ? "flex-row" : "flex-row-reverse",
            "align-items-center",
            { "text-muted": contraction }
          )}
        >
          <div className="mx-1 pb-2">{script === "p" ? "د" : "du"}</div>
          <div>
            <NPBlock script={script} opts={opts} inside>
              {children.np}
            </NPBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

function Adjectives({
  // opts,
  children,
  script,
}: {
  opts: T.TextOptions;
  children: T.Rendered<T.AdjectiveSelection>[] | undefined;
  script: "p" | "f";
}) {
  if (!children) {
    return null;
  }
  const c = script === "p" ? children.reverse() : children;
  if (c.length === 0) {
    return null;
  }
  return (
    <em className="mr-1">
      {c.map((a) => a.ps[0][script]).join(" ")}
      {` `}
    </em>
  );
}

function SubText({ children: e }: { children: string | undefined }) {
  return (
    <div
      className="small text-muted text-center"
      style={{
        margin: "0 auto",
        maxWidth: "300px",
        height: "1rem",
      }}
    >
      {e ? e : ""}
    </div>
  );
}

function checkForContraction(
  np: T.Rendered<T.NPSelection>,
  script: "p" | "f"
): string | undefined {
  if (np.selection.type !== "pronoun") return undefined;
  if (
    np.selection.person === T.Person.FirstSingMale ||
    np.selection.person === T.Person.FirstSingFemale
  ) {
    return script === "f" ? "zmaa" : "زما";
  }
  if (
    np.selection.person === T.Person.SecondSingMale ||
    np.selection.person === T.Person.SecondSingFemale
  ) {
    return script === "f" ? "staa" : "ستا";
  }
  if (
    np.selection.person === T.Person.FirstPlurMale ||
    np.selection.person === T.Person.FirstPlurFemale
  ) {
    return script === "f" ? "zmoonG" : "زمونږ";
  }
  if (
    np.selection.person === T.Person.SecondPlurMale ||
    np.selection.person === T.Person.SecondPlurFemale
  ) {
    return script === "f" ? "staaso" : "ستاسو";
  }
  return undefined;
}
