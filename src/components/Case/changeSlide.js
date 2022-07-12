import React, { useState } from "react";
import { changeTile } from "../../state/actions/fabricOverlayActions";
import { useFabricOverlayState } from "../../state/store";
import "../../styles/viewer.css";
import ChangeHelper from "./changeHelper";

const ChangeSlide = ({ caseInfo, slideUrl, viewerId, ...restProps }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { viewer, fabricOverlay } = viewerWindow[viewerId];

  const currentIndex = caseInfo.slides.findIndex(
    (s) => s.awsImageBucketUrl === slideUrl
  );

  const maxIndex = caseInfo?.slides?.length;

  const disabledLeft =
    currentIndex - 1 < 0 ||
    caseInfo.slides[currentIndex - 1].awsImageBucketUrl === "";

  const disabledRight =
    currentIndex + 1 === maxIndex ||
    caseInfo?.slides[currentIndex + 1].awsImageBucketUrl === "";

  const title = `${caseInfo?.caseName}-${currentIndex + 1}`;

  const clickHandler = (position) => {
    const nextSlide = caseInfo.slides[currentIndex + position];
    setFabricOverlayState(
      changeTile({
        id: viewerId,
        tile: nextSlide.awsImageBucketUrl,
        slideName: nextSlide.accessionId,
        slideId: nextSlide._id,
      })
    );
    viewer.open(nextSlide.awsImageBucketUrl);
    fabricOverlay.fabricCanvas().clear();
  };

  return (
    <ChangeHelper
      title={title}
      disabledLeft={disabledLeft}
      disabledRight={disabledRight}
      clickHandler={clickHandler}
      {...restProps}
    />
  );
};

export default ChangeSlide;
