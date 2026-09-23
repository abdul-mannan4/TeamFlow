import React from 'react'
import { LucideTrash2 } from 'lucide-react'

export default function DeleteBtn({onClick}:{onClick:()=>void}) {
  return (
    <button className='p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded cursor-pointer transition-colors' onClick={onClick}>
        <LucideTrash2 size={12} />
    </button>
  )
}
