import React from "react";
import ToolbarButton from "../ViewerToolbar/button";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMultiView,
  removeViewer,
  addViewer,
  updateCurrentViewer,
} from "../../reducers/viewerReducer";
import {
  getLocalUserCanvases,
  removeViewerWindow,
  addViewerWindow,
} from "../../reducers/fabricOverlayReducer";
import { BsLayoutSplit } from "react-icons/bs";
import { updateActiveFeed } from "../../reducers/feedReducer";

const MultiView = () => {
  const { isMultiView } = useSelector((state) => state.viewerState);
  const { viewerWindow } = useSelector((state) => state.fabricOverlayState);
  const dispatch = useDispatch();

  const newViewer = {
    activeUserCanvas: "",
    fabricOverlay: null,
    userCanvases: getLocalUserCanvases(),
    viewer: null,
    activityFeed: [],
    zoomValue: 0,
  };

  const handleClick = () => {
    if (isMultiView) {
      const { viewer } = viewerWindow["viewer2"];
      viewer.destroy();
      dispatch(updateCurrentViewer("viewer1"));
      dispatch(updateActiveFeed("viewer1"));
      dispatch(removeViewer("viewer2"));
      dispatch(removeViewerWindow({ id: "viewer2" }));
    } else {
      dispatch(addViewer("viewer2"));
      dispatch(addViewerWindow({ id: "viewer2", value: newViewer }));
    }
    dispatch(toggleMultiView());
  };

  const handleMultiView = () => {
    dispatch(toggleMultiView());
  };

  return (
    <ToolbarButton
      label="MultiView"
      icon={<BsLayoutSplit size={25} />}
      backgroundColor={isMultiView ? "white" : "rgba(255,255,255, 0.5)"}
      color={isMultiView ? "black" : "#3963c3"}
      onClick={handleMultiView}
    />
  );
};

export default MultiView;
