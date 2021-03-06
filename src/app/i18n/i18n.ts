import type { LanguagePack } from "./languagePacks/languagePack";

export const BROWSER_LANGUAGE = navigator.language.slice(0, 2);

export async function loadLanguagePack(lang: string): Promise<LanguagePack> {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (lang) {
    case "de":
      const mod1 = await import(
        /* webpackChunkName: "lang-de" */ "./languagePacks/de"
      );
      return mod1.default;
    default:
      const mod2 = await import(
        /* webpackChunkName: "lang-en" */ "./languagePacks/en"
      );
      return mod2.default;
  }
}

export function loadBrowserLanguagePack(): Promise<LanguagePack> {
  return loadLanguagePack(BROWSER_LANGUAGE);
}

export function getSupportedLanguages(): string[] {
  return ["de", "en"]; // TODO: Optimize.
}
