import React from 'react'
import {Zap} from 'lucide-react'

export default function Logo() {
  return (
    <div className='flex items-center gap-2.5'>
      <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-xs'>
        <Zap size={20} className="text-white"/>
      </div>
      <span className='font-bold text-xl sm:text-2xl text-slate-900 tracking-tight'>
        TeamFlow
      </span>
    </div>
  );
}
