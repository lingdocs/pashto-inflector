import { useEffect, useState } from "react";

type SaveableData = string | number | object | boolean | undefined | null

/**
 * replacement from the React useState hook that will persist the state in local storage
 * 
 * @param defaultValue The default value to use if there was nothing saved previously OR
 * a function that will take the saved value and return a modified new value to start with
 * @param key a key for saving the state in locolStorage
 * @returns 
 */
export default function useStickyState<T extends SaveableData>(defaultValue: T | ((old: T | undefined) => T), key: string): [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
] {
  const [value, setValue] = useState<T>(() => {
    const v = window.localStorage.getItem(key);
    // nothing saved
    if (v === null) {
      if (typeof defaultValue === "function") {
        return defaultValue(undefined);
      }
      return defaultValue;
    }
    // something saved before
    try {
      const old = JSON.parse(v) as T;
      if (typeof defaultValue === "function") {
        return defaultValue(old);
      }
      return old;
    } catch (e) {
      console.error("error parsting saved state from stickState");
      return (typeof defaultValue === "function")
        ? defaultValue(undefined)
        : defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useStickyReducer<T extends SaveableData, A>(
  reducer: (state: T, dispatch: A, sendAlert?: (msg: string) => void) => T,
  defaultValue: T | ((old: T | undefined) => T),
  key: string,
  sendAlert?: (msg: string) => void,
): [T, (action: A) => void, ((msg: string) => void) | undefined] {
  const [state, unsafeSetState] = useStickyState<T>(defaultValue, key);
  function adjustState(action: A) {
    unsafeSetState(oldState => {
      return reducer(oldState, action, sendAlert);
    });
  }
  return [state, adjustState, sendAlert];
}
