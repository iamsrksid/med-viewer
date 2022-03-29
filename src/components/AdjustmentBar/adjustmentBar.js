import React, { memo, useState } from "react";
import { Flex, Text, IconButton, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsGrid1X2 } from "react-icons/bs";
import Move from "../Move/move";
import ChangeCase from "../Case/changeCase";
import ActionTools from "../Toolbar/ActionTools";
import ScreenTools from "../Toolbar/ScreenTools";
import "../../styles/viewer.css";
import ToolbarButton from "../ViewerToolbar/button";
import { GrHomeRounded } from "react-icons/gr";
import IconSize from "../ViewerToolbar/IconSize";

const AdjustmentBar = ({
  project,
  caseId,
  goToHomeHandler,
  changeCaseHandler,
  showSidebar,
  sidebar,
}) => {
  const { currentViewer } = useSelector((state) => state.viewerState);

  const [ifScreenlessthan1536px] = useMediaQuery("(max-width:1660px)");

  const handleSidebar = () => {
    showSidebar();
  };

  return (
    <>
      <Flex
        className="adjustmentbar"
        alignItems="center"
        height={ifScreenlessthan1536px ? "46px" : "56px"}
        bgColor="#F8F8F5"
        fontFamily="fira sans"
        fontSize={ifScreenlessthan1536px ? "14px" : "16px"}
        fontWeight="500"
      >
        <Flex alignItems="center" ml="18px" mr="20px" minW="150px">
          <IconButton
            icon={<GrHomeRounded size={18} />}
            backgroundColor="#F8F8F5"
            _hover={{ bg: "#F8F8F5" }}
            onClick={goToHomeHandler}
            mr="7px"
          />
          <ToolbarButton
            onClick={handleSidebar}
            backgroundColor={sidebar ? "#E4E5E8" : ""}
            outline={sidebar ? "0.5px solid rgba(0, 21, 63, 1)" : ""}
            icon={<BsGrid1X2 size={IconSize()} color="#151C25" />}
            label="Sidebar"
          />
          <Text color="#151C25" ml="12px">
            {project?.name}
          </Text>
        </Flex>
        <ChangeCase
          project={project}
          caseId={caseId}
          changeCaseHandler={changeCaseHandler}
        />
        <Move viewerId={currentViewer} />
        <ActionTools viewerId={currentViewer} />
        <ScreenTools viewerId={currentViewer} />
      </Flex>
    </>

    // <Box className="adjustmentbar" height="6em" borderTop="1px solid #000">
    //   <Flex bgColor="rgba(236, 236, 236, 1)" alignItems="center" borderBottom="1px solid #ffffff50">
    //     {caseToggle ? <Case changeCount={setCaseToggle} /> : ""}
    //     {algoToggle ? (
    //       <Box
    //         width="100%"
    //         height="6em"
    //         borderRight="0.5px solid black"
    //         boxSizing="border-box"
    //         zIndex={4}
    //       >
    //         <Flex direction="column" marginTop="5px" marginLeft="5px">
    //           <ImageGalleryModal
    //             viewerId={currentViewer}
    //             closeToggle={setAlgoToggle}
    //           />
    //           <ChangeCase closeToggle={setAlgoToggle} />
    //         </Flex>
    //       </Box>
    //     ) : (
    //       ""
    //     )}
    //     {toolsToggle ? (
    //       <Move viewerId={currentViewer} toolsButtonHandler={setToolsToggle} />
    //     ) : (
    //       ""
    //     )}
    //     {colorsToggle ? (
    //       <Color
    //         viewerId={currentViewer}
    //         colorsButtonHandler={setColorsToggle}
    //       />
    //     ) : (
    //       ""
    //     )}
    //     {typeToolsToggle ? (
    //       <TypeTools
    //         viewerId={currentViewer}
    //         typeToolsButtonHandler={setTypeToolsToggle}
    //       />
    //     ) : (
    //       ""
    //     )}
    //     {shareGenToggle ? (
    //       <SlideUser closeButtonToggle={setShareGenToggle} />
    //     ) : (
    //       ""
    //     )}
    //     <Collapse in={dropDownOpen} animateOpacity style={{ zIndex: "10" }}>
    //       <Box
    //         pos="fixed"
    //         top="40px"
    //         left="117px"
    //         background="white"
    //         color="black"
    //         borderRadius="5px"
    //         border="5px solid white"
    //       >
    //         <VStack>
    //           <Text
    //             onClick={() => setCaseToggle(true)}
    //             className="file_menu_option"
    //           >
    //             Case Information
    //           </Text>
    //           <Text
    //             onClick={() => setAlgoToggle(true)}
    //             className="file_menu_option"
    //           >
    //             Choose slides and algorithms
    //           </Text>
    //           <Text
    //             onClick={() => setColorsToggle(true)}
    //             className="file_menu_option"
    //           >
    //             Colors, Width
    //           </Text>
    //           <Text
    //             onClick={() => setTypeToolsToggle(true)}
    //             className="file_menu_option"
    //           >
    //             Type of tools
    //           </Text>
    //           <Text
    //             onClick={() => setToolsToggle(true)}
    //             className="file_menu_option"
    //           >
    //             Toolbar controls
    //           </Text>
    //           <Text
    //             onClick={() => setShareGenToggle(true)}
    //             className="file_menu_option"
    //           >
    //             Share and generate report
    //           </Text>
    //         </VStack>
    //       </Box>
    //     </Collapse>
    //   </Flex>
    // </Box>
  );
};

export default memo(AdjustmentBar);
