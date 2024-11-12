import { getAuthUser } from "@/actions/get.auth.actions";
import { useQuery } from "@tanstack/react-query";

// AuthUser Hook

export const useAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => getAuthUser(),
  });

  return { authUser, isLoading };
};
