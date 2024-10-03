import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import RecommendedUser from "../components/RecommendedUser";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import toast from "react-hot-toast";
import { GiConversation } from "react-icons/gi";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilState } from "recoil";

const ChatPage = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: getConversations, isLoading: loadingConversations } = useQuery({
    queryKey: ["getConversations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/messages/conversations");
      return res.data;
    },
    onError: (error) => {
      toast.error("Error", error.message, "error");
    },
  });
  //console.log(getConversations)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-secondary rounded-lg shadow p-6 mb-6">
          <Flex
            gap={4}
            flexDirection={{
              base: "column",
              md: "row",
            }}
            maxW={{
              sm: "400px",
              md: "full",
            }}
            mx={"auto"}
          >
            <Flex
              flex={30}
              gap={2}
              flexDirection={"column"}
              maxW={{
                sm: "250px",
                md: "full",
                mx: "auto",
              }}
            >
              <Text
                fontWeight={700}
                color={useColorModeValue("gray.600", "gray.300")}
              >
                Your Conversations
              </Text>
              <form>
                <Flex alignItems={"center"} gap={2}>
                  <Input placeholder="Search for a user" />
                  <Button size={"sm"}>
                    <SearchIcon />
                  </Button>
                </Flex>
              </form>
              {loadingConversations &&
                [0, 1, 2, 3, 4].map((_, i) => (
                  <Flex
                    key={i}
                    gap={4}
                    alignItems={"center"}
                    p={"1"}
                    borderRadius={"md"}
                  >
                    <Box>
                      <SkeletonCircle size="10" />
                    </Box>
                    <Flex w={"full"} flexDirection={"column"} gap={3}>
                      <Skeleton h={"10px"} w={"80px"} />
                      <Skeleton h={"8px"} w={"90%"} />
                    </Flex>
                  </Flex>
                ))}
              {!loadingConversations &&
                getConversations?.map((conversation) => (
                  <Conversation
                    key={conversation._id}
                    conversation={conversation}
                  />
                ))}
            </Flex>
            {!selectedConversation._id && (
              <Flex
                flex={70}
                borderRadius={"md"}
                p={2}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"400px"}
              >
                <GiConversation size={100} className="mb-2" />
                <Text fontSize={20}>
                  Select a conversation to start messaging
                </Text>
              </Flex>
            )}
            {selectedConversation._id && (
              <MessageContainer />
            )}
          </Flex>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-1">
        {recommendedUsers?.length > 0 && (
          <div className="col-span-1 lg:col-span-1 hidden lg:block">
            <div className="bg-secondary rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">People you may know</h2>
              {recommendedUsers?.map((user) => (
                <RecommendedUser key={user._id} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatPage;
