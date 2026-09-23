import React from 'react'
import Link from 'next/link'

export default function MemberCard({initials,userName,email,id}:{initials:string,userName:string,email:string,id:number}){
  return (
    <Link href={`/members/${id}`} className='flex items-center gap-3 2xl:gap-3.5 px-5 2xl:px-6 py-3.5 2xl:py-4.5 hover:bg-slate-50/60 transition-colors'>
      <div className='w-8 h-8 2xl:w-10 2xl:h-10 text-xs 2xl:text-sm rounded-full flex items-center justify-center font-bold text-white shrink-0 bg-[rgb(8,145,178)] shadow-xs'>
        {initials}
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-sm 2xl:text-base font-semibold text-slate-900 truncate'>{userName}</p>
        <p className='text-xs 2xl:text-sm text-slate-400 truncate mt-0.5'>{email}</p>
      </div>
    </Link>
  )
}
