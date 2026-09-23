import React from 'react'

type Props={
    totalProgress:number,
    completedTasks:number,
    pendingTasks:number
}

export default function ProgressBar({totalProgress,completedTasks,pendingTasks}:Props) {
  return (
    <div className='bg-white rounded-xl border border-slate-100/80 px-4 sm:px-5 2xl:px-6 py-4 2xl:py-5 w-full'>
      <div className='flex items-center justify-between text-slate-600 mb-2.5 2xl:mb-3'>
        <span className='font-semibold text-sm sm:text-base 2xl:text-lg'>Overall Completion</span>
        <span className='font-bold text-sm sm:text-base 2xl:text-lg text-indigo-600'>{totalProgress}%</span>
      </div>
      <div className='h-2 2xl:h-3 bg-slate-100 rounded-full overflow-hidden'>
        <div className='h-full bg-indigo-500 rounded-full transition-all duration-700' 
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>
      <div className='flex items-center justify-between mt-2.5 2xl:mt-3 text-xs sm:text-sm 2xl:text-base text-slate-400 font-medium'>
        <span>{completedTasks} Done</span>
        <span>{pendingTasks} Remaining</span>
      </div>
    </div>
  )
}
