import "./App.scss";

import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Loadable, {LoadingComponentProps, OptionsWithResolve} from "react-loadable";

import Header from "./header/Header";

import TestRoute1 from "./routes/TestRoute1";
import TestRoute2 from "./routes/TestRoute2";
import NotFound from "./404/404";
import Loading from "./Loading";

export default function App() {
  // TODO: Check if query parameters are forwarded correctly!
  const LoadableTestRoute3: any = Loadable({
    loader: () => _import_(/* webpackChunkName: "lazyTestRoute" */ "./routes/LazyTestRoute.tsx"),
    LoadingComponent: Loading,
    resolveModule: module => (module as any).default
  } as OptionsWithResolve<LoadingComponentProps, any>);

  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={TestRoute1}/>
          <Route path="/tr1" component={TestRoute2}/>
          <Route path="/lazy-test/:id" component={LoadableTestRoute3}/>
          <Route component={NotFound}/>
        </Switch>

      </div>
    </Router>
  );
}