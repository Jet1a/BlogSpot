"use client";

import BlogDetail from "@/app/components/blogs/BlogDetail";
import { IBlog } from "@/app/types/blogType";
import { getBlogById } from "@/app/utils/blogApi";
import Head from "next/head";
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
        const res = await getBlogById(blogId as string);
        setBlogData(res);
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
      <Head>
        <meta
          name="description"
          content="Look up what others story is talk about"
        />
      </Head>
      {isLoading && <p className="min-h-screen text-center py-8">Loading...</p>}
      {blogData && <BlogDetail blog={blogData.blog} />}
    </>
  );
};

export default BlogDetailPage;
