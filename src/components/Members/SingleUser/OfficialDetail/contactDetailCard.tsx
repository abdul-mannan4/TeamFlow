import { User } from '@/src/types/users'
import { LucideMail,LucidePhone,LucideGlobe,LucideExternalLink } from 'lucide-react'
import React from 'react'
import Link from 'next/link'


export default function ContactDetailCard({user}:{user?:User}) {
  return (
    <div className='bg-white rounded-xl border border-slate-100 p-5'>
        <h3 className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3'>
            Contact
        </h3>
        <div className='space-y-2.5 text-sm'>
            <div className='flex items-center gap-2.5 text-slate-700'>
                <LucideMail size={13} className='text-slate-400'/>
                <span className='truncate' >{user?.email}</span>
            </div>
            <div className='flex items-center gap-2.5 text-slate-700'>
                <LucidePhone size={13} className='text-slate-400'/>
                <span className='truncate'>{user?.phone}</span>
            </div>
            <div className='flex items-center gap-2.5 text-slate-700'>
                <LucideGlobe size={13} className='text-slate-400'/>
                <Link href={`${user?.website}`}className='text-indigo-600 hover:underline flex items-center gap-1'>
                    {user?.website}
                    <LucideExternalLink size={10} />
                </Link>
            </div>
        </div>
    </div>
  )
}
