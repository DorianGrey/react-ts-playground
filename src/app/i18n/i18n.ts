import { addLocaleData } from "react-intl";
import { updateIntl } from "react-intl-redux";
import { AnyAction } from "redux";
import { ofType } from "redux-observable";

import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { LanguagePack } from "./languagePacks/languagePack";

function registerLocaleData(module: { default: LanguagePack }): LanguagePack {
  addLocaleData(module.default.localeData[0]);
  return module.default;
}

export const BROWSER_LANGUAGE = navigator.language.slice(0, 2);

export function loadLanguagePack(lang: string): Promise<LanguagePack> {
  switch (lang) {
    case "de":
      return import(/* webpackChunkName: "lang-de" */ "./languagePacks/de").then(
        registerLocaleData
      );
    default:
      return import(/* webpackChunkName: "lang-en" */ "./languagePacks/en").then(
        registerLocaleData
      );
  }
}

export function loadBrowserLanguagePack(): Promise<LanguagePack> {
  return loadLanguagePack(BROWSER_LANGUAGE);
}

export function getSupportedLanguages(): string[] {
  return ["de", "en"]; // TODO: Optimize.
}

export const LOAD_LANGUAGE = "loadLanguage";

export const loadLanguageEpic = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(LOAD_LANGUAGE),
    switchMap((action: AnyAction) =>
      from(loadLanguagePack(action.payload as string))
    ),
    map((langPack: LanguagePack) =>
      updateIntl({
        locale: langPack.language,
        messages: langPack.translations
      })
    )
  );
