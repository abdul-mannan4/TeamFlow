import React from 'react'
import { LucidePlus } from 'lucide-react'

export default function AddCommentBtn() {
  return (
    <button className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors'>
            <LucidePlus size={13} /> Add Comment
    </button>
  )
}
