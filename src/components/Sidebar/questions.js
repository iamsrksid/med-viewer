import React, { useState } from "react";
import { Divider, Text, Button } from "@chakra-ui/react";
import AnswersPreview from "./answersPreview";
import Questionnaire from "../Qna/questionnaire";
import { Scrollbars } from "react-custom-scrollbars";
import "../../styles/scrollBar.css";
import _ from "lodash";
import MultiViewerQuestions from "./multiviewerQuestions";

const Questions = ({
  userInfo,
  project,
  questionnaire,
  viewerIds,
  response,
  finalSubmitHandler,
}) => {
  const [question, setQuestion] = useState("first-slide");

  return (
    <>
      {project?.type === "multiSlide" ? (
        <>
          <Button
            onClick={() => {
              setQuestion("first-slide");
            }}
            width="50%"
            borderRadius="none"
            _focus={{ outline: "none" }}
            _hover={{ bgColor: "none" }}
            bgColor={question === "first-slide" ? "#E4E5E8" : "#F8F8F5"}
            borderBottom="1px solid #000"
            h="32px"
            borderLeft="1px solid #000"
            borderRight="1px solid #000"
            fontFamily="inter"
            fontSize="14px"
            fontWeight="400"
          >
            Left-Slide
          </Button>
          <Button
            onClick={() => {
              setQuestion("second-slide");
            }}
            width="50%"
            borderRadius="none"
            _focus={{ outline: "none" }}
            _hover={{ bgColor: "none" }}
            bgColor={question === "second-slide" ? "#E4E5E8" : "#F8F8F5"}
            borderBottom="1px solid #000"
            h="32px"
            borderRight="1px solid #000"
            fontFamily="inter"
            fontSize="14px"
            fontWeight="400"
          >
            Right-Slide
          </Button>
        </>
      ) : (
        ""
      )}
      {/*  */}
      {question === "first-slide" ? (
        <>
          <Scrollbars
            style={{ width: "100%", height: "68vh" }}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical-messageBox" />
            )}
          >
            <Text mb={3} fontSize="lg">
              {project?.slideType}
            </Text>
            <Divider />
            {!response ? (
              <Text>...</Text>
            ) : (
              <>
                <Questionnaire
                  direction="column"
                  questions={questionnaire?.questions}
                  response={response}
                />
              </>
            )}
          </Scrollbars>
          {_.isEmpty(response) && (
            <AnswersPreview
              userInfo={userInfo}
              project={project}
              questionnaire={questionnaire}
              SlideId={viewerIds?.[0]._id}
              finalSubmitHandler={finalSubmitHandler}
            />
          )}
        </>
      ) : (
        <MultiViewerQuestions
          questionnaire={questionnaire}
          response={response}
        />
      )}
    </>
  );
};

export default Questions;
