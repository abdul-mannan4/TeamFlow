import type { Todos } from "@/src/types/todo";
import { fetchTodos, addTask, editTask, removeTask } from "./todoThunk";
import { createSlice } from "@reduxjs/toolkit";
import { ApiState } from "../../State/apiState";

type todoState=ApiState<Todos[]>

const initialState:todoState={
    data:[],
    loading:false,
    error:null
}

const todoSlice=createSlice({
    name:"todos",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTodos.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchTodos.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        builder.addCase(fetchTodos.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Todos"
        })

        builder.addCase(addTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(addTask.fulfilled,(state,action)=>{
            state.loading=false
            state.data.unshift(action.payload)
        })
        builder.addCase(addTask.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Todos"
        })

        // Edit Task
        builder.addCase(editTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(editTask.fulfilled,(state,action)=>{
            state.loading=false
            const index = state.data.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...action.payload };
            }
        })
        builder.addCase(editTask.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to update task"
        })

        // Remove Task
        builder.addCase(removeTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(removeTask.fulfilled,(state,action)=>{
            state.loading=false
            state.data = state.data.filter((t) => t.id !== action.payload);
        })
        builder.addCase(removeTask.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to delete task"
        })
    }
})
export default todoSlice.reducer