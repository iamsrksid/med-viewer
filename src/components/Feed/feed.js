import React from "react";
import PropTypes from "prop-types";
import { FaClipboardList } from "react-icons/fa";
import ToolbarButton from "../ViewerToolbar/button";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveDrawerTool } from "../../reducers/drawerReducer";
import HeaderButton from "../headerButton";

const SlideFeed = () => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const isActive = activeDrawerTool === "FEED";
  const dispatch = useDispatch();

  const handleToolbarClick = () => {
    dispatch(updateActiveDrawerTool({ tool: isActive ? "" : "FEED" }));
  };

  return <HeaderButton label="Active Feed" />;
};

export default SlideFeed;
