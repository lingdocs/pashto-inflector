import { useEffect, useState } from "react";
import ButtonSelect from "../selects/ButtonSelect";
import {
  combineIntoText,
  flattenLengths,
} from "../../../lib/src/phrase-building/compile";
import { insertNegative } from "../../../lib/src/phrase-building/render-vp";
import * as T from "../../../types";
import TableCell from "../tables/TableCell";
import { choosePersInf, getLength } from "../../../lib/src/p-text-helpers";
import genderColors from "../gender-colors";
import { eqPsStringWVars } from "../../../lib/src/fp-ps";
import PersInfsPicker from "../selects/PersInfsPicker";
import "./form-display.css";
import {
  makeBlock,
  makeKid,
} from "../../../lib/src/phrase-building/blocks-utils";
import InlinePs from "../text-display/InlinePs";
import { personToGenNum } from "../../../lib/src/misc-helpers";
import { roleIcon } from "./../role-icons";

function VerbChartDisplay({
  chart,
  opts,
  shortDefault,
  transitivity,
  past,
  negative,
  imperative,
}: {
  chart: {
    objNP: T.Rendered<T.NPSelection> | undefined;
    vbs: T.OptionalPersonInflections<
      T.SingleOrLengthOpts<T.RenderVerbOutput[]>
    >;
  };
  opts: T.TextOptions;
  shortDefault?: boolean;
  transitivity: T.Transitivity;
  past: boolean;
  negative: boolean;
  imperative: boolean;
}) {
  const [length, setLength] = useState<T.Length>(
    shortDefault === true ? "short" : "long"
  );
  const [persInf, setPersInf] = useState<T.PersonInflectionsField>("mascSing");
  useEffect(() => {
    setLength("long");
  }, [chart]);
  const chartWPers = choosePersInf(chart.vbs, persInf);
  const chartWLength = getLength(chartWPers, length);

  const x = chartWLength.map(
    renderVerbOutputToText({
      objNP: chart.objNP,
      negative,
      hasBa: chartWLength[0].hasBa,
      imperative,
      intransitive: transitivity === "intransitive",
    })
  );
  const verbBlock =
    x.length === 1
      ? // unchanging gramm trans or dynamic compound past transitive
      [[[x[0]]]]
      : x.length === 12
        ? [
          // 1st pers
          [
            [x[0], x[6]],
            [x[1], x[7]],
          ],
          // 2nd pers
          [
            [x[2], x[8]],
            [x[3], x[9]],
          ],
          // 3rd pers
          [
            [x[4], x[10]],
            [x[5], x[11]],
          ],
        ]
        : [
          // 2nd pers
          [
            [x[0], x[2]],
            [x[1], x[3]],
          ],
        ];
  return (
    <>
      <div className="mb-2">
        {"mascSing" in chart ? (
          <PersInfsPicker
            persInf={persInf}
            handleChange={setPersInf}
            subjOrObj="object"
          />
        ) : (
          <div />
        )}
      </div>
      <div className="row">
        <div className="col">
          <AgreementInfo
            opts={opts}
            transitivity={transitivity}
            past={past}
            objNP={chart.objNP}
          />
        </div>
        <div className="col">
          {"long" in chartWPers && lengthsMakeADiff(chartWPers) && (
            <LengthSelection
              hasMini={"mini" in chartWPers}
              value={length}
              onChange={setLength}
            />
          )}
        </div>
        <div className="hide-on-mobile col" />
      </div>
      {verbBlock.length === 1 ? (
        <div className="d-flex flex-row justify-content-center mt-3 text-center">
          <TableCell item={verbBlock[0][0][0]} textOptions={opts} />
        </div>
      ) : (
        <table className="table mt-2" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "3rem" }}>
                Pers.
              </th>
              <th scope="col">Singular</th>
              <th scope="col">Plural</th>
            </tr>
          </thead>
          <tbody>
            {verbBlock.map((personRow, i) => (
              <PersonRow
                key={Math.random()}
                // get proper version for imperative blocks
                person={verbBlock.length === 1 ? 1 : i}
                item={personRow}
                opts={opts}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

function PersonRow({
  person,
  item,
  opts,
}: {
  person: number;
  item: T.PsString[][][];
  opts: T.TextOptions;
}) {
  const [singM, singF] = [item[0][0], item[1][0]];
  const [plurM, plurF] = [item[0][1], item[1][1]];
  // just show one single, ungendered row if the gender doesn't make a difference
  if (
    eqPsStringWVars.equals(singM, singF) &&
    eqPsStringWVars.equals(plurM, plurF)
  ) {
    return (
      <GenderedPersonRow
        person={person}
        line={item[0]}
        opts={opts}
        gender={undefined}
      />
    );
  }
  return (
    <>
      <GenderedPersonRow
        person={person}
        line={item[0]}
        opts={opts}
        gender="masc"
      />
      <GenderedPersonRow
        person={person}
        line={item[1]}
        opts={opts}
        gender="fem"
      />
    </>
  );
}

function GenderedPersonRow({
  person,
  line,
  gender,
  opts,
}: {
  person: number;
  line: T.PsString[][];
  gender: T.Gender | undefined;
  opts: T.TextOptions;
}) {
  const pers = ["1st", "2nd", "3rd"]; // arr.length > 1 ? ["1st", "2nd", "3rd"] : ["2nd"];
  const rowLabel = `${pers[person]}${gender ? (gender === "masc" ? " m." : " f.") : ""
    }`;
  const color = !gender ? "inherit" : genderColors[gender];
  return (
    <tr key={`${person}${gender}`}>
      <th scope="row" style={{ color }}>
        {rowLabel}
      </th>
      <TableCell item={line[0]} textOptions={opts} />
      <TableCell item={line[1]} textOptions={opts} />
    </tr>
  );
}

function LengthSelection({
  value,
  onChange,
  hasMini,
}: {
  hasMini: boolean;
  value: T.Length;
  onChange: (v: T.Length) => void;
}) {
  return (
    <div className="text-center">
      <ButtonSelect
        small
        options={[
          { label: "Long", value: "long" },
          { label: "Short", value: "short" },
          ...(hasMini
            ? [
              {
                label: "Mini",
                value: "mini",
              },
            ]
            : []),
        ]}
        value={value}
        handleChange={(p) => onChange(p as T.Length)}
      />
    </div>
  );
}

function renderVerbOutputToText({
  objNP,
  negative,
  hasBa,
  imperative,
  intransitive,
}: {
  objNP: T.Rendered<T.NPSelection> | undefined;
  negative: boolean;
  hasBa: boolean;
  imperative: boolean;
  intransitive: boolean;
}) {
  return function(v: T.RenderVerbOutput): T.PsString[] {
    const blocks: T.Block[][] = insertNegative(v.vbs, negative, imperative).map(
      (b) => {
        if (!objNP) return b;
        return [
          makeBlock({ type: "objectSelection", selection: objNP }),
          ...b,
        ];
      }
    );

    const b = hasBa
      ? blocks.flatMap((v) => [
        [
          { p: " ... ", f: " ... " },
          ...[makeKid({ type: "ba" }), { p: " ... ", f: " ... " }],
          ...v,
        ],
        ...(v.length > 1 && intransitive
          ? [[v[0], makeKid({ type: "ba" }), ...v.slice(1)]]
          : []),
      ])
      : blocks;
    return combineIntoText(b, 0 /* TODO: why is this needed */);
  };
}

function AgreementInfo({
  transitivity,
  past,
  objNP,
  opts,
}: {
  transitivity: T.Transitivity;
  past: boolean;
  objNP: T.Rendered<T.NPSelection> | undefined;
  opts: T.TextOptions;
}) {
  function printGenNum({ gender, number }: T.GenderNumber): string {
    return `${gender === "masc" ? "m." : "f."} ${number === "singular" ? "s." : "pl."
      }`;
  }
  return (
    <div className="text-muted small mt-1">
      <div>
        {roleIcon.king} agrees w/{" "}
        <strong>
          {transitivity !== "intransitive" && past ? "object" : "subject"}
        </strong>
        {transitivity === "transitive" && past && objNP ? " noun" : ""}
      </div>
      {transitivity === "transitive" && past && objNP && (
        <div>
          <InlinePs opts={opts} ps={flattenLengths(objNP.selection.ps)[0]} />
          {` `}({printGenNum(personToGenNum(objNP.selection.person))})
        </div>
      )}
      {transitivity === "grammatically transitive" && past && (
        <div>(implied 3rd pers. m. pl.)</div>
      )}
    </div>
  );
}

function lengthsMakeADiff(v: T.LengthOptions<T.RenderVerbOutput[]>): boolean {
  if (v.long.length > 1) {
    return true;
  }
  const longSample = combineIntoText([[makeBlock(v.long[0].vbs[1][0])]], 0);
  const shortSample = combineIntoText([[makeBlock(v.short[0].vbs[1][0])]], 0);
  return !eqPsStringWVars.equals(longSample, shortSample);
}

export default VerbChartDisplay;
