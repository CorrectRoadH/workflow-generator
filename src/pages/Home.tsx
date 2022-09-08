import React from "react";

import type { RootState } from "../store";
import Show from "../components/Show";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSelector } from "react-redux";
import Toolbox from "../features/Toolbox";

const Home = () => {
  const code = useSelector((state: RootState) => state.app.code);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <Toolbox />
        <div className="bg-blue-500 h-screen  w-3/12">
          乐高区
          <Show />
        </div>
        <div className="bg-red-500 h-screen w-5/12">
          代码区
          <br></br>
          <textarea
            value={code}
            className="h-96 w-full bg-black text-white"
          ></textarea>
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
