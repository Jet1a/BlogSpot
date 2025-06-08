"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input, { IFormValues } from "../ui/Input";
import { useUserSession } from "@/app/context/useUserSession";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBlog, getBlogById, updateBlog } from "@/app/utils/blogApi";
import {
  LuFileText,
  LuImage,
  LuPenTool,
  LuSend,
  LuSparkles,
} from "react-icons/lu";
import { ParamValue } from "next/dist/server/request/params";
import ImagePreview from "../ImagePreview";

interface BlogFormProps {
  blogId?: ParamValue;
}

const BlogForm = ({ blogId }: BlogFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormValues>();

  const router = useRouter();
  const { user } = useUserSession();

  const previewImage = watch("imageUrl");

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogId) return;

      setIsLoading(true);
      try {
        const res = await getBlogById(blogId as string);
        if (res.success) {
          reset({
            imageUrl: res.blog.imageUrl || "",
            title: res.blog.title || "",
            content: res.blog.content || "",
          });
        } else {
          toast.error("Failed to load blog data");
          router.push("/blogs");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Failed to load blog data");
        router.push("/blogs");
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      setIsEditing(true);
      fetchBlogData();
    }
  }, [blogId, reset, router]);

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

    setIsLoading(true);

    try {
      let res;

      if (isEditing && blogId) {
        res = await updateBlog(blogId as string, user._id, data);

        if (!res.success) {
          console.error("Error updating Blog");
          toast.error("Update Failed");
          return;
        }

        toast.success("Blog Updated Successfully");
      } else {
        res = await createBlog(user?._id, data);

        if (!res.success) {
          console.error("Error creating Blog");
          toast.error("Create Failed");
          return;
        }

        toast.success("Blog Created Successfully");
      }
      router.push("/blogs");
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "creating"} Blog`, error);
      toast.error(`${isEditing ? "Update" : "Create"} Failed`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-1 sm:p-2 md:p-4 lg:p-6">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative z-10">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <LuSparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {isEditing ? "Edit Blog Post" : "New Blog Post"}
                  </h2>
                  <p className="text-blue-100 mt-1 text-sm sm:text-base">
                    {isEditing
                      ? "Update your blog post details below"
                      : "Fill in the details below to publish your masterpiece"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 sm:space-y-8"
              >
                <div className="group">
                  <ImagePreview imageUrl={previewImage} />
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <LuImage className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="text-base sm:text-lg font-semibold text-slate-800 block">
                        Featured Image
                      </label>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Add a compelling cover image for your blog post
                      </p>
                    </div>
                  </div>

                  <div className="ml-0 sm:ml-13">
                    <Input
                      showLabel={false}
                      label="imageUrl"
                      placeholder="https://example.com/your-amazing-image.jpg"
                      register={register}
                      error={errors}
                    />
                  </div>
                </div>

                {/* Blog Title Section */}
                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <LuFileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="text-base sm:text-lg font-semibold text-slate-800 block">
                        Blog Title *
                      </label>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Create a catchy title that grabs attention
                      </p>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-13">
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

                {/* Blog Content Section */}
                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <LuPenTool className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="text-base sm:text-lg font-semibold text-slate-800 block">
                        Blog Content *
                      </label>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Write your story, share your insights, inspire your
                        readers
                      </p>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-13">
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

                {/* Action Buttons */}
                <div className="pt-4 sm:pt-6 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end w-full">
                    <button
                      type="button"
                      onClick={() => router.push("/blogs")}
                      className="cursor-pointer order-2 sm:order-1 px-4 sm:px-6 py-3 border-2 border-slate-300 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 text-sm sm:text-base"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="cursor-pointer order-1 sm:order-2 group inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                          {isEditing ? "Updating..." : "Publishing..."}
                        </>
                      ) : (
                        <>
                          <LuSend className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                          {isEditing ? "Update Blog Post" : "Publish Blog Post"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
