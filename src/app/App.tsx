import "./App.scss";

import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Header from "./header/Header";

import TestRoute1 from "./routes/TestRoute1";
import TestRoute2 from "./routes/TestRoute2";
import TestRoute3 from "./routes/TestRoute3";
import NotFound from "./404/404";

export default class App extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }


  render() {
    // TODO: Load a route lazily, like described in https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={TestRoute1}/>
            <Route path="/tr1" component={TestRoute2}/>
            <Route path="/tr2" component={TestRoute3}/>
            <Route component={NotFound}/>
          </Switch>

        </div>
      </Router>
    );
  }
}