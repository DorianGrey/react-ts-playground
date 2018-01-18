import * as React from "react";
import { AppContainer } from "react-hot-loader";
import { whyDidYouUpdate } from "why-did-you-update";

import main from "./main";

whyDidYouUpdate(React);

const appWrapper = <P extends React.DOMAttributes<T>, T extends Element>(
  elem: React.DOMElement<P, T>
) => <AppContainer>{elem}</AppContainer> as React.DOMElement<P, T>;

main(appWrapper);
