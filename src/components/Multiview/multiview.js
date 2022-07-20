import React, { useState } from "react";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";
import { MultiviewIcon, MultiviewSelectedIcon } from "../Icons/CustomIcons";
import { IconButton, Tooltip, useMediaQuery } from "@chakra-ui/react";

const Multiview = ({
  viewerId,
  isMultiview,
  setIsMultiview,
  setIsNavigatorActive,
}) => {
  const iconSize = IconSize();
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const [isActive, setIsActive] = useState(false);
  const [ifScreenlessthan1536px] = useMediaQuery("(max-width:1536px)");

  const handleClick = () => {
    setIsNavigatorActive(false);
    setIsMultiview((state) => !state);
  };

  return (
    <Tooltip
      label="Multiview"
      aria-label="Multiview"
      placement="bottom"
      openDelay={0}
      bg="#E4E5E8"
      color="rgba(89, 89, 89, 1)"
      fontSize="14px"
      fontFamily="inter"
      hasArrow
      borderRadius="0px"
      size="20px"
    >
      <IconButton
        width={ifScreenlessthan1536px ? "30px" : "40px"}
        size={ifScreenlessthan1536px ? 60 : 0}
        height={ifScreenlessthan1536px ? "26px" : "34px"}
        borderRadius={0}
        _active={{
          bgColor: "rgba(228, 229, 232, 1)",
          outline: "0.5px solid rgba(0, 21, 63, 1)",
        }}
        _focus={{
          border: "none",
        }}
        icon={isActive ? <MultiviewSelectedIcon /> : <MultiviewIcon />}
        backgroundColor={isMultiview ? "#E4E5E8" : "#F8F8F5"}
        outline={isMultiview ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
        onClick={() => {
          handleClick();
          setIsActive(!isActive);
        }}
        mr="7px"
        boxShadow={
          isActive
            ? "inset -2px -2px 2px rgba(0, 0, 0, 0.1), inset 2px 2px 2px rgba(0, 0, 0, 0.1)"
            : null
        }
        isDisabled={Object.keys(viewerWindow).length > 1}
      />
    </Tooltip>
  );
};

export default Multiview;
