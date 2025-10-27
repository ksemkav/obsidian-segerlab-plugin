import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import {
  dateLocales,
  defaultNS,
  fallbackLng,
  Language,
  languages,
} from "./locales";
import { setLocale } from "./date-helpers";
import * as russianTranslations from "./dictionaries/translation.ru.json";
import * as englishTranslations from "./dictionaries/translation.en.json";

export function initializeLocalization() {
  return i18n
    //.use(intervalPlural)
    //.use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng,
      defaultNS,
      load: "languageOnly",
      preload: [fallbackLng, "en"],
      //saveMissing: process.env.NODE_ENV !== 'production',
      lowerCaseLng: true,
      initImmediate: true,
      debug: false,
      supportedLngs: languages,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      resources: {
        ru: {
          [defaultNS]: russianTranslations,
        },
        en: {
          [defaultNS]: englishTranslations,
        },
      },
      //   backend: {
      //     loadPath: '/dictionaries/{{ns}}.{{lng}}.json',
      //     queryStringParams: { v: appVersion() },
      //   },
    })
    .then(() => {
      return changeLanguage(i18n.language as Language);
    });
}

export async function changeLanguage(language: Language) {
  // handle there all locale dependent resources like a date presentation
  document.documentElement.lang = language;
  setLocale(getDefaultLocaleForLanguage(language));

  // change language as a last step because it will cause rerendering
  if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }
}

function getDefaultLocaleForLanguage(language: Language) {
  return dateLocales[language] ?? dateLocales.default;
}
