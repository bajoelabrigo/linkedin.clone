import { Loader, Lock, Mail } from "lucide-react";
import Input from "./Input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useMutation/useAuthMutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/validation";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const { loginMutation, isLoading } = useLogin();

  const onSubmit = (data) => {
    loginMutation({ ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md"
    >
      <Input
        icon={Mail}
        name="email"
        register={register}
        error={errors?.email?.message}
        type="email"
        placeholder="Email Adrress"
        className="input input-bordered w-full"
      />
      <Input
        icon={Lock}
        name="password"
        register={register}
        error={errors?.password?.message}
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
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
