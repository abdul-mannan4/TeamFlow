"use client";
import React, { useState } from "react";
import { LucidePen, LucideTrash2, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/src/types/post";
import { useUsers } from "@/src/hooks/useUsers";
import { useComments } from "@/src/hooks/useComments";
import { usePosts } from "@/src/hooks/usePosts";
import EditPostCard from "../EditPost/editPostCard";
import ConfirmModal from "../../SharedComponents/ConfirmModal/confirmModal";

export default function PostsCard({ post }: { post: Post }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { users } = useUsers();
  const { comments } = useComments();
  const { deletePost } = usePosts();

  const commentOnPost = comments.filter((comment) => comment.postId === post.id);

  const author = users.find((user) => user.id === post.userId);
  const authorName = author?.name ?? "Unknown";
  const authorUsername = author?.username ?? "unknown";
  const initials = authorName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Failed to delete post:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100/80 p-5 2xl:p-6 flex flex-col gap-3.5 2xl:gap-4.5 hover:border-indigo-100 hover:shadow-md transition-all group w-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 2xl:gap-3">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 text-xs 2xl:text-sm rounded-full flex items-center justify-center font-bold text-white shrink-0 bg-[rgb(8,145,178)] shadow-xs">
                {initials}
              </div>
              <div>
                <p className="text-xs 2xl:text-sm font-semibold text-slate-900">
                  {authorName}
                </p>
                <p className="text-xs 2xl:text-sm text-slate-400">@{authorUsername}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditOpen(true)}
                className="p-1.5 2xl:p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
                title="Edit"
                type="button">
                <LucidePen size={14} className="2xl:w-4 2xl:h-4" />
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="p-1.5 2xl:p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                title="Delete"
                type="button">
                <LucideTrash2 size={14} className="2xl:w-4 2xl:h-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 2xl:mt-4">
            <h3 className="text-sm sm:text-base 2xl:text-lg font-bold text-slate-900 capitalize leading-snug line-clamp-2">{post.title}</h3>
            <p className="text-xs sm:text-sm 2xl:text-base text-slate-500 mt-2 line-clamp-3 leading-relaxed">{post.body}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 2xl:pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MessageCircle size={15} className="2xl:w-5 2xl:h-5 text-slate-400" />
            <span className="text-xs 2xl:text-sm font-medium">{commentOnPost.length}</span>
          </div>
          <Link
            href={`/posts/${post.id}`}
            className="text-xs sm:text-sm 2xl:text-base font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            View Post
          </Link>
        </div>
      </div>

      {isEditOpen && <EditPostCard post={post} setIsOpen={setIsEditOpen} />}

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Post"
        message={`Are you sure you want to delete "${post.title}"?`}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
