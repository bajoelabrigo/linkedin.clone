import { axiosInstance } from "@/lib/axios";

export const getPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users/suggestions");

  console.log(res.data);
  return res.data;
};
