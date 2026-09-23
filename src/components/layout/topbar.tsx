"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, ChevronDown } from "lucide-react";
import Seachbar from "./seachbar";

const PageTitle: Record<string, string> = {
  "/": "Dashboard",
  "/members": "Members",
  "/posts": "Posts",
  "/tasks": "Tasks",
  "/albums": "Albums",
};

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathName = usePathname();

  const getTitle = () => {
    if (PageTitle[pathName]) return PageTitle[pathName];
    if (pathName.startsWith("/members/")) return "Member Details";
    if (pathName.startsWith("/posts/")) return "Post Details";
    if (pathName.startsWith("/albums/")) return "Album Details";
    return "TeamFlow";
  };

  const title = getTitle();

  return (
    <div className="flex px-4 sm:px-6 2xl:px-8 gap-3 sm:gap-4 bg-white items-center justify-between h-full w-full">
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 flex-1 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open Navigation Menu"
          className="lg:hidden p-1.5 -ml-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg sm:text-2xl 2xl:text-3xl font-bold text-slate-900 truncate shrink-0">
          {title}
        </h1>
        <div className="flex-1 hidden md:block">
          <Seachbar width="w-full" placeHolder="Search TeamFlow..." />
        </div>
      </div>
      <div className="flex gap-3 sm:gap-6 items-center shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-1.5 2xl:p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Bell size={22} className="sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 2xl:w-2.5 2xl:h-2.5 bg-indigo-600 rounded-full ring-2 ring-white" />
        </button>
        <div className="flex gap-2.5 items-center cursor-pointer hover:opacity-90 transition-opacity">
          <span className="w-8 h-8 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs sm:text-sm 2xl:text-base shrink-0 shadow-xs">
            TA
          </span>
          <div className="hidden sm:flex gap-1 items-center">
            <span className="font-semibold text-slate-700 text-sm sm:text-base 2xl:text-lg">Admin</span>
            <ChevronDown size={18} className="text-slate-400 2xl:w-5 2xl:h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
