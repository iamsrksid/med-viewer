import React from "react";
import CLSReportHelper from "../CLSReport/CLSReportHelper";
import ReportHelper from "../Report/ReportHelper";

const ShowReport = ({
  viewerId,
  application,
  caseInfo,
  userInfo,
  mediaUpload,
  slideInfo,
  handleReport,
  showReport,
  setShowReport,
  saveReport,
  questions,
  app,
  setSlideId,
  responseHandler,
  questionnaireResponse,
  synopticType,
  setSynopticType,
}) => {
  if (application === "hospital")
    return (
      <ReportHelper
        caseInfo={caseInfo}
        saveReport={saveReport}
        viewerId={viewerId}
        mediaUpload={mediaUpload}
        slideInfo={slideInfo}
        handleReport={handleReport}
        showReport={showReport}
        setShowReport={setShowReport}
        userInfo={userInfo}
        synopticType={synopticType}
        setSynopticType={setSynopticType}
      />
    );

  if (application === "clinical" || application === "education")
    return (
      <CLSReportHelper
        questions={questions}
        caseInfo={caseInfo}
        userInfo={userInfo}
        responseHandler={responseHandler}
        viewerId={viewerId}
        app={app}
        setSlideId={setSlideId}
        questionnaireResponse={questionnaireResponse}
      />
    );

  return null;
};

export default ShowReport;
