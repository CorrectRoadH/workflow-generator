import React from "react";
import Container from "../blocks/Container";
import VisualBlock from "./VisualBlock";
import { VisualBlockProps } from "./VisualBlockProps";

const ShowComponent = ({ boxdata }: VisualBlockProps) => {
  if (boxdata.componentType === "block") {
    return <VisualBlock boxdata={boxdata} />;
  }

  if (boxdata.componentType === "container") {
    return <Container boxdata={boxdata} />;
  }

  return <VisualBlock boxdata={boxdata} />;
};

export default ShowComponent;
