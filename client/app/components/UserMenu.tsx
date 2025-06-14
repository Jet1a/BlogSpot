"use client";

import { useState } from "react";
import Link from "next/link";
import { IUser } from "../types/userType";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface UserMenuProps {
  user: IUser | null;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left ">
      {user ? (
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer rounded-md transition duration-200"
          >
            <span className="font-medium">Welcome, {user.name}</span>
            <MdOutlineArrowDropDown />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <Link
                href={`/blogs/users/${user._id}`}
                onClick={() => setOpen(!open)}
              >
                <button className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                  My Blogs
                </button>
              </Link>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/auth"
          className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Sign up / Login
        </Link>
      )}
    </div>
  );
}
