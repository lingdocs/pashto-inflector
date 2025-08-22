import * as T from "../../../../types";
import {
  isPattern1Entry,
  isPattern2Entry,
  isPattern3Entry,
  isPattern,
  isPattern5Entry,
  isPattern4Entry,
  isPattern6FemEntry,
  isFemNounEntry,
  isAdjectiveEntry,
  isUnisexNounEntry,
  isPluralNounEntry,
  isNounEntry,
  isAnimNounEntry,
  isMascNounEntry,
} from "../../type-predicates";
import { equals } from "rambda";

export function getInflectionQueries(
  s: string,
  noun: boolean,
): {
  search: Partial<T.DictionaryEntry>;
  details: {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    predicate: (e: T.AdjectiveEntry | T.NounEntry) => boolean;
    plural?: boolean;
  }[];
}[] {
  const queries: {
    search: Partial<T.DictionaryEntry>;
    details: {
      inflection: (0 | 1 | 2)[];
      gender: T.Gender[];
      plural?: boolean;
      predicate: (e: T.NounEntry | T.AdjectiveEntry) => boolean;
    };
  }[] = [];
  queries.push({
    search: { p: s },
    details: {
      inflection: [0, 1, 2],
      gender: ["masc", "fem"],
      predicate: (e) =>
        !(isNounEntry(e) && isPluralNounEntry(e)) &&
        isPattern(0)(e) &&
        isAdjectiveEntry(e),
    },
  });
  if (noun) {
    // TODO: could merge these queries for more efficiency ??
    queries.push({
      search: { ppp: s },
      details: {
        inflection: [0],
        gender: ["masc", "fem"],
        plural: true,
        predicate: isNounEntry,
      },
    });
    queries.push({
      search: { app: s },
      details: {
        inflection: [0],
        gender: ["masc", "fem"],
        plural: true,
        predicate: isNounEntry,
      },
    });
    // TODO: what about short vowel ending nouns with وو etc
    if (s.endsWith("و") && !["ا", "و"].includes(s.charAt(s.length - 2))) {
      queries.push({
        search: { ppp: s.slice(0, -1) },
        details: {
          inflection: [1],
          gender: ["masc"],
          plural: true,
          predicate: isMascNounEntry,
        },
      });
      queries.push({
        search: { app: s.slice(0, -1) },
        details: {
          inflection: [1],
          gender: ["masc"],
          plural: true,
          predicate: isMascNounEntry,
        },
      });
      queries.push({
        search: { ppp: s.slice(0, -1) + "ې" },
        details: {
          inflection: [1],
          gender: ["fem"],
          plural: true,
          predicate: isFemNounEntry,
        },
      });
    }
    if (s.endsWith("ونه")) {
      queries.push({
        search: { p: s.slice(0, -3) },
        details: {
          inflection: [0],
          gender: ["masc"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
      queries.push({
        search: { p: s.slice(0, -3) + "ه" },
        details: {
          inflection: [0],
          gender: ["masc"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (
      s.endsWith("ان") &&
      !["ا", "و"].includes(s.charAt(s.length - 3) || "")
    ) {
      queries.push({
        search: { p: s.slice(0, -2) },
        details: {
          inflection: [0],
          gender: ["masc"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            (isMascNounEntry(e) || isUnisexNounEntry(e)) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (
      s.endsWith("انې") &&
      !["ا", "و"].includes(s.charAt(s.length - 4) || "")
    ) {
      queries.push({
        search: { p: s.slice(0, -3) },
        details: {
          inflection: [0],
          gender: ["fem"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            (isFemNounEntry(e) || isUnisexNounEntry(e)) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (
      s.endsWith("ګان") &&
      ["ا", "و"].includes(s.charAt(s.length - 4) || "")
    ) {
      queries.push({
        search: { p: s.slice(0, -3) },
        details: {
          inflection: [0],
          gender: ["masc"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            (isMascNounEntry(e) || isUnisexNounEntry(e)) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (
      s.endsWith("ګانې") &&
      ["ا", "و"].includes(s.charAt(s.length - 5) || "")
    ) {
      queries.push({
        search: { p: s.slice(0, -4) },
        details: {
          inflection: [0],
          gender: ["fem"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            (isFemNounEntry(e) || isUnisexNounEntry(e)) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (s.endsWith("وې") && ["ا", "و"].includes(s.charAt(s.length - 3) || "")) {
      queries.push({
        search: { p: s.slice(0, -2) },
        details: {
          inflection: [0],
          gender: ["fem"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            (isFemNounEntry(e) || isUnisexNounEntry(e)) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (s.endsWith("وو") && ["ا", "و"].includes(s.charAt(s.length - 3) || "")) {
      queries.push({
        search: { p: s.slice(0, -2) },
        details: {
          inflection: [1],
          gender: ["fem"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            (isFemNounEntry(e) || isUnisexNounEntry(e)) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
      queries.push({
        search: { app: s.slice(0, -2) },
        details: {
          inflection: [1],
          gender: ["masc"],
          plural: true,
          predicate: (e) => isNounEntry(e),
        },
      });
    }
    if (
      s.endsWith("ګانو") &&
      ["ا", "و"].includes(s.charAt(s.length - 5) || "")
    ) {
      queries.push({
        search: { p: s.slice(0, -4) },
        details: {
          inflection: [1],
          gender: ["masc", "fem"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (s.endsWith("انو")) {
      queries.push({
        search: { p: s.slice(0, -3) },
        details: {
          inflection: [1],
          gender: ["masc", "fem"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (s.endsWith("ونو")) {
      queries.push({
        search: { p: s.slice(0, -3) },
        details: {
          inflection: [1],
          gender: ["masc"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
      queries.push({
        search: { p: s.slice(0, -3) + "ه" },
        details: {
          inflection: [1],
          gender: ["masc"],
          plural: true,
          predicate: (e) =>
            isNounEntry(e) &&
            !isPluralNounEntry(e) &&
            !isPattern2Entry(e) &&
            !isPattern3Entry(e) &&
            !isPattern4Entry(e),
        },
      });
    }
    if (s.endsWith("و")) {
      queries.push({
        search: { p: s.slice(0, -1) },
        details: {
          inflection: [2],
          gender: ["fem"],
          predicate: (e) =>
            isNounEntry(e) && isAnimNounEntry(e) && isFemNounEntry(e),
        },
      });
    }
    queries.push({
      search: { p: s },
      details: {
        inflection: [0],
        gender: ["fem"],
        predicate: (e) =>
          isNounEntry(e) && isFemNounEntry(e) && isPattern1Entry(e),
      },
    });
    queries.push({
      search: { p: s },
      details: {
        inflection: [0, 1],
        gender: ["fem"],
        predicate: (e) =>
          isNounEntry(e) && isAnimNounEntry(e) && isFemNounEntry(e),
      },
    });
  }
  queries.push({
    search: { p: s },
    details: {
      inflection: [0, 1],
      gender: ["masc"],
      predicate: (e) =>
        !(isNounEntry(e) && isPluralNounEntry(e)) &&
        (isPattern1Entry(e) || (isPattern(0)(e) && !isAdjectiveEntry(e))),
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
  if (noun) {
    queries.push({
      search: { p: s },
      details: {
        inflection: [0],
        plural: true,
        gender: ["masc", "fem"],
        predicate: (e) => isNounEntry(e) && isPluralNounEntry(e),
      },
    });
  }
  if (s.endsWith("ه")) {
    queries.push({
      search: { p: s.slice(0, -1) },
      details: {
        inflection: [0],
        gender: ["fem"],
        predicate: isPattern1Entry,
      },
    });
    queries.push({
      search: { p: s },
      details: {
        inflection: [0],
        gender: ["fem"],
        predicate: isPattern1Entry,
      },
    });
    // TODO: Bundled plural only works when there is a quantifier in front of it !
    // if (noun) {
    //   // bundled plural
    //   queries.push({
    //     search: { p: s.slice(0, -1) },
    //     details: {
    //       inflection: [0],
    //       plural: true,
    //       gender: ["masc"],
    //       predicate: (e) => !isPattern5Entry(e) && endsInConsonant(e),
    //     },
    //   });
    // }
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
    if (noun) {
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
    queries.push({
      search: { p: s },
      details: {
        inflection: [0],
        gender: ["fem"],
        predicate: isPattern6FemEntry,
      },
    });
  } else if (s.endsWith("و")) {
    queries.push({
      search: { p: s.slice(0, -1) },
      details: {
        inflection: [2],
        gender: ["masc", "fem"],
        predicate: (e) => isPattern1Entry(e),
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
    if (noun) {
      queries.push({
        search: { p: s.slice(0, -1) + "ه" },
        details: {
          inflection: [2],
          gender: ["fem"],
          predicate: (e) => isPattern1Entry(e) || isFemNounEntry(e),
        },
      });
      queries.push({
        search: { p: s.slice(0, -1) + "ه" },
        details: {
          inflection: [2],
          gender: ["masc"],
          predicate: isMascNounEntry,
        },
      });
      queries.push({
        search: { p: s.slice(0, -1) + "ې" },
        details: {
          inflection: [2],
          gender: ["fem"],
          predicate: (e) => isNounEntry(e) || isFemNounEntry(e),
        },
      });
      queries.push({
        search: { p: s.slice(0, -1) + "ۍ" },
        details: {
          inflection: [2],
          gender: ["fem"],
          predicate: (e) => isFemNounEntry(e) && isPattern3Entry(e),
        },
      });
      queries.push({
        search: { p: s.slice(0, -1) + "ي" },
        details: {
          inflection: [2],
          gender: ["fem"],
          predicate: isPattern6FemEntry,
        },
      });
    }
    if (s.endsWith("یو")) {
      queries.push({
        search: { p: s.slice(0, -2) + "ی" },
        details: {
          inflection: [2],
          gender: ["masc", "fem"],
          predicate: (e) => isPattern2Entry(e) || isPattern3Entry(e),
        },
      });
      if (noun) {
        queries.push({
          search: { p: s.slice(0, -2) + "ۍ" },
          details: {
            inflection: [2],
            gender: ["fem"],
            predicate: (e) => isPattern3Entry(e) && isFemNounEntry(e),
          },
        });
        queries.push({
          search: { p: s.slice(0, -2) + "ي" },
          details: {
            inflection: [2],
            gender: ["fem"],
            predicate: isPattern6FemEntry,
          },
        });
      }
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
    if (noun) {
      queries.push({
        search: { p: s.slice(0, -1) + "ي" },
        details: {
          inflection: [1],
          gender: ["fem"],
          predicate: isPattern6FemEntry,
        },
      });
      queries.push({
        search: { p: s },
        details: {
          inflection: [0, 1],
          gender: ["fem"],
          predicate: isPattern3Entry,
        },
      });
    }
  }

  const coallated: ReturnType<typeof getInflectionQueries> = [];

  for (const q of queries) {
    const existing = coallated.find((x) => equals(x.search)(q.search));
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
