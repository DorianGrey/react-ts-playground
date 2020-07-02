import React from "react";
import { render } from "react-dom";
import WebFontLoader from "webfontloader";

import { App } from "./app/App";
import { loadBrowserLanguagePack } from "./app/i18n/i18n";
import { registerServiceWorker } from "./registerServiceWorker";
import type { LanguagePack } from "./app/i18n/languagePacks/languagePack";

// Import here instead of using the template - reduce initial loading time.
WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700"],
  },
});

function getContainer() {
  return document.getElementById("app");
}

function renderApp(container: HTMLElement | null, langPack: LanguagePack) {
  container = container || getContainer();

  // Use this if you want to test the loading animation, or for any kind of defer timing.
  // setTimeout(() => render(wrapWithRhlContainer(<App /> as React.DOMElement<any, any>), container), 1000);

  /* 
     Note: We'd prefer the strict mode here, however this currently
     does not work in combination with material-ui and react-transition:
  
     findDOMNode is deprecated in StrictMode. 
     findDOMNode was passed an instance of Transition which is inside StrictMode
  */
  render(<App langPack={langPack} />, container);
  registerServiceWorker();
}

loadBrowserLanguagePack().then((langPack) => {
  const container = getContainer();
  if (container != null) {
    renderApp(container, langPack);
  } else {
    throw Error("Application anchor could not be found, aborting...");
  }

  // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
  // Learn more: https://www.snowpack.dev/#hot-module-replacement
  if (import.meta.hot) {
    import.meta.hot.accept();
  }
});
