import React from 'react'
import Link from 'next/link'
import { LucideExternalLink } from 'lucide-react'
import { Post } from '@/src/types/post'

export default function PostActivityCard({post}:{post:Post}) {
    const postId=post?.id
  return (
    <div className='border border-slate-100 rounded-lg p-4 hover:border-slate-200 transition-colors'>
        <div className='flex items-start justify-between gap-3'>
            <div className='min-w-0'>
            <p className='text-sm font-medium text-slate-900 capitalize truncate'>{post.title}</p>
            <p className='text-xs text-slate-500 mt-1 line-clamp-2'>{post.body}</p>
            </div>
            <Link href={`/posts/${postId}`} className='text-xs font-medium text-indigo-600 hover:text-indigo-700 shrink-0 flex items-center gap-1'>
            View <LucideExternalLink size={10} />
            </Link>
        </div>

    </div>
  )
}
