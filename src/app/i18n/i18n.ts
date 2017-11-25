import { addLocaleData } from "react-intl";
import languagePackDe from "./languagePacks/de";
import languagePackEn from "./languagePacks/en";
import { Translations } from "./languagePacks/languagePack";

addLocaleData([...languagePackDe.localeData, ...languagePackEn.localeData]);

export function getMessagesForLang(lang: string): Translations {
  switch (lang) {
    case "de":
      return languagePackDe.translations;
    default:
      return languagePackEn.translations;
  }
}

export const BROWSER_LANGUAGE = navigator.language.slice(0, 2);

export function getSupportedLanguages(): string[] {
  return ["de", "en"]; // TODO: Optimize.
}
