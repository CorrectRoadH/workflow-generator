import React, { useState } from "react";
import { useDrop } from "react-dnd";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { generageCode, move } from "./AppSlice";
import ShowComponent from "./ShowComponent";
import BoxStructInstance from "../data/BoxStructInstance";

const Show = () => {
  const presentComponent = useSelector(
    (state: RootState) => state.app.presentComponent
  );

  const [_hasDropped, setHasDropped] = useState(false);
  const [_hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const dispatch = useDispatch();

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "BOX",
      drop(_item: unknown, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !undefined) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        dispatch(move());
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  const componentList: Array<JSX.Element> = [];
  presentComponent.forEach((item: BoxStructInstance, index) => {
    if (item.inTop) {
      componentList.push(<ShowComponent key={index} boxdata={item} />);
    }
  });

  let backgroundColor = "rgb(34 211 238)";

  if (isOverCurrent || (isOver && undefined)) {
    backgroundColor = "rgb(8 145 178)";
  } else if (canDrop) {
    backgroundColor = "rgb(6 182 212)";
  }

  return (
    <div className=" h-full" style={{ backgroundColor }} ref={drop}>
      <button className="bg-white" onClick={() => dispatch(generageCode())}>
        generate Code
      </button>
      <br />
      Drop Target Count:
      {componentList}
    </div>
  );
};

export default Show;
