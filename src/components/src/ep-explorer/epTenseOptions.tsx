import * as T from "../../../types";

export const epTenseOptions: { label: string | JSX.Element, value: T.EquativeTense }[] = [{
    label: "Present",
    value: "present",
}, {
    label: "Habitual",
    value: "habitual",
}, {
    label: "Subjunctive",
    value: "subjunctive",
}, {
    label: "Future",
    value: "future",
}, {
    label: "Past",
    value: "past",
}, {
    label: `"Would Be"`,
    value: "wouldBe",
}, {
    label: "Past Subjunctive",
    value: "pastSubjunctive",
}, {
    label: `"Would Have Been"`,
    value: "wouldHaveBeen",
}];