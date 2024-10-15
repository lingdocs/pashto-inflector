import * as T from "../../../types";
import { compileVP } from "./compile";
import { renderVP } from "./render-vp";

export function removeRedundantVPSs(
  vs: T.VPSelectionComplete[]
): T.VPSelectionComplete[] {
  const versions = vs.map((x) => compileVP(renderVP(x), x.form));
  const toRemove = new Set<number>();
  versions.forEach((a, i) => {
    const duplicates = findAllIndices(
      versions.slice(i + 1),
      (b) => !toRemove.has(i) && isDuplicate(a, b)
    );
    duplicates.forEach((d) => toRemove.add(d + i + 1));
  });
  return vs.reduce<T.VPSelectionComplete[]>((acc, v, i) => {
    if (toRemove.has(i)) {
      return acc;
    }
    return [...acc, v];
  }, []);
}

function isDuplicate(
  a: {
    ps: T.SingleOrLengthOpts<T.PsString[]>;
    e?: string[];
  },
  b: { ps: T.SingleOrLengthOpts<T.PsString[]>; e?: string[] }
): boolean {
  if (!a.e || !b.e) {
    return false;
  }
  if (a.e.length !== b.e.length) {
    return false;
  }
  return a.e.every(
    (x, i) =>
      removeGenderGloss(x) === removeGenderGloss(b.e ? b.e[i] : "") &&
      JSON.stringify(a.ps) === JSON.stringify(b.ps)
  );
}

function removeGenderGloss(s: string): string {
  // TODO: combine into one RegEx
  return s.replaceAll(/\((m|f)\.\)/g, "").replaceAll(/\((m|f)\. pl\.\)/g, "");
}

function findAllIndices<N>(arr: N[], f: (x: N) => boolean): number[] {
  const indices: number[] = [];
  arr.forEach((x, i) => {
    if (f(x)) {
      indices.push(i);
    }
  });
  return indices;
}
