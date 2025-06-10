"use client";

import BlogForm from "@/app/components/blogs/BlogForm";
import Head from "next/head";
import { useParams } from "next/navigation";
import React from "react";

const EditBlogPage = () => {
  const params = useParams();
  const { blogId } = params;

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Edit your Story, updated your story edit your blog"
        />
      </Head>

      <section className="p-8">
        <BlogForm blogId={blogId} />
      </section>
    </>
  );
};

export default EditBlogPage;
