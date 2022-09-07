import React from "react";
import { useDrop } from "react-dnd";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { move } from "./ShowSlice";
import ShowBox from "./ShowBox";
import BoxStruct from "../data/BoxStruct";

const Show = () => {
  const BoxArray = useSelector((state: RootState) => state.show.BoxArray);

  const dispatch = useDispatch();

  const [collectedProps, drop] = useDrop(() => ({
    accept: "BOX",
    drop(_item: unknown, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      dispatch(move());
    },
  }));

  const componentList = [];

  BoxArray.forEach((item: BoxStruct, index) =>
    componentList.push(<ShowBox key={index} boxdata={item} />)
  );

  return (
    <div className="bg-red-300 h-20" ref={drop}>
      Drop Target Count:
      {componentList}
    </div>
  );
};

export default Show;
