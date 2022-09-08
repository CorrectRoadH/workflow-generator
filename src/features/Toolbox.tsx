import React from "react";
import Box from "../components/Box";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import BoxStruct from "../data/BoxStruct";

const Toolbox = () => {
  const ComponentArray = useSelector(
    (state: RootState) => state.app.ComponentArray
  );

  const area: Array<JSX.Element> = [];

  ComponentArray.forEach((item: BoxStruct, index) => {
    area.push(<Box key={index} boxdata={item} />);
  });

  return (
    <div className="bg-slate-50 h-screen w-3/12">
      <div className="m-3">
        组件区
        {area}
      </div>
    </div>
  );
};

export default Toolbox;
