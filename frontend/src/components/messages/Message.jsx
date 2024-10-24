import { useQuery } from "@tanstack/react-query";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat chat-end" : "chat chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture || "/avatar.png";

  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-purple-500";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ">
          <img src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 bg- text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
