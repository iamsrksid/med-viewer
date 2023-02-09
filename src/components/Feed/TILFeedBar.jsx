import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Flex,
  useMediaQuery,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { GrFormClose } from "react-icons/gr";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";
import { widths } from "../Draw/width";
import {
  createAnnotationMessage,
  getScaleFactor,
  saveAnnotationToDB,
} from "../../utility";

import {
  addToActivityFeed,
  updateTool,
} from "../../state/actions/fabricOverlayActions";

const getDrawCursor = (brushSize, brushColor) => {
  brushSize = brushSize < 4 ? 8 : brushSize * 3;
  const circle = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushSize}" 
			/>
		</svg>
	`;

  return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

const createFreeDrawingCursor = (brushWidth, brushColor) => {
  return `url(${getDrawCursor(brushWidth, brushColor)}) ${brushWidth / 2} ${
    brushWidth / 2
  }, crosshair`;
};

const TILFeedBar = ({
  viewerId,
  handleFeedBarClose,
  showReport,
  hideTumor,
  synopticType,
  caseInfo,
  setHideTumor,
  setHideLymphocyte,
  hideLymphocyte,
  setHideStroma,
  hideStroma,
}) => {
  const [ifScreenlessthan1536px] = useMediaQuery("(max-width:1536px)");
  const [visibleTumor, setVisibleTumor] = useState(true);
  const [visibleStroma, setVisibleStroma] = useState(true);
  const [visibleLymphocyte, setVisibleLymphocyte] = useState(true);
  const [editTumor, setEditTumor] = useState(true);
  const [editStroma, setEditStroma] = useState(true);
  const [editLymphocyte, setEditLymphocyte] = useState(true);
  const [contours, setContours] = useState("");
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();

  const { viewerWindow, isViewportAnalysing, color, activeTool } =
    fabricOverlayState;
  const { viewer, fabricOverlay, slideId, originalFileUrl } =
    viewerWindow[viewerId];
  const isActive = activeTool === "TILDRAW";

  const [path, setPath] = useState(null);

  const [myState, setState] = useState({
    width: widths[0],
    isActive: false,
  });
  const myStateRef = useRef(myState.isActive);
  const setMyState = (data) => {
    myStateRef.current = data;
    setState((state) => ({ ...state, isActive: data }));
  };

  useEffect(() => {
    setMyState(isActive);
  }, [isActive]);

  // useEffect(()=>{
  //   if (!fabricOverlay) return;
  //   handleDrawStroma()
  // },[editStroma]);

  // const handleDrawStroma =()=>{
  //   viewer.setMouseNavEnabled(false);
  //   viewer.outerTracker.setTracking(false);
  //   // console.log("object from draw");
  //     const canvas = fabricOverlay.fabricCanvas();
  //     const pathCreated = (event) => {
  //       canvas.selection = false;
  //       setPath(event.path);
  //     };

  //     function handleMouseDown(event) {
  //       canvas.selection = false;
  //       viewer.setMouseNavEnabled(false);
  //       viewer.outerTracker.setTracking(false);
  //     }
  //     // viewer.setMouseNavEnabled(true);
  //     // viewer.outerTracker.setTracking(true);

  //     const brushWidth = myState.width.pixelWidth;
  //     if(editTumor === true){

  //     // EXAMPLE: of using an image for cursor
  //     // https://i.stack.imgur.com/fp7eL.png
  //     // canvas.freeDrawingCursor = `url(${logo}) 0 50, auto`;
  //    canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, "yellow");

  //     canvas.on("mouse:down", handleMouseDown);
  //     canvas.on("path:created", pathCreated);
  //   }

  //   if(editStroma === false){
  //     // canvas.off("mouse:down", handleMouseDown);
  //     // canvas.off("path:created", pathCreated);
  //     // // Disable Fabric drawing; enable OSD mouseclicks
  //     // viewer.setMouseNavEnabled(true);
  //     // viewer.outerTracker.setTracking(true);
  //     // canvas.isDrawingMode = false;
  //     // canvas.freeDrawingCursor = "";
  //     }
  //   // if(editStroma === true){

  //   //   const scaleFactor = getScaleFactor(viewer);
  //   //   canvas.isDrawingMode = true;
  //   //   canvas.selection = true;
  //   //   canvas.freeDrawingBrush.color = "yellow";
  //   //   canvas.freeDrawingBrush.width = brushWidth / scaleFactor;
  //   //   canvas.renderAll();
  //   //   // canvas.off("mouse:down", handleMouseDown);
  //   //   // canvas.off("path:created", pathCreated);
  //   //   // Disable Fabric drawing; enable OSD mouseclicks
  //   //   }
  //   }

  useEffect(() => {
    if (!fabricOverlay || !isActive) return;
    const canvas = fabricOverlay.fabricCanvas();
    const pathCreated = (event) => {
      canvas.selection = false;
      setPathStroma(event.path);
    };
    function handleMouseDown(event) {
      canvas.selection = false;
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    }

    const brushWidth = myState.width.pixelWidth;
    const scaleFactor = getScaleFactor(viewer);
    canvas.isDrawingMode = true;
    canvas.selection = true;
    canvas.freeDrawingBrush.color = "yellow";
    canvas.freeDrawingBrush.width = brushWidth / scaleFactor;
    canvas.renderAll();
    console.log("new changes");

    canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, "yellow");
    canvas.on("mouse:down", handleMouseDown);
    canvas.on("path:created", pathCreated);

    // Remove handler
    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("path:created", pathCreated);
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
      canvas.isDrawingMode = false;
      canvas.freeDrawingCursor = "";
    };
  }, [isActive]);

  useEffect(() => {
    // Update brush color and size with Fabric
    if (!fabricOverlay || !isActive) return;
    const canvas = fabricOverlay.fabricCanvas();
    const brushWidth = myState.width.pixelWidth;
    const scaleFactor = getScaleFactor(viewer);
    canvas.freeDrawingBrush.color = "yellow";
    canvas.freeDrawingBrush.width = brushWidth / scaleFactor;
    canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, "yellow");
  }, [color, myState.width]);

  useEffect(() => {
    viewer.setMouseNavEnabled(true);
    viewer.outerTracker.setTracking(true);
    if (path) {
      path.fill = "yellow";
      path.opacity = "0.5";
      path.selectable = "false";
    }
  }, [path]);

  const handleDrawStroma = () => {
    setEditStroma(!editStroma);
    if (editStroma === true) {
      setFabricOverlayState(updateTool({ tool: "TILDRAW" }));
    } else {
      setFabricOverlayState(updateTool({ tool: "Move" }));
    }
  };

  return (
    <Box
      w="15.88vw"
      minW="300px"
      position="fixed"
      right={showReport ? "33.281vw" : synopticType !== "" ? "40vw" : "0"}
      zIndex={2}
      // borderLeft="1px solid gray"
      background="#FCFCFC"
      height="90%"
    >
      <Flex
        py="0.5px"
        justifyContent="space-between"
        alignItems="center"
        background="#F6F6F6"
        // background="red"
        height="50px"
        borderBottom="1px solid #DEDEDE"
      >
        <Tooltip hasArrow label="sss">
          <Text
            fontSize="14px"
            css={{
              fontWeight: "900",
            }}
          >
            Slide Id : {caseInfo._id}
          </Text>
        </Tooltip>
        <Flex
          py="0.5px"
          justifyContent="flex-end"
          alignItems="center"
          background="#F6F6F6"
        >
          <GrFormClose
            size={16}
            cursor="pointer"
            onClick={() => {
              handleFeedBarClose();
              closeAllEdit();
              setHideLymphocyte(false);
              setHideStroma(false);
              setHideTumor(false);
            }}
            _hover={{ cursor: "pointer" }}
          />
        </Flex>
      </Flex>
      <Box>
        <Text mb="25px" w="100%" textAlign="center" bg="gray.100">
          TIL Details
        </Text>
        <Flex
          py="5px"
          px="5px"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid black"
        >
          <Flex justifyContent="center" alignItems="center">
            <BsFillCircleFill size="10px" color="#9f9"></BsFillCircleFill>
            <Text marginLeft="5px">Tumor</Text>
          </Flex>
          <Flex>
            <IconButton
              width={ifScreenlessthan1536px ? "30px" : "40px"}
              size={ifScreenlessthan1536px ? 60 : 0}
              height={ifScreenlessthan1536px ? "26px" : "34px"}
              icon={
                !visibleTumor ? (
                  <BsEyeSlash size={IconSize()} color="#151C25" />
                ) : (
                  <BsEye size={IconSize()} color="#3b5d7c" />
                )
              }
              _active={{
                bgColor: "none",
                outline: "none",
              }}
              _focus={{
                border: "none",
              }}
              _hover={{ bgColor: "none" }}
              backgroundColor="white"
              mr="7px"
              borderRadius={0}
              onClick={() => {
                setHideTumor(!hideTumor);
                setHideStroma(false);
                setHideLymphocyte(false);
                // console.log(hideTumor);
                setVisibleTumor(!visibleTumor);
                setVisibleStroma(true);
                setVisibleLymphocyte(true);
              }}
            />
            <IconButton
              width={ifScreenlessthan1536px ? "30px" : "40px"}
              size={ifScreenlessthan1536px ? 60 : 0}
              height={ifScreenlessthan1536px ? "26px" : "34px"}
              icon={
                !editTumor ? (
                  <MdEdit size={IconSize()} color="#151C25" />
                ) : (
                  <MdOutlineModeEditOutline size={IconSize()} color="#3b5d7c" />
                )
              }
              _active={{
                bgColor: "none",
                outline: "none",
              }}
              outline="none"
              _focus={{
                border: "none",
              }}
              backgroundColor="white"
              mr="7px"
              borderRadius={0}
              onClick={() => {
                // handleTIL();
                setEditTumor(!editTumor);
              }}
              _hover={{ bgColor: "none" }}
            />
          </Flex>
        </Flex>
        {/* stroma */}
        <Flex
          py="5px"
          px="5px"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid black"
        >
          <Flex justifyContent="center" alignItems="center">
            <BsFillCircleFill size="10px" color="yellow"></BsFillCircleFill>
            <Text marginLeft="5px">Stroma</Text>
          </Flex>
          <Flex>
            <IconButton
              width={ifScreenlessthan1536px ? "30px" : "40px"}
              size={ifScreenlessthan1536px ? 60 : 0}
              height={ifScreenlessthan1536px ? "26px" : "34px"}
              icon={
                !visibleStroma ? (
                  <BsEyeSlash size={IconSize()} color="#151C25" />
                ) : (
                  <BsEye size={IconSize()} color="#3b5d7c" />
                )
              }
              _active={{
                bgColor: "none",
                outline: "none",
              }}
              _focus={{
                border: "none",
              }}
              _hover={{ bgColor: "none" }}
              backgroundColor="white"
              mr="7px"
              borderRadius={0}
              onClick={() => {
                setHideStroma(!hideStroma);
                setHideLymphocyte(false);
                setHideTumor(false);
                setVisibleStroma(!visibleStroma);
                setVisibleLymphocyte(true);
                setVisibleTumor(true);
              }}
            />
            <IconButton
              width={ifScreenlessthan1536px ? "30px" : "40px"}
              size={ifScreenlessthan1536px ? 60 : 0}
              height={ifScreenlessthan1536px ? "26px" : "34px"}
              icon={
                !editStroma ? (
                  <MdEdit size={IconSize()} color="#151C25" />
                ) : (
                  <MdOutlineModeEditOutline size={IconSize()} color="#3b5d7c" />
                )
              }
              _active={{
                bgColor: "none",
                outline: "none",
              }}
              outline="none"
              _focus={{
                border: "none",
              }}
              backgroundColor="white"
              mr="7px"
              borderRadius={0}
              onClick={() => {
                // handleTIL();
                handleDrawStroma();
              }}
              _hover={{ bgColor: "none" }}
            />
          </Flex>
        </Flex>
        {/* lymphocyte */}
        <Flex
          py="5px"
          px="5px"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid black"
        >
          <Flex justifyContent="center" alignItems="center">
            <BsFillCircleFill size="10px" color="red"></BsFillCircleFill>
            <Text marginLeft="5px">Lymphocyte</Text>
          </Flex>
          <Flex>
            <IconButton
              width={ifScreenlessthan1536px ? "30px" : "40px"}
              size={ifScreenlessthan1536px ? 60 : 0}
              height={ifScreenlessthan1536px ? "26px" : "34px"}
              icon={
                !visibleLymphocyte ? (
                  <BsEyeSlash size={IconSize()} color="#151C25" />
                ) : (
                  <BsEye size={IconSize()} color="#3b5d7c" />
                )
              }
              _active={{
                bgColor: "none",
                outline: "none",
              }}
              _focus={{
                border: "none",
              }}
              _hover={{ bgColor: "none" }}
              backgroundColor="white"
              mr="7px"
              borderRadius={0}
              onClick={() => {
                setHideLymphocyte(!hideLymphocyte);
                setHideStroma(false);
                setHideTumor(false);
                setVisibleLymphocyte(!visibleLymphocyte);
                setVisibleTumor(true);
                setVisibleStroma(true);
              }}
            />
            <IconButton
              width={ifScreenlessthan1536px ? "30px" : "40px"}
              size={ifScreenlessthan1536px ? 60 : 0}
              height={ifScreenlessthan1536px ? "26px" : "34px"}
              icon={
                !editLymphocyte ? (
                  <MdEdit size={IconSize()} color="#151C25" />
                ) : (
                  <MdOutlineModeEditOutline size={IconSize()} color="#3b5d7c" />
                )
              }
              _active={{
                bgColor: "none",
                outline: "none",
              }}
              outline="none"
              _focus={{
                border: "none",
              }}
              backgroundColor="white"
              mr="7px"
              borderRadius={0}
              onClick={() => {
                // handleTIL();
                setEditLymphocyte(!editLymphocyte);
              }}
              _hover={{ bgColor: "none" }}
            />
          </Flex>
        </Flex>
      </Box>

      <Box mt="45px" w="100%">
        <Text bg="gray.100" mb="35px" w="100%" textAlign="center">
          TIL Values
        </Text>
        <Box borderBottom="1px solid gray" mb="10px" py="3px">
          <Text fontSize="15px">TIL Score : </Text>
        </Box>
        <Box borderBottom="1px solid gray" mb="10px" py="3px">
          <Text fontSize="15px">TIL Formula :</Text>
          <Text as="span" fontSize="15px">
            (lymphocyte area / stroma area) * 100{" "}
          </Text>
        </Box>
        <Box borderBottom="1px solid gray" mb="10px" py="3px">
          <Text fontSize="15px">Tumor Area :</Text>
        </Box>
        <Box borderBottom="1px solid gray" mb="10px" py="3px">
          <Text fontSize="15px">Stroma Area :</Text>
        </Box>
        <Box borderBottom="1px solid gray" mb="10px" py="3px">
          <Text fontSize="15px">Lymphocytes :</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TILFeedBar;
