import React from 'react'
import Link from 'next/link'
import { LucideArrowLeft } from 'lucide-react'

export default function BackBtn({href,text="Back to Posts"}:{href:string,text?:string}) {
  return (
    <Link
    href={`${href}`}
    className='inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors'>
        <LucideArrowLeft size={14} /> {text}
    </Link>
  )
}
