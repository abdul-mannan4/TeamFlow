import React from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export default function PostCard({title,userName,body,totalComments,id}:{title:string,userName:string,body:string,totalComments:number,id:number}) {
    const initials=userName.split(" ").map((word)=>word[0]).slice(0,2).join("");

  return (
    <div className='px-5 2xl:px-6 py-4 2xl:py-5 hover:bg-slate-50/60 transition-colors'>
        <div className='flex items-start justify-between gap-3'>
            <div className='flex items-start gap-3 2xl:gap-3.5 min-w-0'>
                <div className='w-8 h-8 2xl:w-10 2xl:h-10 text-xs 2xl:text-sm rounded-full flex items-center justify-center font-bold text-white shrink-0 mt-0.5 bg-[rgb(8,145,178)] shadow-xs'>
                    {initials}
                </div>
                <div className='min-w-0'>
                    <p className='text-sm 2xl:text-base font-semibold text-slate-900 truncate capitalize'>{title}</p>
                    <p className='text-xs 2xl:text-sm text-slate-500 mt-0.5 font-medium'>{userName}</p>
                    <p className='text-xs 2xl:text-sm text-slate-400 mt-1 line-clamp-1'>{body}</p>
                </div>

            </div>
            <Link href={`/posts/${id}`} className='text-xs 2xl:text-sm font-semibold text-indigo-600 hover:text-indigo-700 shrink-0 whitespace-nowrap p-1'>View</Link>

        </div>
        <div className='flex items-center gap-1.5 mt-2 ml-11 2xl:ml-13 text-slate-400'>
            <MessageSquare size={14} className="2xl:w-4 2xl:h-4" />
            <span className='text-xs 2xl:text-sm font-medium'>{totalComments} comments</span>
        </div>
    </div>
  )
}
