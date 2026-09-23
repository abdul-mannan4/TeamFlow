"use client"
import React from 'react'
import MainHeading from '../mainHeading'
import { useUsers } from '@/src/hooks/useUsers'
import MemberCard from './memberCard'
import { User } from 'lucide-react'

export default function MemberGrid() {
  const{users,loading,error}=useUsers();
  const recentUsers=[...users].sort((a,b)=>b.id-a.id).slice(0,5).map((user)=>({...user,initials:user.name.split(" ").map((word)=>word[0]).slice(0,2).join("").toUpperCase()}))

  return (
    <div className='bg-white rounded-xl border border-slate-100/80 overflow-hidden'>
        <MainHeading title="Recent Members" btnName="View all" href='/members'/>
        <div className='divide-y divide-slate-50'>
          {recentUsers.map((user)=>(
            <MemberCard key={user.id} initials={user.initials} userName={user.username} email={user.email} id={user.id}/>
          ))}
        </div>
    </div>
  )
}
