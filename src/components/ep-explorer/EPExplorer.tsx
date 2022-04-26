import * as T from "../../types";
import useStickyState from "../../lib/useStickyState";
import NPPicker from "../np-picker/NPPicker";
import EquativePicker from "./EquativePicker";
import EPDisplay from "./EPDisplay";
import ButtonSelect from "../ButtonSelect";
import EqCompPicker from "./eq-comp-picker/EqCompPicker";
import { roleIcon } from "../vp-explorer/VPExplorerExplanationModal";
import { isUnisexNounEntry } from "../../lib/type-predicates";
import {
    personGender,
    personNumber,
} from "../../lib/misc-helpers";
import EqChartsDisplay from "./EqChartsDisplay";

// TODO: put the clear button beside the title in the predicate picker?

function EPExplorer(props: {
    opts: T.TextOptions,
    entryFeeder: T.EntryFeeder,
}) {
    const [mode, setMode] = useStickyState<"charts" | "phrases">("charts", "EPExplorerMode");
    const [eps, setEps] = useStickyState<T.EPSelectionState>({
        subject: undefined,
        predicate: {
            type: "Complement",
            NP: undefined,
            Complement: undefined,
        },
        equative: {
            tense: "present",
            negative: false,
        },
    }, "EPSelectionState");
    function handlePredicateTypeChange(type: "NP" | "Complement") {
        setEps(o => ({
            ...o,
            predicate: {
                ...o.predicate,
                type,
            },
        }));
    }
    function handleSetSubject(subject: T.NPSelection | undefined) {
        setEps(old => massageSubjectChange(subject, old));
    }
    function setPredicateNP(selection: T.NPSelection | undefined) {
        setEps(o => massageNPPredicateChange(selection, o))
    }
    function setPredicateComp(selection: T.EqCompSelection | undefined) {
        setEps(o => ({
            ...o,
            predicate: {
                ...o.predicate,
                Complement: selection
            },
        }));
    }
    const king = eps.subject?.type === "pronoun"
        ? "subject"
        : eps.predicate.type === "Complement"
        ? "subject"
        : "predicate";
    return <div>
        <div className="mt-2 mb-3 text-center">
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
                ]}
                handleChange={setMode}
            />
        </div>
        <div className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode === "phrases" && <>
                <div className="my-2">
                    <NPPicker
                        heading={<div className="h5 text-center">Subject {king === "subject" ? roleIcon.king : ""}</div>}
                        entryFeeder={props.entryFeeder}
                        np={eps.subject}
                        counterPart={undefined}
                        role="subject"
                        onChange={handleSetSubject}
                        opts={props.opts}
                    />
                </div>
                <div className="my-2">
                    <div className="h5 text-center">Predicate {king === "predicate" ? roleIcon.king : ""}</div>
                    <div className="mb-2 text-center">
                        <ButtonSelect
                            small
                            options={[
                                { value: "NP", label: "NP" },
                                { value: "Complement", label: "Complement" },
                            ]}
                            value={eps.predicate.type}
                            handleChange={handlePredicateTypeChange}
                        />
                    </div>
                    {eps.predicate.type === "NP" ? <NPPicker
                        entryFeeder={props.entryFeeder}
                        np={eps.predicate.type === "NP" ? eps.predicate.NP : undefined}
                        counterPart={undefined}
                        role="subject"
                        onChange={setPredicateNP}
                        opts={props.opts}
                    /> : <EqCompPicker
                        comp={eps.predicate.type === "Complement" ? eps.predicate.Complement : undefined}
                        onChange={setPredicateComp}
                        opts={props.opts}
                        entryFeeder={props.entryFeeder}
                    />}
                </div>
            </>}
            <div className="my-2">
                <div className="h5 text-center clickable">Equative</div>
                <EquativePicker
                    equative={eps.equative}
                    onChange={(equative) => setEps(o => ({ ...o, equative }))}
                    hideNegative={mode === "charts"}
                />
            </div>
        </div>
        {mode === "charts" && <EqChartsDisplay tense={eps.equative.tense} opts={props.opts} />}
        {mode === "phrases" && <EPDisplay opts={props.opts} eps={eps} />}
    </div>;
}

export default EPExplorer;

function massageNPPredicateChange(selection: T.NPSelection | undefined, old: T.EPSelectionState): T.EPSelectionState {
    if (!selection) {
        return {
            ...old,
            predicate: {
                ...old.predicate,
                NP: selection,
            },
        };
    }
    if (old.subject?.type === "pronoun" && selection.type === "noun" && isUnisexNounEntry(selection.entry)) {
        const { gender, number } = selection;
        const pronoun = old.subject.person;
        const newPronoun = movePersonNumber(movePersonGender(pronoun, gender), number);
        return {
            ...old,
            subject: {
                ...old.subject,
                person: newPronoun,
            },
            predicate: {
                ...old.predicate,
                NP: selection,
            },
        };
    }
    return {
        ...old,
        predicate: {
            ...old.predicate,
            NP: selection,
        },
    };
}

function massageSubjectChange(subject: T.NPSelection | undefined, old: T.EPSelectionState): T.EPSelectionState {
    if (!subject) {
        return {
            ...old,
            subject,
        };
    }
    if (subject.type === "pronoun" && old.predicate.type === "NP" && old.predicate.NP?.type === "noun" && isUnisexNounEntry(old.predicate.NP.entry)) {
        const predicate = old.predicate.NP;
        const numberAdjusted = predicate.changeNumber
            ? predicate.changeNumber(personNumber(subject.person))
            : predicate;
        const fullyAdjusted = numberAdjusted.changeGender
            ? numberAdjusted.changeGender(personGender(subject.person))
            : numberAdjusted;
        return {
            ...old,
            subject,
            predicate: {
                ...old.predicate,
                NP: fullyAdjusted,
            },
        };
    }
    return {
        ...old,
        subject,
    };
}

function movePersonGender(p: T.Person, gender: T.Gender): T.Person {
    const pGender = personGender(p);
    if (gender === pGender) {
        return p;
    }
    return (gender === "masc") ? (p - 1) : (p + 1);
}

function movePersonNumber(p: T.Person, number: T.NounNumber): T.Person {
    const pNumber = personNumber(p);
    if (pNumber === number) {
        return p;
    }
    return (number === "plural")
        ? (p + 6)
        : (p - 6);
}