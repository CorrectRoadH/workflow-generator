import React from "react";
import Block from "../components/blocks/Block";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import BlockStruct from "../data/BlockStruct";

const Toolbox = () => {
  const ComponentArray = useSelector(
    (state: RootState) => state.app.ComponentArray
  );

  const blocks: Array<JSX.Element> = [];
  ComponentArray.filter(
    (e: BlockStruct) => e.componentType === "block"
  ).forEach((item: BlockStruct, index) => {
    blocks.push(<Block key={index} blockdata={item} />);
  });

  const Container: Array<JSX.Element> = [];
  ComponentArray.filter(
    (e: BlockStruct) => e.componentType === "container"
  ).forEach((item: BlockStruct, index) => {
    Container.push(<Block key={index} blockdata={item} />);
  });

  const Stage: Array<JSX.Element> = [];
  ComponentArray.filter(
    (e: BlockStruct) => e.componentType === "Stage"
  ).forEach((item: BlockStruct, index) => {
    Stage.push(<Block key={index} blockdata={item} />);
  });

  return (
    <div className="bg-slate-50 h-screen">
      <div className="m-3">
        组件区
        <hr />
        普通组件
        {blocks}
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
