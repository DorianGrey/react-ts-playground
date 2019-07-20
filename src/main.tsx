import "./styles/index.scss";

import React from "react";
import { render } from "react-dom";
import { Store } from "redux";
import WebFontLoader from "webfontloader";

import App from "./app/App";
import { loadBrowserLanguagePack } from "./app/i18n/i18n";
import { AppState, initialAppState } from "./app/state";
import configureStore from "./app/store";
import registerServiceWorker from "./registerServiceWorker";
import { Translations } from "./app/i18n/languagePacks/languagePack";

// Import here instead of using the template - reduce initial loading time.
WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

let store: Store<AppState>;

function getContainer() {
  return document.getElementById("app");
}

function renderApp(container: HTMLElement | null, translations: Translations) {
  container = container || getContainer();

  // Use this if you want to test the loading animation, or for any kind of defer timing.
  // setTimeout(() => render(wrapWithRhlContainer(<App /> as React.DOMElement<any, any>), container), 1000);

  render(<App store={store} translations={translations} />, container);
  registerServiceWorker();
}

loadBrowserLanguagePack().then(({ translations }) => {
  store = configureStore(initialAppState());

  const container = getContainer();
  if (container != null) {
    renderApp(container, translations);
  } else {
    throw Error("Application anchor could not be found, aborting...");
  }

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./app/App", function hmr() {
      renderApp(null, translations);
    });

    // TODO: Why is NOT required to do pick up the old state here, handling it over to the next round?
    /*module.hot.dispose(function (varStore: any) {
       varStore.oldState = store.getState();
       });*/
  }
});
