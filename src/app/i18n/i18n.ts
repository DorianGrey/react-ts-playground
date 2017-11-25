import { addLocaleData } from "react-intl";
import * as de from "react-intl/locale-data/de";
import * as en from "react-intl/locale-data/en";

import translationsDe from "../../generated/translations.de";
import translationsEn from "../../generated/translations.en";

addLocaleData([...de, ...en]);

export function getMessagesForLang(lang: string): { [key: string]: string } {
  switch (lang) {
    case "de":
      return translationsDe;
    default:
      return translationsEn;
  }
}

export const BROWSER_LANGUAGE = navigator.language.slice(0, 2);

export function getSupportedLanguages(): string[] {
  return ["de", "en"]; // TODO: Optimize.
}
