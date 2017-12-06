import * as React from "react";
import { AppContainer } from "react-hot-loader";

import main from "./main";

const appWrapper = <P extends React.DOMAttributes<T>, T extends Element>(
  elem: React.DOMElement<P, T>
) => <AppContainer>{elem}</AppContainer> as React.DOMElement<P, T>;

main(appWrapper);
