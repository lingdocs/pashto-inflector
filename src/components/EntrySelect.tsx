import * as T from "../types";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import {
    makeSelectOption,
    makeVerbSelectOption,
    zIndexProps,
} from "./np-picker/picker-tools";

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
}) {
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
        return <div>
            <AsyncSelect
                isSearchable={true}
                className="mb-2"
                value={value}
                onChange={onChange}
                defaultOptions={[]}
                loadOptions={options}
                placeholder={props.name ? `Select ${props.name}...` : undefined}
                {...zIndexProps}
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
    return <div>
        <Select
            isSearchable={true}
            value={value}
            onChange={onChange}
            className="mb-2"
            options={options}
            placeholder={props.name ? `Select ${props.name}...` : undefined}
            {...zIndexProps}
        />
    </div>
}

export default EntrySelect;