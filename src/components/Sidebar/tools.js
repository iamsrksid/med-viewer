import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import "../../styles/styles.css";
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
  currentViewer,
  finalSubmitHandler,
  saveAnnotationsHandler,
  loadAnnotationsHandler,
}) => {
  return (
    <Box bgColor="#fff" minwidth="306px" padding="0px" margin="0px">
      <Tabs isFitted size="10px">
        <TabList
          backgroundColor="#F8F8F5"
          fontSize="14px"
          fontWeight="500"
          fontFamily="inter"
        >
          {/* <Tab
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
          </Tab> */}
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
          {/* <Tab
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
          </Tab> */}
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
          {/* <TabPanel p="0px">
            <Studies />
          </TabPanel> */}
          <TabPanel p="0px">
            <Questions
              project={project}
              questionnaire={questionnaire}
              viewerIds={viewerIds}
              userInfo={userInfo}
              response={response}
              finalSubmitHandler={finalSubmitHandler}
            />
          </TabPanel>
          {/* <TabPanel p="0px">
            <Annotations />
          </TabPanel> */}
          {/* <TabPanel>
            <Analysis />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SidebarTools;
