import { mount, shallow } from "enzyme";
import * as React from "react";

import NotFound from "./404";

describe("Default rendering test", () => {
  it("renders without crashing", () => {
    expect(() => shallow(<NotFound />)).not.toThrow();
  });

  it("renders the expected content", () => {
    const rendered = mount(<NotFound />);
    expect(rendered.find("#not-found-page").length).toBe(1);
  });
});
