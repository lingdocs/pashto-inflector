import { getPeople } from "./utils";
import * as T from "../../../types";

test("getPeople", () => {
  expect(getPeople(1, "sing")).toEqual([
    T.Person.FirstSingMale,
    T.Person.FirstSingFemale,
  ]);
  expect(getPeople(2, "pl")).toEqual([
    T.Person.SecondPlurMale,
    T.Person.SecondPlurFemale,
  ]);
  expect(getPeople(3, "both")).toEqual([
    T.Person.ThirdSingMale,
    T.Person.ThirdSingFemale,
    T.Person.ThirdPlurMale,
    T.Person.ThirdPlurFemale,
  ]);
});
