"use client"
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "./postCard";
import { useMemo } from "react";
import { usePosts } from "@/src/hooks/usePosts";
import { useComments } from "@/src/hooks/useComments";
import { useUsers } from "@/src/hooks/useUsers";

export default function PostGrid() {
    const {posts,loading:postLoading,error:postError}=usePosts();
    const {comments,loading:commentLoading,error:commentError}=useComments();
    const {users,loading:userLoading,error:usersError}=useUsers();

    const recentPosts=useMemo(()=>{
        if(!posts.length || !comments.length || !users.length) {
            return [];
        }

        const countCommentsPerPost=comments.reduce<Record<number,number>>((acc,comment)=>{
            acc[comment.postId]=(acc[comment.postId]||0)+1;
            return acc;
        },{})

        const userNameById=users.reduce<Record<number,string>>((acc,user)=>{
            acc[user.id]=user.name
            return acc;
        },{})

        return [...posts]
        .sort((a,b)=>(countCommentsPerPost[b.id] ?? 0)-(countCommentsPerPost[a.id]?? 0))
        .slice(0,5)
        .map((post)=>({...post,
            commentCount:countCommentsPerPost[post.id] ?? 0,
            userName:userNameById[post.userId] ?? "Unknown"
        }))

    },[posts,comments,users])
   

  return (
    <div className="bg-white rounded-xl border border-slate-100/80 overflow-hidden">
      <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-slate-50">
        <h3 className="text-[20px] 2xl:text-[24px] font-bold text-slate-900">Recent Posts</h3>
        <Link
          href="/posts"
          className="text-[15px] 2xl:text-[17px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          View All
          <ArrowRight size={16} className="2xl:w-5 2xl:h-5" />
        </Link>
      </div>
      <div className="flex flex-col divide-y divide-slate-50">
           {
               recentPosts.map((post,index)=>(
                  <PostCard key={post.id} title={post.title} userName={post.userName} body={post.body} 
                  totalComments={post.commentCount} id={post.id}/> 
                   
            ))
        }
      </div>
    </div>
  );
}
