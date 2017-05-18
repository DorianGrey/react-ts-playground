import "./Header.scss";

import * as React from "react";
import {FormattedMessage} from "react-intl";

export default class Header extends React.Component<any, any> {

  state: {
    date: Date;
  } = {date: new Date()};

  // refs: {
  //   navLabel: HTMLLabelElement;
  //   navMenu: HTMLElement;
  // };

  private interval: number;

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this.interval = setInterval(() => {
      this.setState({date: new Date()});
    }, 1000);
  }

  componentDidMount(): void {
    // this.refs.navMenu.addEventListener("click", () => {
    //   this.refs.navLabel.click();
    // });
  }

  componentWillUnmount(): void {
    this.interval && clearInterval(this.interval);
  }

  render() {
    return (
      <header>
        <div><FormattedMessage id="header.title"/></div>
        <div>{new Date().toLocaleString()}</div>
      </header>
    );
  }
}