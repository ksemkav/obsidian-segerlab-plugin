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

export function initializeLocalization(selectedLanguage: string) {
  return i18n
    .use(initReactI18next)
    .init({
      fallbackLng,
      defaultNS,
      load: "languageOnly",
      preload: [fallbackLng, "en"],
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
    })
    .then(() => {
      return selectedLanguage === Language.ru ? changeLanguage(Language.ru) : changeLanguage(Language.en);
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
