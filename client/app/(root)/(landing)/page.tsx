"use client";

import { BiBookOpen } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FiPenTool } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-[120px] md:text-[150px] lg:text-[180px] font-light tracking-widest select-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 animate-gradient">
            BLOGSPOT
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-slate-600 text-center mb-12 max-w-2xl leading-relaxed">
          Discover stories, insights, and ideas that inspire. Your gateway to
          thoughtful content and meaningful conversations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="/blogs"
            className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <BiBookOpen className="w-5 h-5 mr-3" />
            Explore Blog
            <BsArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/blogs/share">
            <button className="cursor-pointer inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
              <FiPenTool className="w-5 h-5 mr-3" />
              Start Writing
            </button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full pb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <GiSparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Fresh Content
            </h3>
            <p className="text-slate-600 text-sm">
              Discover new perspectives and ideas updated regularly by our
              community of writers.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <BiBookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Diverse Topics
            </h3>
            <p className="text-slate-600 text-sm">
              From technology to lifestyle, explore a wide range of topics that
              matter to you.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <FiPenTool className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Join Community
            </h3>
            <p className="text-slate-600 text-sm">
              Connect with like-minded readers and share your own stories with
              the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
