import deLocale from "date-fns/locale/de";
import translationsDe from "../../../generated/translations-de";
import type { LanguagePack } from "./languagePack";

const deLanguagePack: LanguagePack = {
  translations: translationsDe,
  locale: "de",
  dateLocale: deLocale,
};

export default deLanguagePack;
