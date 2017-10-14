import "./Header.scss";

import * as React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";

import LanguagePicker from "../language-picker/LanguagePicker";

export default class Header extends React.Component<any, any> {
  state: {
    date: Date;
  } = {
    date: new Date()
  };

  private interval: number;

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this.interval = (setInterval(
      () => this.setState({ date: new Date() }),
      1000
    ) as any) as number; // God-damn node-typings ...
  }

  componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <header>
        <FormattedMessage id="header.title" />
        <FormattedDate
          value={this.state.date}
          year="numeric"
          month="long"
          day="2-digit"
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
        />
        <LanguagePicker />
      </header>
    );
  }
}
