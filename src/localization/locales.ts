import { ru, enUS } from "date-fns/locale";

export enum Language {
  "ru" = "ru",
  "en" = "en",
}

export type Namespace = "translation";

export const dateLocales: {
  [key in Language | "default"]: typeof ru;
} = {
  ru: ru,
  en: enUS,
  default: ru,
};

export const fallbackLng: Language = Language.ru;
export const defaultNS: Namespace = "translation";

export const languages: Language[] = Object.values(Language);
export const namespaces = [defaultNS];
