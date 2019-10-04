import React, { FunctionComponent } from "react";

import { useIntl } from "react-intl";
import Loadable from "react-loadable";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
  RouteComponentProps
} from "react-router";

import NavigationDrawer from "react-md/lib/NavigationDrawers";

import { NotFoundPage } from "../404/404";
// import NotificationProvider from "./notifications/NotificationProvider";

import CurrentTime from "../currentTime/CurrentTime";
import LanguagePicker from "../language-picker/LanguagePicker";
import Loading from "../Loading";
import NaviLink from "../naviLink";

type T1 = typeof import(/* webpackChunkName: "testRoute1" */ "../routes/testRoute1/TestRoute1");
type T2 = typeof import(/* webpackChunkName: "todos" */ "../todo-list/TodoList");
type T3 = typeof import(/* webpackChunkName: "parseParamTest" */ "../routes/parseParams/ParseParamsTestRoute");

function withLoader(loader: () => Promise<T1 | T2 | T3>) {
  return Loadable({
    loader,
    loading: Loading,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(loaded: any, props: any) {
      const Component = loaded.default;
      return <Component {...props} />;
    }
  });
}

const AsyncTestRoute1 = withLoader(() =>
  import(/* webpackChunkName: "testRoute1" */ "../routes/testRoute1/TestRoute1")
);
const AsyncTestRoute2 = withLoader(() =>
  import(/* webpackChunkName: "todos" */ "../todo-list/TodoList")
);
const AsyncParseParamsTestRoute = withLoader(() =>
  import(
    /* webpackChunkName: "parseParamTest" */ "../routes/parseParams/ParseParamsTestRoute"
  )
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

const navigationItems = navItems.map(p => <NaviLink {...p} key={p.to} />);

const Navigation: FunctionComponent<RouteComponentProps<string | number>> = ({
  location
}) => {
  const { formatMessage } = useIntl();
  return (
    <NavigationDrawer
      footer={<CurrentTime />}
      toolbarTitle={formatMessage({ id: "header.title" })}
      toolbarActions={<LanguagePicker />}
      navItems={navigationItems}
    >
      <Switch key={location.key}>
        <Redirect exact from="/" to="/tr0" />
        <Route path="/tr0" component={AsyncTestRoute1} location={location} />
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
        <Route component={NotFoundPage} />
      </Switch>
    </NavigationDrawer>
  );
};

export default withRouter(Navigation);
