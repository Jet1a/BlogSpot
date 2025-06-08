"use client";

import BlogCard from "@/app/components/blogs/BlogCard";
import { IBlog, IBlogs } from "@/app/types/blogType";
import { deleteBlog, getAllUserBlog } from "@/app/utils/blogApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserBlogPage = () => {
  const params = useParams();

  const { userId } = params;

  const [blogData, setBlogData] = useState<IBlogs>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await getAllUserBlog(userId);
        setBlogData(res);
      } catch (error) {
        console.error("Error fetching blogs", error);
        throw new Error("FError fetching user blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [userId]);

  const handleDelete = async (blogId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteBlog(userId as string, blogId);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        if (blogData) {
          const updatedBlogs = blogData.blogs.filter(
            (blog) => blog._id !== blogId
          );
          setBlogData({ ...blogData, blogs: updatedBlogs });
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Error!, Something went wrong.");
    }
  };

  return (
    <section className="p-8">
      {isLoading && <p className="min-h-screen text-center py-8">Loading...</p>}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Blog Posts</h1>
        <p className="text-gray-600">Update or Delete, Mange your Posts here</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {blogData?.blogs &&
          blogData.blogs.map((blog: IBlog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              isOwner={true}
              onDelete={() => handleDelete(blog._id)}
            />
          ))}
      </div>
    </section>
  );
};

export default UserBlogPage;
