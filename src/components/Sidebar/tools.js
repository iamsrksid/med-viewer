import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/styles.css";
import { updateActiveFeed } from "../../reducers/feedReducer";
import Studies from "./studies";
import Annotations from "./annotations";
import Questions from "./questions";
import "../../styles/viewer.css";

const SidebarTools = ({
  project,
  questionnaire,
  viewerIds,
  userIdToQuery,
  userInfo,
  response,
  finalSubmitHandler,
  saveAnnotationsHandler,
  loadAnnotationsHandler,
}) => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const { isMultiView } = useSelector((state) => state.viewerState);
  const { activeFeed } = useSelector((state) => state.feedState);
  const dispatch = useDispatch();

  const SlideToggleButton = ({ label, value, isActive, ...restProps }) => (
    <Box
      as="button"
      p={1}
      my={1}
      fontWeight="bold"
      fontSize={11}
      bgColor={isActive ? "#F7F2F2" : "#DBDBDB70"}
      color={isActive ? "black" : "#D3CFCF"}
      onClick={() => dispatch(updateActiveFeed(value))}
      _disabled={{
        cursor: "not-allowed",
      }}
      {...restProps}
    >
      {label}
    </Box>
  );

  return (
    <Box bgColor="#fff" minwidth="306px" padding="0px" margin="0px">
      <Tabs isFitted size="10px">
        <TabList
          backgroundColor="#F8F8F5"
          fontSize="14px"
          fontWeight="500"
          fontFamily="inter"
        >
          <Tab
            _focus={{ border: "none" }}
            _selected={{
              bg: "#E4E5E8",
              border: "0.5px solid #000000",
            }}
            color="#00153F"
            py={2}
            border="0.5px solid #000"
            fontFamily="inter"
          >
            Studies
          </Tab>
          <Tab
            _focus={{ border: "none" }}
            _selected={{
              bg: "#E4E5E8",
              border: "0.5px solid #000000",
              borderLeft: "none",
            }}
            color="#00153F"
            py={2}
            border="0.5px solid #000"
            borderLeft="none"
            fontFamily="inter"
          >
            Questions
          </Tab>
          <Tab
            _focus={{ border: "none" }}
            _selected={{
              bg: "#E4E5E8",
              border: "0.5px solid #000000",
              borderLeft: "none",
            }}
            color="#00153F"
            py={2}
            border="0.5px solid #000000"
            borderLeft="none"
            fontFamily="inter"
          >
            Annotations
          </Tab>
          {/* <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#3965C5" }}
            fontSize="xs"
            py={2}
            px={1}
          >
            Annotations
          </Tab>
          <Tab
            _focus={{ border: "none" }}
            _selected={{ bg: "#3965C5" }}
            fontSize="xs"
            py={2}
          >
            Analysis
          </Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel p="0px">
            <Studies project={project} />
          </TabPanel>
          <TabPanel p="0px">
            <Questions
              userInfo={userInfo}
              project={project}
              questionnaire={questionnaire}
              viewerIds={viewerIds}
              userIdToQuery={userIdToQuery}
              response={response}
              finalSubmitHandler={finalSubmitHandler}
            />
          </TabPanel>
          <TabPanel p="0px">
            <Annotations
              userInfo={userInfo}
              saveAnnotationsHandler={saveAnnotationsHandler}
              loadAnnotationsHandler={loadAnnotationsHandler}
            />
          </TabPanel>
          {/* <TabPanel>
            <Analysis />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SidebarTools;
