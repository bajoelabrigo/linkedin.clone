import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAutenticated: false,
  error: null,
  isLoading: false,
  isChekingAuth: false,
  message: null,

  signup: async (name, username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        username,
        email,
        password,
      });
      set({ user: response.data.user, isAutenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
    }
  },
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      set({
        isAutenticated: true,
        user: response.data.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ user: null, isAutenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/verify-email", { code });
      set({ user: response.data.user, isAutenticated: true, isLoading: false });
      toast.success("Email verified successfully");
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isChekingAuth: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({
        user: response.data.user,
        isAutenticated: true,
        isChekingAuth: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error checking authentication",
        isChekingAuth: false,
      });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error forgot password",
        isLoading: false,
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error reset password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
