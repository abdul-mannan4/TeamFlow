import React from 'react'
import { LucideCircle,LucideCircleCheck } from 'lucide-react'
import { Todos } from '@/src/types/todo'

export default function TasksDetailCard({task}:{task:Todos}) {
    const isCompleted=task.completed;
  return (
    <div className='flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors'>
        {isCompleted ? 
        <LucideCircleCheck size={15} className='text-green-500 mt-0.5 shrink-0'/> : 
        <LucideCircle size={15} className='text-slate-300 mt-0.5 shrink-0'/>   
        }
        <span className={`text-sm ${isCompleted? " line-through text-slate-400":"text-slate-700"}`}>{task.title}</span>
    </div>
  )
}
