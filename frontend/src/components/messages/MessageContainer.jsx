import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className=" flex flex-col flex-1 sm:h-[550px] md:h-[600px]">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-sky-500 flex justify-between items-center px-4 py-2 mb-2 rounded-r-md">
            <div>
              <span className="label-text text-white">To: </span>
              <span className="text-gray-900 font-bold">
                {selectedConversation?.name}
              </span>
            </div>
            <img
              src={selectedConversation?.profilePicture || "/avatar.png"}
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-blue-500 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.Name} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
