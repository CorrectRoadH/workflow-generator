import React, { useState } from "react";
import { VisualBlockProps } from "./VisualBlockProps";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  InputValue,
  moveToContainer,
  setComponentInputValue,
} from "../AppSlice";
import { RootState } from "../../store";
import ShowComponent from "./ShowComponent";
import { useTranslation } from "react-i18next";

const VisualBase = ({ blockdata }: VisualBlockProps) => {
  const dispatch = useDispatch();
  const presentComponent = useSelector(
    (state: RootState) => state.app.presentComponent
  );

  const { t } = useTranslation();

  const [_hasDropped, setHasDropped] = useState(false);
  const [_hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "container",
      drop(_item: unknown, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        dispatch(moveToContainer(blockdata.id));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  let backgroundColor = "rgb(34 211 238)";

  if (isOverCurrent || (isOver && undefined)) {
    backgroundColor = "rgb(8 145 178)";
  } else if (canDrop) {
    backgroundColor = "rgb(6 182 212)";
  }

  const childrenElement: Array<JSX.Element> = [];
  blockdata.children.forEach((id, index) =>
    childrenElement.push(
      <ShowComponent key={index} blockdata={presentComponent[id]} />
    )
  ); // todo using useMeno to improve Performent

  const interState: Array<JSX.Element> = [];
  for (let i = 0; i < blockdata.argNum; i++) {
    interState.push(
      <div key={i}>
        <p>{blockdata.argsTip[i]}</p>
        <input
          value={blockdata.args[i]}
          onChange={(event) => {
            dispatch(
              setComponentInputValue({
                componentID: blockdata.id,
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
      className="flex rounded-md min-w-72 min-h-40 m-2"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col m-2 w-full" role="Handle" ref={drop}>
        <div>Github Workflow Base</div>
        <br />
        <div className="m-auto w-full">
          {t("parameter")}:{interState}
          {t("children component")}:{childrenElement}
        </div>
      </div>
    </div>
  );
};

export default VisualBase;
