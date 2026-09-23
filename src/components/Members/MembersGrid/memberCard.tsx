"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { LucideEye, LucidePencil, LucideTrash2 } from 'lucide-react'
import type { User } from '@/src/types/users'
import { useUsers } from '@/src/hooks/useUsers'
import EditUserCard from '../EditUser/editUserCard'

export default function MemberCard({ user }: { user: User }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { deleteMember } = useUsers()

  const inital = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteMember(user.id)
      } catch (err) {
        console.error("Failed to delete member:", err)
      }
    }
  }

  return (
    <>
      <tbody className='divide-y divide-slate-50'>
        <tr className='hover:bg-slate-50/60 transition-colors group'>
          <td className='px-5 2xl:px-6 py-3.5 2xl:py-4.5'>
            <div className='flex items-center gap-3 2xl:gap-3.5'>
              <div className='w-8 h-8 2xl:w-10 2xl:h-10 text-xs 2xl:text-sm rounded-full flex items-center justify-center font-bold text-white shrink-0 bg-[rgb(8,145,178)] shadow-xs'>
                {inital}
              </div>
              <div>
                <p className='font-semibold text-slate-900 text-sm 2xl:text-base'>{user.name}</p>
              </div>
            </div>
          </td>
          <td className='px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-slate-500 hidden md:table-cell text-sm 2xl:text-base'>
            @{user.username}
          </td>
          <td className='px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-slate-500 hidden lg:table-cell text-sm 2xl:text-base'>
            {user.email}
          </td>
          <td className='px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-slate-500 hidden lg:table-cell text-sm 2xl:text-base'>
            {user.company?.name}
          </td>
          <td className='px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-slate-500 hidden xl:table-cell text-sm 2xl:text-base'>
            {user.address?.city}
          </td>
          <td className='px-5 2xl:px-6 py-3.5 2xl:py-4.5'>
            <div className='flex items-center justify-end gap-1'>
              <Link href={`/members/${user.id}`} className='p-1.5 2xl:p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors'>
                <LucideEye size={15} className="2xl:w-4.5 2xl:h-4.5" />
              </Link>
              <button
                onClick={() => setIsEditOpen(true)}
                className='p-1.5 2xl:p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer' 
                title='Edit'
              >
                <LucidePencil size={15} className="2xl:w-4.5 2xl:h-4.5" />
              </button>
              <button 
                onClick={handleDelete}
                title='Delete'
                className='p-1.5 2xl:p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer'
              >
                <LucideTrash2 size={15} className="2xl:w-4.5 2xl:h-4.5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>

      {isEditOpen && <EditUserCard user={user} setIsOpen={setIsEditOpen} />}
    </>
  )
}
