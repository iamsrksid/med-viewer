import React from "react";
import { BsSlash } from "react-icons/bs";
import TypeButton from "../typeButton";
import { useSelector, useDispatch } from "react-redux";
import { updateTool } from "../../reducers/fabricOverlayReducer";

const Line = ({ viewerId }) => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const isActive = activeTool === "Line";
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateTool({ tool: "Line" }));
  };

  return (
    <TypeButton
      pl="0px"
      icon={<BsSlash size={25} color="#151C25" />}
      backgroundColor={isActive ? "#E4E5E8" : ""}
      borderRadius="0px"
      label="Line"
      onClick={handleClick}
    />
  );
};

export default Line;
