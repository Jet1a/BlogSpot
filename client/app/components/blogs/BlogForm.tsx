"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input, { IFormValues } from "../ui/Input";
import { useUserSession } from "@/app/context/useUserSession";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/utils/blogApi";
import {
  LuFileText,
  LuImage,
  LuPenTool,
  LuSend,
  LuSparkles,
} from "react-icons/lu";

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const router = useRouter();

  const { user } = useUserSession();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (!user) {
      toast.error("Unauthorized");
      router.push("/auth");
      return;
    }

    if (!user?._id) {
      toast.error("Unauthorized");
      router.push("/");
      return;
    }

    try {
      const res = await createBlog(user?._id, data);

      if (!res.success) {
        console.error("Error creating Blog");
        toast.error("Create Failed");
        return;
      }

      toast.success("Blog Created Success");
      router.push("/blogs");
    } catch (error) {
      console.error("Error creating Blog", error);
      toast.error("Create Failed");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <LuSparkles className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">New Blog Post</h2>
            </div>
            <p className="text-blue-100 mt-2">
              Fill in the details below to publish your masterpiece
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-8">
              {/* Image URL Field */}
              <div className="group">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <LuImage className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-slate-800">
                      Featured Image
                    </label>
                    <p className="text-sm text-slate-500">
                      Add a compelling cover image for your blog post
                    </p>
                  </div>
                </div>
                <div className="pl-13">
                  <Input
                    showLabel={false}
                    label="imageUrl"
                    placeholder="https://example.com/your-amazing-image.jpg"
                    register={register}
                    error={errors}
                  />
                </div>
              </div>

              {/* Title Field */}
              <div className="group">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <LuFileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-slate-800">
                      Blog Title *
                    </label>
                    <p className="text-sm text-slate-500">
                      Create a catchy title that grabs attention
                    </p>
                  </div>
                </div>
                <div className="pl-13">
                  <Input
                    showLabel={false}
                    label="title"
                    placeholder="Your Amazing Blog Title Goes Here..."
                    register={register}
                    required
                    error={errors}
                  />
                </div>
              </div>

              {/* Content Field */}
              <div className="group">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                    <LuPenTool className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-slate-800">
                      Blog Content *
                    </label>
                    <p className="text-sm text-slate-500">
                      Write your story, share your insights, inspire your
                      readers
                    </p>
                  </div>
                </div>
                <div className="pl-13">
                  <Input
                    label="content"
                    showLabel={false}
                    placeholder="Start writing your blog content here... Share your thoughts, experiences, and insights that will captivate your readers."
                    register={register}
                    required
                    error={errors}
                    textArea
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => router.push("/blogs")}
                    className="cursor-pointer px-6 py-3 border-2 border-slate-300 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="cursor-pointer group inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <LuSend className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Publish Blog Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
