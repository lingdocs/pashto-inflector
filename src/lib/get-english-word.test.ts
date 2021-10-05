import { getEnglishWord } from "./get-english-word";

test("getEnglishWord", () => {
    const tests = [
        // irreg
        {
            in: {"ts":1527815251,"i":7737,"p":"سړی","f":"saRéy","g":"saRey","e":"man","c":"n. m.","ec":"man","ep":"men"},
            out: { singular: "man", plural: "men" },
        },
        // ch, sh, x, s, z - es ending
        {
            in: {"ts":1527823620,"i":1589,"p":"بزه","f":"bza","g":"bza","e":"patch (in a garment)","c":"n. f."},
            out: { singular: "patch", plural: "patches" },
        },
        {
            in: {"ts":1527823172,"i":2066,"p":"بېله","f":"belá","g":"bela","e":"marsh, swamp","c":"n. f."},
            out: { singular: "marsh", plural: "marshes" },
        },
        {
            in: {"ts":1589885085444,"i":11290,"p":"لمبړ","f":"lUmbáR","g":"lUmbaR","e":"fox","c":"n. m. unisex"},
            out: { singular: "fox", plural: "foxes" },
        },
        {
            in: {"ts":1592642858843,"i":13644,"p":"نېک","f":"nek","g":"nek","e":"boss, master","c":"n. m. anim. unisex"},
            out: { singular: "boss", plural: "bosses" },
        },
        // (consonant) w/ y - ies 
        {
            in: {"ts":1527812677,"i":13994,"p":"هېواد","f":"hewaad","g":"hewaad","e":"country, homeland","c":"n. m."},
            out: { singular: "country", plural: "countries" },
        },
        // (vowel) w/ y - ys
        {
            in: {"ts":1527815417,"i":14123,"p":"ورځ","f":"wradz","g":"wradz","e":"day","c":"n. f."},
            out: { singular: "day", plural: "days" },
        },
        // ends in o
        {
            in: {"ts":1527820648,"i":788,"p":"الو","f":"aloo","g":"aloo","e":"potato","c":"n. m.","ppp":"الوګان","ppf":"aloogáan"},
            out: { singular: "potato", plural: "potatoes" },
        },
        // ends in is
        {
            in: {"ts":1527814761,"i":3124,"p":"تحلیل","f":"tahleel","g":"tahleel","e":"analysis","c":"n. m."},
            out: { singular: "analysis", plural: "analyses" },
        },
        // only plural
        {
            in: {"ts":1527815008,"i":8433,"p":"شودې","f":"shoodé","g":"shoode","e":"milk","c":"n. f. pl."},
            out: { plural: "milk" },
        },
    ]
    tests.forEach((t) => {
        expect(getEnglishWord(t.in)).toEqual(t.out);
    });
})