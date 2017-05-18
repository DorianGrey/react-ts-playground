import {addLocaleData} from "react-intl";
import * as de from "react-intl/locale-data/de";
import * as en from "react-intl/locale-data/en";

import translations from "../generated/translations";

addLocaleData([...de, ...en]);

export function getMessagesForLang(lang: string): { [key: string]: string } {
  return translations[lang] || translations["en"];
}