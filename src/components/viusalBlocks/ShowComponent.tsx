import React from "react";
import Container from "./Container";
import VisualBase from "./VisualBase";
import VisualBlock from "./VisualBlock";
import { VisualBlockProps } from "./VisualBlockProps";

const ShowComponent = ({ blockdata }: VisualBlockProps) => {
  if (blockdata.componentType === "block") {
    return <VisualBlock blockdata={blockdata} />;
  }

  if (blockdata.componentType === "container") {
    return <Container blockdata={blockdata} />;
  }

  if (blockdata.componentType === "base") {
    return <VisualBase blockdata={blockdata} />;
  }

  return <VisualBlock blockdata={blockdata} />;
};

export default ShowComponent;
