import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getItem, STORAGE_KEYS } from "../utils/storage.js";

import en from "./locales/en.json";
import ur from "./locales/ur.json";
import ps from "./locales/ps.json";
import pa from "./locales/pa.json";

const savedLanguage = getItem(STORAGE_KEYS.LANGUAGE, null);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    ps: { translation: ps },
    pa: { translation: pa },
  },
  lng: savedLanguage || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

export default i18n;
