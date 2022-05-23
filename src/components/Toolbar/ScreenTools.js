import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { MdOutbox } from "react-icons/md";
import ToolbarButton from "../ViewerToolbar/button";
import SlideChat from "../Chat/chat";
import ShareLink from "../Share/shareLink";
import Popup from "../Popup/popup";
import IconSize from "../ViewerToolbar/IconSize";
import DownloadImage from "../downloadImage";
import { BiScreenshot } from "react-icons/bi";
import ViewerImport from "../Layout/viewerImport";

function ScreenTools({ viewerId, morphometry, uploadPatch }) {
  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  };
  return (
    <>
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
        {/* <ToolbarButton
          icon={<BiScreenshot size={IconSize()} color="#151C25" />}
          label="Crop and run morphometry"
        /> */}
        {morphometry === true ? <ViewerImport uploadPatch={uploadPatch} /> : ""}
        {/* <ViewerImport /> */}
        <DownloadImage />
        {/* <Fullscreen viewerId={viewerId} /> */}
        <SlideChat />
        <ShareLink />
        <Popup
          handlePopup={() => {
            handlePopup();
          }}
          popup={popup}
        />
      </Flex>
    </>
  );
}

export default ScreenTools;
