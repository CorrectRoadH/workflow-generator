import React from "react";
import { expect, it } from "vitest";
import { store } from "../../store";
import { Provider } from "react-redux";
import Home from "../Home";
import { render } from "@testing-library/react";

it("renders <Home /> page", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(getByText("area2")).toBeTruthy();
});
