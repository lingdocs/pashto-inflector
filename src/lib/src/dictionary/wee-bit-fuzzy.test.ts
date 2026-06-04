import { makeAWeeBitFuzzy } from "./wee-bit-fuzzy";

const pMatches = [
  ["پیټی", "پېټی"],
  ["دوستی", "دوستي"],
  ["پته", "پټه"],
  ["تخلیه", "تحلیه"],
];

const fMatches = [
  ["tahliya", "takhliya"],
  ["sarey", "saRay"],
  ["peyTey", "peTey"],
];

pMatches.forEach((pair) => {
  test(`${pair[0]} should match ${pair[1]}`, () => {
    const re = makeAWeeBitFuzzy(pair[0], "p");
    const result = pair[1].match(new RegExp(re, "i"));
    expect(result).toBeTruthy();
  });
  test(`${pair[1]} should match ${pair[0]}`, () => {
    const re = makeAWeeBitFuzzy(pair[1], "p");
    const result = pair[0].match(new RegExp(re, "i"));
    expect(result).toBeTruthy();
  });
});

fMatches.forEach((pair) => {
  test(`${pair[0]} should match ${pair[1]} both ways`, () => {
    const re = makeAWeeBitFuzzy(pair[0], "f");
    const result = pair[1].match(new RegExp(re, "i"));
    expect(result).toBeTruthy();
  });
  test(`${pair[1]} should match ${pair[0]} both ways`, () => {
    const re = makeAWeeBitFuzzy(pair[1], "f");
    const result = pair[0].match(new RegExp(re, "i"));
    expect(result).toBeTruthy();
  });
});
