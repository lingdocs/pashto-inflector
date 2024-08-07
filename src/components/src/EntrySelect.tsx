import * as T from "../../types";
import { StyleHTMLAttributes } from "react";
import Select, { StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import {
  makeSelectOption,
  makeVerbSelectOption,
} from "./np-picker/picker-tools";

export const customStyles: StylesConfig = {
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 99999,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 999999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    padding: "10px 5px",
    color: "#121418",
  }),
  input: (base: any) => ({
    ...base,
    padding: 0,
  }),
};

function EntrySelect<E extends T.DictionaryEntry | T.VerbEntry>(props: {
  entryFeeder: T.EntryFeederSingleType<E>;
  value: E | undefined;
  onChange: (value: E | undefined) => void;
  name: string | undefined;
  isVerbSelect?: boolean;
  opts: T.TextOptions;
  style?: StyleHTMLAttributes<HTMLDivElement>;
  placeholder?: string;
}) {
  const divStyle = props.style || { width: "13rem" };
  const placeholder =
    "placeholder" in props
      ? props.placeholder
      : "search" in props.entryFeeder
      ? "Search Pashto"
      : "Search…";
  function makeOption(e: E | T.DictionaryEntry) {
    if ("entry" in e) {
      return (props.isVerbSelect ? makeVerbSelectOption : makeSelectOption)(
        e,
        props.opts
      );
    }
    return makeSelectOption(e, props.opts);
  }
  const value = props.value ? makeOption(props.value) : undefined;
  if ("search" in props.entryFeeder) {
    const search = props.entryFeeder.search;
    const getByTs = props.entryFeeder.getByTs;
    const options = (searchString: string) =>
      new Promise<{ value: string; label: string | JSX.Element }[]>(
        (resolve) => {
          resolve(search(searchString).map(makeOption));
        }
      );
    const onChange = (
      v: { label: string | JSX.Element; value: string } | null
    ) => {
      if (!v) {
        props.onChange(undefined);
        return;
      }
      const s = getByTs(parseInt(v.value));
      if (!s) return;
      props.onChange(s);
    };
    return (
      <div style={divStyle}>
        <AsyncSelect
          styles={customStyles}
          isSearchable={true}
          className="mb-2"
          value={value}
          // @ts-ignore
          onChange={onChange}
          defaultOptions={[]}
          loadOptions={options}
          placeholder={placeholder}
        />
      </div>
    );
  }
  const entries = props.entryFeeder;
  const options = entries
    .sort((a, b) => {
      if ("entry" in a) {
        return a.entry.p.localeCompare("p" in b ? b.p : b.entry.p, "af-PS");
      }
      return a.p.localeCompare("p" in b ? b.p : b.entry.p, "af-PS");
    })
    .map(makeOption);
  const onChange = (
    v: { label: string | JSX.Element; value: string } | null
  ) => {
    if (!v) {
      props.onChange(undefined);
      return;
    }
    const s = entries.find((e) =>
      "entry" in e
        ? e.entry.ts.toString() === v.value
        : e.ts.toString() === v.value
    );
    if (!s) return;
    props.onChange(s);
  };
  return (
    <div style={divStyle}>
      <Select
        styles={customStyles}
        isSearchable={true}
        value={value || null}
        // @ts-ignore - sadly gets messed up when using customStyles
        onChange={onChange}
        className="mb-2"
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
}

export function DeterminerSelect(props: {
  determiners: Readonly<T.Determiner[]>;
  value: T.Determiner[];
  onChange: (value: T.Determiner[] | undefined) => void;
  name: string | undefined;
  opts: T.TextOptions;
}) {
  const placeholder = "Select determiner…";
  const value = props.value ? props.value.map(makeDeterminerOption) : undefined;
  const options = props.determiners.map(makeDeterminerOption);
  const onChange = (
    v: { label: string | JSX.Element; value: string }[] | null
  ) => {
    if (!v) {
      props.onChange(undefined);
      return;
    }
    const dets: T.Determiner[] = v.map(
      ({ value }) => JSON.parse(value) as T.Determiner
    );
    props.onChange(dets);
  };
  return (
    <Select
      name={props.name}
      styles={customStyles}
      isSearchable={true}
      value={value}
      isMulti
      // @ts-ignore - gets messed up when using customStyles
      onChange={onChange}
      className="mb-2"
      options={options}
      placeholder={placeholder}
    />
  );
}

export function SandwichSelect<E extends T.Sandwich>(props: {
  sandwiches: E[];
  value: E | undefined;
  onChange: (value: E | undefined) => void;
  name: string | undefined;
  opts: T.TextOptions;
  style?: StyleHTMLAttributes<HTMLDivElement>;
}) {
  const divStyle = props.style || { width: "13rem" };
  const placeholder = "Select Sandwich…";
  const value = props.value ? makeSandwichOption(props.value) : undefined;
  const options = props.sandwiches
    // .sort((a, b) => {
    //     if ("entry" in a) {
    //         return a.before.p.localeCompare("p" in b ? b.p : b.entry.p, "af-PS")
    //     }
    //     return a.p.localeCompare("p" in b ? b.p : b.entry.p, "af-PS");
    // })
    .map(makeSandwichOption);
  const onChange = (
    v: { label: string | JSX.Element; value: string } | null
  ) => {
    if (!v) {
      props.onChange(undefined);
      return;
    }
    const s = props.sandwiches.find((e) => {
      const sValue = JSON.parse(v.value) as T.Sandwich;
      if (sValue.type !== "sandwich")
        throw new Error(
          "error converting selected sandwich value to a sandwich"
        );
      return (
        sandwichSideEq(e.before, sValue.before) &&
        sandwichSideEq(e.after, sValue.after) &&
        e.e === sValue.e
      );
    });
    if (!s) return;
    props.onChange(s);
  };
  return (
    <div style={divStyle}>
      <div>Sandwich Base</div>
      <Select
        styles={customStyles}
        isSearchable={true}
        value={value}
        // @ts-ignore - gets messed up when using customStyles
        onChange={onChange}
        className="mb-2"
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
}

function sandwichSideEq(
  s1: T.PsString | undefined,
  s2: T.PsString | undefined
): boolean {
  if (s1 === undefined && s2 === undefined) {
    return true;
  }
  if (typeof s1 === "object" && typeof s2 === "object" && s1.p === s2.p) {
    return true;
  }
  return false;
}

function makeDeterminerOption(d: T.Determiner): {
  label: string;
  value: string;
} {
  return {
    label: `${d.p} - ${d.f}`,
    value: JSON.stringify(d),
  };
}

function makeSandwichOption(s: T.Sandwich): { label: string; value: string } {
  return {
    label: `${s.before ? s.before.p : ""} ... ${s.after ? s.after.p : ""} (${
      s.e
    })`,
    value: JSON.stringify(s),
  };
}

export default EntrySelect;
