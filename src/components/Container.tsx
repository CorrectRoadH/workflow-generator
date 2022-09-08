import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ShowBoxProps } from "./ShowBoxProps";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveToContainer } from "./AppSlice";
import Box from "./Box";

const Container = ({ boxdata }: ShowBoxProps) => {
  const dispatch = useDispatch();

  const [{ _isDragging }, drag, dragPreview] = useDrag(() => ({
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

  const childrenElement = [];
  boxdata.children.forEach((item, index) =>
    childrenElement.push(<Box key={index} boxdata={item} />)
  );

  return (
    <div
      className="flex bg-orange-200	 hover:bg-orange-500 rounded-md w-72 h-40 m-2"
      ref={dragPreview}
      style={{ backgroundColor }}
      data-testid="dustbin"
    >
      &gt;
      <div className="m-auto" role="Handle" ref={drop}>
        阶段1:
        {boxdata.title}

        子组件
        {childrenElement}
      </div>
    </div>
  );
};

export default Container;
