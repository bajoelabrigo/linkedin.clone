import { useState } from "react";
import { Loader, Lock, UserPlus } from "lucide-react";
import Input from "./Input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useMutation/useAuthMutation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginMutation, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <Input
        icon={UserPlus}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <Input
        icon={Lock}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <div className="flex items-center mb-6">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="btn btn-primary w-full"
      >
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
      </motion.button>
    </form>
  );
};

export default LoginForm;
