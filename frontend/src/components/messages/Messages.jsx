import { UserRoundPen } from "lucide-react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages]);

  return (
    <div className="px-4 flex-1  overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => <div key={message._id} ref={lastMessageRef}>
          <Message message={message}/>
        </div>)}

      {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <UserRoundPen className="text-sky-500" size={60} />
          <p className="text-center text-2xl font-semibold text-gray-500">
            Send a message to start the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
