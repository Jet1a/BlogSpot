"use client";

import React, { useState } from "react";
import UserMenu from "../UserMenu";
import Link from "next/link";
import { useUserSession } from "@/app/context/useUserSession";
import { LuMenu, LuX } from "react-icons/lu";

const Navbar = () => {
  const { user, logout, loading } = useUserSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-4 py-4 rounded-bl-xl rounded-br-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-bold">
          <Link href="/">BLOGSPOT</Link>
        </div>

        <ul className="hidden md:flex space-x-6 font-semibold">
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

        <div className="flex items-center space-x-4">
          {!loading && (
            <div className="hidden md:block">
              <UserMenu user={user} onLogout={logout} />
            </div>
          )}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 font-semibold">
          <Link
            href="/"
            className="block hover:text-slate-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="block hover:text-slate-600"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/blogs/share"
            className="block hover:text-slate-600"
            onClick={() => setIsOpen(false)}
          >
            Share your Story
          </Link>
          {!loading && (
            <div className="pt-2">
              <UserMenu user={user} onLogout={logout} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
