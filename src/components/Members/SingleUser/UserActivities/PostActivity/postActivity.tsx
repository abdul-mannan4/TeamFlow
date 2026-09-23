import { Post } from '@/src/types/post'
import React from 'react'
import PostActivityCard from './postActivityCard'
import { User } from '@/src/types/users'

export default function PostActivity({userPosts}:{userPosts:Post[]}) {
  return (
    <div className='space-y-3'>
            {userPosts.map((post)=>(
                <PostActivityCard key={post.id} post={post} /> 
            ))}
    </div>
  )
}
