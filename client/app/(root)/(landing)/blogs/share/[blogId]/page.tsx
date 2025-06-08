'use client'

import BlogForm from "@/app/components/blogs/BlogForm";
import { useParams } from "next/navigation";
import React from "react";

const EditBlogPage = () => {
  const params = useParams();
  const { blogId } = params;

  return (
    <section className="p-8">
      <BlogForm blogId={blogId} />
    </section>
  );
};

export default EditBlogPage;
