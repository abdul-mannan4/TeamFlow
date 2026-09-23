"use client"
import { User } from '@/src/types/users'
import React, { useState } from 'react'
import { LucideMail,LucideBuilding2,LucideMapPin } from 'lucide-react'
import EditwithTextBtn from '@/src/components/SharedComponents/EditwithText/editwithTextBtn'
import EditUserCard from '../../EditUser/editUserCard'

export default function NameDetail({userId,user}:{userId:number,user?:User}) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const initial=user?.name.split(" ").map((word)=>word[0]).slice(0,2).join("")
  return (
    <>
      <div className='bg-white rounded-xl border border-slate-100 p-6'>
          <div className='flex flex-col sm:flex-row items-start gap-5'>
              <div className='w-16 h-16 text-xl rounded-full flex items-center justify-center font-semibold text-white shrink-0 
              bg-[rgb(8,145,178)]'>
                  {initial}
              </div>
              <div className='flex-1 min-w-0'>
                  <h2 className='text-xl font-semibold text-slate-900'>
                      {user?.name}
                  </h2>
                  <p className='text-sm text-slate-500'>@{user?.username}</p>
                  <div className='flex flex-wrap gap-4 mt-3 text-sm text-slate-600'>
                      <span className='flex items-center gap-1.5'>
                          <LucideMail size={13} className='text-slate-400'/>
                          {user?.email}
                      </span>
                      <span className='flex items-center gap-1.5'>
                          <LucideBuilding2 size={13} className='text-slate-400' />
                          {user?.company.name}
                      </span>
                      <span className='flex items-center gap-1.5'>
                          <LucideMapPin size={13} className='text-slate-400' />
                          {user?.address.city}
                      </span>
                  </div>
              </div>
              <EditwithTextBtn 
                text='Edit Member' 
                onClick={() => setIsEditOpen(true)}
              />
          </div>
      </div>

      {isEditOpen && user && (
        <EditUserCard user={user} setIsOpen={setIsEditOpen} />
      )}
    </>
  )
}
