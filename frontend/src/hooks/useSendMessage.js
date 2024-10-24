import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedConversation._id}`,
        {
          message,
        }
      );
      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};
export default useSendMessage;
