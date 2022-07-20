import React, { useState } from "react";
import {
  Flex,
  Button,
  MenuButton,
  MenuItem,
  Menu,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import { BiScreenshot, BiDotsVertical } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import ToolbarButton from "../ViewerToolbar/button";
import SlideChat from "../Chat/chat";
import ShareLink from "../Share/shareLink";
import Popup from "../Popup/popup";
import IconSize from "../ViewerToolbar/IconSize";
import DownloadImage from "../downloadImage";
import ViewerImport from "../Layout/viewerImport";
import {
  ShareIcon,
  DocumentsIcon,
  ShareSelectedIcon,
} from "../Icons/CustomIcons";

const ScreenTools = ({
  viewerId,
  setShowAnnotationsBar,
  showAnnotationsBar,
  morphometry,
  uploadPatch,
  setStartX,
  setStartY,
  setWindowWidth,
  setWindowHeight,
}) => {
  const [popup, setPopup] = useState(false);
  const [screenshotHover, setScreenshotHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [shareHover, setShareHover] = useState(false);
  const [openMenuHover, setOpenMenuHover] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  };
  const handleMoreClick = () => {
    setShowAnnotationsBar(!showAnnotationsBar);
  };
  return (
    <Flex px="20px" height="18px" alignItems="center">
      {/* Add respective tools */}

      <ToolbarButton
        icon={
          <BiScreenshot
            size={20}
            color={screenshotHover ? "#3B5D7C" : "#151C25"}
          />
        }
        label="Capture part of screen"
        onClick={handlePopup}
        onMouseEnter={() => setScreenshotHover(true)}
        onMouseLeave={() => setScreenshotHover(false)}
      />
      <DownloadImage />
      <Divider orientation="vertical" border="1px solid gray" />
      {morphometry === true ? (
        <ViewerImport
          viewerId={viewerId}
          uploadPatch={uploadPatch}
          setStartX={setStartX}
          setStartY={setStartY}
          setWindowWidth={setWindowWidth}
          setWindowHeight={setWindowHeight}
        />
      ) : null}
      {/* <ViewerImport /> */}
      {/* <DownloadImage /> */}
      {/* <Fullscreen viewerId={viewerId} /> */}
      <SlideChat />
      <ToolbarButton
        icon={
          shareHover ? (
            <RiShareForwardFill size={20} color="#3B5D7C" />
          ) : (
            <ShareIcon size={20} color="#151C25" mt={1.3} mr={2} />
          )
        }
        label="Share Case"
        onClick={handlePopup}
        onMouseEnter={() => setShareHover(true)}
        onMouseLeave={() => setShareHover(false)}
      />
      <Divider orientation="vertical" border="1px solid gray" />
      <ToolbarButton
        icon={<DocumentsIcon color="#151C25" mt={1.4} mr={2} />}
        label="Share Case"
        onClick={handlePopup}
        disabled={true}
      />
      <ShareLink />
      <Flex borderLeft="2px solid #E4E5E8" ml="18px" pl="15px">
        {/* <ToolbarButton
          icon={<BiDotsVertical size={20} color="#151C25" />}
          label="Options"
          onClick={handlePopup}
        /> */}
        <Menu zIndex="5">
          <MenuButton
            as={Button}
            transition="all 0.2s"
            fontWeight={500}
            bgColor="#F8F8F5"
            overflow="clip"
            borderRadius="none"
            _focus={{ outline: "none" }}
            _hover={{ bgColor: "#DEDEDE" }}
            title="More"
            onMouseEnter={() => setMenuHover(true)}
            onMouseLeave={() => setMenuHover(false)}
          >
            <BiDotsVertical
              size={20}
              color={menuHover ? "#3B5D7C" : "#151C25"}
            />
          </MenuButton>
          <MenuList color="#000">
            <MenuItem onClick={handlePopup}>Image Details</MenuItem>
            <MenuItem onClick={handlePopup}>Keypoints</MenuItem>
            <MenuItem onClick={handleMoreClick}>Annotation Details</MenuItem>
            <MenuItem onClick={handlePopup}>Morphometry Results</MenuItem>
            <MenuItem onClick={handlePopup}>Hierarchy</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Popup
        handlePopup={() => {
          handlePopup();
        }}
        popup={popup}
      />

      {/* <ActivityFeed
        viewerId={viewerId}
        userInfo={userInfo}
        handlePopup={() => {
          handleMoreClick();
        }}
        popup={menuItem}
      /> */}
    </Flex>
  );
};

export default ScreenTools;
