import React from "react";
import { render } from "react-dom";
import WebFontLoader from "webfontloader";

import App from "./app/App";
import { loadBrowserLanguagePack } from "./app/i18n/i18n";
import registerServiceWorker from "./registerServiceWorker";
import { LanguagePack } from "./app/i18n/languagePacks/languagePack";

// Import here instead of using the template - reduce initial loading time.
WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700"]
  }
});

function getContainer() {
  return document.getElementById("app");
}

function renderApp(container: HTMLElement | null, langPack: LanguagePack) {
  container = container || getContainer();

  // Use this if you want to test the loading animation, or for any kind of defer timing.
  // setTimeout(() => render(wrapWithRhlContainer(<App /> as React.DOMElement<any, any>), container), 1000);

  render(<App langPack={langPack} />, container);
  registerServiceWorker();
}

loadBrowserLanguagePack().then(langPack => {
  const container = getContainer();
  if (container != null) {
    renderApp(container, langPack);
  } else {
    throw Error("Application anchor could not be found, aborting...");
  }

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./app/App", function hmr() {
      renderApp(null, langPack);
    });
  }
});
