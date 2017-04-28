import "./styles/main.scss";

import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";

import {bootloader} from "./bootloader";
import App from "./app/App";

function getContainer() {
  return document.getElementById("app");
}

function renderApp(container: HTMLElement | null) {
  container = container || getContainer();

  if (process.env.NODE_ENV === "production") { // We don't need the 'AppContainer' wrapper in production mode, thus, we make a difference here.
    return render(
      <App />,
      container
    );
  } else {
    return render(
      <AppContainer>
        <App />
      </AppContainer>,
      container
    );
  }
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
  module.hot.accept("./app/App", () => {
    renderApp(null);
  })
}
