"use client"
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Todos } from '@/src/types/todo'
import { useTodos } from '@/src/hooks/useTodos'
import { useUsers } from '@/src/hooks/useUsers'
import XBtn from '../../SharedComponents/XBtn/XBtn'
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn'

export default function EditTaskCard({
  task,
  setIsOpen,
}: {
  task: Todos
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [mounted, setMounted] = useState(false)
  const { updateTask, loading } = useTodos()
  const { users } = useUsers()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [formData, setFormData] = useState({
    title: task.title || "",
    userId: task.userId || (users[0]?.id ?? 1),
    completed: task.completed || false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else if (name === 'userId') {
      setFormData((prev) => ({
        ...prev,
        userId: Number(value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateTask(task.id, formData)
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center p-4 z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={() => setIsOpen(false)} />
      <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
          <h2 className='text-base font-semibold text-slate-900'>Edit Task</h2>
          <XBtn setIsOpen={setIsOpen} />
        </div>
        <div className='px-6 py-5'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Task Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  required
                  onChange={handleChange}
                  className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Task Title'
                />
              </div>

              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Assign to</label>
                <select
                  name='userId'
                  value={formData.userId}
                  onChange={handleChange}
                  className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex items-center gap-2 pt-1'>
                <input
                  type='checkbox'
                  id='completed'
                  name='completed'
                  checked={formData.completed}
                  onChange={handleChange}
                  className='w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
                />
                <label htmlFor='completed' className='text-sm text-slate-700 select-none cursor-pointer'>
                  Mark as completed
                </label>
              </div>
            </div>

            <CreationBtn setIsOpen={setIsOpen} loading={loading} btnText='Save Changes' />
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
