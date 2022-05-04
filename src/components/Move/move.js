import React, { useEffect, useState } from "react";
import { BsArrowsMove, BsCircleHalf, BsLayoutSplit } from "react-icons/bs";
import { RiNavigationFill, RiPencilRulerLine } from "react-icons/ri";
import { AiOutlineSliders } from "react-icons/ai";
import ToolbarButton from "../ViewerToolbar/button";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Rotate from "../Rotate/Rotate";
import TypeTools from "../AdjustmentBar/typeTools";
import ColorOptionsPanel from "../Color/optionsPanel";
import ToolbarPointerControl from "../ViewerToolbar/pointerControl";
import Popup from "../Popup/popup";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";
import { updateTool } from "../../state/actions/fabricOverlayActions";

const Move = ({ viewerId, annotations }) => {
  const [ifBiggerScreen] = useMediaQuery("(min-width:2000px)");
  const [typeToolsToggle, setTypeToolsToggle] = useState(false);
  const [colorBar, setColorBar] = useState(false);
  const [popup, setPopup] = useState(false);
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { activeTool } = fabricOverlayState;
  const isActive = activeTool === "Move";

  const handleClick = () => {
    setFabricOverlayState(updateTool({ tool: isActive ? "" : "Move" }));
  };
  const handleAnnotationsClick = () => {
    setTypeToolsToggle((typeToolsToggle) => !typeToolsToggle);
  };
  const handleColorClick = () => {
    setColorBar((colorBar) => !colorBar);
  };
  const handlePopup = () => {
    setPopup(!popup);
  };
  const iconSize = IconSize();

  return (
    <Flex direction="column">
      <Flex alignItems="center" ml="16px" mr="7px">
        {/* <ToolbarPointerControl viewerId={viewerId} /> */}
        <ToolbarButton
          icon={<BsArrowsMove size={iconSize} color="#151C25" />}
          label="Move"
          backgroundColor={!isActive ? "" : "#E4E5E8"}
          outline={isActive ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
          onClick={handleClick}
        />
        <Rotate viewerId={viewerId} />

        {annotations ? (
          <ToolbarButton
            icon={<HiOutlinePencilAlt size={iconSize} color="#151C25" />}
            backgroundColor={typeToolsToggle ? "#E4E5E8" : ""}
            outline={typeToolsToggle ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
            label="Annotations"
            onClick={handleAnnotationsClick}
          />
        ) : null}
        {/* <MultiView viewerId={viewerId}/> */}
        {/* <ToolbarButton
          icon={<BsLayoutSplit size={18} color="#151C25" />}
          label="Multiview"
          onClick={handlePopup}
        /> */}
        <ToolbarButton
          icon={<BsCircleHalf size={iconSize} color="#151C25" />}
          label="Colors"
          backgroundColor={colorBar ? "#E4E5E8" : ""}
          outline={colorBar ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
          onClick={handleColorClick}
        />
        <ToolbarButton
          icon={<RiPencilRulerLine size={iconSize} color="#151C25" />}
          onClick={handlePopup}
          label="Measurement"
        />
        {/* <TypeText viewerId={viewerId} /> */}
      </Flex>

      <Flex
        pl="35px"
        top="72px"
        direction="column"
        pos="absolute"
        zIndex="1000"
        ml={ifBiggerScreen ? "100px" : ""}
      >
        {typeToolsToggle ? <TypeTools viewerId={viewerId} /> : ""}
        {colorBar ? <ColorOptionsPanel /> : ""}
      </Flex>

      {/* Dummy component */}
      <Popup
        handlePopup={() => {
          handlePopup();
        }}
        popup={popup}
      />
    </Flex>
  );
};
export default Move;
