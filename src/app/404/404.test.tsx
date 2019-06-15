import React from "react";
import { render } from "@testing-library/react";

import NotFound from "./404";

describe("Default rendering test", () => {
  it("renders content as intended", () => {
    const rendered = render(<NotFound />);

    expect(rendered.container).toMatchSnapshot();
  });
});
