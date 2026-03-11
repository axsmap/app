import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import fr from "./fr";
import es from "./es";
import jp from "./jp";

// Supported language codes — must match keys in `resources` below
export const SUPPORTED_LANGUAGES = ["en", "es", "fr", "jp"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Read the persisted language from localStorage (set by redux-persist).
 * Falls back to "en" when nothing is stored or the stored value
 * is not one of the supported codes.
 */
function getPersistedLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  try {
    // redux-persist stores the language slice under this key
    const raw = localStorage.getItem("persist:language");
    if (raw) {
      const parsed = JSON.parse(raw);
      const lang = JSON.parse(parsed.language);
      if (SUPPORTED_LANGUAGES.includes(lang)) return lang;
    }
    // Fallback: check the plain i18nextLng key
    const fallback = localStorage.getItem("i18nextLng");
    if (fallback && SUPPORTED_LANGUAGES.includes(fallback as SupportedLanguage)) {
      return fallback as SupportedLanguage;
    }
  } catch {
    // ignore parse errors
  }
  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    es: {
      translation: es,
    },
    jp: {
      translation: jp,
    },
  },
  fallbackLng: "en",
  lng: getPersistedLanguage(),
});

export default i18n;
