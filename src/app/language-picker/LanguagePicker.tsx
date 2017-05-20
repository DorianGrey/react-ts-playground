import * as React from "react";
import {injectIntl, InjectedIntlProps} from "react-intl";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {getMessagesForLang, getSupportedLanguages} from "../i18n/i18n";
import {AppState} from "../state";
import {IntlAction, updateIntl} from "react-intl-redux";

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
      dispatch(updateIntl({
        locale:   lang,
        messages: getMessagesForLang(lang)
      }));
    }
  };
};

function LanguagePicker(props: LanguagePickerProps & InjectedIntlProps) {
  const languages = getSupportedLanguages();

  function handleChange(event: { target: HTMLSelectElement }) {
    props.setLanguage(event.target.value);
  }

  return (
    <select value={props.language} onChange={handleChange}>
      {
        languages.map(lang => <option value={lang}
                                      key={lang}>{props.intl.formatMessage({id: `languages.${lang}`})}</option>)
      }
    </select>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl<never>(LanguagePicker));