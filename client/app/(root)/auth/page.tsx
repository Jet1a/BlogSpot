"use client";

import Image from "next/image";
import { useState } from "react";
import blogAuth from "../../assets/images/authBlog.png";
import LoginForm from "@/app/components/auth/LoginForm";
import SignupForm from "@/app/components/auth/SignupForm";
import Link from "next/link";
import Head from "next/head";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Signup for BlogSpot | for amazing experience"
        />
      </Head>

      <div className="flex flex-col md:flex-row min-h-screen items-start p-2 md:p-4 lg:p-8 gap-4 md:gap-8 lg:gap-14">
        <div>
          <Image
            src={blogAuth}
            alt="blog_auth"
            width={650}
            height={650}
            className="hidden md:block object-contain rounded-2xl"
          />
        </div>
        <div className="flex w-full flex-1 flex-col space-y-2 px-4">
          <h2 className="text-2xl font-bold mb-10">
            <Link href={"/"}>BLOGSPOT</Link>
          </h2>
          <p className="text-lg text-blue-600 font-semibold">
            Create an Account
          </p>
          <h1 className="text-5xl font-extrabold">
            WELCOME TO <p className="tracking-widest">BLOGSPOT</p>
          </h1>
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;
