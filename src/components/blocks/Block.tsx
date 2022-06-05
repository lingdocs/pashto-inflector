import * as T from "../../types";
import classNames from "classnames";
import {
    getEnglishFromRendered,
} from "../../lib/phrase-building/np-tools";

function Block({ opts, block }: {
    opts: T.TextOptions,
    block: T.Block,
}) {
    if ("equative" in block) {
        return <EquativeBlock opts={opts} eq={block.equative} />;
    }
    if (block.type === "AP") {
        const english = getEnglishFromRendered(block);
        return <APBlock opts={opts} english={english}>{block}</APBlock>
    }
    if (block.type === "subjectSelection") {
        return <SubjectBlock opts={opts} np={block.selection} />
    }
    if (block.type === "predicateSelection") {
        const english = getEnglishFromRendered(block.selection);
        return <div className="text-center">
            <div><strong>Predicate</strong></div>
            {block.selection.type === "EQComp"
                ? <EqCompBlock opts={opts} comp={block.selection.selection} />
                : <NPBlock opts={opts} english={english}>{block.selection}</NPBlock>}
        </div>
    }
    if (block.type === "nu") {
        return <NUBlock opts={opts} />
    }
    return null;
}

export default Block;

function NUBlock({ opts }: {
    opts: T.TextOptions,
}) {
    return <div>
        <div
            className={classNames("d-flex flex-row justify-content-center align-items-center")}
            style={{
                border: "2px solid black",
                padding: "1rem",
                textAlign: "center",
            }}
        >
            nu
        </div>
        <div>Neg.</div>
        <EnglishBelow>not</EnglishBelow>
    </div>;
}

function EquativeBlock({ opts, eq }: {
    opts: T.TextOptions,
    eq: T.EquativeRendered,
}) {
    return <div>
        <div
            className={classNames("d-flex flex-row justify-content-center align-items-center")}
            style={{
                border: "2px solid black",
                padding: "1rem",
                textAlign: "center",
            }}
        >
            {"short" in eq.ps ? eq.ps.short[0].f : eq.ps[0].f}
        </div>
        <div>Equative</div>
        <EnglishBelow>{"="}</EnglishBelow>
    </div>;
}

function SubjectBlock({ opts, np }: {
    opts: T.TextOptions,
    np: T.Rendered<T.NPSelection>,
}) {
    const english = getEnglishFromRendered(np);
    return <div className="text-center">
        <div><strong>Subject</strong></div>
        <NPBlock opts={opts} english={english}>{np}</NPBlock>
    </div>;
}

function EqCompBlock({ opts, comp }: {
    opts: T.TextOptions,
    comp: T.Rendered<T.EqCompSelection["selection"]>,
}) {
    function AdjectiveBlock({ opts, adj }: {
        opts: T.TextOptions,
        adj: T.Rendered<T.AdjectiveSelection>,
    }) {
        return <div>
            <div
                className={classNames("d-flex flex-row justify-content-center align-items-center")}
                style={{
                    border: "2px solid black",
                    padding: "1rem",
                    textAlign: "center",
                }}
            >
                {adj.ps[0].f}
            </div>
            <div>Adj.</div>
            <EnglishBelow>{adj.e}</EnglishBelow>
        </div>;
    }

    function LocAdvBlock({ opts, adv }: {
        opts: T.TextOptions,
        adv: T.Rendered<T.LocativeAdverbSelection>,
    }) {
        return <div>
            <div
                className={classNames("d-flex flex-row justify-content-center align-items-center")}
                style={{
                    border: "2px solid black",
                    padding: "1rem",
                    textAlign: "center",
                }}
            >
                {adv.ps[0].f}
            </div>
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
                    <Sandwich opts={opts} sandwich={comp} />
                    <div>Sandwich</div>
                    <EnglishBelow>{comp.e}</EnglishBelow>
                </div>}
    </div>;
}

export function APBlock({ opts, children, english }: {
    opts: T.TextOptions,
    children: T.Rendered<T.APSelection>,
    english?: string,
}) {
    const ap = children;
    if (ap.selection.type === "adverb") {
        return <div>
            <div
                className={classNames("d-flex flex-row justify-content-center align-items-center")}
                style={{
                    border: "2px solid black",
                    padding: "1rem",
                    textAlign: "center",
                }}
            >
                {ap.selection.ps[0].f}
            </div>
            <div>AP</div>
            {english && <div className="small text-muted text-center" style={{
                // TODO: find a better way to keep this limited to the width of the div above
                // don't let this make the div above expand
                margin: "0 auto",
                maxWidth: "300px",
            }}>{english}</div>}
        </div>;
    }
    return <div>
        <Sandwich opts={opts} sandwich={ap.selection} />
        <div>AP</div>
        <EnglishBelow>{english}</EnglishBelow>
    </div>;
}

function Sandwich({ opts, sandwich }: {
    opts: T.TextOptions,
    sandwich: T.Rendered<T.SandwichSelection<T.Sandwich>>,
}) {
    return <div>
        <div className="text-center">Sandwich 🥪</div>
        <div
            className={classNames("d-flex flex-row justify-content-center align-items-center")}
            style={{
                border: "2px solid black",
                padding: "0.75rem 0.5rem 0.25rem 0.5rem",
                textAlign: "center",
            }}
        >
            <div className="d-flex flex-row justify-content-between align-items-end">
                <Possesors opts={opts}>{sandwich.inside.selection.type !== "pronoun" ? sandwich.inside.selection.possesor : undefined}</Possesors>
                <div className="mr-2 ml-1 mb-1"><strong>{sandwich.before ? sandwich.before.f : ""}</strong></div>
                <div>
                    <NPBlock opts={opts} inside>{sandwich.inside}</NPBlock>
                </div>
                <div className="ml-2 mr-1 mb-1"><strong>{sandwich.after ? sandwich.after.f : ""}</strong></div>
            </div>
        </div>
    </div>;
}

export function NPBlock({ opts, children, inside, english }: {
    opts: T.TextOptions,
    children: T.Rendered<T.NPSelection>,
    inside?: boolean,
    english?: string,
}) {
    const np = children;
    const hasPossesor = !!(np.selection.type !== "pronoun" && np.selection.possesor && !np.selection.possesor.shrunken);
    return <div>
        <div
            className={classNames("d-flex flex-row justify-content-center align-items-center", { "pt-2": !inside && hasPossesor })}
            style={{
                border: "2px solid black",
                padding: inside ? "0.3rem" : hasPossesor ? "0.5rem 1rem 0.25rem 1rem" : "1rem",
                textAlign: "center",
            }}
        >
            {!inside && <Possesors opts={opts}>{np.selection.type !== "pronoun" ? np.selection.possesor : undefined}</Possesors>}
            <Adjectives opts={opts}>{np.selection.adjectives}</Adjectives>
            <div> {np.selection.ps[0].f}</div>
        </div>
        <div className={inside ? "small" : ""}>NP</div>
        <EnglishBelow>{english}</EnglishBelow>
    </div>
}

function Possesors({ opts, children }: {
    opts: T.TextOptions,
    children: { shrunken: boolean, np: T.Rendered<T.NPSelection> } | undefined,
}) {
    if (!children) {
        return null;
    }
    if (children.shrunken) {
        return null;
    }
    const contraction = checkForContraction(children.np);
    return <div className="d-flex flex-row mr-1 align-items-end" style={{
        marginBottom: "0.5rem",
        borderBottom: "1px solid grey",
    }}>
        {children.np.selection.type !== "pronoun" && <Possesors opts={opts}>{children.np.selection.possesor}</Possesors>}
        <div>
            {contraction && <div className="mb-1">({contraction})</div>}
            <div className={classNames("d-flex", "flex-row", "align-items-center", { "text-muted": contraction })}>
                <div className="mr-1 pb-2">du</div>
                <div>
                    <NPBlock opts={opts} inside>{children.np}</NPBlock>
                </div>
            </div>

        </div>
    </div>
}

function checkForContraction(np: T.Rendered<T.NPSelection>): string | undefined {
    if (np.selection.type !== "pronoun") return undefined;
    if (np.selection.person === T.Person.FirstSingMale || np.selection.person === T.Person.FirstSingFemale) {
        return "zmaa"
    }
    if (np.selection.person === T.Person.SecondSingMale || np.selection.person === T.Person.SecondSingFemale) {
        return "staa"
    }
    if (np.selection.person === T.Person.FirstPlurMale || np.selection.person === T.Person.FirstPlurFemale) {
        return "zmoonG"
    }
    if (np.selection.person === T.Person.SecondPlurMale || np.selection.person === T.Person.SecondPlurFemale) {
        return "staaso"
    }
    return undefined;
}

function Adjectives({ opts, children }: {
    opts: T.TextOptions,
    children: T.Rendered<T.AdjectiveSelection>[] | undefined,
}) {
    if (!children) {
        return null;
    }
    return <em className="mr-1">
        {children.map(a => a.ps[0].f).join(" ")}{` `}
    </em>
}

function EnglishBelow({ children: e }: { children: string | undefined }) {
    return <div className="small text-muted text-center" style={{
        margin: "0 auto",
        maxWidth: "300px",
        height: "1rem",
    }}>{e ? e : ""}</div>;
}
