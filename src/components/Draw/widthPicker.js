import React from "react";
import PropTypes from "prop-types";
import { HStack } from "@chakra-ui/react";
import ToolbarBorderBox from "../ViewerToolbar/borderBox";
import ToolbarBorderBoxInner from "../ViewerToolbar/borderBoxInner";
import { useSelector, useDispatch } from "react-redux";
import { updateWidth } from "../../reducers/drawReducer";
import { widths } from "./width";

const DrawWidthPicker = () => {
  const { width } = useSelector((state) => state.drawState);
  const { color } = useSelector((state) => state.fabricOverlayState);
  const dispatch = useDispatch();

  return (
    <HStack spacing={2} ml="30px" px={1} py={2} my={3}>
      {widths.map((widthObj) => {
        let imgSrc = require(`../../assets/images/pen-weight-icons/${color.label}${widthObj.size}.png`);
        return (
          <ToolbarBorderBoxInner
            key={widthObj.size}
            w={widthObj.boxSize}
            h={widthObj.boxSize}
            bgImage={`url(${imgSrc.default})`}
            borderColor={
              width && widthObj.size === width.size ? "white" : "#A3A3A3"
            }
            bgSize="cover"
            display="block"
            onClick={() => dispatch(updateWidth(widthObj))}
          />
        );
      })}
    </HStack>
  );
};

export default DrawWidthPicker;
