import { removeFVarients, makePsString } from "./accent-and-ps-utils";

test(`removeFVarients`, () => {
    expect(removeFVarients("ist'imaal, istimaal")).toBe("ist'imaal");
    expect(removeFVarients({ p: "معالوم", f: "ma'aalóom, maalóom" }))
        .toEqual({ p: "معالوم", f: "ma'aalóom" });
    expect(removeFVarients("kor")).toBe("kor");
});

test(`makePsString should work`, () => {
    expect(makePsString("کور", "kor")).toEqual({ p: "کور", f: "kor" });
});
