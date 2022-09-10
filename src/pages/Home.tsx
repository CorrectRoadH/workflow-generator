import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Toolbox from "../features/Toolbox";
import CodeArea from "../features/CodeArea";
import BuildArea from "../features/BuildArea";

const Home = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-3">
        <Toolbox />
        <BuildArea />
        <CodeArea />
      </div>
    </DndProvider>
  );
};

export default Home;
