import { Loader, Lock, Mail, User, UserPlus } from "lucide-react";
import Input from "./Input";
import { motion } from "framer-motion";
import { useSignup } from "@/hooks/useMutation/useAuthMutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/utils/validation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const { signUpMutation, isLoading } = useSignup();

  const handleSignUp = (data) => {
    signUpMutation({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4">
      <Input
        icon={User}
        name="name"
        register={register}
        error={errors?.name?.message}
        type="text"
        placeholder="Full name"
        className="input input-bordered w-full"
      />
      <Input
        icon={UserPlus}
        name="username"
        register={register}
        error={errors?.username?.message}
        type="text"
        placeholder="Username"
        className="input input-bordered w-full"
      />
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
        placeholder="Password (6+ characters)"
        className="input input-bordered w-full"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full text-white"
      >
        {isLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Agree & Join"
        )}
      </motion.button>
    </form>
  );
};

export default SignUpForm;
