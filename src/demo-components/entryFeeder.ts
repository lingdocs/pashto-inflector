import verbs from "../verbs";
import nounsAdjs from "../nouns-adjs";
import {
    isAdjectiveEntry,
    isAdverbEntry,
    isLocativeAdverbEntry,
    isNounEntry,
} from "../lib/src/type-predicates";
import * as T from "../types";

const nouns = nounsAdjs.filter(isNounEntry);
const adjectives = nounsAdjs.filter(isAdjectiveEntry);
const locativeAdverbs = nounsAdjs.filter(isLocativeAdverbEntry);
const adverbs = nounsAdjs.filter(isAdverbEntry);
export const entryFeeder: T.EntryFeeder = {
    locativeAdverbs,
    nouns,
    adjectives,
    verbs,
    adverbs,
};