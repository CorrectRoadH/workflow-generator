import React from "react";
import { useDrop } from "react-dnd";

const Show: React.FC = (): JSX.Element => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: "BOX",
    drop(_item: unknown, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        console.log(didDrop);
        return;
      }
      console.log(didDrop);
    },
  }));

  return (
    <div className="bg-red-300 h-20" ref={drop}>
      Drop Target
    </div>
  );
};

export default Show;
