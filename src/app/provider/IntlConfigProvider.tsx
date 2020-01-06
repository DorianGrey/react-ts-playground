import React, { FC, FunctionComponent, useState, useContext } from "react";
import { IntlProvider } from "react-intl";
import noop from "lodash-es/noop";

import { Translations, LanguagePack } from "../i18n/languagePacks/languagePack";
import { BROWSER_LANGUAGE, loadLanguagePack } from "../i18n/i18n";

// Only use text contents for intl formatting.
const Fragment: FC = ({ children }) => {
  return <>{children}</>;
};

interface IntlConfigContext {
  locale: string;
  dateLocale: Locale;
  translations: Translations;
  loadLanguage: (lang: string) => void;
}

const IntlConfigContext = React.createContext<IntlConfigContext>({
  locale: BROWSER_LANGUAGE,
  dateLocale: {} as Locale,
  translations: {},
  loadLanguage: noop
});

interface IntlConfigProviderProps {
  initialLangPack: LanguagePack;
}

export const IntlConfigProvider: FunctionComponent<IntlConfigProviderProps> = ({
  children,
  initialLangPack
}) => {
  const [intlState, setIntl] = useState<LanguagePack>(initialLangPack);

  const loadLanguage = (lang: string) =>
    loadLanguagePack(lang).then(langPack => {
      setIntl(langPack);
    });

  return (
    <IntlConfigContext.Provider
      value={{
        ...intlState,
        loadLanguage
      }}
    >
      <IntlProvider
        textComponent={Fragment}
        locale={intlState.locale}
        messages={intlState.translations}
      >
        {children}
      </IntlProvider>
    </IntlConfigContext.Provider>
  );
};

export function useIntlConfig() {
  return useContext(IntlConfigContext);
}
