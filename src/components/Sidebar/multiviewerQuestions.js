import React from "react";
import { Divider, Text } from "@chakra-ui/react";
import AnswersPreview from "./answersPreview";
import Questionnaire from "../Qna/questionnaire";
import { Scrollbars } from "react-custom-scrollbars";
import "../../styles/scrollBar.css";
import _ from "lodash";

const MultiViewerQuestions = ({ questionnaire, response }) => {
  return (
    <>
      <Scrollbars
        style={{ width: "100%", height: "68vh" }}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical-messageBox" />
        )}
      >
        <Text mb={3} fontSize="lg">
          {location.state?.slideType}
        </Text>
        <Divider />
        {isLoading ? (
          <Text>...</Text>
        ) : (
          <>
            <Questionnaire
              direction="column"
              questions={location?.state.questionnaire?.questions}
              response={response}
            />
          </>
        )}
      </Scrollbars>
      {_.isEmpty(response) && (
        <AnswersPreview
          questionnaire={questionnaire}
          SlideId={location?.state.viewerIds[1]._id}
        />
      )}
    </>
  );
};

export default MultiViewerQuestions;
