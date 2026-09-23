import React from 'react'
import TaskGrid from './TaskGrid/taskGrid'
import MemberGrid from './MemberGrid/memberGrid'
export default function TaskMemberGrid() {
  return (
    <div className='flex flex-col space-y-6'>
        <TaskGrid />
        <MemberGrid />
    </div>
  )
}
