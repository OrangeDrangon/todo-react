import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Root from "./Root.component";

it("renders without crashing", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(<Root />, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});
