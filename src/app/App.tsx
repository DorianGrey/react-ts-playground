import "./App.scss";

import * as React from "react";

import {IntlProvider} from "react-intl-redux";
import Loadable, {LoadingComponentProps, OptionsWithResolve} from "react-loadable";
import {
  Redirect,
  Route,
  Switch
} from "react-router";
// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import {BrowserRouter as Router} from "react-router-dom";

import {Provider as StoreProvider} from "react-redux";
import {Store} from "redux";

import NotFound from "./404/404";
import Header from "./header/Header";
import Loading from "./Loading";
import NotificationProvider from "./notifications/NotificationProvider";
import SideNav from "./sideNav/SideNav";
import {AppState} from "./state";

function withLoader<T>(loader: () => Promise<T>) {
  return Loadable({
    loader,
    LoadingComponent: Loading,
    resolveModule:    module => (module as any).default
  } as OptionsWithResolve<LoadingComponentProps, any>);
}

export interface AppProps {
  store: Store<AppState>;
}

export default function App(props: AppProps) {

  const AsyncTestRoute1: any           = withLoader(() => _import_(/* webpackChunkName: "testRoute1" */"./routes/TestRoute1.tsx"));
  const AsyncTestRoute2: any           = withLoader(() => _import_(/* webpackChunkName: "todos" */"./todo-list/TodoList.tsx"));
  const AsyncParseParamsTestRoute: any = withLoader(() => _import_(/* webpackChunkName: "parseParamTest" */"./routes/ParseParamsTestRoute.tsx"));

  return (
    <StoreProvider store={props.store}>
      <IntlProvider>
        <NotificationProvider>
          <Router>
            <div>
              <Header />

              <SideNav />

              <div id="app-body">
                <Switch>
                  <Redirect exact from="/" to="/tr0"/>
                  <Route path="/tr0" component={AsyncTestRoute1}/>
                  <Route path="/todo-list" component={AsyncTestRoute2}/>
                  <Route path="/lazy-test/:id" component={AsyncParseParamsTestRoute}/>
                  <Route component={NotFound}/>
                </Switch>
              </div>

            </div>
          </Router>
        </NotificationProvider>
      </IntlProvider>
    </StoreProvider>
  );
}
