"use client";

import React from "react";
import UserMenu from "../UserMenu";
import Link from "next/link";
import { useUserSession } from "@/app/context/useUserSession";

const Navbar = () => {
  const { user, logout, loading } = useUserSession();

  return (
    <nav className="grid grid-cols-3 items-center py-4 px-8 text-base shadow-sm rounded-bl-xl rounded-br-xl">
      <div className="text-left">
        <span className="font-bold text-lg">BLOGSPOT</span>
      </div>
      <ul className="flex justify-center space-x-4 font-semibold">
        <li className="hover:text-slate-600">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-slate-600">
          <Link href="/blogs">Blog</Link>
        </li>
        <li className="hover:text-slate-600">
          <Link href="/blogs/share">Share your Story</Link>
        </li>
      </ul>
      <div className="flex justify-end">
        {!loading && <UserMenu user={user} onLogout={logout} />}
      </div>
    </nav>
  );
};

export default Navbar;
