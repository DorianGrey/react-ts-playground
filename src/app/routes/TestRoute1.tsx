import "./TestRoute1.scss";

import * as React from "react";
import { FormattedMessage } from "react-intl";

import logo from "../../importedAssets/logo.svg";

export default () => (
  <div>
    <h2>TestRoute 1</h2>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          <FormattedMessage id="testRoute1.headline" />
        </h2>
      </div>
    </div>
  </div>
);
