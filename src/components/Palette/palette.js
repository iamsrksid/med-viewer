import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveDrawerTool } from "../../reducers/drawerReducer";
import HeaderButton from "../headerButton";

const Palette = () => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);
  const isActive = activeDrawerTool === "PALETTE";
  const dispatch = useDispatch();

  const handleToolbarClick = () => {
    dispatch(updateActiveDrawerTool({ tool: isActive ? "" : "PALETTE" }));
  };

  return <HeaderButton label="Palette" />;
};

export default Palette;
