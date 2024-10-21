import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useQuery } from "@tanstack/react-query";
const Message = ({ ownMessage, message }) => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const { data: authuser } = useQuery({ queryKey: ["authUser"] });

  //console.log(message.text);

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.100"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={authuser?.profilePicture} w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePicture} w="7" h={7} />
          <Text maxW={"350px"} bg={"gray.100"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
