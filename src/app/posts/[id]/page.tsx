"use client"
import React from 'react'
import { useParams } from 'next/navigation'

import SinglePostsection from '@/src/components/Posts/SinglePost/singlePostsection';

export default function PostDetail() {
    const param=useParams<{id:string}>();
    const postId=Number(param.id)
    
  return (
    <div>
        <SinglePostsection postId={postId} />
    </div>
  )
}
