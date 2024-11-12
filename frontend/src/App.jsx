import Layout from "./components/layout/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import NotificationsPage from "./pages/NotificationPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import OAuth from "./components/auth/OAuth";
import { useAuthUser } from "./hooks/useQuery/useAuthQuery";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return null; //para que no demore el spiner y cargue rapido al "/"

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/google"
          element={!authUser ? <OAuth /> : <Navigate to={"/"} />}
        />

        <Route
          path="/notifications"
          element={
            authUser ? <NotificationsPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/network"
          element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/post/:postId"
          element={authUser ? <PostPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/forgot-password"
          element={
            !authUser ? <ForgotPasswordPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            !authUser ? <ResetPasswordPage /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}
