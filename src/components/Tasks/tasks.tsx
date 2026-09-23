"use client"
import PageHeader from '../SharedComponents/PageHeader/pageHeader'
import Btn from '../BtnComponent/btn'
import ProgressSection from './TaskProgress/progressSection'
import ProgressBar from './TaskProgress/progressBar'
import { useTodos } from '@/src/hooks/useTodos'
import FilterSectionn from './FiltersSection/filterSectionn'
import { useState } from 'react'
import CreateTaskCard from './CreateTask/createTaskCard'

export default function TasksComp() {

    const {todos,loading,error}=useTodos();
      const totalsTasks=todos.length;
      const completedTasks=todos.filter((todo)=>todo.completed).length
      const [isOpen,setIsOpen]=useState(false)
      const pendingTasks=totalsTasks-completedTasks;
      const taskProgress =
    todos.length === 0 ? 0 :Math.round( (completedTasks / todos.length) * 100);

  return (
    <div className='flex flex-col p-4 sm:p-6 gap-5 sm:gap-6 w-full'>
      <PageHeader
        title="Tasks"
        subtitle="Track tasks and progress across your team."
        action={
          <Btn btnText='Add Task' onClick={()=>setIsOpen(prev=>!prev)}/>
        }
      />
      <ProgressSection totalTasks={totalsTasks} completedTasks={completedTasks} pendingTasks={pendingTasks}/>
      <ProgressBar totalProgress={taskProgress} completedTasks={completedTasks} pendingTasks={pendingTasks}/>
      <FilterSectionn />
      {isOpen && <CreateTaskCard setIsOpen={setIsOpen}/>}
    </div>
  )
}
