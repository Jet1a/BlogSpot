import BlogForm from "@/app/components/blogs/BlogForm";
import Head from "next/head";
import React from "react";

const ShareBlogPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Share your Story, published your blog"
        />
      </Head>

      <section className="p-8">
        <BlogForm />
      </section>
    </>
  );
};

export default ShareBlogPage;
