import React from "react";

// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import { BrowserRouter as Router } from "react-router-dom";

import { Provider as StoreProvider } from "react-redux";
import { Store } from "redux";

import Navigation from "./navigation/Navigation";
import NotificationProvider from "./notifications/NotificationProvider";
import { AppState } from "./state";
import { IntlConfigProvider } from "./provider/IntlConfigProvider";
import { Translations } from "./i18n/languagePacks/languagePack";

export interface AppProps {
  store: Store<AppState>;
  translations: Translations;
}

export default function App(props: AppProps) {
  return (
    <StoreProvider store={props.store}>
      <IntlConfigProvider initialTranslations={props.translations}>
        <NotificationProvider>
          <Router>
            <Navigation />
          </Router>
        </NotificationProvider>
      </IntlConfigProvider>
    </StoreProvider>
  );
}
