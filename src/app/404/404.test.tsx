import * as React from "react";
import * as ReactDOM from "react-dom";
import NotFound from "./404";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NotFound />, div);
});
