/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from "react";
import ConjugationViewer from "./components/ConjugationViewer";
import verbs from "./verbs";
import Pashto from "./components/Pashto";
import Phonetics from "./components/Phonetics";
import { getVerbInfo } from "./lib/verb-info";
import ButtonSelect from "./components/ButtonSelect";
import {
    clamp
} from "./lib/p-text-helpers";
import {
    randomNumber,
} from "./lib/misc-helpers";
import {
    Modal
} from "react-bootstrap";
import * as T from "./types";
import defualtTextOptions from "./lib/default-text-options";
const textOptionsLocalStorageName = "textOptions2";
type VerbType = "simple" | "stative compound" | "dynamic compound";
const verbTypes: VerbType[] = [
    "simple",
    "stative compound",
    "dynamic compound",
];

const transitivities: T.Transitivity[] = [
    "transitive",
    "intransitive",
    "grammatically transitive",
];

const allVerbs = verbs.map((v: { entry: T.DictionaryEntry, complement?: T.DictionaryEntry }) => ({
    verb: v,
    info: getVerbInfo(v.entry, v.complement),
}));

function App() {
    const [verbTs, setVerbTs] = useState<number>(0);
    const [verbTypeShowing, setVerbTypeShowing] = useState<VerbType>("simple");
    const [regularIrregular, setRegularIrregular] = useState<"regular" | "irregular">("regular");
    const [transitivityShowing, setTransitivityShowing] = useState<T.Transitivity>("intransitive");
    const [showingTextOptions, setShowingTextOptions] = useState<boolean>(false);
    const [textOptions, setTextOptions] = useState<T.TextOptions>(defualtTextOptions);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    // const onlyGrammTrans = (arr: Transitivity[]) => (
    //     arr.length === 1 && arr[0] === "grammatically transitive"
    // );
    // const ensureSimpleVerbTypeSelected = () => {
    //     if (!verbTypesShowing.includes["simple"]) {
    //         setVerbTypesShowing([...verbTypesShowing, "simple"]);
    //     }
    // }

    useEffect(() => {
        const verbTsRaw = localStorage.getItem("verbTs");
        const verbTypeShowing = localStorage.getItem("verbTypeShowing") as undefined | VerbType;
        const regularIrregular = localStorage.getItem("regularIrregular") as "regular" | "irregular";
        const transitivitiyShowing = localStorage.getItem("transitivityShowing") as undefined | T.Transitivity;
        const theme = localStorage.getItem("theme");
        const textOptionst = localStorage.getItem(textOptionsLocalStorageName);
        if (regularIrregular) {
            setRegularIrregular(regularIrregular);
        }
        if (verbTsRaw) {
            setVerbTs(JSON.parse(verbTsRaw));
        }
        if (verbTypeShowing) {
            setVerbTypeShowing(verbTypeShowing);
        }
        if (transitivitiyShowing) {
            setTransitivityShowing(transitivitiyShowing);
        }
        if (theme) {
            setTheme(theme as "light" | "dark");
        }
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
        if (textOptionst) {
            setTextOptions(JSON.parse(textOptionst) as T.TextOptions);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("verbTs", verbTs.toString());
        localStorage.setItem("regularIrregular", regularIrregular);
        localStorage.setItem("verbTypeShowing", verbTypeShowing);
        localStorage.setItem("transitivityShowing", transitivityShowing);
        localStorage.setItem(textOptionsLocalStorageName, JSON.stringify(textOptions));
        localStorage.setItem("theme", theme);
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])

    const handleVerbIndexChange = (e: any) => {
        console.log("changing to", e.target.value);
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
        setTransitivityShowing(e.target.value as T.Transitivity);
    }
    const isRegularVerb = (entry: T.DictionaryEntry): boolean => (
        !entry.l && !entry.psp && !entry.ssp && !entry.prp && !entry.pprtp && !entry.noOo && !entry.sepOo
    );
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
    )).filter((verb) => {
        if (verbTypeShowing !== "simple") {
            return true;
        }
        return regularIrregular === "regular"
            ? isRegularVerb(verb.verb.entry)
            : !isRegularVerb(verb.verb.entry);
    }).sort((a, b) => a.verb.entry.p.localeCompare(b.verb.entry.p, "ps"));

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
    return <>
        <main className="flex-shrink-0 mb-4">
            <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", flexDirection: "row" }}>
                <div
                    className="clickable mr-3"
                    onClick={() => setShowingTextOptions(true)}
                >
                    <i className="fa-lg fas fa-cog" />
                </div>
                <div
                    className="clickable"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <i className={`fa-lg fas fa-${theme === "light" ? "sun" : "moon"}`} />
                </div>
            </div>
                <div className="text-center" style={{ marginTop: "3rem", marginBottom: "1rem" }}>
                    <h1 className="display-4 mt-2">Pashto Verb Explorer</h1>
                    <p>by <a href="https://www.lingdocs.com">LingDocs</a></p>
                    <p className="lead my-4">
                        Each form is made from one simple <samp>formula</samp> which <a href="https://www.lingdocs.com/blog/pashto-verbs-master-chart">works for all verbs</a>. 👨‍🔬
                    </p>
                    <p>Choose a verb 👇, look at its roots and stems 🌳, see how all the forms are made and what they mean. 🤓</p>
                </div>
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
                                                    <Pashto opts={textOptions}>{v.verb.entry}</Pashto> 
                                                    {` `}-{` `}
                                                    <Phonetics opts={textOptions}>{v.verb.entry}</Phonetics>
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
                                            />
                                            <label className="form-check-label">
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {verbTypeShowing === "simple" &&
                                    <div className="mt-2">
                                        <ButtonSelect
                                            small
                                            options={[
                                                { label: "regular", value: "regular" },
                                                { label: "irregular", value: "irregular" },
                                            ]}
                                            value={regularIrregular}
                                            handleChange={(p) => {
                                                setRegularIrregular(p as "regular" | "irregular");
                                            }}
                                        />
                                    </div>
                                }
                                <h6 className="mt-2">Transitivity:</h6>
                                <div onChange={handleTransitivitySelection}>
                                    {transitivities.map((transitivity) => (
                                        <div key={transitivity} className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="radio"
                                                name="transitivity"
                                                checked={transitivityShowing === transitivity}
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
                {v?.verb.entry && <ConjugationViewer
                    entry={v?.verb.entry}
                    complement={v?.verb.complement}
                    textOptions={textOptions}
                />}
            </div>
        </main>
        <Modal show={showingTextOptions} onHide={() => setShowingTextOptions(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Pashto Spelling</h6>
                <ButtonSelect
                    options={[
                        { label: "Afghan", value: "Afghan" },
                        { label: "Pakistani ي", value: "Pakistani ي" },
                        { label: "Pakistani ی", value: "Pakistani ی" },
                    ]}
                    value={textOptions.spelling}
                    handleChange={(p) => {
                        setTextOptions({
                            ...textOptions,
                            spelling: p as T.Spelling,
                        });
                    }}
                />
                <h6 className="mt-3">Diacritics</h6>
                <ButtonSelect
                    options={[
                        { label: "On", value: "true" },
                        { label: "Off", value: "false" },
                    ]}
                    value={textOptions.diacritics.toString()}
                    handleChange={(p) => setTextOptions({ ...textOptions, diacritics: p === "true" })}
                />
                <h6 className="mt-3">Pashto Text Size</h6>
                <ButtonSelect
                    options={[
                        { label: "Normal", value: "normal" },
                        { label: "Large", value: "larger" },
                        { label: "X-Large", value: "largest" },
                    ]}
                    value={textOptions.pTextSize}
                    handleChange={(p) => setTextOptions({ ...textOptions, pTextSize: p as "normal" | "larger" | "largest" })}
                />
                <h6 className="mt-3">Phonetics</h6>
                <ButtonSelect
                    options={[
                        { label: "LingDocs", value: "lingdocs" },
                        { label: "IPA", value: "ipa" },
                        { label: "ALAC", value: "alalc" },
                        { label: "None", value: "none" },
                    ]}
                    value={textOptions.phonetics}
                    handleChange={(p) => setTextOptions({ ...textOptions, phonetics: p as "lingdocs" | "ipa" | "none" | "alalc" })}
                />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary clb" onClick={() => setShowingTextOptions(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
        <footer className="footer mt-auto py-3" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container">
                <span className="text-muted">Copyright © 2020 <a href="https://www.lingdocs.com">lingdocs.com</a> all rights reserverd</span>
            </div>
        </footer>
    </>
}

export default App;
