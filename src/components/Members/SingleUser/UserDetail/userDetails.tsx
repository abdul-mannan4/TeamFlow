import React from 'react'
import NameDetail from './nameDetail'
import { User } from '@/src/types/users'
import OfficialDetail from '../OfficialDetail/officialDetail'
export default function UserDetails({userId,user}:{userId:number,user?:User}) {
  return (
    <div>
        <NameDetail userId={userId} user={user}/>
        
    </div>
  )
}
