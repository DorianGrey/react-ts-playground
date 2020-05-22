import enLocale from "date-fns/locale/en-GB";
import translationsEn from "../../../generated/translations.en";
import { LanguagePack } from "./languagePack";

const enLanguagePack: LanguagePack = {
  translations: translationsEn,
  locale: "en",
  dateLocale: enLocale,
};

export default enLanguagePack;
