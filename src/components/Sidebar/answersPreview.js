import React, { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BsCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { resetResponse } from "../../reducers/slideQnaReducer";
import { useDispatch, useSelector } from "react-redux";
import { getSlideUrl } from "../../utility/utility";
import _ from "lodash";

const AnswersPreview = ({
  userInfo,
  project,
  questionnaire,
  tile,
  SlideId,
  finalSubmitHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { response, qna } = useSelector((state) => state.slideQnaState);
  const { currentViewer } = useSelector((state) => state.viewerState);
  const dispatch = useDispatch();
  const url = getSlideUrl(tile);

  useEffect(() => {
    return () => {
      dispatch(resetResponse());
    };
  }, []);

  return (
    <>
      <Box bgColor="rgba(236, 236, 236, 1)">
        {userInfo?.subClaim !== project?.owner.subClaim ? (
          <Button
            my={5}
            backgroundColor="#00153F"
            h="32px"
            borderRadius={0}
            width="10em"
            color="white"
            fontWeight="500"
            fontSize="16px"
            fontFamily="inter"
            ml="20px"
            _hover={{ bg: "#2166fc" }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Submit
          </Button>
        ) : null}
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        size="3xl"
        width="70%"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogContent borderRadius="10px">
          <AlertDialogHeader
            backgroundColor="rgba(236, 236, 236, 1)"
            color="black"
            padding="5px"
            borderTopRadius="10px"
          >
            <Text marginLeft="1em" size="sm">
              Preview
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody space={2} paddingTop="2em" paddingBottom="1em">
            <HStack>
              <Flex
                direction="column"
                backgroundColor="rgba(236, 236, 236, 1)"
                color="black"
                borderRadius="3px"
                padding="1em"
                textAlign="left"
                fontFamily="inter"
                fontSize="16px"
                width="50%"
              >
                {questionnaire?.questions.map((question, index) => (
                  <Box key={question._id}>
                    <Text>{`Q${index + 1} ${question.questionText}`}</Text>
                    <Text marginTop="0.5em" marginLeft="2em">
                      <Icon
                        as={
                          qna[question._id]
                            ? BsCheckSquareFill
                            : BsFillXSquareFill
                        }
                        marginRight={1}
                        color={qna[question._id] ? "#3965C6" : "red.400"}
                        w={3}
                        h={3}
                      />
                      {qna[question._id]
                        ? typeof qna[question._id] === "string"
                          ? qna[question._id]
                          : qna[question._id].join(", ")
                        : "Required Field"}
                    </Text>
                  </Box>
                ))}
              </Flex>
              <Spacer />
              <Flex width="50%" direction="column">
                <Text
                  fontSize="16px"
                  fontFamily="inter"
                  fontWeight="500"
                  color="black"
                >
                  Are you sure you want to submit the answers?
                </Text>
                <Image
                  marginY="1em"
                  height="10em"
                  width="18em"
                  src={url}
                  marginTop="10px"
                />
                <Text fontSize="16px" fontFamily="inter" color="black">
                  {project?.slideType} Slides
                </Text>
                <Text fontSize="20px" fontFamily="inter" color="black">
                  {project?.name}
                </Text>
                <Text
                  fontSize="14px"
                  color="rgba(0, 0, 0, 0.4)"
                  marginBottom="1em"
                >
                  {SlideId}
                </Text>
                <HStack>
                  <Button
                    variant="solid"
                    width="10em"
                    color="#00153F"
                    backgroundColor="#ECECEC10"
                    border="1px solid #00153F"
                    borderRadius={0}
                    _hover={{
                      backgroundColor: "#ECECEC30",
                    }}
                    onClick={() => onClose()}
                    fontSize="16px"
                    fontFamily="inter"
                    fontWeight="bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    width="10em"
                    color="white"
                    backgroundColor="#00153F"
                    borderRadius={0}
                    onClick={() => finalSubmitHandler(response, SlideId)}
                    disabled={
                      questionnaire?.questions.length !==
                      _.keys(response).length
                    }
                    _hover={{
                      backgroundColor: "#00153F90",
                    }}
                    fontSize="16px"
                    fontFamily="inter"
                    fontWeight="bold"
                  >
                    Save & Next
                  </Button>
                </HStack>
              </Flex>
            </HStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AnswersPreview;
