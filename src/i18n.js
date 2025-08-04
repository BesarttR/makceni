import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationMK from "./locales/mk/translation.json";
import translationSQ from "./locales/sq/translation.json";
import translationTR from "./locales/tr/translation.json";

const resources = {
  en: { translation: translationEN },
  mk: { translation: translationMK },
  sq: { translation: translationSQ },
  tr: { translation: translationTR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "mk", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
