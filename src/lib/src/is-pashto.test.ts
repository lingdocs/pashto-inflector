import { isPashtoScript } from "./is-pashto";

test("isPashtoScript works", () => {
    expect(isPashtoScript("کور")).toBe(true);
    expect(isPashtoScript("kor")).toBe(false);
});
