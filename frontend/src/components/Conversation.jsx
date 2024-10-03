import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0];
  const { data: authuser } = useQuery({ queryKey: ["authUser"] });
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  //console.log(selectedConversation);

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => {
        setSelectedConversation({
          _id: conversation._id,
          userId: user?._id,
          userProfilePicture: user?.profilePicture,
          username: user?.username,
        });
      }}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user?.profilePicture}
          className="object-cover overflow-hidden"
        >
          <AvatarBadge boxSize={"1em"} bg="green.500" />
        </Avatar>
      </WrapItem>

      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          {user?.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {authuser._id === lastMessage.sender ? <BsCheck2All size={16} /> : ""}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill />}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
