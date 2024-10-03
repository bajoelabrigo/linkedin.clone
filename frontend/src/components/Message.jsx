import { Avatar, Flex, Text } from "@chakra-ui/react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.100"} p={1} borderRadius={"md"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. 
          </Text>
          <Avatar src="" w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w="7" h={7} />
          <Text maxW={"350px"} bg={"gray.100"} p={1} borderRadius={"md"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
