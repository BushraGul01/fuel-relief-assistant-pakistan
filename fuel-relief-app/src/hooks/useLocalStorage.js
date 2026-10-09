import { useCallback, useState } from "react";
import { getItem, setItem } from "../utils/storage.js";

/**
 * Drop-in replacement for useState that persists to localStorage via
 * utils/storage.js. Returns [value, setValue] just like useState.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getItem(key, initialValue));

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        setItem(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update];
}
