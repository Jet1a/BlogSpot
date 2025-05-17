"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input, { IFormValues } from "../ui/Input";
import { useUserSession } from "@/app/context/useUserSession";

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const { user } = useUserSession();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    console.log(data);
    console.log(user);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="imageUrl"
            placeholder="https://example.com/image.jpg"
            register={register}
            error={errors}
          />
        </div>

        <div>
          <Input
            label="title"
            placeholder="Your Blog Title"
            register={register}
            required
            error={errors}
          />
        </div>

        <div>
          <Input
            label="content"
            placeholder="Write your blog content here..."
            register={register}
            required
            error={errors}
            textArea
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
