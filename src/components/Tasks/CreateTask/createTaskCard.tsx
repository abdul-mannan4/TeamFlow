import React from 'react'
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn'
import { useTodos } from '@/src/hooks/useTodos'
import XBtn from '../../SharedComponents/XBtn/XBtn';
import { useState } from 'react';
import AuthorDropdown from '../../SharedComponents/MemberDropdown/authorDropDown';
import { useUsers } from '@/src/hooks/useUsers';
import { LucideCheck } from 'lucide-react';

export default function CreateTaskCard({setIsOpen}:{setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
    const {createTask,todos,loading:todoLoading,error:todoError}=useTodos();
    const {users,loading:userLoading,error:userError}=useUsers();
    const [formData,setFormData]=useState({
     userId:0,
    title:"",
    completed:false
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            const {name,value}=e.target
            setFormData((prev)=>({
                ...prev,
                [name]:value
            }))
    }

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const result = await createTask(formData)
            setIsOpen(false)
        } catch(error){
            console.log("Failed to add a task",error)
        }
    }


  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
                    <h2 className='text-base font-semibold text-slate-900'>Create Task</h2>
                    <XBtn setIsOpen={setIsOpen} />
                </div>
                <div className='px-6 py-5'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                       
                        <div className='space-y-4'>
                            <label className='block text-xs font-medium text-slate-700 mb-1.5'>Task Title</label>
                            <input 
                              type="text" 
                              name='title'
                              required
                              value={formData.title}
                              onChange={handleChange}
                              placeholder='Enter task title...'
                              className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>
                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-1.5'>Assign to</label>
                            <AuthorDropdown users={users} value={formData.userId} onChange={(userId)=>
                                            setFormData((prev)=>({
                                                ...prev,
                                                userId
                                            }))
                                        } />

                        </div>
                        <button className='flex items-center gap-3 cursor-pointer' type="button"   onClick={() =>
    setFormData((prev) => ({
      ...prev,
      completed: !prev.completed,
    }))
  }>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0  ${formData.completed ? "bg-indigo-600 border-indigo-600" :"border-slate-300"} `} >
                                {formData.completed && <LucideCheck size={12} className='text-white text-lg'/>}
                            </div>
                            <span className='text-sm text-slate-700'>Mark as Completed</span>
                        </button>
                        <CreationBtn setIsOpen={setIsOpen} loading={todoLoading} btnText='Create Task' />
                    </form>
                </div>
        </div>

    </div>
  )
}
