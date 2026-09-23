import React from 'react'
import { LucideMessageSquare } from 'lucide-react'
import { Post } from '@/src/types/post'
import { useComments } from '@/src/hooks/useComments'
import Btn from '../../../BtnComponent/btn'
import { useState } from 'react'
import CommentCard from './commentCard'
import CommentCreationCard from './CommentCreationCard'


export default function CommentSection({post}:{post?:Post}) {

    const [isOpen,setIsOpen]=useState(false)
    const {comments,loading,error}=useComments();
    const postComments=comments.filter((comment)=>comment.postId===post?.id)
    const commentsLength=postComments.length;
  return (
    <div className='bg-white rounded-xl border border-slate-100'>
        <div className='flex items-center justify-between px-5 py-4 border-b border-slate-50'>
            <h3 className='text-sm font-semibold text-slate-900 flex items-center gap-2'>
            <LucideMessageSquare size={15} className='text-slate-400' />
            Comments ({commentsLength})
            </h3>
            <Btn btnText='Add Comment' css='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer' onClick={()=>setIsOpen(prev=>!prev)}/>
        </div>
        <div className='divide-y divide-slate-50'>
            {postComments.map((comment)=>(
                <CommentCard key={comment.id} comment={comment}/>
            ))}
        </div>
        {isOpen &&
        <CommentCreationCard setIsOpen={setIsOpen} post={post}/>
        }    
    </div>
  )
}
