import "./App.scss";

import * as React from "react";
// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import {BrowserRouter as Router} from "react-router-dom";
import {
  Redirect,
  Route,
  Switch
} from "react-router";
import Loadable, {LoadingComponentProps, OptionsWithResolve} from "react-loadable";
import {Provider as StoreProvider} from "react-redux";
import {IntlProvider} from "react-intl";

import Header from "./header/Header";

import NotFound from "./404/404";
import Loading from "./Loading";
import SideNav from "./sideNav/SideNav";
import {AppState} from "./state";
import {Store} from "redux";
import NotificationProvider from "./notifications/NotificationProvider";
import {getMessagesForLang} from "./i18n";

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

  const currentLanguage = navigator.language.slice(0, 2);

  return (
    <StoreProvider store={props.store}>
      <IntlProvider locale={currentLanguage}
                    messages={getMessagesForLang(currentLanguage)}>
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