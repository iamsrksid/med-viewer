import React, { useEffect, useState } from "react";
import "./zoom-levels";
import "./openseadragon-scalebar";
import {
  Box,
  HStack,
  VStack,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { fabric } from "openseadragon-fabricjs-overlay";
import axios from "axios";
import ZoomSlider from "../ZoomSlider/slider";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import FullScreen from "../Fullscreen/Fullscreen";
import { useFabricOverlayState } from "../../state/store";
import { updateActivityFeed } from "../../state/actions/fabricOverlayActions";
import Loading from "../Loading/loading";
import { CustomMenu } from "../RightClickMenu/Menu";
import {
  addAnnotationsToCanvas,
  createContours,
  getFileBucketFolder,
  getViewportBounds,
  zoomToLevel,
} from "../../utility";

const ViewerControls = ({
  viewerId,
  slideName,
  slideType,
  userInfo,
  loadAnnotationsHandler,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow, color } = fabricOverlayState;
  const { viewer, fabricOverlay, slideId, tile } = viewerWindow[viewerId];

  const [isAnnotationLoaded, setIsAnnotationLoaded] = useState(false);
  const [isRightClickActive, setIsRightClickActive] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
  const [annotationObject, setAnnotationObject] = useState(null);

  const toast = useToast();
  const iconSize = IconSize();

  const handleZoomIn = () => {
    try {
      if (viewer.viewport.getMaxZoom() > viewer.viewport.getZoom()) {
        viewer.viewport.zoomBy(1.0 / 0.7);
      }
    } catch (err) {
      console.error("Error handling Zoom In button click", err);
    }
  };

  const handleZoomOut = () => {
    try {
      if (viewer.viewport.getMinZoom() < viewer.viewport.getZoom()) {
        viewer.viewport.zoomBy(0.7);
      }
    } catch (err) {
      console.error("Error handling Zoom Out button click", err);
    }
  };

  const handleZoomLevel = (value) => {
    zoomToLevel({ viewer, value });
  };

  const handleAnalysis = () => {
    const canvas = fabricOverlay.fabricCanvas();

    // get s3 folder key from the tile
    const key = getFileBucketFolder(tile);

    // initiate analysis, sending annotation coordinates and s3 folder key
    const initiateAnalysis = async (body) => {
      const resp = await axios.post(
        "https://development-morphometry-api.prr.ai/viewport_stats",
        body
      );

      if (resp.status === 200) {
        createContours({
          canvas,
          viewer,
          contours: resp.data[0],
          color,
          left: body.left,
          top: body.top,
        });
      }
      toast({
        title: "Analysis complete",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    };

    let body = { key };

    if (annotationObject) {
      const { left, top, width, height, type } = annotationObject;
      body = { ...body, type, left, top, width, height };

      // if annoatation is a freehand, send the coordinates of the path
      // otherwise, send the coordinates of the rectangle
      if (annotationObject.type === "path") {
        body = { ...body, path: annotationObject.path };
      }
    } else {
      const { x: left, y: top, width, height } = getViewportBounds(viewer);
      body = { ...body, left, top, width, height, type: "rect" };
    }

    initiateAnalysis(body);
  };

  useEffect(() => {
    setIsAnnotationLoaded(false);
  }, [slideId]);

  // load saved annotations from the server
  // once viewer is initialized
  useEffect(() => {
    if (!fabricOverlay || !loadAnnotationsHandler) return;
    const canvas = fabricOverlay.fabricCanvas();

    const loadAnnotations = async () => {
      // check if the annotations is already loaded
      if (canvas.toJSON().objects.length === 0) {
        const { data } = await loadAnnotationsHandler(slideId);
        if (data) {
          const feed = addAnnotationsToCanvas({
            canvas,
            viewer,
            annotations: data.annotationsAutoSave,
          });

          if (feed) {
            setFabricOverlayState(
              updateActivityFeed({ id: viewerId, fullFeed: feed })
            );
            canvas.requestRenderAll();
          }
        }
      }

      setIsAnnotationLoaded(true);
    };

    loadAnnotations();
  }, [fabricOverlay, slideId]);

  useEffect(() => {
    if (!viewer) return;
    viewer.scalebar({
      type: 1,
      pixelsPerMeter: 250000,
      minWidth: "75px",
      maxWidth: "75px",
      location: 4,
      xOffset: 5,
      yOffset: 10,
      color: "white",
      fontColor: "white",
      backgroundColor: "black",
      fontSize: "14px",
      barThickness: 2,
      stayInsideImage: false,
    });
  }, [viewer]);

  useEffect(() => {
    if (!viewer || !fabricOverlay) return null;
    const canvas = fabricOverlay.fabricCanvas();

    const handleMouseDown = (event) => {
      // hanlde right click only
      if (event.button !== 3) {
        setIsRightClickActive(false);
        return;
      }

      // set annotationObject if right click is on annotation
      if (event.target) setAnnotationObject(event.target);
      else setAnnotationObject(null);

      setMenuPosition({ left: event.pointer.x, top: event.pointer.y });
      setIsRightClickActive(true);
    };

    canvas.on("mouse:down", handleMouseDown);
    return () => {
      canvas.on("mouse:down", handleMouseDown);
    };
  }, [viewer, fabricOverlay]);

  return (
    <>
      {slideType ? (
        <Box
          position="absolute"
          left="1.01vh"
          top="0.937vw"
          zIndex="1"
          minW="7.65vw"
          minH="3.88vh"
        >
          <Box minW="7.65vw" minH="0.370vh" bgColor="#ECECEC" />

          <HStack bgColor="#F8F8F5" fontSize="1.25vw">
            <Text
              fontFamily="fira sans"
              fontWeight="500"
              px="0.820vw"
            >{`${slideName}-${slideType}`}</Text>
          </HStack>
        </Box>
      ) : null}
      {!isAnnotationLoaded ? (
        <Loading position="absolute" w="100%" zIndex="3" h="79vh" />
      ) : null}
      <VStack
        // w="fit-content"
        backgroundColor="#F8F8F5"
        border="1px solid #00153F"
        // borderRadius="5px"
        py={2}
        px={1.5}
        zIndex="1"
        position="absolute"
        right="20px"
        top="20px"
      >
        <FullScreen viewerId={viewerId} />
      </VStack>
      <VStack
        // w="fit-content"
        backgroundColor="#F8F8F5"
        border="1px solid #00153F"
        // borderRadius="5px"
        py={2}
        px={1.5}
        zIndex="1"
        position="absolute"
        right="20px"
        top="10.48vh"
      >
        <ToolbarButton
          icon={<AiOutlinePlus color="#00153F" size={iconSize} />}
          // border="1px solid #3965C6"
          backgroundColor="#E4E5E8"
          onClick={handleZoomIn}
          label="Zoom In"
          mr="0px"
          _hover={{ bgColor: "#ECECEC" }}
          _active={{
            outline: "none",
          }}
        />
        <ZoomSlider viewerId={viewerId} />
        <ToolbarButton
          icon={<AiOutlineMinus color="#00153F" size={iconSize} />}
          // border="1px solid #3965C6"
          backgroundColor="#E4E5E8"
          onClick={handleZoomOut}
          label="Zoom Out"
          mr="0px"
          _hover={{ bgColor: "#ECECEC" }}
          _active={{
            outline: "none",
          }}
        />
      </VStack>
      <CustomMenu
        isOpen={isRightClickActive}
        setIsOpen={setIsRightClickActive}
        left={menuPosition.left}
        top={menuPosition.top}
        handleAnalysis={handleAnalysis}
        setZoom={handleZoomLevel}
      />
    </>
  );
};

export default ViewerControls;
