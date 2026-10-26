import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector) //Adds the memory plugin
  .use(initReactI18next) //Connects i18next to React
  .init({
    //resouces: The dictionaries. translation is the default group name.
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en", //If a key is missing in Arabic, show the English text.
    supportedLngs: ["en", "ar"], //Only these two languages are allowed.
    //Look only at the saved choice. With nothing saved, the app starts in English.
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    }, //Save the choice in the chaches
    interpolation: { escapeValue: false },
  });

export default i18n;
