// import "./App.scss";

import * as React from "react";
import { IntlProvider } from "react-intl-redux";
import Loadable, {
  LoadingComponentProps,
  OptionsWithRender
} from "react-loadable";
import { Redirect, Route, Switch } from "react-router";
// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import { BrowserRouter as Router } from "react-router-dom";

import { Provider as StoreProvider } from "react-redux";
import { Store } from "redux";

import NavigationDrawer from "react-md/lib/NavigationDrawers";

import NotFound from "./404/404";
// import Header from "./header/Header";
import Loading from "./Loading";
// import NotificationProvider from "./notifications/NotificationProvider";
import NaviLink from "./naviLink";
import { AppState } from "./state";

function withLoader<T>(loader: () => Promise<T>) {
  return Loadable({
    loader,
    loading: Loading,
    render(loaded: any, props: any) {
      const Component = loaded.default;
      return <Component {...props} />;
    }
  } as OptionsWithRender<LoadingComponentProps, any>);
}

export interface AppProps {
  store: Store<AppState>;
}

export default function App(props: AppProps) {
  const AsyncTestRoute1: any = withLoader(() =>
    import(/* webpackChunkName: "testRoute1" */ "./routes/TestRoute1")
  );
  const AsyncTestRoute2: any = withLoader(() =>
    import(/* webpackChunkName: "todos" */ "./todo-list/TodoList")
  );
  const AsyncParseParamsTestRoute: any = withLoader(() =>
    import(/* webpackChunkName: "parseParamTest" */ "./routes/ParseParamsTestRoute")
  );

  const navItems = [
    {
      label: "nav.testRoute1",
      to: "/tr0",
      icon: "perm_contact_calendar"
    },
    {
      label: "nav.todos",
      to: "/todo-list",
      icon: "assignment"
    },
    {
      label: "nav.testRoute3",
      to: "/lazy-test/faq?bla=true",
      icon: "question_answer"
    }
  ];

  return (
    <StoreProvider store={props.store}>
      <IntlProvider>
        <Router>
          <Route
            render={({ location }) => (
              <NavigationDrawer
                drawerTitle={"Testing react-md"}
                toolbarTitle={"Example app"}
                navItems={navItems.map(p => <NaviLink {...p} key={p.to} />)}
              >
                <Switch key={location.key}>
                  <Redirect exact from="/" to="/tr0" />
                  <Route
                    path="/tr0"
                    component={AsyncTestRoute1}
                    location={location}
                  />
                  <Route
                    path="/todo-list"
                    component={AsyncTestRoute2}
                    location={location}
                  />
                  <Route
                    path="/lazy-test/:id"
                    component={AsyncParseParamsTestRoute}
                    location={location}
                  />
                  <Route component={NotFound} />
                </Switch>
              </NavigationDrawer>
            )}
          />
        </Router>
      </IntlProvider>
    </StoreProvider>
  );
}
