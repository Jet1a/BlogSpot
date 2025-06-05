"use client";

import BlogCard from "@/app/components/blogs/BlogCard";
import { IBlog, IBlogs } from "@/app/types/blogType";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserBlogPage = () => {
  const params = useParams();

  const { userId } = params;

  const [blogData, setBlogData] = useState<IBlogs>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/users/${userId}`
        );
        if (res.status !== 200) {
          setBlogData(undefined);
          throw new Error("Failed fetch all blogs");
        }
        setBlogData(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
        throw new Error("FError fetching blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [userId]);

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
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </section>
  );
};

export default UserBlogPage;
