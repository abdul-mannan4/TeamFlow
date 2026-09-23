import { User } from '@/src/types/users'
import { LucideMail,LucidePhone,LucideGlobe,LucideExternalLink } from 'lucide-react'
import React from 'react'
import Link from 'next/link'


export default function CompanyDetail({user}:{user?:User}) {
  return (
    <div className='bg-white rounded-xl border border-slate-100 p-5'>
        <h3 className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3'>
            Contact
        </h3>
        <div className='space-y-1 text-sm'>
            <p className='font-medium'>{user?.company.name}</p>
            <p className='text-slate-500 text-xs italic'>"Multi-layered client-server neural-net"</p>
            <p className='text-slate-400 text-xs capitalize'>harness real-time e-markets</p>
        </div>
    </div>
  )
}
