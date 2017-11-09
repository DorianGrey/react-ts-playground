import * as React from "react";

import { InjectedIntlProps, injectIntl } from "react-intl";
import Loadable, {
  LoadingComponentProps,
  OptionsWithRender
} from "react-loadable";
import { Redirect, Route, Switch, withRouter } from "react-router";

import NavigationDrawer from "react-md/lib/NavigationDrawers";

import NotFound from "../404/404";
// import NotificationProvider from "./notifications/NotificationProvider";

import CurrentTime from "../currentTime/CurrentTime";
import LanguagePicker from "../language-picker/LanguagePicker";
import Loading from "../Loading";
import NaviLink from "../naviLink";

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

const AsyncTestRoute1: any = withLoader(() =>
  import(/* webpackChunkName: "testRoute1" */ "../routes/TestRoute1")
);
const AsyncTestRoute2: any = withLoader(() =>
  import(/* webpackChunkName: "todos" */ "../todo-list/TodoList")
);
const AsyncParseParamsTestRoute: any = withLoader(() =>
  import(/* webpackChunkName: "parseParamTest" */ "../routes/ParseParamsTestRoute")
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

// TODO: Attempt to get a more detailed typing ...
class Navigation extends React.Component<any & InjectedIntlProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    const { location, intl } = this.props;

    return (
      <NavigationDrawer
        footer={<CurrentTime />}
        toolbarTitle={intl.formatMessage({ id: "header.title" })}
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
          <Route component={NotFound} />
        </Switch>
      </NavigationDrawer>
    );
  }
}

export default withRouter(injectIntl(Navigation));
