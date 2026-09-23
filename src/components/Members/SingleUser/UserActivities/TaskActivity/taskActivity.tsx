import React from 'react'
import StatusCheckBtn from './StatusCheckBtn/statusCheckBtn'
import { useState,useMemo } from 'react'
import { Todos } from '@/src/types/todo'
import TasksDetailCard from './TasksDetailSection/tasksDetailCard'

export default function TaskActivity({userTasks}:{userTasks:Todos[]}) {

    const [selectedFilter, setSelectedFilter] = useState("All")
    const filteredTasks=useMemo(()=>{
            return userTasks.filter((task)=>{
                return selectedFilter==="All" ||
                (selectedFilter==="Completed" && task.completed) ||
                (selectedFilter==="Pending" && !task.completed)
            })
    },[selectedFilter,userTasks])
  return (
    <div >  
        <StatusCheckBtn selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
        <div className='space-y-1.5'>
           { filteredTasks.map((task)=>(
                <TasksDetailCard key={task.id} task={task}/>
            ))}
        </div>
    </div>
  )
}
