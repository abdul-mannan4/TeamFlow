"use client";
import React, { useState } from "react";
import PageHeader from "../SharedComponents/PageHeader/pageHeader";
import { RefreshCw } from "lucide-react";
import CardSection from "./DetailCardSection/cardSection";
import DashboardGrid from "./DashboardGrid/dashboardGrid";
import { useAppDispatch } from "@/src/redux/hook";
import { fetchUsers } from "@/src/redux/features/users/userThunk";
import { fetchPosts } from "@/src/redux/features/posts/postThunk";
import { fetchTodos } from "@/src/redux/features/todos/todoThunk";
import { fetchAlbums } from "@/src/redux/features/albums/albumThunk";
import { fetchPhotos } from "@/src/redux/features/photos/photoThunk";
import { fetchComments } from "@/src/redux/features/comments/commentThunk";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await Promise.all([
        dispatch(fetchUsers({})),
        dispatch(fetchPosts()),
        dispatch(fetchTodos({})),
        dispatch(fetchAlbums({})),
        dispatch(fetchPhotos({})),
        dispatch(fetchComments({})),
      ]);
    } catch (error) {
      console.error("Failed to refresh dashboard data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 gap-5 sm:gap-6  w-full">
      <PageHeader
        title="Good morning, Team"
        subtitle="Here's what's happening across your workspace."
        action={
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-3.5 py-2 text-sm sm:text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer disabled:opacity-60 "
          >
            <RefreshCw
              size={16}
              className={`transition-transform text-slate-500 hover:rotate-180${
                isRefreshing ? "animate-spin text-indigo-600" : ""
              }`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        }
      />
      <CardSection />
      <DashboardGrid />
    </div>
  );
}
