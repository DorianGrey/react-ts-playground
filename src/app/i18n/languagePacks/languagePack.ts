export interface Translations {
  [key: string]: string;
}

export interface LanguagePack {
  locale: string;
  translations: Translations;
  dateLocale: Locale;
}
