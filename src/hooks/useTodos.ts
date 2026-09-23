"use client"
import { useAppDispatch,useAppSelector } from "../redux/hook";
import { useEffect,useState } from "react";
import { addTask, fetchTodos, editTask, removeTask } from "../redux/features/todos/todoThunk";
import type { Todos } from "../types/todo";

export const useTodos=(limit?:number)=>{
    const dispatch=useAppDispatch();
    const [page,setPage]=useState(1);

    const todos=useAppSelector(state=>state.todos.data);
    const loading=useAppSelector(state=>state.todos.loading)
    const error=useAppSelector(state=>state.todos.error)

    useEffect(()=>{
        if(todos.length===0){
            dispatch(fetchTodos())
        }
    },[dispatch,page,limit,todos.length])

    const createTask=async(task:Omit<Todos,"id">)=>{
        return dispatch(addTask(task))
    }

    const updateTaskItem = async (id: number, todo: Partial<Todos>) => {
        return dispatch(editTask({ id, todo }))
    }

    const deleteTaskItem = async (id: number) => {
        return dispatch(removeTask(id))
    }

    const nextPage=()=>setPage((prev)=>prev+1);
    const prevPage=()=>setPage(prev=>Math.max(1,prev-1))

    return {
        todos,
        loading,
        error,
        page,
        nextPage,
        prevPage,
        createTask,
        updateTask: updateTaskItem,
        deleteTask: deleteTaskItem
    }
}