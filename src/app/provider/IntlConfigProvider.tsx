import React, { FC, FunctionComponent, useState, useContext } from "react";
import { IntlProvider } from "react-intl";

import { Translations } from "../i18n/languagePacks/languagePack";
import { BROWSER_LANGUAGE, loadLanguagePack } from "../i18n/i18n";

// Only use text contents for intl formatting.
// TODO: Figure out the typing problem. Sounds weird.
const Fragment: FC = ({ children }) => {
  return <>{children}</>;
};

interface IntlConfigContext {
  locale: string;
  translations: Translations;
  loadLanguage: (lang: string) => void;
}

const IntlConfigContext = React.createContext<IntlConfigContext>({
  locale: BROWSER_LANGUAGE,
  translations: {},
  loadLanguage: (_lang: string) => {}
});

interface IntlConfigProviderProps {
  initialTranslations?: Translations;
}

export const IntlConfigProvider: FunctionComponent<IntlConfigProviderProps> = ({
  children,
  initialTranslations
}) => {
  const [intlState, setIntl] = useState<{
    locale: string;
    translations: Translations;
  }>({
    locale: BROWSER_LANGUAGE,
    translations: initialTranslations || {}
  });

  const loadLanguage = (lang: string) =>
    loadLanguagePack(lang).then(langPack => {
      setIntl({
        locale: langPack.language,
        translations: langPack.translations
      });
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
