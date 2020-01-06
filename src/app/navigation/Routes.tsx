import React, { FC } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import { NotFoundPage } from "../404/404";
import { AsyncRoute } from "./AsyncRoute";

const AsyncTestRoute1: FC = () => {
  return (
    <AsyncRoute
      loader={() =>
        import(
          /* webpackChunkName: "testRoute1" */ "../routes/testRoute1/TestRoute1"
        )
      }
    />
  );
};

const AsyncTestRoute2: FC = () => {
  return (
    <AsyncRoute
      loader={() =>
        import(/* webpackChunkName: "todos" */ "../todo-list/TodoList")
      }
    />
  );
};

const AsyncParseParamsTestRoute: FC = () => {
  return (
    <AsyncRoute
      loader={() =>
        import(
          /* webpackChunkName: "parseParamTest" */ "../routes/parseParams/ParseParamsTestRoute"
        )
      }
    />
  );
};

export const Routes: FC = () => {
  const location = useLocation();
  return (
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
  );
};
