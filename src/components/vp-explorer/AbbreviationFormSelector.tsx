import ButtonSelect from "../ButtonSelect";
import * as T from "../../types";
import { roleIcon } from "./VPExplorerExplanationModal";

const options = [
    {
        label: "Full",
        value: "full",
    },
    {
        label: <div className="m1-2">No {roleIcon.king}</div>,
        value: "noKing",
    },
    {
        label: <div>Mini {roleIcon.servant}</div>,
        value: "shrinkServant",
    },
    {
        label: <div>Both</div>,
        value: "shortest",
    },
];

function formToValue(f: T.FormVersion) {
    if (f.removeKing === false && f.shrinkServant === false) {
        return "full";
    }
    if (f.removeKing === true && f.shrinkServant === false) {
        return "noKing";
    }
    if (f.removeKing === false && f.shrinkServant === true) {
        return "shrinkServant";
    }
    if (f.removeKing === true && f.shrinkServant === true) {
        return "shortest";
    }
    throw new Error("unrecognized abbreviation form");
}

function limitOptions(adjustable: "both" | "king" | "servant") {
    if (adjustable === "both") {
        return options;
    }
    if (adjustable === "king") {
        return options.filter(o => !["shrinkServant", "shortest"].includes(o.value));
    }
    if (adjustable === "servant") {
        return options.filter(o => !["noKing", "shortest"].includes(o.value));
    }
}

function limitValue(value: string, adjustable: "both" | "king" | "servant") {
    if (adjustable === "both") return value;
    if (adjustable === "king") {
        return (value === "shortest")
            ? "noKing"
            : (value === "shrinkServant")
            ? "full"
            : value;
    }
    if (adjustable === "servant") {
        return (value === "shortest")
            ? "shrinkServant"
            : (value === "noKing")
            ? "full"
            : value;
    }
    throw new Error("unrecognized adjustable value");
}

function AbbreviationFormSelector({ form, onChange, adjustable, inline }: {
    form: T.FormVersion,
    onChange: (f: T.FormVersion) => void,
    adjustable: "both" | "king" | "servant",
    inline?: boolean,
}) {
    function handleChange(f: "full" | "noKing" | "shrinkServant" | "shortest") {
        if (f === "full") {
            onChange({ removeKing: false, shrinkServant: false });
        } else if (f === "noKing") {
            onChange({ removeKing: true, shrinkServant: false });
        } else if (f === "shrinkServant") {
            onChange({ removeKing: false, shrinkServant: true });
        } else if (f === "shortest") {
            onChange({ removeKing: true, shrinkServant: true });
        }
    }
    // TODO: limit display of shrinking options based on the verb type
    return <div className="mb-3 mx-3">
        {/* <div className="text-center text-small mb-2">Abbreviation Options</div> */}
        <ButtonSelect
            faded
            small
            // @ts-ignore
            value={limitValue(formToValue(form), adjustable)}
            // @ts-ignore
            options={limitOptions(adjustable)}
            // @ts-ignore
            handleChange={handleChange}
        />
    </div>
}

export default AbbreviationFormSelector;