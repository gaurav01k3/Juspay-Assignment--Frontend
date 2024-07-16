import React from "react";
import DropAreaComponent from "./DropAreaComponent";
import { useDispatch } from "react-redux";
import { Actions } from "../duck/actions";

function DropAreaContainer() {
  const dispatch = useDispatch();

  const onDrop = (droppableBlocks) => {
    dispatch(Actions.dropBlockOnCanvas(droppableBlocks));
  };

  return <DropAreaComponent onDrop={onDrop} />;
}

export default DropAreaContainer;
