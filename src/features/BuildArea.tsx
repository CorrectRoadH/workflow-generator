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
      componentList.push(<ShowComponent key={index} blockdata={item} />);
    }
  });

  // const backgroundColor = "white";

  // if (isOverCurrent || (isOver && undefined)) {
  //   backgroundColor = "rgb(8 145 178)";
  // } else if (canDrop) {
  //   backgroundColor = "rgb(6 182 212)";
  // }

  return (
    <div
      className="	 h-screen"
      style={{
        backgroundColor: "#ebf0fa",
        backgroundImage:
          "linear-gradient(90deg,#ffffff 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(#ffffff 10%, rgba(0, 0, 0, 0) 10%)",
        backgroundSize: "20px 20px",
      }}
    >
      {t("area2")}
      <div className="flex flex-col">
        <div className="flex bg-blue-200 hover:bg-blue-300 rounded-md	w-64	h-10 m-auto">
          <button
            className="m-auto 	w-48	h-10 "
            onClick={() => dispatch(generageCode())}
          >
            Generate Code
          </button>
        </div>
        <br />

        <div className="h-full bg-transparent" ref={drop}>
          Drop Target To Here:
          {componentList}
        </div>
      </div>
    </div>
  );
};

export default BuildArea;
