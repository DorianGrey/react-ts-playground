import React, { useContext } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import ListItem from "react-md/lib/Lists/ListItem";
import MenuButton from "react-md/lib/Menus/MenuButton";

import { getSupportedLanguages } from "../i18n/i18n";
import { IntlConfigContext } from "../provider/IntlConfigProvider";

export interface LanguagePickerProps {
  language: string;
  setLanguage: (lang: string) => void;
}

function LanguagePicker(props: InjectedIntlProps) {
  const languages = getSupportedLanguages();

  const { loadLanguage } = useContext(IntlConfigContext);

  const items = languages.map(lang => ({
    label: props.intl.formatMessage({ id: `languages.${lang}` }),
    value: lang
  }));

  const listItems = items.map(({ label, value }) => (
    <ListItem
      key={value}
      primaryText={label}
      active={props.intl.locale === value}
      onClick={loadLanguage.bind(null, value)}
    />
  ));

  return (
    <MenuButton
      id="language-selection"
      floating
      secondary
      menuItems={listItems}
    >
      language
    </MenuButton>
  );
}

export default injectIntl(LanguagePicker);
