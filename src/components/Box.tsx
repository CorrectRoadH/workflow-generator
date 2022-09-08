import React from "react";
import { useDrag } from "react-dnd";
import BoxStruct from "../data/BoxStruct";
import { useDispatch } from "react-redux";
import { dragObject } from "./AppSlice";

interface BoxProps {
  boxdata: BoxStruct;
}

const Box = ({ boxdata }: BoxProps) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    item: () => {
      console.log("start");
      dispatch(dragObject(boxdata));
      return boxdata;
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
        {boxdata.title}
      </div>
    </div>
  );
};

export default Box;
