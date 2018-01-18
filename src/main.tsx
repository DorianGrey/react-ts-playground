import "./styles/index.scss";

import * as React from "react";
import { render } from "react-dom";
import * as WebFontLoader from "webfontloader";

import App from "./app/App";
import { loadBrowserLanguagePack } from "./app/i18n/i18n";
import { AppState, initialAppState } from "./app/state";
import configureStore from "./app/store";
import registerServiceWorker from "./registerServiceWorker";

import { Store } from "redux";

// Import here instead of using the template - reduce initial loading time.
WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

let store: Store<AppState>;

export type AppWrapper = <P extends React.DOMAttributes<T>, T extends Element>(
  s: React.DOMElement<P, T>
) => React.DOMElement<P, T>;

function getContainer() {
  return document.getElementById("app");
}

function renderApp(appWrapper: AppWrapper, container: HTMLElement | null) {
  container = container || getContainer();

  // Use this if you want to test the loading animation, or for any kind of defer timing.
  // setTimeout(() => render(wrapWithRhlContainer(<App /> as React.DOMElement<any, any>), container), 1000);

  render(
    appWrapper(<App store={store} /> as React.DOMElement<any, any>),
    container
  );
  registerServiceWorker();
}

export default function main(appWrapper: AppWrapper) {
  loadBrowserLanguagePack().then(({ translations }) => {
    store = configureStore(initialAppState(translations));

    const container = getContainer();
    if (container != null) {
      renderApp(appWrapper, container);
    } else {
      throw Error("Application anchor could not be found, aborting...");
    }

    // react-hot-loader 3 API: https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
    if (process.env.NODE_ENV !== "production" && module.hot) {
      module.hot.accept("./app/App", function hmr() {
        renderApp(appWrapper, null);
      });

      // TODO: Why is NOT required to do pick up the old state here, handling it over to the next round?
      /*module.hot.dispose(function (varStore: any) {
         varStore.oldState = store.getState();
         });*/
    }
  });
}
