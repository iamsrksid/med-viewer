import React, { useRef, useState } from "react";
import { Flex, HStack, IconButton, Image } from "@chakra-ui/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Scrollbars } from "react-custom-scrollbars";
import { getSlideUrl } from "../../utility/utility";
import { useFabricOverlayState } from "../../state/store";
import {
  addViewerWindow,
  changeTile,
} from "../../state/actions/fabricOverlayActions";
import "../../styles/scrollBar.css";
import { v4 as uuidv4 } from "uuid";

const SideNavigationButton = (props) => (
  <IconButton
    h="100%"
    variant="unstyled"
    background="none"
    _focus={{ background: "none" }}
    _hover={{ background: "none" }}
    {...props}
  />
);

const Navigator = ({
  caseInfo,
  isActive,
  isMultiview,
  clickHandler,
  viewerId,
  ...restProps
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { tile, viewer } = viewerWindow[viewerId];

  const scrollbarRef = useRef(null);

  const changeSlide = (slide) => {
    if (isMultiview) {
      const vKeys = Object.keys(viewerWindow);
      if (vKeys.length > 1) {
        const { viewer: v } = viewerWindow[vKeys[1]];
        setFabricOverlayState(
          changeTile({ id: vKeys[1], tile: slide.awsImageBucketUrl })
        );
        v.open(slide.awsImageBucketUrl);
      } else {
        const id = uuidv4();
        setFabricOverlayState(
          addViewerWindow([
            { id, tile: slide.awsImageBucketUrl, slideName: slide.accessionId },
          ])
        );
      }
    } else {
      setFabricOverlayState(
        changeTile({ id: viewerId, tile: slide.awsImageBucketUrl })
      );
      viewer.open(slide.awsImageBucketUrl);
    }
  };

  const handleScroll = (scrollDir) => {
    const leftValue = scrollbarRef.current.getScrollLeft();
    const scrollValue = scrollDir === "right" ? 120 : -120;
    scrollbarRef.current.scrollLeft(leftValue + scrollValue);
  };

  return isActive ? (
    <HStack
      w="100%"
      background="#FCFCFC"
      boxShadow="0px 1px 2px rgba(176, 200, 214, 0.1)"
      align="center"
      py="12px"
      justify="space-between"
    >
      <SideNavigationButton
        icon={<MdOutlineKeyboardArrowLeft color="#151C25" />}
        onClick={() => handleScroll("left")}
        pl="20px"
      />
      <Scrollbars
        ref={scrollbarRef}
        style={{ width: "100%", borderWidth: "0px" }}
        autoHeight
        autoHeightMin="111px"
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-hide" />
        )}
        autoHide
      >
        <HStack spacing="20px" px="12px" justify="center">
          {caseInfo.slides.map((slide) => {
            const url = getSlideUrl(slide.awsImageBucketUrl);
            return (
              <Flex key={slide._id}>
                <Image
                  minW="111px"
                  h="111px"
                  px="8px"
                  py="26px"
                  src={url}
                  alt="wsi slide"
                  fit="cover"
                  background={
                    tile === slide.awsImageBucketUrl ? "#DEDEDE" : "#FFFFFF"
                  }
                  boxShadow="0px 1px 1px rgba(176, 200, 214, 0.05);"
                  onClick={() => changeSlide(slide)}
                  cursor="pointer"
                />
                {isMultiview && tile === slide.awsImageBucketUrl ? (
                  <Flex
                    w="28px"
                    h="28px"
                    background="#FFFFFF"
                    justify="center"
                    align="center"
                    position="absolute"
                  >
                    1.
                  </Flex>
                ) : null}
              </Flex>
            );
          })}
        </HStack>
      </Scrollbars>
      <SideNavigationButton
        icon={<MdOutlineKeyboardArrowRight color="#151C25" />}
        onClick={() => handleScroll("right")}
      />
    </HStack>
  ) : null;
};

export default Navigator;
