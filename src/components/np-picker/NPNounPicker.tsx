import {
    makeNounSelection,
} from "./picker-tools";
import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import InlinePs from "../InlinePs";
// import { isFemNounEntry, isPattern1Entry, isPattern2Entry, isPattern3Entry, isPattern4Entry, isPattern5Entry, isPattern6FemEntry } from "../../lib/type-predicates";
import EntrySelect from "../EntrySelect";
import AdjectiveManager from "./AdjectiveManager";

// const filterOptions = [
//     {
//         label: "1",
//         value: "1",
//     },
//     {
//         label: "2",
//         value: "2",
//     },
//     {
//         label: "3",
//         value: "3",
//     },
//     {
//         label: "4",
//         value: "4",
//     },
//     {
//         label: "5",
//         value: "5",
//     },
//     {
//         label: "6",
//         value: "6",
//     },
// ];

// type FilterPattern = "1" | "2" | "3" | "4" | "5" | "6";

// function nounFilter(p: FilterPattern | undefined) {
//     return p === undefined
//         ? () => true
//         : (p === "1")
//         ? isPattern1Entry
//         : (p === "2")
//         ? isPattern2Entry
//         : (p === "3")
//         ? isPattern3Entry
//         : (p === "4")
//         ? isPattern4Entry
//         : (p === "5")
//         ? isPattern5Entry
//         : (p === "6")
//         ? (n: NounEntry) => (isFemNounEntry(n) && isPattern6FemEntry(n))
//         : () => true;
// }

function NPNounPicker(props: {
    entryFeeder: T.EntryFeeder,
    noun: T.NounSelection | undefined,
    onChange: (p: T.NounSelection | undefined) => void,
    opts: T.TextOptions,
}) {
    // const [patternFilter, setPatternFilter] = useState<FilterPattern | undefined>(undefined);
    // const [showFilter, setShowFilter] = useState<boolean>(false)
    // const nounsFiltered = props.nouns
    //     .filter(nounFilter(patternFilter))
    //     .sort((a, b) => (a.p.localeCompare(b.p, "af-PS")));
    function onEntrySelect(entry: T.NounEntry | undefined) {
        if (!entry) {
            return props.onChange(undefined);
        }
        props.onChange(makeNounSelection(entry));
    }
    // function handleFilterClose() {
    //     setPatternFilter(undefined);
    //     setShowFilter(false);
    // }
    function handelAdjectivesUpdate(adjectives: T.AdjectiveSelection[]) {
        if (props.noun) {
            props.onChange({
                ...props.noun,
                adjectives,
            });
        }
    }
    return <div style={{ maxWidth: "225px", minWidth: "125px" }}>
        {/* {showFilter && <div className="mb-2 text-center">
            <div className="d-flex flex-row justify-content-between">
                <div className="text-small mb-1">Filter by inflection pattern</div>
                <div className="clickable" onClick={handleFilterClose}>X</div>
            </div>
            <ButtonSelect
                options={filterOptions}
                // @ts-ignore
                value={patternFilter}
                // @ts-ignore
                handleChange={setPatternFilter}
            />
        </div>} */}
        {props.noun && <AdjectiveManager
            adjectives={props.noun?.adjectives}
            entryFeeder={props.entryFeeder.adjectives}
            opts={props.opts}
            onChange={handelAdjectivesUpdate}
        />}
        <h6>Noun</h6>
        {!(props.noun && props.noun.dynamicComplement) ? <div>
            <EntrySelect
                value={props.noun?.entry}
                entryFeeder={props.entryFeeder.nouns}
                onChange={onEntrySelect}
                name="Noun"
                opts={props.opts}
            />
        </div> : <div>
            {props.noun && <div>
                <div className="mb-2">Included in Dyn. Compound:</div>
                <div className="mb-3 text-center">
                    <InlinePs opts={props.opts}>
                        {{ p: props.noun.entry.p, f: props.noun.entry.f }}
                    </InlinePs>
                    <div className="text-muted">{props.noun.entry.e}</div>
                </div>
            </div>}
        </div>}
        {props.noun && <div className="my-2 d-flex flex-row justify-content-around align-items-center">
            <div>
                {props.noun.genderCanChange ? <ButtonSelect
                    small
                    options={[
                        { label: "Masc", value: "masc" },
                        { label: "Fem", value: "fem" },
                    ]}
                    value={props.noun.gender}
                    handleChange={(gender) => {
                        if (!props.noun || !props.noun.genderCanChange) return;
                        props.onChange({
                            ...props.noun,
                            gender, 
                        });
                    }}
                /> : props.noun.gender === "masc" ? "Masc." : "Fem."}
            </div>
            <div>
                {props.noun.numberCanChange ? <ButtonSelect
                    small
                    options={[
                        { label: "Sing.", value: "singular" },
                        { label: "Plur.", value: "plural" },
                    ]}
                    value={props.noun.number}
                    handleChange={(number) => {
                        if (!props.noun || !props.noun.numberCanChange) return;
                        props.onChange({
                            ...props.noun,
                            number,
                        });
                    }}
                /> : props.noun.number === "singular" ? "Sing." : "Plur."}
            </div>
        </div>}
    </div>;
}

export default NPNounPicker;