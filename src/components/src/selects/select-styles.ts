/* eslint-disable */

import { StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig = {
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 99999,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 999999,
  }),
  option: (provided: any) => ({
    ...provided,
    padding: "10px 5px",
    color: "#121418",
  }),
  input: (base: any) => ({
    ...base,
    padding: 0,
  }),
};
