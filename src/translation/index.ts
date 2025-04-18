import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import { getLanguage } from "@/Store/Language";
import fr from "./fr";

const data = getLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
  fallbackLng: "en",
  lng: data?.payload || "en",
});

export default i18n;
