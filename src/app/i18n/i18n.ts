import { addLocaleData } from "react-intl";

import { LanguagePack } from "./languagePacks/languagePack";

function registerLocaleData(module: { default: LanguagePack }): LanguagePack {
  addLocaleData(module.default.localeData[0]);
  return module.default;
}

export const BROWSER_LANGUAGE = navigator.language.slice(0, 2);

export function loadLanguagePack(lang: string): Promise<LanguagePack> {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (lang) {
    case "de":
      return import(
        /* webpackChunkName: "lang-de" */ "./languagePacks/de"
      ).then(registerLocaleData);
    default:
      return import(
        /* webpackChunkName: "lang-en" */ "./languagePacks/en"
      ).then(registerLocaleData);
  }
}

export function loadBrowserLanguagePack(): Promise<LanguagePack> {
  return loadLanguagePack(BROWSER_LANGUAGE);
}

export function getSupportedLanguages(): string[] {
  return ["de", "en"]; // TODO: Optimize.
}
