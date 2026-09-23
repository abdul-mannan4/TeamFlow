"use client"
import React from 'react'
import { useTodos } from '@/src/hooks/useTodos'
import ProgressCard from './progressCard'
type Props={
    totalTasks:number,
    completedTasks:number,
    pendingTasks:number
}


export default function ProgressSection({totalTasks,completedTasks,pendingTasks}:Props) {

   

  return (
    <div className='grid grid-cols-3 gap-4'>
        <ProgressCard size={totalTasks} text='Total' textColor1='text-slate-900' textColor2='text-slate-500' bgColor='bg-slate-100'/>
        <ProgressCard size={completedTasks} text='Completed' textColor1='text-green-700' textColor2='text-slate-500' bgColor='bg-green-50'/>
        <ProgressCard size={pendingTasks} text='Pending' textColor1='text-amber-700' textColor2='text-slate-500' bgColor='bg-amber-50'/>
    </div>
  )
}
