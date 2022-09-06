import React from "react";
import { useDrag } from "react-dnd";

const Box: React.FC = (): JSX.Element => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ background: "grey" }}>
      <div role="Handle" ref={drag}>
        box
      </div>
    </div>
  );
};

export default Box;
