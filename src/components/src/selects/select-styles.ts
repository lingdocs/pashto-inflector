import { StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 99999,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menu: (base: any) => ({
    ...base,
    zIndex: 999999,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (provided: any) => ({
    ...provided,
    padding: "10px 5px",
    color: "#121418",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: (base: any) => ({
    ...base,
    padding: 0,
  }),
};
