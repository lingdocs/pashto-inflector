import * as T from "../../../types";
import {
  isPattern1Entry,
  isPattern2Entry,
  isPattern3Entry,
  isPattern,
  isPattern5Entry,
  isPattern4Entry,
} from "../type-predicates";
import { equals } from "rambda";

export function getInflectionQueries(
  s: string,
  includeNouns: boolean
): {
  search: Partial<T.DictionaryEntry>;
  details: {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    predicate: (e: T.AdjectiveEntry | T.NounEntry) => boolean;
  }[];
}[] {
  const queries: {
    search: Partial<T.DictionaryEntry>;
    details: {
      inflection: (0 | 1 | 2)[];
      gender: T.Gender[];
      predicate: (e: T.NounEntry | T.AdjectiveEntry) => boolean;
    };
  }[] = [];
  queries.push({
    search: { p: s },
    details: {
      inflection: [0, 1, 2],
      gender: ["masc", "fem"],
      predicate: isPattern(0),
    },
  });
  queries.push({
    search: { p: s },
    details: {
      inflection: [0, 1],
      gender: ["masc"],
      predicate: isPattern1Entry,
    },
  });
  queries.push({
    search: { p: s },
    details: {
      inflection: [0],
      gender: ["masc"],
      predicate: (e) =>
        isPattern2Entry(e) ||
        isPattern3Entry(e) ||
        isPattern4Entry(e) ||
        isPattern5Entry(e),
    },
  });
  queries.push({
    search: { infap: s },
    details: {
      inflection: [1],
      gender: ["masc"],
      predicate: (e) => isPattern4Entry(e) || isPattern5Entry(e),
    },
  });
  if (s.endsWith("ه")) {
    queries.push({
      search: { p: s.slice(0, -1) },
      details: {
        inflection: [0],
        gender: ["fem"],
        predicate: isPattern1Entry,
      },
    });
    if (includeNouns) {
      queries.push({
        search: { p: s },
        details: {
          inflection: [0],
          gender: ["fem"],
          predicate: isPattern1Entry,
        },
      });
    }
    queries.push({
      search: { infbp: s.slice(0, -1) },
      details: {
        inflection: [0],
        gender: ["fem"],
        predicate: (e) => isPattern4Entry(e) || isPattern5Entry(e),
      },
    });
  } else if (s.endsWith("ې")) {
    queries.push({
      search: { p: s.slice(0, -1) },
      details: {
        inflection: [1],
        gender: ["fem"],
        predicate: isPattern1Entry,
      },
    });
    if (includeNouns) {
      queries.push({
        search: { p: s.slice(0, -1) + "ه" },
        details: {
          inflection: [1],
          gender: ["fem"],
          predicate: isPattern1Entry,
        },
      });
    }
    queries.push({
      search: { infbp: s.slice(0, -1) },
      details: {
        inflection: [1],
        gender: ["fem"],
        predicate: (e) => isPattern4Entry(e) || isPattern5Entry(e),
      },
    });
    queries.push({
      search: { p: s.slice(0, -1) + "ی" },
      details: {
        inflection: [0, 1],
        gender: ["fem"],
        predicate: isPattern2Entry,
      },
    });
  } else if (s.endsWith("ي")) {
    queries.push({
      search: { p: s.slice(0, -1) + "ی" },
      details: {
        inflection: [1],
        gender: ["masc"],
        predicate: (e) => isPattern2Entry(e) || isPattern3Entry(e),
      },
    });
  } else if (s.endsWith("و")) {
    queries.push({
      search: { p: s.slice(0, -1) },
      details: {
        inflection: [2],
        gender: ["masc", "fem"],
        predicate: (e) => isPattern1Entry(e) || isPattern5Entry(e),
      },
    });
    queries.push({
      search: { infbp: s.slice(0, -1) },
      details: {
        inflection: [2],
        gender: ["masc", "fem"],
        predicate: (e) => isPattern4Entry(e) || isPattern5Entry(e),
      },
    });
    queries.push({
      search: { p: s.slice(0, -1) + "ی" },
      details: {
        inflection: [2],
        gender: ["masc", "fem"],
        predicate: (e) => isPattern2Entry(e) || isPattern3Entry(e),
      },
    });
    if (s.endsWith("یو")) {
      queries.push({
        search: { p: s.slice(0, -2) + "ی" },
        details: {
          inflection: [2],
          gender: ["masc", "fem"],
          predicate: (e) => isPattern2Entry(e) || isPattern3Entry(e),
        },
      });
    }
  } else if (s.endsWith("ۍ")) {
    queries.push({
      search: { p: s.slice(0, -1) + "ی" },
      details: {
        inflection: [0, 1],
        gender: ["fem"],
        predicate: isPattern3Entry,
      },
    });
  }

  const coallated: ReturnType<typeof getInflectionQueries> = [];

  for (let q of queries) {
    const existing = coallated.find((x) => equals(x.search, q.search));
    if (existing) {
      existing.details.push(q.details);
    } else {
      coallated.push({
        search: q.search,
        details: [q.details],
      });
    }
  }

  return coallated;
}
