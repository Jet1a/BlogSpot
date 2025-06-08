"use client";

import imagePlaceholder from "@/app/assets/images/imagePlaceholder.png";
import Image from "next/image";
import { IBlog } from "@/app/types/blogType";
import { LuArrowUpRight, LuCalendar, LuClock, LuUser } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoEllipsisVertical } from "react-icons/io5";
import { useEffect, useState } from "react";

interface BlogCardProps {
  blog: IBlog;
  isOwner?: boolean;
  onDelete?: (blogId: string) => void;
}

const BlogCard = ({ blog, isOwner, onDelete }: BlogCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [validSrc, setValidSrc] = useState<string | typeof imagePlaceholder>(
    imagePlaceholder
  );

  useEffect(() => {
    if (!blog.imageUrl) {
      setValidSrc(imagePlaceholder);
      return;
    }

    const img = new window.Image();
    img.src = blog.imageUrl;

    img.onload = () => setValidSrc(blog.imageUrl);
    img.onerror = () => setValidSrc(imagePlaceholder);
  }, [blog.imageUrl]);

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative overflow-hidden">
        <Image
          src={validSrc}
          alt={blog.title}
          width={400}
          height={240}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {isOwner && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="absolute z-10 cursor-pointer top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <IoEllipsisVertical className="w-4 h-4 text-gray-700" />
            </div>
            {isOpen && (
              <ul className="absolute text-right mt-1 right-2 w-20 bg-white rounded-md shadow-lg z-50">
                <li
                  onClick={() => router.push(`/blogs/share/${blog._id}`)}
                  className="hover:bg-gray-200 rounded-md w-full px-4 py-2"
                >
                  Edit
                </li>
                <li
                  onClick={() => onDelete?.(blog._id)}
                  className="hover:bg-gray-200 rounded-md w-full px-4 py-2 text-red-500"
                >
                  Delete
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div
        onClick={() => router.push(`/blogs/detail/${blog._id}`)}
        className="p-6 cursor-pointer flex flex-col flex-grow space-y-4 select-none"
      >
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {blog.title}
        </h2>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <LuUser className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">By {blog.author}</span>
          </div>

          <div className="flex items-center space-x-1">
            <LuClock className="w-4 h-4" />
            <span>{Math.ceil(blog.content.length / 200)} min read</span>
          </div>
        </div>

        <div className="flex-grow">
          <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
            {truncateContent(blog.content)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          {blog.createdOn && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <LuCalendar className="w-4 h-4" />
              <span>{formatDate(blog.createdOn)}</span>
            </div>
          )}

          <button className="flex cursor-pointer items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
            Read More
            <LuArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
