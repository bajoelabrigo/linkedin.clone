import { axiosInstance } from "@/lib/axios";

export const getSignupActions = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const getLoginActions = async (userData) => {
  try {
    const res = await axiosInstance.post("auth/login", userData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return null;
    }
    toast.error(err.response.data.message || "Something went wrong");
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return null;
    }
    toast.error(err.response.data.message || "Something went wrong");
  }
};

export const getLogoutActions = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res;
};
