export interface Translations {
  [key: string]: string;
}

export interface LanguagePack {
  language: string;
  translations: Translations;
}
