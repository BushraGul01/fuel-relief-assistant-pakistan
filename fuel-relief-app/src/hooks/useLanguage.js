import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setItem, STORAGE_KEYS } from "../utils/storage.js";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ur", label: "Urdu", native: "اردو", dir: "rtl" },
  { code: "ps", label: "Pashto", native: "پښتو", dir: "rtl" },
  { code: "pa", label: "Punjabi", native: "پنجابی", dir: "rtl" },
];

export function useLanguage() {
  const { i18n, t } = useTranslation();
  const current =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    document.documentElement.dir = current.dir;
    document.documentElement.lang = current.code;
  }, [current]);

  const changeLanguage = useCallback(
    (code) => {
      i18n.changeLanguage(code);
      setItem(STORAGE_KEYS.LANGUAGE, code);
    },
    [i18n]
  );

  return { current, languages: LANGUAGES, changeLanguage, t };
}
