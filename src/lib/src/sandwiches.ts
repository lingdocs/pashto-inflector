import * as T from "../../types";

export const sandwiches: T.Sandwich[] = [
    {
        type: "sandwich",
        before: { p: "له", f: "la" },
        after: { p: "نه", f: "na" },
        e: "from",
    },
    {
        type: "sandwich",
        before: { p: "له", f: "la" },
        after: { p: "څخه", f: "tsuxa" },
        e: "from",
    },
    // TODO: Implement mayonaise
    // {
    //     type: "sandwich",
    //     before: { p: "له", f: "la" },
    //     after: "mayonaise",
    //     e: "from",
    // },
    {
        type: "sandwich",
        before: { p: "له", f: "la" },
        after: { p: "سره", f: "sara" },
        e: "with",
    },
    {
        type: "sandwich",
        before: undefined,
        after: { p: "ته", f: "ta" },
        e: "to",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "لپاره", f: "lapaara" },
        e: "for",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "دپاره", f: "dupáara" },
        e: "for",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "دمخې", f: "dumúkhe" },
        e: "before/in front of",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په څانګ", f: "pu tsaang" },
        e: "beside",
    },
    {
        type: "sandwich",
        before: { p: "پر", f: "pur" },
        after: { p: "باندې", f: "baande" },
        e: "on",
    },
    {
        type: "sandwich",
        before: { p: "په", f: "pu" },
        after: { p: "کې", f: "ke" },
        e: "in",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "دننه", f: "dununa" },
        e: "inside",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "دباندې", f: "dubaande" },
        e: "outside",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "مخې ته", f: "mukhe ta" },
        e: "in front of",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "شا ته", f: "shaa ta" },
        e: "behind",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "لاندې", f: "laande" },
        e: "under",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په شان", f: "pu shaan" },
        e: "like",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "غوندې", f: "ghwunde" },
        e: "like",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په حیث", f: "pu heys" },
        e: "as",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په لور", f: "pu lor" },
        e: "towards",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په اړه", f: "pu aRa" },
        e: "about",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په باره کې", f: "pu baara ke" },
        e: "about",
    },
    {
        type: "sandwich",
        before: { p: "د", f: "du" },
        after: { p: "په اړوند", f: "pu aRwand" },
        e: "concerning",
    },
];

export default sandwiches;