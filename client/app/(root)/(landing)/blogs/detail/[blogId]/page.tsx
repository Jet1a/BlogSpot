"use client";

import BlogDetail from "@/app/components/blogs/BlogDetail";
import { IBlog } from "@/app/types/blogType";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogResponse {
  success: boolean;
  message: string;
  blog: IBlog;
}

const BlogDetailPage = () => {
  const params = useParams();
  const { blogId } = params;

  const [blogData, setBlogData] = useState<BlogResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`
        );
        if (res.status !== 200) {
          setBlogData(undefined);
          throw new Error("Failed fetch blog detail");
        }
        setBlogData(res.data);
      } catch (error) {
        console.error("Error fetching blog detail", error);
        throw new Error("FError fetching blog detail");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [blogId]);

  return (
    <>
      {isLoading && <p className="min-h-screen text-center py-8">Loading...</p>}
      {blogData && <BlogDetail blog={blogData.blog} />}
    </>
  );
};

export default BlogDetailPage;
