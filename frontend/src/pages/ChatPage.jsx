import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import RecommendedUser from "../components/RecommendedUser";
import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const ChatPage = () => {
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-secondary flex rounded-lg shadow p-6 mb-6">
          <Sidebar/>
          <MessageContainer/>
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
