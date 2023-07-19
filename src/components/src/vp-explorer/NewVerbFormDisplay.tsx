import { useEffect, useState } from "react";
import ButtonSelect from "../ButtonSelect";
import { combineIntoText } from "../../../lib/src/phrase-building/compile";
import { insertNegative } from "../../../lib/src/phrase-building/render-vp";
import * as T from "../../../types";
import TableCell from "../TableCell";
import { choosePersInf, getLength } from "../../../lib/src/p-text-helpers";
import genderColors from "../gender-colors";
import { eqPsStringWVars } from "../../../lib/src/fp-ps";
import PersInfsPicker from "../PersInfsPicker";
import { useMediaPredicate } from "react-media-hook";

export const roleIcon = {
  king: <i className="mx-1 fas fa-crown" />,
  servant: <i className="mx-1 fas fa-male" />,
};

function VerbChartDisplay({
  chart,
  opts,
  shortDefault,
  transitivity,
  past,
}: {
  chart: T.OptionalPersonInflections<
    T.SingleOrLengthOpts<T.RenderVerbOutput[]>
  >;
  opts: T.TextOptions;
  shortDefault?: boolean;
  transitivity: T.Transitivity;
  past: boolean;
}) {
  const [length, setLength] = useState<T.Length>(
    shortDefault ? "short" : "long"
  );
  const [persInf, setPersInf] = useState<T.PersonInflectionsField>("mascSing");
  useEffect(() => {
    setLength("long");
  }, [chart]);
  const desktop = useMediaPredicate("(min-width: 600px)");
  const chartWPers = choosePersInf(chart, persInf);
  const chartWLength = getLength(chartWPers, length);

  const x = chartWLength.map(renderVerbOutputToText(false));
  const verbBlock =
    x.length === 12
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
          <AgreementInfo transitivity={transitivity} past={past} />
        </div>
        <div className="col">
          {"long" in chartWPers && (
            <LengthSelection
              hasMini={"mini" in chartWPers}
              value={length}
              onChange={setLength}
            />
          )}
        </div>
        {desktop && <div className="col" />}
      </div>
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
  const rowLabel = `${pers[person]}${
    gender ? (gender === "masc" ? " m." : " f.") : ""
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

function renderVerbOutputToText(negative: boolean) {
  return function (v: T.RenderVerbOutput): T.PsString[] {
    const blocks = insertNegative(
      v.vbs,
      negative,
      false /* TODO: apply imperative */
    );
    return combineIntoText(blocks, 0 /* TODO: why is this needed */);
  };
}

function AgreementInfo({
  transitivity,
  past,
}: {
  transitivity: T.Transitivity;
  past: boolean;
}) {
  return (
    <div className="text-muted small mt-1">
      {roleIcon.king} agrees w/{" "}
      <strong>
        {transitivity !== "intransitive" && past ? "object" : "subject"}
      </strong>
    </div>
  );
}

export default VerbChartDisplay;
