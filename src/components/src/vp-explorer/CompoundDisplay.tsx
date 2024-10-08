import * as T from "../../../types";
import Pashto from "../text-display/Pashto";
import Phonetics from "../text-display/Phonetics";
import { makePsString } from "../../../lib/src/accent-and-ps-utils";
import { ReactNode } from "react";
import classNames from "classnames";
import { kawulStat, kedulStat } from "../../../lib/src/irregular-conjugations";

function CompoundFormula({ a, b }: { a: ReactNode; b: ReactNode }) {
  return (
    <div className="row align-items-center mb-3">
      <div className="col-5 text-center">{a}</div>
      <div className="col-2 text-center" style={{ fontSize: "2.5rem" }}>
        <strong>+</strong>
      </div>
      <div className="col-5 text-center">{b}</div>
    </div>
  );
}

function CompoundDisplay({
  info,
  opts,
  handleLinkClick,
}: {
  info: T.NonComboVerbInfo;
  opts: T.TextOptions;
  handleLinkClick: ((ts: number) => void) | "none";
}) {
  const isComplement = "complement" in info || "objComplement" in info;
  if (!isComplement) {
    return null;
  }
  const complement = ((): T.PsString => {
    if ("objComplement" in info) {
      return info.objComplement.plural
        ? info.objComplement.plural
        : info.objComplement.entry;
    }
    if ("complement" in info) {
      return info.complement.masc[0][0];
    } else return makePsString("aa", "aa");
  })();
  const aux = ((): { ps: T.PsString; e: string } => {
    if (
      info.type === "stative compound" ||
      info.type === "generative stative compound"
    ) {
      return info.transitivity === "transitive"
        ? { ps: { p: "کول", f: "kawul" }, e: "to make" }
        : { ps: { p: "کېدل", f: "kedul" }, e: "to become" };
    }
    if (!("auxVerb" in info)) return { ps: { p: "", f: "" }, e: "" };
    const kawulDyn =
      info.type === "dynamic compound" && info.auxVerb.p === "کول";
    return {
      ps: makePsString(info.auxVerb.p, info.auxVerb.f),
      e: kawulDyn ? "to do" : "",
    };
  })();
  return (
    <div className="d-block mx-auto my-3" style={{ maxWidth: "400px" }}>
      <div className="text-center">{info.type}</div>
      <CompoundFormula
        a={
          <div
            className={classNames([
              { clickable: typeof handleLinkClick === "function" },
            ])}
            onClick={
              handleLinkClick
                ? // @ts-expect-error - thinks there might not be a complement, but there will be
                  () => handleLinkClick(info.entry.complement?.ts)
                : undefined
            }
          >
            <div>
              <Pashto opts={opts} ps={complement} />
            </div>
            <div>
              <Phonetics opts={opts} ps={complement} />
            </div>
            <div className="small text-muted">{info.entry.complement?.c}</div>
            {info.type === "dynamic compound" && <div>(Object)</div>}
          </div>
        }
        b={
          <div
            className={classNames([{ clickable: handleLinkClick }])}
            onClick={
              handleLinkClick !== "none"
                ? () =>
                    handleLinkClick(
                      "auxVerb" in info
                        ? // dyanmic compound auxVerb ts
                          info.auxVerb.ts
                        : // stative compound auxVerb ts
                          (info.transitivity === "intransitive"
                            ? kedulStat
                            : kawulStat
                          ).info.entry.entry.ts
                    )
                : undefined
            }
          >
            <div>
              <Pashto opts={opts} ps={aux.ps} />
            </div>
            <div>
              <Phonetics opts={opts} ps={aux.ps} />
            </div>
            {aux.e && <div>{aux.e}</div>}
          </div>
        }
      />
    </div>
  );
}

export default CompoundDisplay;
