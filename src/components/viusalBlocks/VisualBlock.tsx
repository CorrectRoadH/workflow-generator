import React from "react";
import { useDrag } from "react-dnd";
import { InputValue, setComponentInputValue } from "../AppSlice";
import { VisualBlockProps } from "./VisualBlockProps";
import { useDispatch } from "react-redux";

const VisualBlock = ({ blockdata }: VisualBlockProps) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "VisualBlock",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

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
      className="flex bg-slate-200 hover:bg-slate-300 rounded-md m-w-48 min-h-10 m-2"
      ref={dragPreview}
    >
      <div className="m-auto" role="Handle" ref={drag}>
        {blockdata.title}
        参数:
        {interState}
      </div>
    </div>
  );
};

export default VisualBlock;
