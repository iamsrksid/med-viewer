import React, { useEffect, useState } from "react";
import { BsArrowsMove, BsCircleHalf, BsLayoutSplit } from "react-icons/bs";
import { RiNavigationFill, RiPencilRulerLine } from "react-icons/ri";
import { AiOutlineSliders } from "react-icons/ai";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ImMakeGroup, ImUngroup } from "react-icons/im";
import { fabric } from "openseadragon-fabricjs-overlay";
import md5 from "md5";
import ToolbarButton from "../ViewerToolbar/button";
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
  const { activeTool, viewerWindow } = fabricOverlayState;
  const { fabricOverlay, viewer } = viewerWindow[viewerId];
  const isActive = activeTool === "Move";

  const handleClick = () => {
    setFabricOverlayState(updateTool({ tool: "Move" }));
    const canvas = fabricOverlay.fabricCanvas();
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

  const groupAnnotations = () => {
    const canvas = fabricOverlay.fabricCanvas();
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== "activeSelection") {
      return;
    }
    const annoGroup = canvas.getActiveObject().toGroup();
    annoGroup.hash = md5(annoGroup);
    canvas.requestRenderAll();
    // const annotations = canvas.getObjects();

    // if (annotations.length > 1) {
    //   const annoGroup = new fabric.Group(annotations);
    //   const hash = md5(annoGroup);
    //   annoGroup.set({ hash });
    //   annotations.forEach((obj) => canvas.remove(obj));
    //   canvas.add(annoGroup);
    //   canvas.renderAll();
    // }
  };

  const ungroupAnnotations = () => {
    const canvas = fabricOverlay.fabricCanvas();
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== "group") {
      return;
    }
    canvas.getActiveObject().toActiveSelection();
    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();
    if (isActive) {
      canvas.defaultCursor = "default";
      canvas.hoverCursor = "move";
      canvas.selection = false;

      canvas.on("selection:created", () => {
        canvas.selection = true;
      });
      canvas.on("selection:cleared", () => {
        canvas.selection = false;
      });
    }
  }, [isActive]);

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
        {annotations ? (
          <>
            <ToolbarButton
              icon={<ImMakeGroup size={iconSize} color="#151C25" />}
              label="Group"
              onClick={groupAnnotations}
            />
            <ToolbarButton
              icon={<ImUngroup size={iconSize} color="#151C25" />}
              label="Ungroup"
              onClick={ungroupAnnotations}
            />
          </>
        ) : null}
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
