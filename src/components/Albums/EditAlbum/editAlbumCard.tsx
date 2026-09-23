"use client"
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Albums } from '@/src/types/albums'
import { useAlbums } from '@/src/hooks/useAlbums'
import { useUsers } from '@/src/hooks/useUsers'
import XBtn from '../../SharedComponents/XBtn/XBtn'
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn'

export default function EditAlbumCard({
  album,
  setIsOpen,
}: {
  album: Albums
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [mounted, setMounted] = useState(false)
  const { updateAlbum, loading } = useAlbums()
  const { users } = useUsers()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [formData, setFormData] = useState({
    title: album.title || "",
    userId: album.userId || (users[0]?.id ?? 1),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'userId') {
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
      await updateAlbum(album.id, formData)
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to update album:", error)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center p-4 z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={() => setIsOpen(false)} />
      <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
          <h2 className='text-base font-semibold text-slate-900'>Edit Album</h2>
          <XBtn setIsOpen={setIsOpen} />
        </div>
        <div className='px-6 py-5'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Album Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  required
                  onChange={handleChange}
                  className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Album Title'
                />
              </div>

              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Created by</label>
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
            </div>

            <CreationBtn setIsOpen={setIsOpen} loading={loading} btnText='Save Changes' />
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
