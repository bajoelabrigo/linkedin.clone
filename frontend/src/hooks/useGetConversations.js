import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/users");
        setConversations(res.data);
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
