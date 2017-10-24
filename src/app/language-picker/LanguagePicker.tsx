import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { IntlAction, updateIntl } from "react-intl-redux";
import ListItem from "react-md/lib/Lists/ListItem";
import MenuButton from "react-md/lib/Menus/MenuButton";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getMessagesForLang, getSupportedLanguages } from "../i18n/i18n";
import { AppState } from "../state";

export interface LanguagePickerProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const mapStateToProps = (state: AppState) => {
  return {
    language: state.intl.locale
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IntlAction>) => {
  return {
    setLanguage: (lang: string) => {
      dispatch(
        updateIntl({
          locale: lang,
          messages: getMessagesForLang(lang)
        })
      );
    }
  };
};

function LanguagePicker(props: LanguagePickerProps & InjectedIntlProps) {
  const languages = getSupportedLanguages();

  function handleChange(value: string) {
    props.setLanguage(value);
  }

  const items = languages.map(lang => ({
    label: props.intl.formatMessage({ id: `languages.${lang}` }),
    value: lang
  }));

  const listItems = items.map(({ label, value }) => (
    <ListItem
      key={value}
      primaryText={label}
      active={props.intl.locale === value}
      onClick={handleChange.bind(null, value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl<never>(LanguagePicker)
);
