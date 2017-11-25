export interface Translations {
  [key: string]: string;
}

export interface LanguagePack {
  translations: Translations;
  localeData: ReactIntl.LocaleData;
}
