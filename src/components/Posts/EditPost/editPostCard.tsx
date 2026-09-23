"use client"
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Post } from '@/src/types/post'
import { usePosts } from '@/src/hooks/usePosts'
import XBtn from '../../SharedComponents/XBtn/XBtn'
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn'

export default function EditPostCard({
  post,
  setIsOpen,
}: {
  post: Post
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [mounted, setMounted] = useState(false)
  const { updatePost, loading } = usePosts()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [formData, setFormData] = useState({
    title: post.title || "",
    body: post.body || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updatePost(post.id, {
        ...formData,
        userId: post.userId,
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to update post:", error)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center p-4 z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={() => setIsOpen(false)} />
      <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
          <h2 className='text-base font-semibold text-slate-900'>Edit Post</h2>
          <XBtn setIsOpen={setIsOpen} />
        </div>
        <div className='px-6 py-5'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  required
                  onChange={handleChange}
                  className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Post Title'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Body</label>
                <textarea
                  name='body'
                  value={formData.body}
                  required
                  rows={5}
                  onChange={handleChange}
                  className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Post Body'
                />
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
