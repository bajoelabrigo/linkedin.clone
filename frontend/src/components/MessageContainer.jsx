import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useRecoilState } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import { m } from "framer-motion";

const MessageContainer = () => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [messages, setMessages] = useState([]);
  const { data: authuser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: getMessages, isLoading: loadingMessages } = useQuery({
    queryKey: ["getMessages", selectedConversation.userId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/messages/${selectedConversation.userId}`
      );
      return res.data;
    },
  });

  return (
    <Flex flex="70" borderRadius={"md"} p={2} flexDirection={"column"}>
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedConversation.userProfilePicture} size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          {selectedConversation.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />

      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        p={2}
        maxH={"400px"}
        overflowY={"auto"}
      >
        {loadingMessages &&
          [...Array(4)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessages &&
          getMessages?.map((message) => (
            <Message
              key={message._id}
              message={message}
              ownMessage={authuser?._id === message.sender}
            />
          ))}
      </Flex>

      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
