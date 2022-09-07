import React from "react";
import { useDrag } from "react-dnd";
import { ShowBoxProps } from "./ShowBoxProps";

const ShowBox = ({ boxdata }: ShowBoxProps) => {
  const [{ _isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "ShowBox",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="flex bg-slate-200 hover:bg-slate-300 rounded-md w-48 h-10 m-2"
      ref={dragPreview}
    >
      <div className="m-auto" role="Handle" ref={drag}>
        {boxdata.title}
      </div>
    </div>
  );
};

export default ShowBox;
