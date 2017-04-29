import "./App.scss";

import * as React from "react";
import Header from "./header/Header";

export default class App extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }


  render() {
    return (
      <div>
        <Header />
        <h1>Hello World, {navigator.userAgent}!</h1>
      </div>
    );
  }
}