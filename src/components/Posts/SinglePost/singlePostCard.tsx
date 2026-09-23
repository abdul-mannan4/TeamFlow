import React from 'react'
import Link from 'next/link'
import { useUsers } from '@/src/hooks/useUsers'
import { Post } from '@/src/types/post';

export default function SinglePostCard({userId,post}:{userId?:number,post?:Post}) {

    const {users,loading,error}=useUsers();

    const author=users.find((user)=>user?.id===userId);
    const authorName=author?.name
    const initial=authorName?.split(" ").map((word)=>word[0]).slice(0,2).join("");
    const userName=author?.username;
    const companyName=author?.company.name
  return (
    <div className='bg-white rounded-xl border border-slate-100 p-6'>
        <Link href={`/members/${userId}`} className='flex items-center gap-3 mb-5 group w-fit'>
        <div className='w-9 h-9 text-sm rounded-full flex items-center justify-center font-semibold text-white shrink-0 bg-[rgb(8,145,178)] '>
            {initial}
        </div>
        <div>
            <p className='text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors'>
                {userName}
            </p>
            <p className='text-xs text-slate-400'>
                @{userName} . {companyName}
            </p>
        </div>
    </Link>
    <h2 className='class="text-xl font-semibold text-slate-900 capitalize leading-snug mb-3"'>
        {post?.title}
    </h2>
    <p className='text-sm text-slate-600 leading-relaxed'>{post?.body}</p>
</div>
  )
}
