import React from "react";
import { useDrop } from "react-dnd";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { move } from "./ShowSlice";

const Show: React.FC = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.show.value);
  const dispatch = useDispatch();

  const [collectedProps, drop] = useDrop(() => ({
    accept: "BOX",
    drop(_item: unknown, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      console.log("hello");
      dispatch(move(1));
    },
  }));

  return (
    <div className="bg-red-300 h-20" ref={drop}>
      Drop Target Count:
      {count}
    </div>
  );
};

export default Show;
