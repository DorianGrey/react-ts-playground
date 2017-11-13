import "./styles/index.scss";

import identity from "lodash-es/identity";
import * as React from "react";
import { render } from "react-dom";
import * as WebFontLoader from "webfontloader";
// react-hot-loader is skipped in prod mode, however tslint does not recognize this or knows about it, thus...
// tslint:disable
import { AppContainer } from "react-hot-loader";
// tslint:enable

import App from "./app/App";
import { initialAppState } from "./app/state";
import configureStore from "./app/store";
import { bootloader } from "./bootloader";
import registerServiceWorker from "./registerServiceWorker";

// Import here instead of using the template - reduce initial loading time.
WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

const store = configureStore(initialAppState);

// We don't need the 'AppContainer' wrapper in production mode, thus, we make a difference here.
let wrapWithRhlContainer: <P extends React.DOMAttributes<T>, T extends Element>(
  s: React.DOMElement<P, T>
) => React.DOMElement<P, T>;
if (process.env.NODE_ENV === "production") {
  wrapWithRhlContainer = identity;
} else {
  wrapWithRhlContainer = <P extends React.DOMAttributes<T>, T extends Element>(
    elem: React.DOMElement<P, T>
  ) => <AppContainer>{elem}</AppContainer> as React.DOMElement<P, T>;
}

function getContainer() {
  return document.getElementById("app");
}

function renderApp(container: HTMLElement | null) {
  container = container || getContainer();

  // Use this if you want to test the loading animation, or for any kind of defer timing.
  // setTimeout(() => render(wrapWithRhlContainer(<App /> as React.DOMElement<any, any>), container), 1000);

  render(
    wrapWithRhlContainer(<App store={store} /> as React.DOMElement<any, any>),
    container
  );
  registerServiceWorker();
}

function main() {
  const container = getContainer();
  if (container != null) {
    renderApp(container);
  } else {
    throw Error("Application anchor could not be found, aborting...");
  }
}

bootloader(main);

// react-hot-loader 3 API: https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
if (module.hot) {
  module.hot.accept("./app/App", function hmr() {
    renderApp(null);
  });

  // TODO: Why is NOT required to do pick up the old state here, handling it over to the next round?
  /*module.hot.dispose(function (varStore: any) {
   varStore.oldState = store.getState();
   });*/
}
