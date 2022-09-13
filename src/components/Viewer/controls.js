import React, { useEffect, useState } from "react";
import "./zoom-levels";
import "./openseadragon-scalebar";
import { Box, HStack, VStack, Text, useToast } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axios from "axios";
import ZoomSlider from "../ZoomSlider/slider";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import FullScreen from "../Fullscreen/Fullscreen";
import { useFabricOverlayState } from "../../state/store";
import {
  addToActivityFeed,
  updateIsAnnotationLoading,
  updateActivityFeed,
  updateFeedInAnnotationFeed,
} from "../../state/actions/fabricOverlayActions";
import Loading from "../Loading/loading";
import { CustomMenu } from "../RightClickMenu/Menu";
import {
  convertToZoomValue,
  createContours,
  getFileBucketFolder,
  getViewportBounds,
  groupAnnotationAndCells,
  loadAnnotationsFromDB,
  updateAnnotationInDB,
  zoomToLevel,
  getVhutAnalysisData,
  getZoomValue,
  createAnnotationMessage,
  saveAnnotationToDB,
} from "../../utility";

const ViewerControls = ({
  viewerId,
  slideName,
  slideType,
  userInfo,
  onLoadAnnotations,
  onSaveAnnotation,
  onVhutAnalysis,
  onGetVhutAnalysis,
  onMessageListener,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow, color } = fabricOverlayState;
  const { viewer, fabricOverlay, slideId, tile } = viewerWindow[viewerId];

  const [isAnnotationLoaded, setIsAnnotationLoaded] = useState(false);
  const [isRightClickActive, setIsRightClickActive] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
  const [annotationObject, setAnnotationObject] = useState(null);
  const [isMorphometryDisabled, setIsMorphometryDisabled] = useState(true);

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

  // const handleAnalysis = () => {
  //   const canvas = fabricOverlay.fabricCanvas();

  //   // get s3 folder key from the tile
  //   const key = getFileBucketFolder(tile);

  //   // initiate analysis, sending annotation coordinates and s3 folder key
  //   const initiateAnalysis = async (body) => {
  //     try {
  //       const resp = await axios.post(
  //         "https://development-morphometry-api.prr.ai/viewport_stats",
  //         body
  //       );

  //       if (resp.status === 200 && typeof resp.data === "object") {
  //         const {
  //           roi_detected_list,
  //           avg_area,
  //           avg_perimeter,
  //           max_area,
  //           min_area,
  //           max_perimeter,
  //           min_perimeter,
  //           ratio,
  //         } = resp.data[0];

  //         const cells = createContours({
  //           canvas,
  //           contours: roi_detected_list,
  //           color,
  //           left: body.left,
  //           top: body.top,
  //         });

  //         // group enclosing annotation and cells
  //         const feedMessage = groupAnnotationAndCells({
  //           enclosingAnnotation: annotationObject,
  //           cells,
  //           optionalData: {
  //             avg_area,
  //             avg_perimeter,
  //             max_area,
  //             min_area,
  //             max_perimeter,
  //             min_perimeter,
  //             ratio,
  //             totalCells: roi_detected_list[0]?.length,
  //           },
  //         });

  //         // remove enclosing annotation
  //         // and group to canvas
  //         if (feedMessage.object) {
  //           // remove enclosing annotation and add new one to canvas
  //           canvas.remove(annotationObject);
  //           canvas.add(feedMessage.object).requestRenderAll();

  //           setFabricOverlayState(
  //             updateFeedInAnnotationFeed({ id: viewerId, feed: feedMessage })
  //           );
  //           updateAnnotationInDB({ slideId, annotation: feedMessage.object });
  //         }
  //         toast({
  //           title: "Analysis complete",
  //           status: "success",
  //           duration: 1000,
  //           isClosable: true,
  //         });
  //       } else if (resp.status === 200 && typeof resp.data === "string") {
  //         toast({
  //           title: "Analysis complete",
  //           description: "No cells detected",
  //           status: "success",
  //           duration: 1500,
  //           isClosable: true,
  //         });
  //       } else {
  //         toast({
  //           title: "Analysis failed",
  //           description: "Please try again",
  //           status: "error",
  //           duration: 1500,
  //           isClosable: true,
  //         });
  //       }
  //     } catch (err) {
  //       toast({
  //         title: "Server Unavailable",
  //         description: err.message,
  //         status: "error",
  //         duration: 1500,
  //         isClosable: true,
  //       });
  //     }
  //   };

  //   let body = { key };

  //   if (annotationObject) {
  //     const { left, top, width, height, type } = annotationObject;
  //     body = { ...body, type, left, top, width, height };

  //     // if annoatation is a freehand, send the coordinates of the path
  //     // otherwise, send the coordinates of the rectangle
  //     if (annotationObject.type === "path") {
  //       body = { ...body, path: annotationObject.path, type: "freehand" };
  //     } else if (annotationObject.type === "ellipse") {
  //       body = {
  //         ...body,
  //         cx: annotationObject.cx,
  //         cy: annotationObject.cy,
  //         rx: annotationObject.rx,
  //         ry: annotationObject.ry,
  //         type: "ellipse",
  //       };
  //     } else if (annotationObject.type === "polygon") {
  //       body = { ...body, points: annotationObject.points, type: "polygon" };
  //     }
  //   } else {
  //     const { left, top, width, height } = getViewportBounds(viewer);
  //     body = { ...body, left, top, width, height, type: "rect" };
  //   }

  //   initiateAnalysis(body);
  // };

  const handleVhutAnalysis = async () => {
    if (!fabricOverlay) return null;
    if (!annotationObject) {
      const canvas = fabricOverlay.fabricCanvas();

      const { x: left, y: top, width, height } = getViewportBounds(viewer);

      // get s3 folder key of tile
      const key = getFileBucketFolder(tile);

      // initiate analysis, sending viewport coordinates and s3 folder key
      const initiateAnalysis = async (body) => {
        axios.post(
          "https://development-morphometry-api.prr.ai/vhut/click/init",
          body
        );
        const shape = { ...body, type: "viewport" };

        const message = createAnnotationMessage({ slideId, viewer, shape });

        saveAnnotationToDB({
          slideId,
          annotation: message.object,
          onSaveAnnotation,
        });

        setFabricOverlayState(
          addToActivityFeed({ id: viewerId, feed: message })
        );
      };

      initiateAnalysis({ left, top, width, height, key, type: "rect" });
    }
    // get s3 folder key from the tile
    const key = getFileBucketFolder(tile);

    const { left, top, width, height, type } = annotationObject;
    let body = {
      key,
      type,
      left,
      top,
      width,
      height,
      hash: annotationObject.hash,
      subClaim: userInfo.subClaim,
    };

    // if annoatation is a freehand, send the coordinates of the path
    // otherwise, send the coordinates of the rectangle
    if (annotationObject.type === "path") {
      body = { ...body, path: annotationObject.path };
    } else if (annotationObject.type === "ellipse") {
      body = {
        ...body,
        cx: annotationObject.cx,
        cy: annotationObject.cy,
        rx: annotationObject.rx,
        ry: annotationObject.ry,
        type: "ellipse",
      };
    } else if (annotationObject.type === "polygon") {
      body = { ...body, points: annotationObject.points };
    }

    try {
      const resp = await onVhutAnalysis(body);

      toast({
        title: resp.data.message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Server Unavailable",
        description: err.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleShowAnalysis = async () => {
    if (!annotationObject) return;

    const canvas = fabricOverlay.fabricCanvas();

    const resp = await onGetVhutAnalysis({
      analysisId: annotationObject?.analysedROI,
    });

    if (resp.data && typeof resp.data === "object") {
      const { vhut } = resp.data;
      const { left, top } = annotationObject;
      const { analysedData, cells, totalCells } = await getVhutAnalysisData({
        canvas,
        vhut,
        left,
        top,
      });

      // group enclosing annotation and cells
      const feedMessage = groupAnnotationAndCells({
        enclosingAnnotation: annotationObject,
        cells,
        optionalData: {
          data: analysedData,
          totalCells,
        },
      });

      // remove enclosing annotation
      // and group to canvas
      if (feedMessage.object) {
        // remove enclosing annotation and add new one to canvas
        canvas.remove(annotationObject);
        canvas.add(feedMessage.object).requestRenderAll();

        setFabricOverlayState(
          updateFeedInAnnotationFeed({ id: viewerId, feed: feedMessage })
        );
      }
    }
  };

  useEffect(() => {
    setIsAnnotationLoaded(false);
  }, [slideId]);

  // load saved annotations from the server
  // once viewer is initialized
  useEffect(() => {
    if (!fabricOverlay || !onLoadAnnotations) return null;
    const canvas = fabricOverlay.fabricCanvas();

    const loadAnnotations = async () => {
      // check if the annotations is already loaded
      if (canvas.toJSON().objects.length === 0) {
        const { feed, status } = await loadAnnotationsFromDB({
          slideId,
          canvas,
          viewer,
          onLoadAnnotations,
        });

        if (status === "success") {
          if (feed)
            setFabricOverlayState(
              updateActivityFeed({ id: viewerId, fullFeed: feed })
            );
          canvas.requestRenderAll();
          toast({
            title: "Annotations loaded",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        } else {
          setFabricOverlayState(
            updateActivityFeed({ id: viewerId, fullFeed: [] })
          );
          canvas.requestRenderAll();
          toast({
            title: "Annotation load failed",
            description: "Please try again",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      }

      setIsAnnotationLoaded(true);
    };

    loadAnnotations();
  }, [fabricOverlay, slideId]);

  useEffect(() => {
    setFabricOverlayState(
      updateIsAnnotationLoading({ isLoading: !isAnnotationLoaded })
    );
  }, [isAnnotationLoaded]);

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
      // if not right click
      if (event.button !== 3) {
        setIsRightClickActive(false);
        return;
      }

      if (getZoomValue(viewer) >= 40) {
        // set annotationObject if right click is on annotation
        if (event.target) {
          setAnnotationObject(event.target);
          const zoomValue = convertToZoomValue({
            level: event.target.zoomLevel,
            viewer,
          });
          setIsMorphometryDisabled(!(zoomValue >= 40));
        } else {
          setIsMorphometryDisabled(false);
        }
      } else {
        setAnnotationObject(null);
        setIsMorphometryDisabled(true);
      }

      setMenuPosition({ left: event.pointer.x, top: event.pointer.y });
      setIsRightClickActive(true);
    };

    canvas.on("mouse:down", handleMouseDown);
    return () => {
      canvas.on("mouse:down", handleMouseDown);
    };
  }, [viewer, fabricOverlay]);

  onMessageListener()
    .then((payload) => {
      if (payload.notification) {
        const { title, body } = payload.notification;
        toast({
          title: title || "Notification",
          description: body || "",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      if (payload.data && payload.data.type === "vhut_analysis") {
        const canvas = fabricOverlay.fabricCanvas();
        const { hash, analysedROI } = payload.data;
        const annotation = canvas.getObjectByHash(hash);
        if (annotation) {
          annotation.set({ isAnalysed: true, analysedROI });
        }
      }
    })
    .catch((err) => {
      toast({
        title: "Server Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error(err);
    });

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
        onHandleVhutAnalysis={handleVhutAnalysis}
        setZoom={handleZoomLevel}
        isMorphometryDisabled={isMorphometryDisabled}
        isAnalysed={annotationObject?.isAnalysed}
        onHandleShowAnalysis={handleShowAnalysis}
      />
    </>
  );
};

export default ViewerControls;
