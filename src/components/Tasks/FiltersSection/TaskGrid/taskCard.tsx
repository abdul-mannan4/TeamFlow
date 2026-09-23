"use client"
import type { Todos } from '@/src/types/todo'
import { LucideCircleCheck, Circle, LucidePencil, LucideTrash2 } from 'lucide-react'
import { useUsers } from '@/src/hooks/useUsers'
import { useTodos } from '@/src/hooks/useTodos'
import { useState } from 'react'
import EditTaskCard from '../../EditTask/editTaskCard'

type Props={
    task:Todos
}

export default function TaskCard({task}:Props) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const { users } = useUsers()
    const { deleteTask, updateTask } = useTodos()

    const isCompleted = task.completed
    const authorName = users.find((user) => user.id === task.userId)?.name
    const initial = authorName?.split(" ").map((word) => word[0]).slice(0, 2).join("")

    const handleToggleComplete = async () => {
        try {
            await updateTask(task.id, {
                ...task,
                completed: !task.completed,
            })
        } catch (err) {
            console.error("Failed to toggle task:", err)
        }
    }

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
            try {
                await deleteTask(task.id)
            } catch (err) {
                console.error("Failed to delete task:", err)
            }
        }
    }

    return (
        <>
            <div className='flex items-center gap-4 px-5 2xl:px-6 py-3.5 2xl:py-4.5 hover:bg-slate-50/70 transition-colors group w-full'>
                <button 
                  className={`shrink-0 transition-colors cursor-pointer ${isCompleted ? "text-green-500" :"text-slate-300 hover:text-indigo-500"}`} 
                  onClick={handleToggleComplete}
                >
                   { isCompleted ? 
                       <LucideCircleCheck className="w-5 h-5 2xl:w-6 2xl:h-6" /> : <Circle className="w-5 h-5 2xl:w-6 2xl:h-6" />
                   }
                </button>
                <span className={`flex-1 text-sm sm:text-base 2xl:text-lg leading-relaxed ${isCompleted ? "line-through text-slate-400":"text-slate-700 font-medium"}`}>
                    {task.title}
                </span>
                <div className='flex items-center gap-2.5 shrink-0 sm:w-48 2xl:w-56'>
                    <div className='w-8 h-8 2xl:w-9 2xl:h-9 text-xs 2xl:text-sm rounded-full flex items-center justify-center font-bold text-white shrink-0 bg-[rgb(8,145,178)] shadow-xs'>
                        {initial}
                    </div>
                    <span className='text-xs 2xl:text-sm text-slate-600 font-medium hidden sm:block truncate min-w-0 flex-1'>
                        {authorName}
                    </span>
                </div>
                <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0'>
                    <button 
                        onClick={() => setIsEditOpen(true)}
                        className='p-1.5 2xl:p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer' 
                        title='Edit'
                    >
                        <LucidePencil size={14} className="2xl:w-4 2xl:h-4" />
                    </button>
                    <button 
                        onClick={handleDelete}
                        className='p-1.5 2xl:p-2 text-slate-400 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-md transition-colors'
                        title='Delete'
                    >
                        <LucideTrash2 size={14} className="2xl:w-4 2xl:h-4" />
                    </button>
                </div>
            </div>

            {isEditOpen && <EditTaskCard task={task} setIsOpen={setIsEditOpen} />}
        </>
    )
}
