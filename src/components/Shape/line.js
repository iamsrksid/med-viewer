import React from "react";
import { BsSlash } from "react-icons/bs";
import TypeButton from "../typeButton";
import { useFabricOverlayState } from "../../state/store";
import { updateTool } from "../../state/actions/fabricOverlayActions";

const Line = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { activeTool } = fabricOverlayState;
  const isActive = activeTool === "Line";

  const handleClick = () => {
    setFabricOverlayState(updateTool({ tool: "Line" }));
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
