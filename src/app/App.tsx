import React from "react";

// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./navigation/Navigation";
import { IntlConfigProvider } from "./provider/IntlConfigProvider";
import { Translations } from "./i18n/languagePacks/languagePack";
import { TodosProvider } from "./provider/TodosProvider";

export interface AppProps {
  translations: Translations;
}

export default function App(props: AppProps) {
  return (
    <TodosProvider>
      <IntlConfigProvider initialTranslations={props.translations}>
        <Router>
          <Navigation />
        </Router>
      </IntlConfigProvider>
    </TodosProvider>
  );
}
