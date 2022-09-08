import React, { useState } from "react";
import { useDrop } from "react-dnd";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { move } from "./AppSlice";
import BoxStruct from "../data/BoxStruct";
import ShowComponent from "./ShowComponent";
import BoxStructInstance from "../data/BoxStructInstance";

const Show = () => {
  const BoxArray = useSelector((state: RootState) => state.app.BoxArray);

  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const dispatch = useDispatch();

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "BOX",
      drop(_item: unknown, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        dispatch(move());
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  const componentList: Array<JSX.Element> = [];

  BoxArray.forEach((item: BoxStructInstance, index) =>
    componentList.push(<ShowComponent key={index} boxdata={item} />)
  );

  let backgroundColor = "rgba(0, 0, 0, .5)";

  if (isOverCurrent || isOver) {
    backgroundColor = "darkgreen";
  }

  return (
    <div className=" h-full" style={{ backgroundColor }} ref={drop}>
      Drop Target Count:
      {componentList}
    </div>
  );
};

export default Show;
