import "./Header.scss";

import * as React from "react";
import {Link} from "react-router-dom";

export default class Header extends React.Component<any, any> {

  state: {
    date: Date;
  } = {date: new Date()};

  refs: {
    navLabel: HTMLLabelElement;
    navMenu: HTMLElement;
  };

  private interval: number;

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this.interval = setInterval(() => {
      this.setState({date: new Date()})
    }, 1000);
  }

  componentDidMount(): void {
    this.refs.navMenu.addEventListener("click", () => {
      this.refs.navLabel.click();
    });
  }

  componentWillUnmount(): void {
    this.interval && clearInterval(this.interval);
  }

  render() {
    return (
      <header>
        <div className="header-navigation-container">
          <label htmlFor="nav-toggle" ref="navLabel">
            <i className="fa fa-bars"></i>
          </label>
          <input type="checkbox" id="nav-toggle"/>
          <nav className="header-nav" ref="navMenu" onClick={ this.onNavClick.bind(this) }>
            <Link to="/">TestRoute1</Link>
            <Link to="/tr1">TestRoute2</Link>
            <Link to="/lazy-test/faq?bla=true">TestRoute3</Link>
          </nav>

        </div>
        <div>Demo App</div>
        <div>{new Date().toLocaleString()}</div>
      </header>
    );
  }

  private onNavClick() {
    console.info(this.refs);
  }
}