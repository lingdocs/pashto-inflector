import PhraseBuilder from "../components/src/vp-explorer/VPExplorer";
import * as T from "../types";
import Pashto from "../components/src/Pashto";
import Phonetics from "../components/src/Phonetics";
import { getVerbInfo } from "../lib/src/verb-info";
import verbs from "../verbs";
import { useStickyState } from "../components/library";
import {
    clamp
} from "../lib/src/p-text-helpers";
import {
    randomNumber,
} from "../lib/src/misc-helpers";
import { entryFeeder } from "./entryFeeder";
import { renderVerb } from "../lib/src/new-verb-engine/render-verb";
import NPPronounPicker from "../components/src/np-picker/NPPronounPicker";

const transitivities: T.Transitivity[] = [
    "transitive",
    "intransitive",
    "grammatically transitive",
];

const allVerbs = verbs.map((v: { entry: T.DictionaryEntry, complement?: T.DictionaryEntry }) => ({
    verb: v,
    info: getVerbInfo(v.entry, v.complement),
}));

type VerbType = "simple" | "stative compound" | "dynamic compound";
const verbTypes: VerbType[] = [
    "simple",
    "stative compound",
    "dynamic compound",
];

const testVerbTenses: T.VerbTense[] = [
    "presentVerb",
    "subjunctiveVerb",
    "imperfectiveFuture",
    "perfectiveFuture",
    "imperfectivePast",
    "perfectivePast",
    "habitualImperfectivePast",
    "habitualPerfectivePast",
];

const testPerfectTenses: T.PerfectTense[] = [
    "presentPerfect",
    "futurePerfect",
    "habitualPerfect",
    "pastPerfect",
    "subjunctivePerfect",
    "wouldBePerfect",
    "wouldHaveBeenPerfect",
    "pastSubjunctivePerfect",
];

const testAbilityTenses: T.AbilityTense[] = testVerbTenses.map<T.AbilityTense>(t => `${t}Modal`);

const testTenses = [
    ...testVerbTenses,
    ...testPerfectTenses,
    ...testAbilityTenses,
];

function VPBuilderDemo({ opts }: {
    opts: T.TextOptions,
}) {
    const [verbTs, setVerbTs] = useStickyState<number>(0, "verbTs1");
    const [verbTypeShowing, setVerbTypeShowing] = useStickyState<VerbType>("simple", "vTypeShowing");
    const [transitivityShowing, setTransitivityShowing] = useStickyState<T.Transitivity>("intransitive", "transitivityShowing1");
    const [testPerson, setTestPerson] = useStickyState<T.PronounSelection>({
        type: "pronoun",
        distance: "far",
        person: 0,
    }, "testPronoun");
    const [testVoice, setTestVoice] = useStickyState<T.Voice>("active", "testVoice");
    const [testTense, setTestTense] = useStickyState<T.VerbTense | T.PerfectTense | T.AbilityTense>("presentVerb", "testTense");
    // const onlyGrammTrans = (arr: Transitivity[]) => (
    //     arr.length === 1 && arr[0] === "grammatically transitive"
    // );
    // const ensureSimpleVerbTypeSelected = () => {
    //     if (!verbTypesShowing.includes["simple"]) {
    //         setVerbTypesShowing([...verbTypesShowing, "simple"]);
    //     }
    // }
    const handleVerbIndexChange = (e: any) => {
        setVerbTs(parseInt(e.target.value));
    }
    const handleTypeSelection = (e: any) => {
        const type = e.target.value as VerbType;
        if (type === "dynamic compound") {
            setTransitivityShowing("transitive");
        }
        if (type === "stative compound" && transitivityShowing === "grammatically transitive") {
            setTransitivityShowing("transitive");
        }
        setVerbTypeShowing(type);
    }
    const handleTransitivitySelection = (e: any) => {
        const transitivity = e.target.value as T.Transitivity;
        if (transitivity === "grammatically transitive") {
            setVerbTypeShowing("simple");
        }
        if (transitivity === "intransitive" && verbTypeShowing === "dynamic compound") {
            setTransitivityShowing("transitive");
            return;
        }
        setTransitivityShowing(e.target.value as T.Transitivity);
    }
    const verbsAvailable = allVerbs.filter((verb) => (
        (
            (verb.info.type === "transitive or grammatically transitive simple" && verbTypeShowing === "simple") && (transitivityShowing === "transitive" || transitivityShowing === "grammatically transitive")
        ) ||
        ((
            verbTypeShowing === verb.info.type || 
            (verbTypeShowing === "stative compound" && verb.info.type === "dynamic or stative compound") ||
            (verbTypeShowing === "dynamic compound" && verb.info.type === "dynamic or stative compound") ||
            (verbTypeShowing === "dynamic compound" && verb.info.type === "dynamic or generative stative compound") ||
            (verbTypeShowing === "stative compound" && verb.info.type === "dynamic or generative stative compound")
        )
        && (
            transitivityShowing === verb.info.transitivity
        ))
    )).sort((a, b) => a.verb.entry.p.localeCompare(b.verb.entry.p, "ps"));

    const v = (() => {
        const vFound = verbsAvailable.find(v => v.verb.entry.ts === verbTs);
        if (vFound) return vFound;
        if (verbsAvailable.length === 0) return undefined;
        const vTopOfList = verbsAvailable[0];
        setVerbTs(vTopOfList.verb.entry.ts);
        return vTopOfList;
    })();

    const pickRandomVerb = () => {
        let newIndex: number;
        do {
          newIndex = randomNumber(0, verbsAvailable.length);
        } while(verbsAvailable[newIndex].verb.entry.ts === verbTs);
        setVerbTs(verbsAvailable[newIndex].verb.entry.ts);
    };
    const makeVerbLabel = (entry: T.DictionaryEntry): string => (
        `${entry.p} - ${clamp(entry.e, 20)}`
    );
    const rv = v ? renderVerb({
        // verb: { entry: {"ts":1527815399,"i":15035,"p":"وهل","f":"wahul","g":"wahul","e":"to hit","r":4,"c":"v. trans.","tppp":"واهه","tppf":"waahu","ec":"hit,hits,hitting,hit,hit"} as T.VerbDictionaryEntry},
        // verb: { entry: {"ts":1527814596,"i":8648,"p":"شرمول","f":"shărmawul","g":"sharmawul","e":"to shame, to disgrace, to dishonor, to embarrass","r":4,"c":"v. trans.","ec":"embarrass"} as T.VerbDictionaryEntry },
        verb: v.verb as T.VerbEntry,
        tense: testTense,
        person: testPerson.person,
        voice: testVoice,
    }) : undefined;
    // const rs = v ? getAllRs(v.verb as T.VerbEntry) : undefined
    return <div className="mt-4">
        <div className="d-block mx-auto card" style={{ maxWidth: "700px", background: "var(--closer)"}}>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6">
                        {v ?
                            <div>
                                <div className="mb-1">Select a verb:</div>
                                <div className="input-group">
                                    <select className="custom-select" value={verbTs} onChange={handleVerbIndexChange}>
                                        {verbsAvailable.length
                                            ? verbsAvailable.map((v, i) => (
                                                <option value={v.verb.entry.ts} key={i} dir="ltr">
                                                    {"\u200E"}{makeVerbLabel(v.verb.entry)}
                                                </option>
                                            ))
                                            : <option>Select a verb type</option>
                                        }
                                    </select>
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary" onClick={pickRandomVerb}>
                                            <i className="fas fa-random" />
                                        </button>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div>
                                        <strong>
                                            <Pashto opts={opts}>{v.verb.entry}</Pashto> 
                                            {` `}-{` `}
                                            <Phonetics opts={opts}>{v.verb.entry}</Phonetics>
                                        </strong>
                                        {` `}
                                        <em>{v.verb.entry.c}</em>
                                    </div>
                                    <div className="ml-3">{v.verb.entry.e}</div>
                                </div>
                            </div>
                            : <div className="alert alert-warning mb-4" role="alert">
                                No such verbs available...
                            </div>
                        }
                    </div>
                    <div className="col-sm-6">
                        <h6>Verb type:</h6>
                        <div onChange={handleTypeSelection}>
                            {verbTypes.map((type) => (
                                <div key={type} className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="verb-type"
                                        checked={verbTypeShowing === type}
                                        value={type}
                                        onChange={() => null}
                                    />
                                    <label className="form-check-label">
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h6 className="mt-2">Transitivity:</h6>
                        <div onChange={handleTransitivitySelection}>
                            {transitivities.map((transitivity) => (
                                <div key={transitivity} className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="transitivity"
                                        checked={transitivityShowing === transitivity}
                                        onChange={() => null}
                                        value={transitivity} 
                                    />
                                    <label className="form-check-label">
                                        {transitivity}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={() => setTestVoice(v => v === "active" ? "passive" : "active")}>
            {testVoice}
        </button>
        <select value={testTense} onChange={e => setTestTense(e.target.value as any)}>
            {testTenses.map(t => (
                <option key={t} value={t}>{t}</option>
            ))}
        </select>
        <NPPronounPicker
            onChange={setTestPerson}
            pronoun={testPerson}
            role="subject"
            opts={opts}
        />
        <pre>
            {JSON.stringify(rv, null, "  ")}
        </pre>
        {v?.verb.entry && <div style={{ paddingBottom: "20px" }}>
            <PhraseBuilder
                handleLinkClick="none"
                verb={v.verb as T.VerbEntry}
                entryFeeder={entryFeeder}
                opts={opts}
            />
        </div>}
    </div>;
}

export default VPBuilderDemo;