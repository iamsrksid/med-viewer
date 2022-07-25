import React, { useEffect, useState } from "react";
import "./zoom-levels";
import "./openseadragon-scalebar";
import { Box, HStack, VStack, Text, Center } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { fabric } from "openseadragon-fabricjs-overlay";
import ZoomSlider from "../ZoomSlider/slider";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import FullScreen from "../Fullscreen/Fullscreen";
import { useFabricOverlayState } from "../../state/store";
import { getTimestamp, getCanvasImage } from "../../utility/utility";
import { updateActivityFeed } from "../../state/actions/fabricOverlayActions";
import Loading from "../Loading/loading";
import { CustomMenu } from "../RightClickMenu/Menu";

const ViewerControls = ({
  viewerId,
  slideName,
  slideType,
  userInfo,
  loadAnnotationsHandler,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewer, fabricOverlay, slideId } =
    fabricOverlayState.viewerWindow[viewerId];
  const iconSize = IconSize();
  const [rightClickZoomValue, setRightClickZoomValue] = useState(1);
  const [isAnnotationLoaded, setIsAnnotationLoaded] = useState(false);
  const [isRightClickActive, setIsRightClickActive] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

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
    const level = value * (viewer.viewport.getMaxZoom() / 40);
    viewer.viewport.zoomTo(level);
  };

  useEffect(() => {
    setIsAnnotationLoaded(false);
  }, [slideId]);

  useEffect(() => {
    handleZoomLevel(rightClickZoomValue);
  }, [rightClickZoomValue]);

  // load saved annotations from the server
  // once viewer is initialized
  useEffect(() => {
    if (!fabricOverlay || !loadAnnotationsHandler) return;
    const canvas = fabricOverlay.fabricCanvas();
    const feed = [];

    // add annotation to the activity feed
    const addToFeed = async (shape, annotation) => {
      const message = {
        username: `${userInfo.firstName} ${userInfo.lastName}`,
        object: shape,
        image: null,
      };

      const {
        hash,
        text,
        zoomLevel,
        points,
        timeStamp,
        area,
        perimeter,
        cnetroid,
        endPoints,
        isAnalysed,
      } = annotation;

      message.object.set({
        hash,
        text,
        zoomLevel,
        points,
        timeStamp,
        area,
        perimeter,
        cnetroid,
        endPoints,
        isAnalysed,
      });

      feed.push(message);
    };

    // create annotation from the annotation data
    const createAnnotation = (annotation) => {
      let shape;
      switch (annotation.type) {
        case "ellipse":
          shape = new fabric.Ellipse({
            left: annotation.left,
            top: annotation.top,
            width: annotation.width,
            height: annotation.height,
            color: annotation.color,
            fill: annotation.fill,
            stroke: annotation.stroke,
            strokeWidth: annotation.strokeWidth,
            strokeUniform: annotation.strokeUniform,
            rx: annotation.rx,
            ry: annotation.ry,
            angle: annotation.angle,
          });
          break;

        case "rect":
          shape = new fabric.Rect({
            left: annotation.left,
            top: annotation.top,
            width: annotation.width,
            height: annotation.height,
            color: annotation.color,
            fill: annotation.fill,
            stroke: annotation.stroke,
            strokeWidth: annotation.strokeWidth,
            strokeUniform: annotation.strokeUniform,
          });
          break;

        case "polygon":
          shape = new fabric.Polygon(annotation.points, {
            stroke: annotation.stroke,
            strokeWidth: annotation.strokeWidth,
            fill: annotation.fill,
            strokeUniform: annotation.strokeUniform,
          });
          break;

        case "path":
          shape = new fabric.Path(annotation.path, {
            color: annotation.color,
            stroke: annotation.stroke,
            strokeWidth: annotation.strokeWidth,
            strokeUniform: annotation.strokeUniform,
            fill: annotation.fill,
          });
          break;

        case "line":
          shape = new fabric.Line(annotation.points, {
            color: annotation.color,
            stroke: annotation.stroke,
            strokeWidth: annotation.strokeWidth,
            strokeUniform: annotation.strokeUniform,
            fill: annotation.fill,
          });
          break;

        default:
          return;
      }

      // add shape to canvas and to activity feed
      canvas.add(shape);
      addToFeed(shape, annotation);
    };

    const loadAnnotations = async () => {
      // remove render on each add annotation
      const originalRender = canvas.renderOnAddRemove;
      canvas.renderOnAddRemove = false;

      const { data } = await loadAnnotationsHandler(slideId);
      if (data) {
        data.annotationsAutoSave.forEach((annotation) => {
          createAnnotation(annotation);
        });
      }

      // restore render on each add annotation
      canvas.renderOnAddRemove = originalRender;
      canvas.requestRenderAll();
      viewer.viewport.zoomBy(1.01);

      setFabricOverlayState(
        updateActivityFeed({ id: viewerId, fullFeed: feed })
      );
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
      setMenuPosition({ left: event.pointer.x + 10, top: event.pointer.y });
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
        <ZoomSlider
          viewerId={viewerId}
          rightClickZoomValue={rightClickZoomValue}
        />
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
        isActive={isRightClickActive}
        left={menuPosition.left}
        top={menuPosition.top}
        setZoom={setRightClickZoomValue}
      />
    </>
  );
};

export default ViewerControls;
