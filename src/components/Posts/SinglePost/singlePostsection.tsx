import React from 'react'
import { usePosts } from '@/src/hooks/usePosts';
import BackBtn from '../../SharedComponents/BackBtn/backBtn';
import SinglePostCard from './singlePostCard';
import CommentSection from './CommentSection/commentSection';
export default function SinglePostsection({postId}:{postId:number}) {
    const {posts,loading,error}=usePosts();
        
        
        const post =posts.find((post)=>post.id===postId)
        const userId=post?.userId;
      
  return (
    <main className='flex-1 overflow-y-auto p-4 lg:p-6'>
        <div className='max-w-3xl mx-auto space-y-5'>
            <BackBtn href='/posts' />
            <SinglePostCard post={post} userId={userId} />
            <CommentSection post={post}/>
        </div>
    </main>
  )
}
