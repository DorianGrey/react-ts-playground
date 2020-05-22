import React, { FC } from "react";

// Note: We have to import these from different packages to always get the proper typings ... DAFUQ?!
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider } from "./theme";
import Navigation from "./navigation/Navigation";
import { IntlConfigProvider } from "./provider/IntlConfigProvider";
import { LanguagePack } from "./i18n/languagePacks/languagePack";
import { TodosProvider } from "./provider/TodosProvider";

export interface AppProps {
  langPack: LanguagePack;
}

export const App: FC<AppProps> = (props) => {
  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <TodosProvider>
          <IntlConfigProvider initialLangPack={props.langPack}>
            <Router>
              <Navigation />
            </Router>
          </IntlConfigProvider>
        </TodosProvider>
      </ThemeProvider>
    </>
  );
};
