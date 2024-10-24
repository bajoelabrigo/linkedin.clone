import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return (
    <div>
      {authUser ? (
        <>
          <button
            className="flex items-center space-x-1  text-sky-600 hover:text-gray-600 "
            onClick={() => logout()}
          >
            <LogOut size={24} />
            <span className="md:inline font-semibold">Logout</span>
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
  );
};

export default LogoutButton;
