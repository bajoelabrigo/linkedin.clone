import { Link } from "react-router-dom";
import { Bell, Home, LogOut, MessageSquare, Search, User, Users } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import { useAuthUser } from "@/hooks/useQuery/useAuthQuery";
import { useNotifications } from "@/hooks/useQuery/useNavbar";
import { useLogout } from "@/hooks/useMutation/useAuthMutation";

const Navbar = () => {
  const { authUser } = useAuthUser();

  const { notifications, connectionRequests } = useNotifications();
  const { logout } = useLogout();

  const { messages } = useConversation();

  const messagesLength = messages?.filter((message) => !message.read).length;

  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notif.read
  ).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-8 rounded"
                src="/small-logo.png"
                alt="LinkedIn"
              />
            </Link>

            <label className="input input-bordered  w-full items-center gap-2 hidden md:flex ">
              <input type="text" className="grow" placeholder="Search..." />
              <Search size={18}/>
            </label>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link
                  to={"/"}
                  className="text-neutral flex flex-col items-center"
                >
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>
                <Link
                  to="/network"
                  className="text-neutral flex flex-col items-center relative"
                >
                  <Users size={20} />
                  <span className="text-xs hidden md:block">My Network</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/notifications"
                  className="text-neutral flex flex-col items-center relative"
                >
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span
                      className="absolute -top-2 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-4 md:size-4 flex items-center justify-center"
                    >
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/chat"
                  className="text-neutral flex flex-col items-center relative"
                >
                  <MessageSquare size={20} />
                  <span className="text-sm hidden md:block">Messages</span>
                  {messagesLength > 0 && (
                    <span
                      className="absolute -top-2 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-4 md:size-4 flex items-center justify-center"
                    >
                      {messagesLength}
                    </span>
                  )}
                </Link>

                <Link
                  to={`/profile/${authUser.username}`}
                  className="text-neutral flex flex-col items-center"
                >
                  <User size={20} />
                  <span className="text-xs hidden md:block">Me</span>
                </Link>
                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => logout()}
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
