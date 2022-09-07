import React, { useContext } from "react";

import { AppContext } from "../hooks/useAppContext";
import Box from "../components/Box";
import type { RootState } from "../store";
import Show from "../components/Show";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import BoxStruct from "../data/BoxStruct";

const Home: React.FC = (): JSX.Element => {
  const { state } = useContext(AppContext);
  const ComponentArray = useSelector(
    (state: RootState) => state.show.ComponentArray
  );
  const BoxArray = useSelector((state: RootState) => state.show.BoxArray);

  const area = [];

  ComponentArray.forEach((item: BoxStruct, index) => {
    area.push(<Box key={index} boxdata={item} />);
  });

  let code = "";
  BoxArray.forEach((item: BoxStruct) => {
    code += item.title + "\n";
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="bg-slate-50 h-screen w-3/12">
          组件区
          {area}
        </div>
        <div className="bg-green-500 h-screen  w-3/12">
          乐高区
          <Show />
        </div>
        <div className="bg-red-500 h-screen">
          代码区
          <textarea value={code}></textarea>
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
