import * as T from "./src/types";
import { inflectWord } from "./src/lib/src/pashto-inflector";

// Script to try inflecting all the words in the dictionary and make sure that
// no errors are thrown in the process

type InflectionError = {
  ts: number;
  p: string;
  f: string;
  err: string;
};

async function checkAll() {
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