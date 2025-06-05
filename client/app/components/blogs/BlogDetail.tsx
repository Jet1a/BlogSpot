import { IBlog } from "@/app/types/blogType";
import Image from "next/image";
import {
  LuArrowLeft,
  LuBookmark,
  LuBookMarked,
  LuClock,
  LuHeart,
  LuMessageCircle,
  LuShare2,
  LuUser,
} from "react-icons/lu";
import imagePlaceholder from "@/app/assets/images/imagePlaceholder.png";
import { BiCalendar } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  blog: IBlog;
}
const BlogDetail = ({ blog }: BlogCardProps) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen pb-4">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 ">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="cursor-pointer inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <LuArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </button>

              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-200">
                  <LuShare2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-all duration-200">
                  <LuHeart className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-600 transition-all duration-200">
                  <LuBookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <article className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <Image
              src={blog.imageUrl || imagePlaceholder}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <LuUser className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">By {blog.author}</span>
                  </div>

                  {blog.createdOn && (
                    <div className="flex items-center space-x-1">
                      <BiCalendar className="w-4 h-4" />
                      <span>{formatDate(blog.createdOn)}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1">
                    <LuClock className="w-4 h-4" />
                    <span>{getReadingTime(blog.content)} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <BsEye className="w-4 h-4" />
                  <span>1.2k views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LuHeart className="w-4 h-4" />
                  <span>24 likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LuMessageCircle className="w-4 h-4" />
                  <span>8 comments</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 text-lg leading-relaxed">
                {formatContent(blog.content)}
              </div>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              {/* Author Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <LuUser className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {blog.author}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Passionate writer and storyteller sharing insights about
                      life, technology, and everything in between. Always
                      exploring new ideas and perspectives to bring you engaging
                      content.
                    </p>
                    <div className="flex items-center space-x-4 mt-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                        Follow
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200">
                    <LuHeart className="w-4 h-4 mr-2" />
                    Like (24)
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200">
                    <LuMessageCircle className="w-4 h-4 mr-2" />
                    Comment (8)
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200">
                    <LuShare2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors duration-200">
                    <LuBookMarked className="w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;
