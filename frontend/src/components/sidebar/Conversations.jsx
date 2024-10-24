import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";


const Conversations = () => {
  const { loading, conversations } = useGetConversations()


  
  return (
    <div className="py-2 flex flex-col sm:h-[450px] md:h-[550px] overflow-auto bg-clip-padding">

    {conversations.map((conversations, idx) => (
      <Conversation
        key={conversations._id}
        conversation={conversations}
        lasIdx={idx === conversations.length - 1}
      />
    ))}
    {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
   
    </div>
  );
};

export default Conversations;
