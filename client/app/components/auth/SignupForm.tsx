"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input, { IFormValues } from "../ui/Input";
import Form from "../ui/Form";
import { authSignup } from "@/app/utils/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type SignupFormProps = {
  onToggleForm: () => void;
};

const SignupForm = ({ onToggleForm }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      await authSignup(data);
      toast.success("Signup Successful");
      router.push("/");
    } catch (error) {
      console.error("Error Signup", error);
    }
  };

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 mt-8"
    >
      <div className="flex flex-col">
        <Input
          label="name"
          placeholder="Peter Parker"
          register={register}
          required
          error={errors}
        />
      </div>
      <div className="flex flex-col">
        <Input
          label="email"
          type="email"
          placeholder="PeterParker@email.com"
          register={register}
          required
          error={errors}
        />
      </div>
      <div className="flex flex-col">
        <Input
          type="password"
          label="password"
          placeholder="*********"
          register={register}
          required
          error={errors}
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 rounded-xl mt-4 text-lg bg-blue-500 text-white transition-all duration-300 cursor-pointer hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );

  const footer = (
    <>
      <p className="text-slate-500">Already have an account?</p>
      <span
        onClick={onToggleForm}
        className="cursor-pointer text-blue-500 font-semibold"
      >
        Login
      </span>
    </>
  );

  return <Form body={body} footer={footer} />;
};

export default SignupForm;
