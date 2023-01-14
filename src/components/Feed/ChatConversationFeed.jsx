import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { Mention, MentionsInput } from "react-mentions";
import {
  Flex,
  Text,
  Button,
  Box,
  Avatar,
  Input,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
import {
  CHAT_SUBSCRIPTION,
  FETCH_CONVERSATION,
  SEND_MESSAGE,
} from "../../state/graphql/ChatQuery";
import ScrollBar from "../others/ScrollBar";

const formats = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD/MM/YYYY",
};
const DateSeperatorComponent = ({ messageSepratorDate }) => {
  return (
    <Text
      my="10px"
      alignSelf="center"
      fontSize="12px"
      fontWeight="500"
      color="#52585D"
    >
      {moment(messageSepratorDate).calendar(new Date(), formats)}
    </Text>
  );
};
const RightMessageComponent = ({ data }) => {
  console.log(data.payload.body[4]);
  return (
    <Box
      key={uuidv4()}
      p="14px 19px"
      bg="#D9D9D9"
      alignSelf="flex-end"
      maxW="506px"
      borderRadius="14px 0px 14px 14px"
    >
      <Text color="#52585D" fontSize="12px">
        {data.payload.body}
      </Text>
      <Text color="#212224" fontSize="10px" textAlign="right">
        {/* {data.sendAt.fromNow()} */}
        {moment(data.createdAt).format("HH:mm")}
      </Text>
    </Box>
  );
};

const LeftMessageComponent = ({ data }) => {
  return (
    <Flex>
      <Avatar
        h="36px"
        w="36px"
        size="sm"
        // name={data?.fromName}
        // color="#fff"
        // src="https://wallpapers.com/images/hd/cool-profile-pictures-red-anime-fw4wgkj905tjeujb.jpg"
        bg="#3B5D7C"
        marginTop="-3px"
        // icon={<AiOutlineUser fontSize="1.5rem" />}
      />
      <Box
        key={uuidv4()}
        p="14px 19px"
        bg="rgba(140, 179, 255, 0.1)"
        alignSelf="flex-start"
        maxW="506px"
        borderRadius=" 0px 14px 14px 14px"
      >
        {/* {index === 0 && <Text marginTop="-10px">user </Text>} */}
        <Text marginTop="-10px" fontSize="14px" textTransform="capitalize">
          {data.fromName}{" "}
        </Text>
        <Text color="#52585D" fontSize="12px">
          {data.payload.body}
        </Text>

        <Text textAlign="right" fontSize="10px" color="#6588DE">
          {moment(data.createdAt).format("HH:mm")}
        </Text>
      </Box>
    </Flex>
  );
};

const ChatConversationFeed = ({
  userInfo,
  groupChatId,
  application,
  app,
  users,
  mentionUsers,
}) => {
  let lastDate = "1999-01-01";
  // console.log(userInfo);
  const [groupMessages, setGroupMessages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const messageRef = useRef(null);
  const bottomRef = useRef(null);
  const [messageInput, setMessageInput] = useState({
    mentionedText: "",
    text: "",
    mentionedUsers: [],
  });
  // console.log(value);
  const [
    fetchMessages,
    { loading: isConversationLoading, data: msgData, error },
  ] = useLazyQuery(FETCH_CONVERSATION);

  useEffect(() => {
    if (msgData && msgData.readChat.success) {
      const totalPages = msgData.readChat?.meta?.totalPages;
      if (totalPages) {
        setTotalPage(totalPages);
      }
      // const receivedData = msgData.readChat.data.map((obj: any) => {
      // 	return { ...obj };
      // });
      // const sortedDesc: any = receivedData.sort(
      // 	(objA: any, objB: any) =>
      // 		objA.createdAt.getTime() - objB.createdAt.getTime()
      // );

      if (pageNumber === 1) setGroupMessages(msgData.readChat.data.reverse());
      else {
        const newData = [...msgData.readChat.data];
        setGroupMessages(newData.reverse().concat(groupMessages));
      }
    }
  }, [msgData]);

  useEffect(() => {
    if (pageNumber > 1) {
      fetchMessages({
        variables: {
          query: {
            filter: {
              toId: groupChatId,
            },
            paginate: {
              limit: 25,
              pageNumber,
            },
          },
        },
      });
    }
  }, [pageNumber]);

  useEffect(() => {
    setGroupMessages([]);

    fetchMessages({
      variables: {
        query: {
          filter: {
            toId: groupChatId,
          },
          paginate: {
            limit: 25,
            pageNumber: 1,
          },
        },
      },
      fetchPolicy: "no-cache",
    });
    setPageNumber(1);
    setTotalPage(1);
  }, [groupChatId]);

  const applicationName = `${application}`;

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    if (pageNumber === 1) bottomRef.current?.scrollIntoView();
  }, [groupMessages]);
  const [sendNewMessage, { error: newMessageError }] =
    useMutation(SEND_MESSAGE);
  // console.log(messageRef?.current?.value);
  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = messageInput.text.trim();
    if (!newMessage) return;
    setGroupMessages([
      ...groupMessages,
      {
        from: userInfo?._id,
        createdAt: moment(),
        payload: { body: newMessage },
      },
    ]);

    e.target.reset();
    setMessageInput({
      mentionedText: "",
      text: "",
      mentionedUsers: [],
    });
    const { data } = await sendNewMessage({
      variables: {
        body: {
          app: applicationName,
          from: userInfo?._id,
          isDeleted: false,
          payload: {
            body: newMessage,
            types: "message",
          },
          to: groupChatId,
          toName: "",
          fromImage: "",
          fromName: `${userInfo.firstName}`,
          mentionedUsers: messageInput.mentionedUsers,
        },
      },
    });
  };

  // const handleScroll: any = (e: any) => {
  // 	if (isConversationLoading) return;
  // 	const element = e.target;
  // 	if (element.scrollTop === 0) {
  // 		// setIsMessageLoading(true);
  // 		setPageNumber(pageNumber + 1);
  // 	}
  // 	// else if (
  // 	// 	element.scrollTop + element.clientHeight >=
  // 	// 	element.scrollHeight
  // 	// ) {
  // 	// 	setPageNumber(1);
  // 	// }

  // 	// const height = element.scrollHeight - element.clientHeight;
  // 	// const percent = (element.scrollTop / height) * 100;
  // 	// console.log("percent", percent);
  // 	// if (percent <= 30) setIsMessageLoading(true);
  // 	// console.log(
  // 	// 	"percent Processing",
  // 	// 	element.scrollHeight,
  // 	// 	element.clientHeight,
  // 	// 	element.scrollTop + element.clientHeight
  // 	// );
  // };

  const { data: subscribedMessageData } = useSubscription(CHAT_SUBSCRIPTION, {
    variables: {
      toId: groupChatId,
      fromId: userInfo?._id,
    },
  });

  useEffect(() => {
    if (subscribedMessageData) {
      const newMessages = [
        ...groupMessages,
        subscribedMessageData.newChat.data,
      ];

      setGroupMessages(newMessages);
    }
  }, [subscribedMessageData]);
  if (isConversationLoading)
    return (
      <Spinner
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
      />
    );
  const fetchUsers = (query, callback) => {
    if (!query) return;

    setTimeout(() => {
      const filteredUsers = users.filter((user) =>
        user.display.toLowerCase().includes(query)
      );
      callback(filteredUsers);
    }, 2000);
  };

  const handleInputChange = (e, mentionedText, text, mentions) => {
    const mentionedUsers = mentions.map((mention) => ({
      toId: mention.id,
      toName: mention.display,
    }));
    setMessageInput({
      mentionedText,
      text,
      mentionedUsers,
    });
  };
  return (
    <>
      <ScrollBar>
        <Box id="message" h="100%" paddingTop="40px" px="22px">
          {isConversationLoading && pageNumber > 1 ? (
            <Spinner />
          ) : (
            pageNumber < totalPage && (
              <Flex
                justifyContent="center"
                marginTop="-30px"
                marginBottom="10px"
              >
                <Text
                  cursor="pointer"
                  fontSize="12px"
                  onClick={() => setPageNumber(pageNumber + 1)}
                >
                  Click to load more
                </Text>
              </Flex>
            )
          )}
          {groupMessages.length === 0 && (
            <Flex
              h="100%"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
              gap="0.5rem"
            >
              <Text fontSize="20px" fontWeight="700">
                You&apos;re starting a new conversation
              </Text>
              <Text fontSize="14px">Type your first message below</Text>
            </Flex>
          )}
          <Flex flexDir="column" gap="1rem">
            {/* {groupMessages.length > 0 && (
						<Text
							my="10px"
							alignSelf="center"
							fontSize="12px"
							fontWeight="500"
							color="#52585D"
						>
							{moment().calendar(new Date(), formats)}
						</Text>
					)} */}

            {groupMessages.map((data) => {
              if (lastDate !== moment(data.createdAt).format("MM-DD-YYYY")) {
                lastDate = moment(data.createdAt).format("MM-DD-YYYY");

                return (
                  <>
                    <DateSeperatorComponent
                      messageSepratorDate={data.createdAt}
                    />
                    {data.from === userInfo._id ? (
                      <RightMessageComponent data={data} key={uuidv4()} />
                    ) : (
                      <LeftMessageComponent data={data} key={uuidv4()} />
                    )}
                  </>
                );
              }

              return data.from === userInfo._id ? (
                <RightMessageComponent data={data} key={uuidv4()} />
              ) : (
                <LeftMessageComponent data={data} key={uuidv4()} />
              );
            })}

            <Box ref={bottomRef} />
          </Flex>
        </Box>
      </ScrollBar>

      <Box
        marginTop="auto"
        display="flex"
        h="40px"
        // border="1px solid rgba(150, 169, 186, 0.7)"
        marginLeft="0px!important"
        mr="10px"
        paddingLeft="12px"
        marginBottom="12px"
      >
        {/* <Flex
					gap="1rem"
					alignItems="center"
					fontSize="20px"
					h="100%"
					color="#3b5d7c"
				>
					<RiAttachment2 />
					<MdOutlineKeyboardVoice />
				</Flex> */}
        <form style={{ display: "flex", width: "100%" }} onSubmit={sendMessage}>
          {/* <Input
            ref={messageRef}
            type="text"
            placeholder="Type message here"
            outline="none"
            border="none"
            h="100%"
            onChange={(e) => setValue(e.target.value)}
          /> */}
          <MentionsInput
            singleLine
            forceSuggestionsAboveCursor
            allowSuggestionsAboveCursor
            appendSpaceOnAdd
            inputRef={messageRef}
            value={messageInput.mentionedText}
            onChange={handleInputChange}
            // placeholder={"Mention people using '@'"}
            a11ySuggestionsListLabel="Suggested mentions"
            style={defaultStyle}
          >
            <Mention data={mentionUsers} style={defaultMentionStyle} />
          </MentionsInput>
          <Button
            type="submit"
            bg="#3b5d7c"
            fontSize="16px"
            color="#fff"
            h="100%"
            borderRadius="0"
            _hover={{ bg: "#3b5d7c" }}
            isDisabled={!messageInput.text.trim()}
          >
            Send &nbsp;&nbsp;{" "}
            <span>
              <AiOutlineSend />
            </span>
          </Button>
        </form>
      </Box>
      {/* <Box h="5px" /> */}
    </>
  );
};

export default ChatConversationFeed;
