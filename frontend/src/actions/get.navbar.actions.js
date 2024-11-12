import { axiosInstance } from "@/lib/axios";

export const getNotifications = async () => {
  return axiosInstance.get("/notifications");
};

export const getconnectionRequests = async () => {
    return axiosInstance.get("/connections/requests")
}
