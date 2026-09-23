import { User } from '@/src/types/users'
import React from 'react'
import ContactDetailCard from './contactDetailCard'
import AddressDetailCard from './addressDetail'
import CompanyDetail from './companyDetail'

export default function OfficialDetail({userId,user}:{userId:number,user?:User}) {
  return (
    <div className='grid md:grid-cols-3 gap-4'>
            <ContactDetailCard user={user} />
            <AddressDetailCard user={user} />
            <CompanyDetail user={user} />
    </div>
  )
}
