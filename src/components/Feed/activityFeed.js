import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Icon,
  useDisclosure,
  useMediaQuery,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Circle,
} from "@chakra-ui/react";
import "../../styles/scrollBar.css";
import { Scrollbars } from "react-custom-scrollbars";
import { BiRectangle } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { BsCircle, BsSlash } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { FaDrawPolygon } from "react-icons/fa";
import EditText from "./editText";
import { useFabricOverlayState } from "../../state/store";
import { updateAnnotationInDB } from "../../utility";

const EditTextButton = ({ feed, handleEditClick, ...restProps }) => {
  return (
    <Icon
      as={MdModeEditOutline}
      cursor="pointer"
      onClick={() => handleEditClick(feed)}
      {...restProps}
    />
  );
};

const CardDetailsRow = ({ title, value, ...restProps }) => (
  <HStack
    py="8px"
    marginStart="18px"
    borderBottom="1px solid #F6F6F6"
    pb="0.5vw"
    {...restProps}
  >
    <Text minW="35%">{title}:</Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomTab = ({ title, ...props }) => (
  <Tab
    {...props}
    fontSize="12px"
    lineHeight="15px"
    letterSpacing="0.005em"
    fontWeight="400"
    background="#FFFFFF"
    _selected={{
      background: "#FCFCFC",
      boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.05)",
      border: "none",
      outline: "none",
      color: "#3B5D7C",
      fontWeight: "500",
    }}
    _disabled={{ background: "#FFFFFF90", cursor: "not-allowed" }}
    flex="1"
    p="8px"
  >
    {title}
  </Tab>
);

const CustomTabPanel = ({
  children,
  title,
  annotation,
  totalCells,
  ...props
}) => (
  <TabPanel {...props} px={0} py="8px">
    <>
      <Text
        py="12px"
        px="18px"
        bg="#FFFFFF"
        fontSize="14px"
        lineHeight="17px"
        letterSpacing="0.0025em"
        fontWeight="400"
      >
        {title}
      </Text>
      {children ? (
        <Flex bg="#FFFFFF" mt="8px">
          <Scrollbars
            style={{
              width: "100%",
              height: "29vh",
              borderWidth: "0px",
            }}
            renderThumbVertical={(props) => <div className="thumb-vertical" />}
            autoHide
          >
            {children}
          </Scrollbars>
        </Flex>
      ) : null}
    </>
  </TabPanel>
);

const ActivityFeed = ({
  userInfo,
  viewerId,
  totalCells,
  handlePopup,
  popup,
  saveAnnotationsHandler,
  showFeedBar,
  onUpdateAnnotation,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { activeTool, viewerWindow } = fabricOverlayState;
  const { fabricOverlay, activityFeed, viewer, tile, slideId } =
    viewerWindow[viewerId];

  const scrollbar = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [annotationObject, setAnnotationObject] = useState(null);
  const [annotationDetails, setAnnotationsDetails] = useState(null);
  const [ifScreenlessthan1660px] = useMediaQuery("(max-width:1660px)");

  useEffect(() => {
    if (scrollbar.current) scrollbar.current.scrollToBottom();
    if (activityFeed.length === 0) setAnnotationsDetails(null);
  }, [activityFeed]);

  useEffect(() => {
    return () => {
      setAnnotationObject(null);
      setAnnotationsDetails(null);
    };
  }, []);

  useEffect(() => {
    setAnnotationObject(null);
    setAnnotationsDetails(null);
  }, [tile]);

  const handleClick = (feed) => {
    if (!feed.object) return;
    const canvas = fabricOverlay.fabricCanvas();
    canvas.setActiveObject(feed.object);

    // change position to annotation object location
    // except for when MagicWand tool is activated
    if (activeTool !== "MagicWand") {
      const { zoomLevel, left, top, width, height } = feed.object;
      viewer.viewport.zoomTo(zoomLevel);

      // get viewport point of middle of selected annotation
      const vpoint = viewer.viewport.imageToViewportCoordinates(
        left + width / 2,
        top + height / 2
      );
      viewer.viewport.panTo(vpoint);
    }

    canvas.requestRenderAll();
    setAnnotationsDetails(feed.object);
  };

  const handleSave = ({ text, tag }) => {
    if (!text || !tag) return;
    annotationObject.text = text;
    annotationObject.tag = tag;
    updateAnnotationInDB({
      slideId,
      annotation: annotationObject,
      onUpdateAnnotation,
    });
    setAnnotationObject(null);
    onClose();
  };

  const handleEditClick = (feed) => {
    setAnnotationObject(feed.object);
    onOpen();
  };

  return (
    <Flex
      as="section"
      w="100%"
      position={showFeedBar ? "unset" : "absolute"}
      // h={ifScreenlessthan1660px ? "calc(100% - 90px)" : "90%"}
      h={
        showFeedBar
          ? "90vh"
          : !showFeedBar && ifScreenlessthan1660px
          ? "calc(100% - 90px)"
          : "90%"
      }
      padding={0}
      margin={0}
      right="0"
      zIndex={2}
      background="#FCFCFC"
      boxShadow={showFeedBar ? "" : "-1px 0px 2px rgba(176, 200, 214, 0.3)"}
      direction="column"
      overflowY="auto"
      overflowX="hidden"
    >
      <Flex
        py="0.5px"
        justifyContent="flex-end"
        alignItems="center"
        background="#F6F6F6"
        display={showFeedBar ? "none" : "flex"}
      >
        <GrFormClose
          size={16}
          onClick={() => handlePopup(!popup)}
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <HStack
        fontSize="0.729vw"
        spacing="1vw"
        w="100%"
        h="4vh"
        marginStart="0.8vw"
      >
        {/* <Text>Image Info</Text>
        <Text>Key Points</Text> */}
        <Text color="blue">Annotation</Text>
      </HStack>

      <Flex direction="column" marginStart="0.8vw" pt="2px" overflowY="auto">
        <Text fontSize="1vw" pb="3px">
          Annotation Details
        </Text>
        <Scrollbars
          ref={scrollbar}
          style={{
            width: "100%",
            height: annotationDetails ? "30vh" : "62vh",
            borderWidth: "0px",
          }}
          renderThumbVertical={(props) => <div className="thumb-vertical" />}
          autoHide
        >
          <Flex direction="column">
            {activityFeed.map((feed, index) => {
              return (
                <Flex
                  key={feed.object.hash}
                  pb="0.5vh"
                  borderBottom="1px solid #F6F6F6"
                  cursor="pointer"
                  onClick={() => handleClick(feed)}
                  justify="space-between"
                  align="center"
                >
                  <Flex align="center">
                    {feed.object?.type === "rect" ? (
                      <BiRectangle color="#E23636" />
                    ) : feed.object?.type === "polygon" ? (
                      <FaDrawPolygon color="#E23636" />
                    ) : feed.object?.type === "ellipse" ? (
                      <BsCircle color="#E23636" />
                    ) : (
                      <BsSlash color="#E23636" />
                    )}
                    <Text ml="0.8vw">
                      {feed.object?.type === "group"
                        ? "ROI"
                        : `Annotation ${index + 1}`}
                    </Text>
                  </Flex>
                  <EditTextButton
                    feed={feed}
                    handleEditClick={handleEditClick}
                    mr={2}
                  />
                </Flex>
              );
            })}
          </Flex>
        </Scrollbars>
      </Flex>
      {annotationDetails ? (
        <>
          <Flex
            overflowY="auto"
            fontSize="14px"
            direction="column"
            background="#FCFCFC"
          >
            <Box h="6px" background="#F6F6F6" w="100%" />
            <Tabs variant="unstyled" defaultIndex={0}>
              <TabList>
                <CustomTab title="Annotation Values" />
                <CustomTab
                  isDisabled={!annotationDetails?.analysedData}
                  title="Morphometry Values"
                />
              </TabList>
              <TabPanels px={0}>
                <CustomTabPanel title="Annotation Values">
                  {annotationDetails ? (
                    <>
                      <CardDetailsRow
                        title="Annotation"
                        value={
                          annotationDetails?.type ? annotationDetails.type : "-"
                        }
                      />
                      <CardDetailsRow
                        title="Description"
                        value={
                          annotationDetails?.text ? annotationDetails.text : "-"
                        }
                      />

                      {annotationDetails?.area ? (
                        <>
                          <CardDetailsRow
                            title="Centroid X"
                            value={
                              <>{annotationDetails.centroid?.[0]} &micro;m</>
                            }
                          />
                          <CardDetailsRow
                            title="Centroid Y"
                            value={
                              <>{annotationDetails.centroid?.[1]} &micro;m</>
                            }
                          />
                          <CardDetailsRow
                            title="Perimeter"
                            value={
                              <>
                                {annotationDetails.perimeter.toFixed(2)}{" "}
                                &micro;m
                              </>
                            }
                          />
                          <CardDetailsRow
                            title="Area"
                            value={
                              <>
                                {annotationDetails.area} &micro;m<sup>2</sup>
                              </>
                            }
                          />
                          <CardDetailsRow
                            title="Total Cells"
                            value={totalCells || "-"}
                          />
                        </>
                      ) : null}
                    </>
                  ) : null}
                </CustomTabPanel>
                <CustomTabPanel title="Morphometry Values">
                  {annotationDetails?.analysedData &&
                  annotationDetails.analysedData.data.length > 0 ? (
                    <Accordion allowToggle>
                      {annotationDetails.analysedData.data.map((cell) => {
                        return (
                          <AccordionItem
                            color="black"
                            isDisabled={cell.status !== "detected"}
                          >
                            <h2>
                              <AccordionButton _focus={{ outline: "none" }}>
                                <HStack
                                  flex="1"
                                  textAlign="left"
                                  align="center"
                                >
                                  <Text fontSize="14px">{cell.type}</Text>
                                  {cell.status === "detected" ? (
                                    <Circle size="12px" bg={cell.color} />
                                  ) : null}
                                </HStack>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            {cell.status === "detected" ? (
                              <AccordionPanel pb={4}>
                                {/* <CardDetailsRow
                                  title="Total Cells"
                                  value={
                                    annotationDetails.analysedData.totalCells
                                  }
                                /> */}
                                <CardDetailsRow
                                  title="Nucleus Count"
                                  value={cell.count}
                                />
                                <CardDetailsRow
                                  title="Nucleus Cytoplasm Ratio"
                                  value={cell.ratio.toFixed(2)}
                                />
                                <CardDetailsRow
                                  title="Min. Perimeter"
                                  value={
                                    <>
                                      {cell.min_perimeter.toFixed(2)} &micro;m
                                    </>
                                  }
                                />
                                <CardDetailsRow
                                  title="Max. Perimeter"
                                  value={
                                    <>
                                      {cell.max_perimeter.toFixed(2)} &micro;m
                                    </>
                                  }
                                />
                                <CardDetailsRow
                                  title="Avg. Perimeter"
                                  value={
                                    <>
                                      {cell.avg_perimeter.toFixed(2)} &micro;m
                                    </>
                                  }
                                />
                                <CardDetailsRow
                                  title="Min. Area"
                                  value={
                                    <>
                                      {cell.min_area.toFixed(2)} &micro;m
                                      <sup>2</sup>
                                    </>
                                  }
                                />
                                <CardDetailsRow
                                  title="Max. Area"
                                  value={
                                    <>
                                      {cell.max_area.toFixed(2)} &micro;m
                                      <sup>2</sup>
                                    </>
                                  }
                                />
                                <CardDetailsRow
                                  title="Avg. Area"
                                  value={
                                    <>
                                      {cell.avg_area.toFixed(2)} &micro;m
                                      <sup>2</sup>
                                    </>
                                  }
                                />
                              </AccordionPanel>
                            ) : null}
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  ) : null}
                </CustomTabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <EditText
            isOpen={isOpen}
            onClose={onClose}
            value={annotationObject?.text ? annotationObject.text : ""}
            handleClose={onClose}
            handleSave={handleSave}
          />
        </>
      ) : null}
    </Flex>
  );
};

export default ActivityFeed;
