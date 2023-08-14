/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  arraysHaveCommon,
  parseEc,
  personFromVerbBlockPos,
} from "./misc-helpers";
import * as T from "../../types";

test("personFromVerbBlockPos should work", () => {
  expect(personFromVerbBlockPos([0, 0])).toEqual(T.Person.FirstSingMale);
  expect(personFromVerbBlockPos([1, 0])).toEqual(T.Person.FirstSingFemale);
  expect(personFromVerbBlockPos([2, 0])).toEqual(T.Person.SecondSingMale);
  expect(personFromVerbBlockPos([3, 0])).toEqual(T.Person.SecondSingFemale);
  expect(personFromVerbBlockPos([4, 0])).toEqual(T.Person.ThirdSingMale);
  expect(personFromVerbBlockPos([5, 0])).toEqual(T.Person.ThirdSingFemale);
  expect(personFromVerbBlockPos([0, 1])).toEqual(T.Person.FirstPlurMale);
  expect(personFromVerbBlockPos([1, 1])).toEqual(T.Person.FirstPlurFemale);
  expect(personFromVerbBlockPos([2, 1])).toEqual(T.Person.SecondPlurMale);
  expect(personFromVerbBlockPos([3, 1])).toEqual(T.Person.SecondPlurFemale);
  expect(personFromVerbBlockPos([4, 1])).toEqual(T.Person.ThirdPlurMale);
  expect(personFromVerbBlockPos([5, 1])).toEqual(T.Person.ThirdPlurFemale);
});

test("parseEc should work", () => {
  expect(parseEc("walk")).toEqual([
    "walk",
    "walks",
    "walking",
    "walked",
    "walked",
  ]);
  expect(parseEc("scare")).toEqual([
    "scare",
    "scares",
    "scaring",
    "scared",
    "scared",
  ]);
  expect(parseEc("study")).toEqual([
    "study",
    "studies",
    "studying",
    "studied",
    "studied",
  ]);
  expect(parseEc("cry")).toEqual(["cry", "cries", "crying", "cried", "cried"]);
  expect(parseEc("marry")).toEqual([
    "marry",
    "marries",
    "marrying",
    "married",
    "married",
  ]);
  expect(parseEc("get")).toEqual(["get", "gets", "getting", "got", "gotten"]);
  expect(parseEc("become")).toEqual([
    "become",
    "becomes",
    "becoming",
    "became",
    "become",
  ]);
  expect(parseEc("be")).toEqual(["am", "is", "being", "was", "been"]);
  expect(parseEc("make")).toEqual(["make", "makes", "making", "made", "made"]);
  expect(parseEc("have")).toEqual(["have", "has", "having", "had", "had"]);
  expect(parseEc("die")).toEqual(["die", "dies", "dying", "died", "died"]);
  expect(parseEc("stray")).toEqual([
    "stray",
    "strays",
    "straying",
    "strayed",
    "strayed",
  ]);
  expect(parseEc("cross")).toEqual([
    "cross",
    "crosses",
    "crossing",
    "crossed",
    "crossed",
  ]);
  expect(parseEc("raise")).toEqual([
    "raise",
    "raises",
    "raising",
    "raised",
    "raised",
  ]);
  expect(parseEc("play")).toEqual([
    "play",
    "plays",
    "playing",
    "played",
    "played",
  ]);
  // if there are only four items the perfect will be the same as the simple past
  expect(parseEc("think,thinks,thinking,thought")).toEqual([
    "think",
    "thinks",
    "thinking",
    "thought",
    "thought",
  ]);
  expect(parseEc("sew,sews,sewing,sewed,sown")).toEqual([
    "sew",
    "sews",
    "sewing",
    "sewed",
    "sown",
  ]);
  expect(parseEc(" sew, sews,sewing ,sewed, sown")).toEqual([
    "sew",
    "sews",
    "sewing",
    "sewed",
    "sown",
  ]);
});

test("arraysHaveCommon should work", () => {
  expect(arraysHaveCommon(["a", "b", "c"], ["d"])).toBe(false);
  expect(arraysHaveCommon(["a", "b", "c"], ["f", "b"])).toBe(true);
  expect(arraysHaveCommon([], [23])).toBe(false);
  expect(arraysHaveCommon([], [])).toBe(false);
  expect(arraysHaveCommon([3, 2, 1, 0, 100], [24, 290, 2, 55, 100])).toBe(true);
});
