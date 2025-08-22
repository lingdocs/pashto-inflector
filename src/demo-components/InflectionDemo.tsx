import React, { useState } from "react";
import type * as T from "../types";
import type { JSX } from "react";
import InlinePs from "../components/src/text-display/InlinePs";
import EntrySelect from "../components/src/selects/EntrySelect";
import * as tp from "../lib/src/type-predicates";
import nounsAdjsUnsafe from "../nouns-adjs";
import { inflectWord } from "../lib/src/pashto-inflector";
import { getInflectionPattern } from "../lib/src/inflection-pattern";
import InflectionsTable from "../components/src/tables/InflectionsTable";
import HumanReadableInflectionPattern from "../components/src/tables/HumanReadableInflectionPattern";
import leftChevron from "./chevron_left-24px.svg";
import rightChevron from "./chevron_right-24px.svg";
const chevStyle = {
  height: "2rem",
  width: "2rem",
  color: "#ccc",
};

const nounsAdjs = nounsAdjsUnsafe.filter(
  (x) => tp.isNounEntry(x) || tp.isAdjectiveEntry(x)
) as (T.NounEntry | T.AdjectiveEntry)[];

function InflectionDemo({ opts }: { opts: T.TextOptions }) {
  const [pattern, setPattern] = useState<T.InflectionPattern | "all">("all");
  const [word, setWord] = useState<T.NounEntry | T.AdjectiveEntry | undefined>(
    undefined
  );
  const patterns: {
    value: T.InflectionPattern | "all";
    label: JSX.Element | string;
  }[] = [
      {
        value: "all",
        label: "all types",
      },
      {
        value: 0,
        label: "no inflection",
      },
      {
        value: 1,
        label: "basic",
      },
      {
        value: 2,
        label: (
          <>
            unstressed <InlinePs opts={opts} ps={{ p: "ی", f: "ay" }} />
          </>
        ),
      },
      {
        value: 3,
        label: (
          <>
            stressed <InlinePs opts={opts} ps={{ p: "ی", f: "áy" }} />
          </>
        ),
      },
      {
        value: 4,
        label: '"Pashtoon" pattern',
      },
      {
        value: 5,
        label: "short squish",
      },
      {
        value: 6,
        label: (
          <>
            fem. inan. <InlinePs opts={opts} ps={{ p: "ي", f: "ee" }} />
          </>
        ),
      },
    ];
  const entries = (nounsAdjs as (T.NounEntry | T.AdjectiveEntry)[]).filter(
    tp.isPattern(pattern)
  );
  function handlePatternChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    const value = v === "all" ? v : (Number(v) as T.InflectionPattern);
    setPattern(value);
    if (word && !tp.isPattern(value)(word)) {
      setWord(undefined);
    }
  }
  function wordForward() {
    if (!word) {
      setWord(entries[0]);
      return;
    }
    const oldIndex = entries.findIndex((e) => e.ts === word.ts);
    const newIndex = entries.length === oldIndex + 1 ? 0 : oldIndex + 1;
    setWord(entries[newIndex]);
  }
  function wordBack() {
    if (!word) {
      setWord(entries[entries.length - 1]);
      return;
    }
    const oldIndex = entries.findIndex((e) => e.ts === word.ts);
    const newIndex = oldIndex === 0 ? entries.length - 1 : oldIndex + 1;
    setWord(entries[newIndex]);
  }
  const inf = ((): T.InflectorOutput | false => {
    if (!word) return false;
    try {
      return inflectWord(word);
    } catch (e) {
      console.error("error inflecting entry", word);
      console.error(e);
      return false;
    }
  })();
  return (
    <div style={{ paddingBottom: "20px" }}>
      <p>
        Produces the inflections and plural forms (Pashto and Arabic plurals
        where applicable) for words
      </p>
      <div
        className="d-block mx-auto card"
        style={{ maxWidth: "700px", background: "var(--closer)" }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h6 className="my-2">
                  Filter words by{" "}
                  <a href="https://grammar.lingdocs.com/inflection/inflection-patterns/">
                    inflection pattern
                  </a>
                  :
                </h6>
                <div>
                  {patterns.map(({ value, label }) => (
                    <div key={value} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="verb-type"
                        checked={pattern === value}
                        value={value}
                        onChange={handlePatternChange}
                      />
                      <label className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <h6 className="my-2">Select word:</h6>
              <EntrySelect
                entryFeeder={entries}
                value={word}
                onChange={setWord}
                opts={opts}
                name="word-select"
                // @ts-expect-error it's good
                style={{ width: "18rem" }}
              />
              <div
                className="d-flex flex-row justify-content-between align-items-center"
                style={{ width: "18rem" }}
              >
                <img
                  src={leftChevron}
                  className="clickable"
                  style={chevStyle}
                  alt={"previous"}
                  onClick={wordBack}
                />
                <img
                  src={rightChevron}
                  className="clickable"
                  style={chevStyle}
                  onClick={wordForward}
                  alt={"next"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {inf ? (
        <div className="mt-3">
          {inf.inflections &&
            word &&
            (() => {
              const pattern = getInflectionPattern(word);
              return (
                <div>
                  <a
                    href={`https://grammar.lingdocs.com/inflection/inflection-patterns/${inflectionSubUrl(
                      pattern
                    )}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="badge bg-light mb-2">
                      Inflection pattern{" "}
                      {HumanReadableInflectionPattern(pattern, opts)}
                    </div>
                  </a>
                  <InflectionsTable inf={inf.inflections} textOptions={opts} />
                </div>
              );
            })()}
          {"plural" in inf && inf.plural !== undefined && (
            <div>
              <h5>Plural</h5>
              <InflectionsTable inf={inf.plural} textOptions={opts} />
            </div>
          )}
          {"arabicPlural" in inf && inf.arabicPlural !== undefined && (
            <div>
              <h5>Arabic Plural</h5>
              <InflectionsTable inf={inf.arabicPlural} textOptions={opts} />
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function inflectionSubUrl(pattern: T.InflectionPattern): string {
  return pattern === 0
    ? ""
    : pattern === 1
      ? "#1-basic"
      : pattern === 2
        ? "#2-words-ending-in-an-unstressed-ی---ey"
        : pattern === 3
          ? "#3-words-ending-in-a-stressed-ی---éy"
          : pattern === 4
            ? "#4-words-with-the-pashtoon-pattern"
            : pattern === 5
              ? "#5-shorter-words-that-squish"
              : // : pattern === 6
              "#6-inanimate-feminine-nouns-ending-in-ي---ee";
}

export default InflectionDemo;
