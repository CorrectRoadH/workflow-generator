import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ShowBoxProps } from "./ShowBoxProps";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  generageCode,
  InputValue,
  moveToContainer,
  setComponentInputValue,
} from "./AppSlice";
import ShowBox from "./ShowBox";
import { RootState } from "../store";

const Container = ({ boxdata }: ShowBoxProps) => {
  const dispatch = useDispatch();
  const presentComponent = useSelector(
    (state: RootState) => state.app.presentComponent
  );

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "ShowContainer",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

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
        dispatch(moveToContainer(boxdata.id));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  let backgroundColor = "rgba(0, 0, 0, .5)";

  if (isOverCurrent || isOver) {
    backgroundColor = "darkgreen";
  }

  const childrenElement: Array<JSX.Element> = [];
  boxdata.children.forEach((id, index) =>
    childrenElement.push(<ShowBox key={index} boxdata={presentComponent[id]} />)
  ); // todo using useMeno to improve Performent

  const interState: Array<JSX.Element> = [];
  for (let i = 0; i < boxdata.argNum; i++) {
    interState.push(
      <div key={i}>
        <p>{boxdata.argsTip[i]}</p>
        <input
          value={boxdata.args[i]}
          onChange={(event) => {
            dispatch(
              setComponentInputValue({
                componentID: boxdata.id,
                order: i,
                value: event.target.value,
              } as InputValue)
            );
          }}
          className="m-1"
        />
      </div>
    );
  }

  return (
    <div
      className="flex bg-orange-200	 hover:bg-orange-500 rounded-md min-w-72 min-h-40 m-2"
      ref={dragPreview}
      style={{ backgroundColor }}
      data-testid="dustbin"
    >
      &gt;
      <div className="m-auto" role="Handle" ref={drop}>
        阶段1:
        {boxdata.title}
        参数:
        {interState}
        子组件:
        {childrenElement}
      </div>
    </div>
  );
};

export default Container;
