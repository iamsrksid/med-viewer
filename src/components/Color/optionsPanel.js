import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { brandColors } from "../../styles/brandPalette";
import ToolbarBorderBox from "../ViewerToolbar/borderBox";
import ToolbarBorderBoxInner from "../ViewerToolbar/borderBoxInner";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { updateColor } from "../../reducers/fabricOverlayReducer";
import ColorBox from "../colorBox";

const ColorOptionsPanel = () => {
  const { color } = useSelector((state) => state.fabricOverlayState);
  const { isActiveTool, isObjectSelected } = useSelector(
    (state) => state.colorState
  );
  const isVisible = isObjectSelected || isActiveTool;
  const dispatch = useDispatch();

  return (
    <Flex h="42px" direction="column" mt="10px">
      <Flex h="5px" bgColor="rgba(236, 236, 236, 1)"></Flex>
      <SimpleGrid
        columns={7}
        spacingY={1}
        bgColor="rgba(248, 248, 245, 1)"
        p="10px"
      >
        {brandColors.map((brandColor) => (
          <ColorBox
            key={brandColor.label}
            border={
              color.label === brandColor.label ? "1px solid black" : "none"
            }
            backgroundColor={brandColor.hex}
            mr="20px"
            p="3px"
            borderRadius="0px"
            onClick={() => dispatch(updateColor(brandColor))}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default ColorOptionsPanel;
