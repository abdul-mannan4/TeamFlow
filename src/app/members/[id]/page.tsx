"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import SingleUserSection from '@/src/components/Members/SingleUser/singleUserSection';
export default function MemberDetail() {

    const param=useParams<{id:string}>();
    const userId=Number(param.id)
  return (
    <div> 
      
    <SingleUserSection userId={userId}/>
    </div>
  )
}
