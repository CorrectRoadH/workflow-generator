import React from "react";
import Box from "../components/Box";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import BoxStruct from "../data/BoxStruct";

const Toolbox = () => {
  const ComponentArray = useSelector(
    (state: RootState) => state.app.ComponentArray
  );

  const singleComponent: Array<JSX.Element> = [];
  ComponentArray.filter(
    (e: BoxStruct) => e.componentType === "singleComponent"
  ).forEach((item: BoxStruct, index) => {
    singleComponent.push(<Box key={index} boxdata={item} />);
  });

  const Container: Array<JSX.Element> = [];
  ComponentArray.filter(
    (e: BoxStruct) => e.componentType === "container"
  ).forEach((item: BoxStruct, index) => {
    Container.push(<Box key={index} boxdata={item} />);
  });

  const Stage: Array<JSX.Element> = [];
  ComponentArray.filter((e: BoxStruct) => e.componentType === "Stage").forEach(
    (item: BoxStruct, index) => {
      Stage.push(<Box key={index} boxdata={item} />);
    }
  );

  return (
    <div className="bg-slate-50 h-screen">
      <div className="m-3">
        组件区
        <hr />
        普通组件
        {singleComponent}
        <hr />
        容器
        {Container}
        <hr />
        策略
        {Stage}
        <hr />
      </div>
    </div>
  );
};

export default Toolbox;
