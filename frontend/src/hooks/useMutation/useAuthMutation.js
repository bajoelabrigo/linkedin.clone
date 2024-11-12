import {
  getLoginActions,
  getLogoutActions,
  getSignupActions,
} from "@/actions/get.auth.actions";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


// Signup Hook

export const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => getSignupActions(data),
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  return { signUpMutation, isLoading };
};

// Login Hook

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: async (userData) => getLoginActions(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  return { loginMutation, isLoading };
};

// Logout Hook
export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: () => getLogoutActions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { logout };
};
