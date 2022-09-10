import React, { useState } from "react";
import { useDrop } from "react-dnd";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { generageCode, move } from "../components/AppSlice";
import ShowComponent from "../components/viusalBlocks/ShowComponent";
import BoxStructInstance from "../data/BlockStructInstance";
import { useTranslation } from "react-i18next";

const BuildArea = () => {
  const presentComponent = useSelector(
    (state: RootState) => state.app.presentComponent
  );
  const { t } = useTranslation();

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
    <div className="bg-cyan-400	 h-screen">
      {t("area2")}
      <div className="flex flex-col" style={{ backgroundColor }}>
        <button className="bg-white " onClick={() => dispatch(generageCode())}>
          generate Code
        </button>
        <br />
        <div className="h-full" ref={drop}>
          Drop Target To Here:
          {componentList}
        </div>
      </div>
    </div>
  );
};

export default BuildArea;
