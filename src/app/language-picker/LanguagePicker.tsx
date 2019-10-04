import React from "react";
import { useIntl } from "react-intl";
import ListItem from "react-md/lib/Lists/ListItem";
import MenuButton from "react-md/lib/Menus/MenuButton";

import { getSupportedLanguages } from "../i18n/i18n";
import { useIntlConfig } from "../provider/IntlConfigProvider";

function LanguagePicker() {
  const languages = getSupportedLanguages();

  const { formatMessage, locale } = useIntl();
  const { loadLanguage } = useIntlConfig();

  const items = languages.map(lang => ({
    label: formatMessage({ id: `languages.${lang}` }),
    value: lang
  }));

  const listItems = items.map(({ label, value }) => (
    <ListItem
      key={value}
      primaryText={label}
      active={locale === value}
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

export default LanguagePicker;
