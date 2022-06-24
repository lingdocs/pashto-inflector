import * as T from "../../types";
import classNames from "classnames";
import {
    getEnglishFromRendered,
} from "../../lib/phrase-building/np-tools";
import { getEnglishPersonInfo } from "../../library";
import { useState } from "react";
import { getLength } from "../../lib/p-text-helpers";
import { roleIcon } from "../vp-explorer/VPExplorerExplanationModal";
import { negativeParticle } from "../../lib/grammar-units";

function Block({ opts, block, king, script }: {
    opts: T.TextOptions,
    block: T.Block,
    king?: "subject" | "object" | undefined,
    script: "p" | "f";
}) {
    if ("equative" in block.block) {
        return <EquativeBlock opts={opts} eq={block.block.equative} script={script} />;
    }
    if (block.block.type === "AP") {
        const english = getEnglishFromRendered(block.block);
        return <APBlock opts={opts} english={english} script={script}>{block.block}</APBlock>
    }
    if (block.block.type === "subjectSelection") {
        const role = king === "subject" ? "king" : king === "object" ? "servant" : undefined;
        return <SubjectBlock opts={opts} np={block.block.selection} role={role} script={script} />
    }
    if (block.block.type === "predicateSelection") {
        const english = getEnglishFromRendered(block.block.selection);
        return <div className="text-center">
            <div><strong>Predicate</strong></div>
            {block.block.selection.type === "EQComp"
                ? <EqCompBlock opts={opts} comp={block.block.selection.selection} script={script} />
                : <NPBlock opts={opts} english={english} script={script}>{block.block.selection}</NPBlock>}
        </div>
    }
    if (block.block.type === "negative") {
        return <NegBlock opts={opts} imperative={block.block.imperative} script={script} />
    }
    if (block.block.type === "perfectiveHead") {
        return <PerfHeadBlock opts={opts} ps={block.block.ps} script={script} />
    }
    if (block.block.type === "verbComplement") {
        return <VCompBlock opts={opts} comp={block.block.complement} script={script} />;
    }
    if (block.block.type === "verb") {
        return <VerbSBlock opts={opts} v={block.block.block} script={script} />;
    }
    if (block.block.type === "objectSelection") {
        const role = king === "object" ? "king" : king === "subject" ? "servant" : undefined;
        return <ObjectBlock opts={opts} obj={block.block.selection} role={role} script={script} />;
    }
    if (block.block.type === "perfectParticipleBlock") {
        return <VerbSBlock opts={opts} v={block.block} script={script} />;
    }
    if (block.block.type === "perfectEquativeBlock") {
        return <EquativeBlock opts={opts} eq={block.block} script={script} />;
    }
    if (block.block.type === "modalVerbBlock") {
        return <ModalVerbBlock opts={opts} v={block.block} script={script} />;
    }
    if (block.block.type === "modalVerbKedulPart") {
        return <ModalAuxBlock opts={opts} aux={block.block} script={script} />
    }
    return null;
}

export default Block;

function Border({ children, extraClassName, padding }: { children: JSX.Element | JSX.Element[] | string, extraClassName?: string, padding?: string }) {
    return <div
        className={`d-flex flex-row justify-content-center align-items-center ${extraClassName ? extraClassName : ""}`}
        style={{
            border: "2px solid black",
            padding: padding ? padding : "1rem",
            textAlign: "center",
        }}
    >
        <>{children}</>
    </div>
}

function VerbSBlock({ opts, v, script }: {
    opts: T.TextOptions,
    script: "p" | "f",
    v: T.VerbRenderedBlock["block"] | T.PerfectParticipleBlock,
}) {
    const [length, setLength] = useState<T.Length>("long");
    function changeLength() {
        setLength(o => (
            o === "long"
                ? "short"
                : o === "short" && "mini" in v.ps
                ? "mini"
                : "long"
        ));
    }
    return <div className="text-center">
        {"long" in v.ps && <div className="clickable small mb-1" onClick={changeLength}>{length}</div>}
        <Border>
            {getLength(v.ps, length)[0][script]}
        </Border>
        <div>{v.type === "perfectParticipleBlock" ? "Past Partic." : "Verb"}</div>
        <EnglishBelow>{getEnglishPersonInfo(v.person, "short")}</EnglishBelow>
    </div>
}

function ModalVerbBlock({ opts, v, script }: {
    opts: T.TextOptions,
    script: "p" | "f",
    v: T.ModalVerbBlock,
}) {
    const [length, setLength] = useState<T.Length>("long");
    function changeLength() {
        setLength(o => (
            o === "long"
                ? "short"
                : "long"
        ));
    }
    return <div className="text-center">
        {"long" in v.ps && <div className="clickable small mb-1" onClick={changeLength}>{length}</div>}
        <Border>
            {getLength(v.ps, length)[0][script]}
        </Border>
        <div>Verb</div>
        <EnglishBelow>Modal</EnglishBelow>
    </div>
}

function PerfHeadBlock({ opts, ps, script }: {
    opts: T.TextOptions,
    ps: T.PsString,
    script: "p" | "f",

}) {
    return <div className="text-center">
        <Border>
            {ps[script]}
        </Border>
        <div>perf. head</div>
        <EnglishBelow>{'\u00A0'}</EnglishBelow>
    </div>;
}

function VCompBlock({ opts, comp, script }: {
    opts: T.TextOptions,
    comp: T.VerbComplementBlock["complement"],
    script: "p" | "f",
}) {
    return <div className="text-center">
        <Border>
            {comp[script]}
        </Border>
        <div>Complement</div>
        <EnglishBelow>{'\u00A0'}</EnglishBelow>
    </div>;
}

function ModalAuxBlock({ opts, aux, script }: {
    opts: T.TextOptions,
    aux: T.ModalVerbKedulPart,
    script: "p" | "f",

}) {
    return <div className="text-center">
        <Border>
            {aux.ps[0][script]}
        </Border>
        <div>Modal Aux</div>
        <EnglishBelow>{getEnglishPersonInfo(aux.verb.block.person, "short")}</EnglishBelow>
    </div>;
}

function NegBlock({ opts, imperative, script }: {
    opts: T.TextOptions,
    imperative: boolean,
    script: "p" | "f",
}) {
    return <div className="text-center">
        <Border>
            {negativeParticle[imperative ? "imperative" : "nonImperative"][script]}
        </Border>
        <div>Neg.</div>
        <EnglishBelow>{imperative ? "don't" : "not"}</EnglishBelow>
    </div>;
}

function EquativeBlock({ opts, eq, script }: {
    opts: T.TextOptions,
    eq: T.EquativeRendered | T.PerfectEquativeBlock,
    script: "p" | "f",
}) {
    const [length, setLength] = useState<T.Length>("long");
    function changeLength() {
        setLength(o => (
            o === "long"
                ? "short"
                : o === "short" && "mini" in eq.ps
                ? "mini"
                : "long"
        ));
    }
    return <div className="text-center">
        {"long" in eq.ps && <div className="clickable small mb-1" onClick={changeLength}>{length}</div>}
        <Border>
            {getLength(eq.ps, length)[0][script]}
        </Border>
        <div>Equative</div>
        <EnglishBelow>{getEnglishPersonInfo(eq.person, "short")}</EnglishBelow>
    </div>;
}

function SubjectBlock({ opts, np, role, script }: {
    opts: T.TextOptions,
    np: T.Rendered<T.NPSelection>,
    role: "king" | "servant" | undefined,
    script: "p" | "f",
}) {
    const english = getEnglishFromRendered(np);
    return <div className="text-center">
        <div><strong>Subject</strong>{role ? roleIcon[role] : ""}</div>
        <NPBlock opts={opts} english={english} script={script}>{np}</NPBlock>
    </div>;
}

function ObjectBlock({ opts, obj, role, script }: {
    opts: T.TextOptions,
    obj: T.Rendered<T.ObjectSelectionComplete>["selection"],
    role: "king" | "servant" | undefined,
    script: "p" | "f",
}) {
    if (typeof obj !== "object") {
        return null;
    }
    const english = getEnglishFromRendered(obj);
    return <div className="text-center">
        <div><strong>Object</strong>{role ? roleIcon[role] : ""}</div>
        <NPBlock opts={opts} english={english} script={script}>{obj}</NPBlock>
    </div>;
}

function EqCompBlock({ opts, comp, script }: {
    script: "p" | "f",
    opts: T.TextOptions,
    comp: T.Rendered<T.EqCompSelection["selection"]>,
}) {
    function AdjectiveBlock({ opts, adj }: {
        opts: T.TextOptions,
        adj: T.Rendered<T.AdjectiveSelection>,
    }) {
        return <div className="text-center">
            <Border>
                {adj.ps[0][script]}
            </Border>
            <div>Adj.</div>
            <EnglishBelow>{adj.e}</EnglishBelow>
        </div>;
    }

    function LocAdvBlock({ opts, adv }: {
        opts: T.TextOptions,
        adv: T.Rendered<T.LocativeAdverbSelection>,
    }) {
        return <div className="text-center">
            <Border>
                {adv.ps[0][script]}
            </Border>
            <div>Loc. Adv.</div>
            <EnglishBelow>{adv.e}</EnglishBelow>
        </div>;
    }

    return <div className="text-center">
        <div>Comp.</div>
        {comp.type === "adjective"
            ? <AdjectiveBlock opts={opts} adj={comp} />
            : comp.type === "loc. adv."
                ? <LocAdvBlock opts={opts} adv={comp} />
                : <div>
                    <Sandwich opts={opts} sandwich={comp} script={script} />
                    <div>Sandwich</div>
                    <EnglishBelow>{comp.e}</EnglishBelow>
                </div>}
    </div>;
}

export function APBlock({ opts, children, english, script }: {
    opts: T.TextOptions,
    children: T.Rendered<T.APSelection>,
    english?: string,
    script: "p" | "f",
}) {
    const ap = children;
    if (ap.selection.type === "adverb") {
        return <div className="text-center">
            <Border>
                {ap.selection.ps[0][script]}
            </Border>
            <div>AP</div>
            <EnglishBelow>{english}</EnglishBelow>
        </div>;
    }
    return <div>
        <Sandwich opts={opts} sandwich={ap.selection} script={script} />
        <div>AP</div>
        <EnglishBelow>{english}</EnglishBelow>
    </div>;
}

function Sandwich({ opts, sandwich, script }: {
    opts: T.TextOptions,
    sandwich: T.Rendered<T.SandwichSelection<T.Sandwich>>,
    script: "p" | "f",
}) {
    return <div className="text-center">
        <div className="text-center">Sandwich 🥪</div>
        <Border padding="0.75rem 0.5rem 0.25rem 0.5rem">
            <div className={`d-flex flex-row${script === "p" ? "-reverse" : ""} justify-content-between align-items-end`}>
                <Possesors opts={opts} script={script}>{sandwich.inside.selection.type !== "pronoun" ? sandwich.inside.selection.possesor : undefined}</Possesors>
                <div className="mr-2 ml-1 mb-1"><strong>{sandwich.before ? sandwich.before.f : ""}</strong></div>
                <div>
                    <NPBlock opts={opts} inside script={script}>{sandwich.inside}</NPBlock>
                </div>
                <div className="ml-2 mr-1 mb-1"><strong>{sandwich.after ? sandwich.after.f : ""}</strong></div>
            </div>
        </Border>
    </div>;
}

export function NPBlock({ opts, children, inside, english, script }: {
    opts: T.TextOptions,
    children: T.Rendered<T.NPSelection>,
    inside?: boolean,
    english?: string,
    script: "p" | "f",
}) {
    const np = children;
    const hasPossesor = !!(np.selection.type !== "pronoun" && np.selection.possesor && !np.selection.possesor.shrunken);
    const elements = [
        ...!inside ? [<Possesors opts={opts} script={script}>{np.selection.type !== "pronoun" ? np.selection.possesor : undefined}</Possesors>] : [],
        <Adjectives opts={opts} script={script}>{np.selection.adjectives}</Adjectives>,
        <div className={np.selection.adjectives?.length ? "mx-1" : ""}> {np.selection.ps[0][script]}</div>,
    ];
    const el = script === "p" ? elements.reverse() : elements;
    return <div className="text-center">
        <Border
            extraClassName={`!inside && hasPossesor ? "pt-2" : ""`}
            padding={inside ? "0.3rem" : hasPossesor ? "0.5rem 0.8rem 0.25rem 0.8rem" : "1rem"}
        >
            {el}
        </Border>
        <div className={inside ? "small" : ""}>
            NP
            {!inside ? <>
                {` `}
                <span className="text-muted small">({getEnglishPersonInfo(np.selection.person, "short")})</span>
            </> : <></>}
        </div>
        {!inside && <EnglishBelow>{english}</EnglishBelow>}
    </div>
}

function Possesors({ opts, children, script }: {
    opts: T.TextOptions,
    children: { shrunken: boolean, np: T.Rendered<T.NPSelection> } | undefined,
    script: "p" | "f",
}) {
    if (!children) {
        return null;
    }
    if (children.shrunken) {
        return null;
    }
    const contraction = checkForContraction(children.np, script);
    return <div className={`d-flex flex-row${script === "p" ? "-reverse" : ""} mr-1 align-items-end`} style={{
        marginBottom: "0.5rem",
        borderBottom: "1px solid grey",
    }}>
        {children.np.selection.type !== "pronoun" && <Possesors opts={opts} script={script}>{children.np.selection.possesor}</Possesors>}
        <div>
            {contraction && <div className="mb-1">({contraction})</div>}
            <div className={classNames("d-flex", (script === "f" ? "flex-row" : "flex-row-reverse"), "align-items-center", { "text-muted": contraction })}>
                <div className="mx-1 pb-2">{script === "p" ? "د" : "du"}</div>
                <div>
                    <NPBlock script={script} opts={opts} inside>{children.np}</NPBlock>
                </div>
            </div>

        </div>
    </div>
}

function Adjectives({ opts, children, script }: {
    opts: T.TextOptions,
    children: T.Rendered<T.AdjectiveSelection>[] | undefined,
    script: "p" | "f",
}) {
    if (!children) {
        return null;
    }
    const c = script === "p"
        ? children.reverse()
        : children;
    return <em className="mr-1">
        {c.map(a => a.ps[0][script]).join(" ")}{` `}
    </em>
}

function EnglishBelow({ children: e }: { children: string | undefined }) {
    return <div className="small text-muted text-center" style={{
        margin: "0 auto",
        maxWidth: "300px",
        height: "1rem",
    }}>{e ? e : ""}</div>;
}

function checkForContraction(np: T.Rendered<T.NPSelection>, script: "p" | "f"): string | undefined {
    if (np.selection.type !== "pronoun") return undefined;
    if (np.selection.person === T.Person.FirstSingMale || np.selection.person === T.Person.FirstSingFemale) {
        return script === "f" ? "zmaa" : "زما";
    }
    if (np.selection.person === T.Person.SecondSingMale || np.selection.person === T.Person.SecondSingFemale) {
        return script === "f" ? "staa" : "ستا";
    }
    if (np.selection.person === T.Person.FirstPlurMale || np.selection.person === T.Person.FirstPlurFemale) {
        return script === "f" ? "zmoonG" : "زمونږ";
    }
    if (np.selection.person === T.Person.SecondPlurMale || np.selection.person === T.Person.SecondPlurFemale) {
        return script === "f" ? "staaso" : "ستاسو";
    }
    return undefined;
}

