import React from "react";
import Container from "./Container";
import ShowBox from "./ShowBox";
import { ShowBoxProps } from "./ShowBoxProps";

const ShowComponent = ({ boxdata }: ShowBoxProps) => {
  if (boxdata.componentType === "singleComponent") {
    return <ShowBox boxdata={boxdata} />;
  } else {
    return <Container boxdata={boxdata} />;
  }
};

export default ShowComponent;
