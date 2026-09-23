import React from 'react'
import DeleteBtn from '../../../SharedComponents/DeleteBtn/deleteBtn'
import EditBtn from '../../../SharedComponents/EditBtn/editBtn'
import { useState } from 'react'
import type { Comments } from '@/src/types/comments'

export default function CommentCard({comment}:{comment: Comments}) {
    const [deleteBtn,setDeleteBtn]=useState(false)
    const [editBtn,setEditBtn]=useState(false)

    const initial =comment.name.split(" ").map((word)=>word[0]).slice(0,2).join("");
  return (
    <div className='px-5 py-4 hover:bg-slate-50/40 transition-colors group'>
        <div className='flex items-start gap-3'>
            <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700 shrink-0'>
                {initial}
            </div>
            <div className='flex-1 min-w-0'>
                <div className='flex items-baseline gap-2 flex-wrap'>
                    <p className='text-xs font-semibold text-slate-900 capitalize'>{comment.name}</p>
                    <p className='text-xs text-slate-400'>{comment.email}</p>
                </div>
                <p className='text-sm text-slate-600 mt-1.5 leading-relaxed'>
                    {comment.body}
                </p>
            </div>
            <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0' >
                <EditBtn onClick={()=>setEditBtn(prev=>!prev)} />
                <DeleteBtn onClick={()=>setDeleteBtn(prev=>!prev)} />
            </div>
        </div>

    </div>
  )
}
