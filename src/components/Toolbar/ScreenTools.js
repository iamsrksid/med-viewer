import React, { useState } from "react";
import {
  Flex,
  Button,
  MenuButton,
  MenuItem,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { MdOutbox } from "react-icons/md";
import { BiScreenshot, BiDotsVertical } from "react-icons/bi";
import ToolbarButton from "../ViewerToolbar/button";
import SlideChat from "../Chat/chat";
import ShareLink from "../Share/shareLink";
import Popup from "../Popup/popup";
import IconSize from "../ViewerToolbar/IconSize";
import DownloadImage from "../downloadImage";
import ViewerImport from "../Layout/viewerImport";
import ActivityFeed from "../Feed/activityFeed";
import Annotations from "../Sidebar/annotations";

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
        icon={<BsGrid3X3Gap size={IconSize()} color="#151C25" />}
        label="Grid"
        onClick={handlePopup}
      />
      <ToolbarButton
        icon={<MdOutbox size={IconSize()} color="#151C25" />}
        label="WSI"
        onClick={handlePopup}
      />
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
      <DownloadImage />
      {/* <Fullscreen viewerId={viewerId} /> */}
      <SlideChat />
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
          >
            <BiDotsVertical size={20} color="#151C25" />
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
