import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { STORAGE_KEYS } from "../utils/storage.js";

function systemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    STORAGE_KEYS.THEME,
    systemPrefersDark() ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggleTheme };
}
