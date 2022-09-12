import React from "react";
import { useDrag } from "react-dnd";
import BlockStruct from "../../data/BlockStruct";
import { useDispatch } from "react-redux";
import { dragObject } from "../AppSlice";

interface BlockProps {
  blockdata: BlockStruct;
}

const Block = ({ blockdata }: BlockProps) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: blockdata.componentType,
    item: () => {
      console.log("start");
      dispatch(dragObject(blockdata));
      return blockdata;
    },
    end: () => {
      console.log("end");
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="flex bg-slate-200 hover:bg-slate-300 rounded-md	w-32	h-10 m-2"
      ref={dragPreview}
    >
      <div className="m-auto" role="Handle" ref={drag}>
        {blockdata.title}
      </div>
    </div>
  );
};

export default Block;
