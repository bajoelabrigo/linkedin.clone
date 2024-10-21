import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilState } from "recoil";
import { axiosInstance } from "../lib/axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const MessageInput = ({ setMessages }) => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [messageText, setMessageText] = useState("");
  const queryClient = useQueryClient();


  const { mutate: sendMessages, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(`/messages/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMessages"] });
      queryClient.invalidateQueries({ queryKey: ["getConversations"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (messageText.trim()) {
      sendMessages({
        message: messageText,
        recipientId: selectedConversation.userId,
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setMessageText("");
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message"
        />
        <InputRightElement>
          <IoSendSharp color="blue.500" />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
