"use client";

import Image from "next/image";
import { useState } from "react";
import blogAuth from "../../assets/images/authBlog.png";
import LoginForm from "@/app/components/auth/LoginForm";
import SignupForm from "@/app/components/auth/SignupForm";
import Link from "next/link";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="flex min-h-screen items-start p-8 gap-14">
      <div>
        <Image
          src={blogAuth}
          alt="blog_auth"
          width={650}
          height={650}
          className="object-contain rounded-2xl"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 px-4">
        <h2 className="text-2xl font-bold mb-10">
          <Link href={"/"}>BLOGSPOT</Link>
        </h2>
        <p className="text-lg text-blue-600 font-semibold">Create an Account</p>
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
  );
};

export default AuthenticationPage;
