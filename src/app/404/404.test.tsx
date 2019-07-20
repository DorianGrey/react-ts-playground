import React from "react";
import { render } from "@testing-library/react";

import { NotFoundPage } from "./404";

describe("Default rendering test", () => {
  it("renders content as intended", () => {
    const rendered = render(<NotFoundPage />);

    expect(rendered.container).toMatchSnapshot();
  });
});
