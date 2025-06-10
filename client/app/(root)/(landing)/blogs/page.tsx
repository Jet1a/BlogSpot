"use client";

import { IBlog, IPaginationBlogs } from "@/app/types/blogType";
import React, { useEffect, useState } from "react";
import BlogCard from "@/app/components/blogs/BlogCard";
import { getAllBlog } from "@/app/utils/blogApi";
import Pagination from "@/app/components/ui/Pagination";

const BlogPage = () => {
  const [blogData, setBlogData] = useState<IPaginationBlogs>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (page?: number) => {
    setIsLoading(true);
    try {
      const res = await getAllBlog(page);
      setBlogData(res);
    } catch (error) {
      console.error("Error fetching blogs", error);
      throw new Error("FError fetching blogs");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = async (page: number) => {
    await fetchBlogs(page);
  };

  return (
    <section className="p-2 md:p-4 lg:p-8">
      {isLoading && <p className="min-h-screen text-center py-8">Loading...</p>}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Latest Blog Posts</h1>
        <p className="text-gray-600">
          Explore insights, stories, and updates from our writers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
        {blogData?.docs &&
          blogData.docs.map((blog: IBlog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>

      <div className="">
        <Pagination
          totalPages={blogData?.totalPages ?? 1}
          hasNextPage={blogData?.hasNextPage ?? false}
          hasPrevPage={blogData?.hasPrevPage ?? false}
          currentPage={blogData?.page ?? 1}
          nextPage={blogData?.nextPage ?? 1}
          prevPage={blogData?.prevPage ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default BlogPage;
