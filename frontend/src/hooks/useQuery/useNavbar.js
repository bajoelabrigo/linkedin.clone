import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./useAuthQuery";
import {
  getconnectionRequests,
  getNotifications,
} from "@/actions/get.navbar.actions";

export const useNotifications = () => {
  const { authUser } = useAuthUser();
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications(),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: getconnectionRequests(),
    enabled: !!authUser,
  });

  return { notifications, connectionRequests };
};
