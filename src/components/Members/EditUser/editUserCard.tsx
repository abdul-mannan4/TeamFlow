"use client"
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { User } from '@/src/types/users'
import { useUsers } from '@/src/hooks/useUsers'
import XBtn from '../../SharedComponents/XBtn/XBtn'
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn'

export default function EditUserCard({
  user,
  setIsOpen,
}: {
  user: User
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [mounted, setMounted] = useState(false)
  const { updateMember, loading } = useUsers()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [formData, setFormData] = useState<User>({
    id: user.id,
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    website: user.website || "",
    address: {
      street: user.address?.street || "",
      city: user.address?.city || "",
      zipCode: user.address?.zipCode || (user.address as any)?.zipcode || "",
    },
    company: {
      name: user.company?.name || "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }))
  }

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        name: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateMember(user.id, formData)
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to update user:", error)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center p-4 z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={() => setIsOpen(false)} />
      <div className='relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
          <h2 className='text-base font-semibold text-slate-900'>Edit Member</h2>
          <XBtn setIsOpen={setIsOpen} />
        </div>
        <div className='px-6 py-5'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-3'>
                <div className='col-span-2'>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    required
                    onChange={handleChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='Leanne Graham'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Username</label>
                  <input
                    type='text'
                    name='username'
                    value={formData.username}
                    required
                    onChange={handleChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='Bret'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    required
                    onChange={handleChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='Sincere@april.biz'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    required
                    onChange={handleChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='1-770-736-8031 x56442'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Website</label>
                  <input
                    type='text'
                    name='website'
                    value={formData.website}
                    required
                    onChange={handleChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='hildegard.org'
                  />
                </div>
              </div>

              <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider pt-1'>
                Address
              </p>
              <div className='grid grid-cols-2 gap-3'>
                <div className='col-span-2'>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Street</label>
                  <input
                    type='text'
                    name='street'
                    value={formData.address?.street || ""}
                    required
                    onChange={handleNestedChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='Kulas Light'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>City</label>
                  <input
                    type='text'
                    name='city'
                    value={formData.address?.city || ""}
                    required
                    onChange={handleNestedChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='Gwenborough'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1.5'>Zipcode</label>
                  <input
                    type='text'
                    name='zipCode'
                    value={formData.address?.zipCode || ""}
                    required
                    onChange={handleNestedChange}
                    className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    placeholder='92998-3874'
                  />
                </div>
              </div>

              <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider pt-1'>
                Company
              </p>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1.5'>Company Name</label>
                <input
                  type='text'
                  name='company'
                  value={formData.company?.name || ""}
                  required
                  onChange={handleCompanyChange}
                  className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Romaguera-Crona'
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
