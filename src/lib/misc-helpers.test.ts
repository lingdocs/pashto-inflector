/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import {
    parseEc,
} from "./misc-helpers";

test("parseEc should work", () => {
    expect(parseEc("walk")).toEqual(["walk", "walks", "walking", "walked", "walked"]);
    expect(parseEc("scare")).toEqual(["scare", "scares", "scaring", "scared", "scared"]);
    expect(parseEc("study")).toEqual(["study","studies","studying","studied","studied"]);
    expect(parseEc("cry")).toEqual(["cry", "cries", "crying", "cried", "cried"]);
    expect(parseEc("marry")).toEqual(["marry","marries","marrying","married","married"]);
    expect(parseEc("get")).toEqual(["get","gets","getting","got","gotten"]);
    expect(parseEc("become")).toEqual(["become","becomes","becoming","became","become"]);
    expect(parseEc("be")).toEqual(["am","is","being","was","have been"]);
    expect(parseEc("make")).toEqual(["make","makes","making","made","made"]);
    expect(parseEc("have")).toEqual(["have","has","having","had","had"]);
    expect(parseEc("die")).toEqual(["die", "dies", "dying", "died", "died"]);
    expect(parseEc("stray")).toEqual(["stray","strays","straying","strayed","strayed"]);
    expect(parseEc("cross")).toEqual(["cross","crosses","crossing","crossed","crossed"]);
    expect(parseEc("raise")).toEqual(["raise","raises","raising","raised","raised"]);
    expect(parseEc("play")).toEqual(["play","plays","playing","played","played"]);
    // if there are only four items the perfect will be the same as the simple past
    expect(parseEc("think,thinks,thinking,thought")).toEqual(["think","thinks","thinking","thought","thought"]);
    expect(parseEc("sew,sews,sewing,sewed,sown")).toEqual(["sew", "sews", "sewing", "sewed", "sown"]);
    expect(parseEc(" sew, sews,sewing ,sewed, sown")).toEqual(["sew", "sews", "sewing", "sewed", "sown"]);
});