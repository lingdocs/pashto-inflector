import {
    getVerbBlockPosFromPerson,
    noPersInfs,
} from "./misc-helpers";
import * as T from "../../types";
import { concatPsString, getVerbInfo } from "../library";
import {
    presentEndings,
    pastEndings,
} from "./grammar-units";

// export type RenderedVerbB = VerbRenderedBlock
//     | PerfectiveHeadBlock
//     | ModalVerbBlock
//     | ModalVerbKedulPart
//     | PerfectEquativeBlock
//     | PerfectParticipleBlock;

// export type PerfectiveHeadBlock = { type: "perfectiveHead", ps: PsString };
// export type VerbRenderedBlock = {
//     type: "verb",
//     block: Omit<VerbSelectionComplete, "object"> & {
//         hasBa: boolean,
//         ps: SingleOrLengthOpts<PsString[]>,
//         person: Person,
//         complementWelded: undefined | Rendered<ComplementSelection> | Rendered<UnselectedComplementSelection>,
//     },
// };

type PerfectiveHeadBlock = {
    type: "perfectiveHead",
    ps: T.PsString,
};

type VerbBlock = {
    type: "verb",
    hasBa: boolean,
    ps: T.SingleOrLengthOpts<T.PsString[]>,
    person: T.Person,
    aspect: T.Aspect,
    tense: keyof T.AspectContent,
};

export function renderVerb({ verb, aspect, tense, person }: {
    verb: T.VerbEntry,
    aspect: T.Aspect,
    tense: keyof T.AspectContent,
    person: T.Person,
}): {
    hasBa: boolean,
    verbBlocks: [PerfectiveHeadBlock, VerbBlock] | [VerbBlock] 
} {
    // WARNING: this only works with simple verbs
    const isPast = tense === "past" || tense === "habitualPast";
    const hasBa = tense === "future" || tense === "habitualPast";
    const { perfectiveHead, rootStem } = getRootStem(verb, aspect, isPast);
    const ending = getEnding(person, isPast);
    const verbPs = addEnding(rootStem, ending);
    const verbBlock: VerbBlock = {
        type: "verb",
        hasBa,
        ps: verbPs,
        person,
        aspect,
        tense,
    };
    const perfectiveHeadBlock: PerfectiveHeadBlock | undefined = perfectiveHead ? {
        type: "perfectiveHead",
        ps: noPersInfs(perfectiveHead),
    } : undefined;
    return {
        hasBa,
        verbBlocks: perfectiveHeadBlock ? [
            perfectiveHeadBlock, verbBlock,
        ] : [verbBlock],
    }
}

function addEnding(rootStem: T.FullForm<T.PsString>, ending: T.SingleOrLengthOpts<T.PsString[]>): T.SingleOrLengthOpts<T.PsString[]> {
    const rs = noPersInfs(rootStem);
    const end = noPersInfs(ending);
    if ("long" in rs) {
        if ("long" in end) {
            return {
                long: end.long.map((e) => concatPsString(rs.long, e)),
                short: end.short.map((e) => concatPsString(rs.short, e)),
            };
        } else {
            return {
                long: end.map((e) => concatPsString(rs.long, e)),
                short: end.map((e) => concatPsString(rs.short, e)),
            };
        }
    }
    if ("long" in end) {
        throw new Error("should not be using verb stems with long and short endings");
    }
    return end.map((e) => concatPsString(rs, e));
}

function getRootStem(verb: T.VerbEntry, aspect: T.Aspect, isPast: boolean): {
    perfectiveHead: undefined | T.OptionalPersonInflections<T.PsString>,
    rootStem: T.OptionalPersonInflections<T.SingleOrLengthOpts<T.PsString>>,
} {
    const vInfo = getVerbInfo(verb.entry) as T.SimpleVerbInfo;
    const rs = vInfo[isPast ? "root" : "stem"];
    if (aspect === "perfective" && rs.perfectiveSplit) {
        return extractPerfectiveSplit(rs.perfectiveSplit);
    }
    return {
        perfectiveHead: undefined,
        rootStem: rs[aspect],
    }

    function extractPerfectiveSplit(splitInfo: T.SplitInfo): ReturnType<typeof getRootStem> {
        // TODO: allow for infs
        const si = noPersInfs(splitInfo);
        if ("long" in si) {
            return {
                perfectiveHead: si.long[0],
                rootStem: {
                    long: si.long[1],
                    short: si.short[1],
                }
            }
        } else {
            return {
                perfectiveHead: si[0],
                rootStem: si[1],
            }
        }
    }
}

function getEnding(person: T.Person, isPast: boolean) {
    const [row, col] = getVerbBlockPosFromPerson(person);
    return isPast ? {
        long: pastEndings.long[row][col],
        short: pastEndings.short[row][col],
    } : presentEndings[row][col];
}

