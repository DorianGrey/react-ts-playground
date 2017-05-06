import "./App.scss";

import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Loadable, {LoadingComponentProps, OptionsWithResolve} from "react-loadable";

import Header from "./header/Header";

import NotFound from "./404/404";
import Loading from "./Loading";
import SideNav from "./sideNav/SideNav";
import {Redirect} from "react-router";

function withLoader<T>(loader: () => Promise<T>) {
  return Loadable({
    loader,
    LoadingComponent: Loading,
    resolveModule:    module => (module as any).default
  } as OptionsWithResolve<LoadingComponentProps, any>);
}

export default function App() {

  const AsyncTestRoute1: any           = withLoader(() => _import_(/* webpackChunkName: "testRoute1" */"./routes/TestRoute1.tsx"));
  const AsyncTestRoute2: any           = withLoader(() => _import_(/* webpackChunkName: "testRoute2" */"./routes/TestRoute2.tsx"));
  const AsyncParseParamsTestRoute: any = withLoader(() => _import_(/* webpackChunkName: "parseParamTest" */"./routes/ParseParamsTestRoute.tsx"));

  return (
    <Router>
      <div>
        <Header />

        <SideNav />

        <div id="app-body">
          <Switch>
            <Redirect exact from="/" to="/tr0"/>
            <Route path="/tr0" component={AsyncTestRoute1}/>
            <Route path="/tr1" component={AsyncTestRoute2}/>
            <Route path="/lazy-test/:id" component={AsyncParseParamsTestRoute}/>
            <Route component={NotFound}/>
          </Switch>
        </div>

      </div>
    </Router>
  );
}