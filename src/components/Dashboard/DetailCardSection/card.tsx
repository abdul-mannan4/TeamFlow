import React from 'react'
import { LucideIcon } from 'lucide-react'
import Logo from '../../layout/logo'

export default function Detailcard({logo:Icon,size,title,subtitle}:
    {logo:LucideIcon,size:number|string,title:string,subtitle:string}) 
    {
  return (
    <div className='bg-white rounded-xl border border-slate-100/80 p-4 sm:p-5 2xl:p-6 hover:border-indigo-100 hover:shadow-md transition-all flex flex-col justify-between'>
      <div>
        <div className='w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-3 2xl:mb-4'>
          <Icon size={22} className='text-indigo-600 2xl:w-6 2xl:h-6'/>
        </div>
        <p className='text-xl sm:text-2xl 2xl:text-3xl font-bold text-slate-900'>{size}</p>
        <p className='text-sm sm:text-base 2xl:text-lg font-semibold text-slate-700 mt-1 truncate'>{title}</p>
        <p className='text-xs 2xl:text-sm text-slate-400 mt-0.5 line-clamp-1'>{subtitle}</p>
      </div>
    </div>
  )
}
