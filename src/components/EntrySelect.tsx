import * as T from "../types";
import { StyleHTMLAttributes } from "react";
import Select, { StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import {
    makeSelectOption,
    makeVerbSelectOption,
} from "./np-picker/picker-tools";

export const customStyles: StylesConfig = {
    menuPortal: (base) => ({
        ...base,
        zIndex: 99999,
    }),
    menu: (base) => ({
        ...base,
        zIndex: 999999,
    }),
    option: (provided, state) => ({
        ...provided,
        padding: "10px 5px",
        color: "#121418",
    }),
    input: (base) => ({
        ...base,
        padding: 0,
    }),
}

function EntrySelect<E extends T.DictionaryEntry | T.VerbEntry>(props: ({
    entries: E[]
} | { 
    searchF: (search: string) => E[],
    getByTs: (ts: number) => E | undefined,
}) & {
    value: E | undefined,
    onChange: (value: E | undefined) => void,
    name: string | undefined,
    isVerbSelect?: boolean,
    opts: T.TextOptions,
    style?: StyleHTMLAttributes<HTMLDivElement>,
}) {
    const divStyle = props.style || { width: "13rem" };
    const placeholder = "entries" in props ? "Select…" : "Search Pashto";
    function makeOption(e: E | T.DictionaryEntry) {
        if ("entry" in e) {
            return (props.isVerbSelect ? makeVerbSelectOption : makeSelectOption)(e, props.opts);
        }
        return makeSelectOption(e, props.opts);
    }
    const value = props.value ? makeOption(props.value) : undefined;
    if ("searchF" in props) {
        const options = (searchString: string) => 
            new Promise<{ value: string, label: string | JSX.Element }[]>(resolve => {
                resolve(props.searchF(searchString).map(makeOption));
            });
        const onChange = (v: { label: string | JSX.Element, value: string } | null) => {
            if (!v) {
                props.onChange(undefined);
                return;
            }
            const s = props.getByTs(parseInt(v.value));
            if (!s) return;
            props.onChange(s);
        }
        return <div style={divStyle}>
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
        </div>;
    }
    const options = props.entries
        .sort((a, b) => {
            if ("entry" in a) {
                return a.entry.p.localeCompare("p" in b ? b.p : b.entry.p, "af-PS")
            }
            return a.p.localeCompare("p" in b ? b.p : b.entry.p, "af-PS");
        })
        .map(makeOption);
    const onChange = (v: { label: string | JSX.Element, value: string } | null) => {
        if (!v) {
            props.onChange(undefined);
            return;
        }
        const s = props.entries.find(e => (
            ("entry" in e) 
                ? e.entry.ts.toString() === v.value
                : e.ts.toString() === v.value
        ));
        if (!s) return;
        props.onChange(s);
    }
    return <div style={divStyle}>
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
}

export default EntrySelect;