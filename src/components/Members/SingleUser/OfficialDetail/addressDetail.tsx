import { User } from '@/src/types/users'
import { LucideMail,LucidePhone,LucideGlobe,LucideExternalLink } from 'lucide-react'
import React from 'react'
import Link from 'next/link'


export default function AddressDetailCard({user}:{user?:User}) {
    console.log(user?.address.zipCode)
  return (
    <div className='bg-white rounded-xl border border-slate-100 p-5'>
        <h3 className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3'>
            Address
        </h3>
        <div className='space-y-2.5 text-sm'>
            <div className='flex items-center gap-2.5 text-slate-700'>
                <span className='truncate' >{user?.address.city}</span>
            </div>
            <div className='flex items-center gap-2.5 text-slate-700'>
                <span className='truncate'>{user?.address.street}</span>
            </div>
            <div className='flex items-center gap-2.5 text-slate-700'>
                
              <span className='truncate'>{user?.company.name}</span>
            </div>
        </div>
    </div>
  )
}
