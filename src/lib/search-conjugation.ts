import * as T from "../types";
import {
    isVerbBlock,
    isImperativeBlock,
    isInflectionSet,
} from "./p-text-helpers";
import { personFromVerbBlockPos } from "./misc-helpers";

const inflectionNames: InflectionName[] = ["plain", "1st", "2nd"];

type ObPile = { [key: string]: ObRec; }
type ObRec = any[] | ObPile;

type ConjSearchResults = {
    form: string[],
    position: InflectionName[] | T.Person[],
}[];

type BlockResult = {
    blockResult: true,
    position: InflectionName[] | T.Person[],
}

type InflectionName = "plain" | "1st" | "2nd";

export function searchConjugation(pile: ObPile, s: string): ConjSearchResults {

    function searchObRecord(record: ObRec): null | BlockResult | ConjSearchResults {
        // hit a bottom part a tree, see if what we're looking for is there
        if (Array.isArray(record)) {
            return searchBlock(record, s);
        }
        // look further down the tree recursively
        return searchConjugation(record, s);
    }

    return Object.entries(pile).reduce((res: ConjSearchResults, entry) => {
        const [name, value] = entry;
        if (name === "info") {
            return res;
        }
        // search for value from key
        const result = searchObRecord(value);
        // Result: Hit the bottom and nothing found
        if (result === null) {
            return res;
        }
        // Result: Hit the bottom and found what we were looking for
        // add in the path and position
        if ("blockResult" in result) {
            return [
                ...res,
                {
                    form: [name],
                    position: result.position,
                },
            ];
        }
        // Result: Have to keep looking down recursively
        // add in the current path to all the results
        const rb: ConjSearchResults = [
            ...res,
            ...result.map((r) => ({
                ...r,
                form: [name, ...r.form],
            })),
        ]
        return rb;
    }, []);
}

function searchBlock(block: any[], s: string): null | BlockResult {
    if (isVerbBlock(block)) {
        const verbBlock = block as T.VerbBlock;
        const position = searchVerbBlock(verbBlock, s);
        if (position.length) {
            return {
                blockResult: true,
                position: position.map(pos => personFromVerbBlockPos(pos)),
            };
        }
    }
    if (isImperativeBlock(block)) {
        const ImperativeBlock = block as T.ImperativeBlock;
        const position = searchVerbBlock(ImperativeBlock, s);
        if (position.length) {
            return {
                blockResult: true,
                position: position.map(pos => personFromVerbBlockPos([pos[0] + 2, pos[1]])),
            };
        }
    }
    if (isInflectionSet(block)) {
        const inflectionSet = block as T.InflectionSet;
        const position = searchInflectionSet(inflectionSet, s);
        if (position.length) {
            return {
                blockResult: true,
                position: position,
            };
        }
    }
    return null;
}

function searchVerbBlock(vb: T.VerbBlock | T.ImperativeBlock, s: string): [number, number][] {
    function searchRow(row: T.PersonLine): (0 | 1)[] {
        return row.reduce((all: (0 | 1)[], item, i: number): (0 | 1)[] => {
            const c = item.some(ps => ps.p === s)
                ? [...all, i as 0 | 1]
                : all
            return c;
        }, []);
    }
    return vb.reduce((found: [number, number][], row, i): [number, number][] => {
        const inRow = searchRow(row);
        if (inRow.length === 0) return found;
        return [...found, ...inRow.map((f): [number, number] => [i, f])];
    }, []);
}

function searchInflectionSet(inf: T.InflectionSet, s: string): InflectionName[] {
    return inf.reduce((found: InflectionName[], item, i): InflectionName[] => {
        if (item.some((ps) => ps.p === s)) {
            return [...found, inflectionNames[i]];
        }
        return found;
    }, []);
}