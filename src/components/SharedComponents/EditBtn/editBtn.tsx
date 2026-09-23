import React from 'react'
import { LucidePencil } from 'lucide-react'

export default function EditBtn({onClick}:{onClick:()=>void}) {
  return (
    <button className='p-1 cursor-pointer text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors' onClick={onClick}>
        <LucidePencil size={12}/>
    </button>
  )
}
