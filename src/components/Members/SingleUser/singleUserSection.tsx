import React from 'react'
import BackBtn from '../../SharedComponents/BackBtn/backBtn'
import UserDetails from './UserDetail/userDetails'
import { useUsers } from '@/src/hooks/useUsers'
import OfficialDetail from './OfficialDetail/officialDetail'
import UserActivitySection from './UserActivities/userActivitySection'

export default function SingleUserSection({userId}:{userId:number}) {
        const {users,loading,error}=useUsers();
        const user=users.find((user)=> user.id===userId)

  return (
    <main className='flex-1 overflow-y-auto p-4 lg:p-6'>
        <div className='max-w-5xl mx-auto space-y-5'>
            <BackBtn href='/users' text='Back to Members'/>
            <UserDetails userId={userId} user={user} />
            <OfficialDetail userId={userId} user={user} />
            <UserActivitySection user={user} />
        </div>

    </main>
  )
}
