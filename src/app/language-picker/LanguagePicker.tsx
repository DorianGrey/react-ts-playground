import * as React from "react";

import {injectIntl, InjectedIntlProps} from "react-intl";
import {BROWSER_LANGUAGE, getSupportedLanguages} from "../i18n";


class LanguagePicker extends React.Component<InjectedIntlProps, any> {
  languages = getSupportedLanguages();

  state = {
    currentLang: BROWSER_LANGUAGE
  };

  constructor(props: InjectedIntlProps, context: any) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <select value={this.state.currentLang} onChange={this.handleChange}>
        {
          this.languages.map(lang => <option value={lang}
                                             key={lang}>{this.props.intl.formatMessage({id: `languages.${lang}`})}</option>)
        }
      </select>
    );
  }

  handleChange(event: { target: HTMLSelectElement }) {
    // TODO: Dispatch to store once available!
    this.setState({
      currentLang: event.target.value
    });
  }
}

export default injectIntl<never>(LanguagePicker);