import { makeNounSelection } from "../../../lib/src/phrase-building/make-selections";

import * as T from "../../../types";
import ButtonSelect from "../selects/ButtonSelect";
import InlinePs from "../text-display/InlinePs";
// import { isFemNounEntry, isPattern1Entry, isPattern2Entry, isPattern3Entry, isPattern4Entry, isPattern5Entry, isPattern6FemEntry } from "../../lib/type-predicates";
import EntrySelect from "../selects/EntrySelect";
import AdjectiveManager from "./AdjectiveManager";
import { useState } from "react";
import DeterminersPicker from "./DeterminersPicker";

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
  entryFeeder: T.EntryFeeder;
  noun: T.NounSelection | undefined;
  onChange: (p: T.NounSelection | undefined) => void;
  opts: T.TextOptions;
  phraseIsComplete: boolean;
  negative: boolean;
}) {
  const [addingDeterminers, setAddingDeterminers] = useState<boolean>(false);
  // const [patternFilter, setPatternFilter] = useState<FilterPattern | undefined>(undefined);
  // const [showFilter, setShowFilter] = useState<boolean>(false)
  // const nounsFiltered = props.nouns
  //     .filter(nounFilter(patternFilter))
  //     .sort((a, b) => (a.p.localeCompare(b.p, "af-PS")));
  function onEntrySelect(entry: T.NounEntry | undefined) {
    if (!entry) {
      return props.onChange(undefined);
    }
    props.onChange(makeNounSelection(entry, props.noun));
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
  function handleDeterminersChange(
    determiners: undefined | T.NounSelection["determiners"]
  ) {
    if (props.noun) {
      props.onChange({
        ...props.noun,
        determiners,
      });
    }
  }
  return (
    <div
      style={{
        maxWidth: "225px",
        minWidth: "125px",
      }}
    >
      {!addingDeterminers && !props.noun?.determiners ? (
        <div>
          <span
            className="clickable text-muted"
            onClick={() => setAddingDeterminers(true)}
          >
            + Determiners
          </span>
        </div>
      ) : (
        <div>
          <div className="d-flex flex-row justify-content-between mb-1">
            <div>{!props.noun?.determiners ? "Add" : ""} Determiners</div>
            <div
              className="clickable"
              onClick={() => {
                handleDeterminersChange(undefined);
                setAddingDeterminers(false);
              }}
            >
              <i className="fas fa-trash" />
            </div>
          </div>
          <DeterminersPicker
            determiners={props.noun?.determiners}
            onChange={handleDeterminersChange}
            opts={props.opts}
            negative={props.negative}
          />
        </div>
      )}

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
      <div
        style={{
          opacity:
            props.noun?.determiners && !props.noun.determiners.withNoun
              ? 0.5
              : 1,
        }}
      >
        {props.noun && (
          <AdjectiveManager
            negative={props.negative}
            phraseIsComplete={props.phraseIsComplete}
            adjectives={props.noun?.adjectives}
            entryFeeder={props.entryFeeder}
            opts={props.opts}
            onChange={handelAdjectivesUpdate}
          />
        )}
        <div className="h6">Noun</div>
        {!(
          props.noun &&
          (props.noun.dynamicComplement || props.noun.genStativeComplement)
        ) ? (
          <div>
            <EntrySelect
              value={props.noun?.entry}
              entryFeeder={props.entryFeeder.nouns}
              onChange={onEntrySelect}
              name="Noun"
              opts={props.opts}
            />
          </div>
        ) : (
          <div>
            {props.noun && (
              <div>
                <div className="mb-2">
                  Included in{" "}
                  {props.noun.genStativeComplement ? "Gen. Stat." : "Dyn."}{" "}
                  Compound:
                </div>
                <div className="mb-3 text-center">
                  <InlinePs
                    opts={props.opts}
                    ps={{ p: props.noun.entry.p, f: props.noun.entry.f }}
                  />
                  <div className="text-muted">{props.noun.entry.e}</div>
                </div>
              </div>
            )}
          </div>
        )}
        {props.noun && (
          <div className="my-2 d-flex flex-row justify-content-around align-items-center">
            <div>
              {props.noun.genderCanChange ? (
                <ButtonSelect
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
                />
              ) : props.noun.gender === "masc" ? (
                "Masc."
              ) : (
                "Fem."
              )}
            </div>
            <div>
              {props.noun.numberCanChange ? (
                <ButtonSelect
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
                />
              ) : props.noun.number === "singular" ? (
                "Sing."
              ) : (
                "Plur."
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NPNounPicker;
