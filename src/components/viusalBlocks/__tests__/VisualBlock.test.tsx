import React from "react";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import VirualBlock from "../VisualBlock";
import BlockStructInstance from "../../../data/BlockStructInstance";
import { store } from "../../../store";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

it("renders <VisualBlock /> block", () => {
  const { getByText } = render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <VirualBlock
          blockdata={
            {
              title: "hello",
              argNum: 0,
              args: [],
              argsTip: [],
              componentType: "block",
              code: `234234`,
              parentID: 0,
              children: [],
              childrenInstance: undefined,
              id: 1,
              inTop: true,
            } as BlockStructInstance
          }
        />
      </DndProvider>
    </Provider>
  );
  expect(getByText(`hello`)).toBeTruthy();
});

// tood  to add drag and drop test in futuer
