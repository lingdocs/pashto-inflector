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
    expect(parseEc("die")).toEqual(["die", "dies", "dying", "died", "died"]);
    expect(parseEc("play")).toEqual(["play","plays","playing","played","played"]);
    // if there are only four items the perfect will be the same as the simple past
    expect(parseEc("think,thinks,thinking,thought")).toEqual(["think","thinks","thinking","thought","thought"]);
    expect(parseEc("sew,sews,sewing,sewed,sown")).toEqual(["sew", "sews", "sewing", "sewed", "sown"]);
    expect(parseEc(" sew, sews,sewing ,sewed, sown")).toEqual(["sew", "sews", "sewing", "sewed", "sown"]);
});