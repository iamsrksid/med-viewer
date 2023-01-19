import React, { useEffect, useState } from "react";
import {
  IconButton,
  Text,
  Tooltip,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { GET_TILS_ANALYSIS } from "../../graphql/annotaionsQuery";
import axios from "axios";
import { fabric } from "openseadragon-fabricjs-overlay";
import { useFabricOverlayState } from "../../state/store";
import TooltipLabel from "../AdjustmentBar/ToolTipLabel";
import { BiTargetLock } from "react-icons/bi";
import { ImTarget } from "react-icons/im";
import IconSize from "../ViewerToolbar/IconSize";
import Environment from "../../../../environment";
import { useLazyQuery } from "@apollo/client/react";

const Til = ({ viewerId, mongoId }) => {
  const [ifScreenlessthan1536px] = useMediaQuery("(max-width:1536px)");
  const [TilHover, setTilHover] = useState(false);
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { fabricOverlay, viewer } = viewerWindow[viewerId];
  const [tilCords, setTilCords] = useState([]);
  const [tumorCords, setTumorCords] = useState([]);
  const [stromaCords, setStromaCords] = useState([]);
  const toast = useToast();
  const [getTils, { data, loading, error }] = useLazyQuery(GET_TILS_ANALYSIS);

  useEffect(() => {
    // getMongoDbId();
    // console.log(mongoId);
    if (mongoId) {
      getTils({
        variables: {
          query: {
            tilId: "63c8dfb70501db2e6ae436b0",
          },
        },
      });
    }
    setTilCords(data?.getTils?.data?.tils_cords);
    setTumorCords(data?.getTils?.data?.tumor_cords);
    setStromaCords(data?.getTils?.data?.stroma_cords);
  }, [mongoId, data]);
  // console.log(data);
  // console.log(mongoId);
  // console.log(TilHover);
  const handleTIL = () => {
    if (TilHover === false) {
      if (!fabricOverlay) {
        return toast({
          title: "Something Went Wrong",
          description: "",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
      // console.log(tilCords);
      if (tilCords || tumorCords || stromaCords) {
        // console.log(data);
        const canvas = fabricOverlay.fabricCanvas();
        const color = "#2Aff00";
        const roi = tilCords.flat(2).map((TIL_cord) => {
          // console.log(TIL_cords);
          // console.log(TIL_cord.length);
          return new fabric.Rect({
            top: TIL_cord[3],
            // bottom:TIL_cord[1],
            left: TIL_cord[0],
            // right:TIL_cord[2],
            width: TIL_cord[2] - TIL_cord[0],
            height: TIL_cord[3] - TIL_cord[1],
            stroke: "red",
            fill: "transparent",
            strokeWidth: 1,
            opacity: 1,
            strokeUniform: true,
          });
          // const points = TIL_cord.map((point) => ({
          //   x: point[0][0],
          //   y: point[0][1],
          // }));
        });
        // console.log(tumor_cords[0]);
        const roi2 = tumorCords?.map((tumor_cord) => {
          // console.log(tumor_cord);
          const points2 = tumor_cord.map((point2) => ({
            x: point2[0][0],
            y: point2[0][1],
          }));
          return new fabric.Polygon(points2, {
            stroke: `${color}83`,
            strokeWidth: 1.2,
            fill: "green",
            opacity: 0.2,
            strokeUniform: true,
          });
        });
        const roi3 = stromaCords?.map((stroma_cord) => {
          const points3 = stroma_cord.map((point3) => ({
            x: point3[0][0],
            y: point3[0][1],
          }));
          return new fabric.Polygon(points3, {
            stroke: `yellow`,
            strokeWidth: 1.2,
            fill: color ? `yellow` : "",
            opacity: 0.5,
            strokeUniform: true,
          });
        });
        const t = new fabric.Group([...roi2, ...roi, ...roi3], {
          selectable: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          hoverCursor: "auto",
          evented: false,
          stroke: "red",
          strokeWidth: 1,
          objectCaching: false,
        });
        // console.log(roi);
        canvas.add(t);
        localStorage.setItem("til", "til");
        toast({
          title: "TIL Process Done",
          description: "",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
    } else if (TilHover === true) {
      const canvas = fabricOverlay.fabricCanvas();
      canvas.clear().requestRenderAll();
      localStorage.removeItem("til", "til");
    }
  };
  return (
    <>
      <Tooltip
        label={<TooltipLabel heading="TIL" />}
        aria-label="Chat"
        placement="bottom"
        openDelay={0}
        bg="#E4E5E8"
        color="rgba(89, 89, 89, 1)"
        fontSize="14px"
        fontFamily="inter"
        hasArrow
        borderRadius="0px"
        size="20px"
      >
        <IconButton
          width={ifScreenlessthan1536px ? "30px" : "40px"}
          size={ifScreenlessthan1536px ? 60 : 0}
          height={ifScreenlessthan1536px ? "26px" : "34px"}
          icon={
            !TilHover ? (
              <BiTargetLock size={IconSize()} color="#151C25" />
            ) : (
              <ImTarget size={IconSize()} color="#3b5d7c" />
            )
          }
          _active={{
            bgColor: "rgba(228, 229, 232, 1)",
            outline: "0.5px solid rgba(0, 21, 63, 1)",
          }}
          outline={TilHover ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
          _focus={{
            border: "none",
          }}
          backgroundColor={!TilHover ? "#F8F8F5" : "#E4E5E8"}
          mr="7px"
          borderRadius={0}
          disabled={
            tilCords?.length ==0 || stromaCords?.length == 0 || tumorCords?.length == 0
              ? true
              : false
          }
          onClick={() => {
            handleTIL();
            setTilHover(!TilHover);
          }}
          _hover={{ bgColor: "rgba(228, 229, 232, 1)" }}
        />
      </Tooltip>
    </>
  );
};

export default Til;
