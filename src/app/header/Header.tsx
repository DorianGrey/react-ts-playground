import "./Header.scss";

import * as React from "react";

export default class Header extends React.Component<any, any> {

  state: {
    date: Date;
  } = {date: new Date()};

  private interval: number;

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this.interval = setInterval(() => {
      this.setState({date: new Date()})
    }, 1000);
  }

  componentWillUnmount(): void {
    this.interval && clearInterval(this.interval);
  }


  render() {
    return (
      <header>
        <div>Demo App</div>
        <div>{new Date().toLocaleString()}</div>
      </header>
    );
  }
}