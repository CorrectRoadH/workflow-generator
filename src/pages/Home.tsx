import React, { useContext } from "react";

import { AppContext } from "../hooks/useAppContext";
import Box from "../components/Box";
import Show from "../components/Show";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Home: React.FC = (): JSX.Element => {
  const { state } = useContext(AppContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="bg-red-500 h-screen w-5/12">
          组件区
          <Box />
        </div>
        <div className="bg-green-500 h-screen  w-5/12">乐高区
          <Show />
        </div>
        <div className="bg-red-500 h-screen">代码区</div>
      </div>
    </DndProvider>
  );
};

export default Home;
