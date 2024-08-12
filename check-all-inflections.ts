import * as T from "./src/types";
import { inflectWord } from "./src/lib/src/pashto-inflector";
import * as tp from "./src/lib/src/type-predicates";
import { conjugateVerb } from "./src/lib/src/verb-conjugation";

// Script to try inflecting all the words in the dictionary and make sure that
// no errors are thrown in the process

type InflectionError = {
  ts: number;
  p: string;
  f: string;
  err: string;
};

async function checkAll() {
  console.log("Checking inflection functions on all dictionary words");
  const res = await fetch(process.env.LINGDOCS_DICTIONARY_URL);
  const { entries }: T.Dictionary = await res.json();
  const errors: InflectionError[] = [];

  entries.forEach((entry) => {
    try {
      inflectWord(entry);
    } catch (e) {
      errors.push({
        ts: entry.ts,
        p: entry.p,
        f: entry.f,
        err: e.toString(),
      });
    }
    if (tp.isVerbDictionaryEntry(entry)) {
      const complement = entry.l
        ? entries.find((e) => e.ts === entry.l)
        : undefined;
      if (entry.l && !complement) {
        errors.push({
          ts: entry.ts,
          p: entry.p,
          f: entry.f,
          err: "verb complement missing",
        });
      } else {
        try {
          conjugateVerb(entry, complement);
        } catch (e) {
          errors.push({
            ts: entry.ts,
            p: entry.p,
            f: entry.f,
            err: e,
          });
        }
      }
    }
  });
  return errors;
}

checkAll().then((errors) => {
  if (errors.length) {
    console.log(
      "The following errors occured while inflecting all dictionary words"
    );
    console.log(errors);
    process.exit(1);
  }
  console.log("No errors occured while inflecting all dictionary words");
});
