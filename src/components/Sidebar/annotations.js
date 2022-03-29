import React from "react";
import { Box, Divider, HStack } from "@chakra-ui/react";
import ActivityFeed from "../Feed/activityFeed";
import "../../styles/viewer.css";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveFeed } from "../../reducers/feedReducer";
import SaveAnnotations from "../Annotations/saveAnnotations";
import LoadAnnotations from "../Annotations/loadAnnotations";

const Annotations = ({
  userInfo,
  saveAnnotationsHandler,
  loadAnnotationsHandler,
}) => {
  const { activeTool } = useSelector((state) => state.fabricOverlayState);
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const { isMultiView, currentViewer } = useSelector(
    (state) => state.viewerState
  );
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
    <Box className="annotations_box">
      <Divider />
      <Box w="100%">
        <Box h="75vh" mt="5px" mb="10px" backgroundColor="#E5E5E550">
          <ActivityFeed userInfo={userInfo} viewerId={currentViewer} />
          <HStack
            my={6}
            justify="center"
            spacing={10}
            alignContent="flex-start"
            ml="-20px"
          >
            <SaveAnnotations
              viewerId={currentViewer}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
            <LoadAnnotations
              viewerId={currentViewer}
              userInfo={userInfo}
              loadAnnotationsHandler={loadAnnotationsHandler}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Annotations;
