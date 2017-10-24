import * as React from "react";
import { IntlProvider } from "react-intl-redux";

// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import { BrowserRouter as Router } from "react-router-dom";

import { Provider as StoreProvider } from "react-redux";
import { Store } from "redux";

import Navigation from "./navigation/Navigation";
import NotificationProvider from "./notifications/NotificationProvider";
import { AppState } from "./state";

export interface AppProps {
  store: Store<AppState>;
}

// Only use text contents for intl formatting.
function Fragment(props: any) {
  return props.children;
}

export default function App(props: AppProps) {
  return (
    <StoreProvider store={props.store}>
      <IntlProvider textComponent={Fragment}>
        <NotificationProvider>
          <Router>
            <Navigation />
          </Router>
        </NotificationProvider>
      </IntlProvider>
    </StoreProvider>
  );
}
