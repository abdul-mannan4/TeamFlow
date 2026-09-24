import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/src/types/users";
import { addUser, fetchUsers, editUser, removeUser } from "./userThunk";
import type { ApiState } from "../../State/apiState";


type UserState=ApiState<User[]>


const initialState:UserState={
    data:[],
    loading:false,
    error:null,
}

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
              const localUsers = state.data.filter((user) => user.id > 10);
            state.data=[...action.payload,...localUsers]
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fecth users"
        })
        builder.addCase(addUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false
            state.data.unshift(action.payload)
        })
        builder.addCase(addUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fecth users"
        })

        // Edit User
        builder.addCase(editUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(editUser.fulfilled,(state,action)=>{
            state.loading=false
            const index = state.data.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...action.payload };
            }
        })
        builder.addCase(editUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to update user"
        })

        // Remove User
        builder.addCase(removeUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(removeUser.fulfilled,(state,action)=>{
            state.loading=false
            state.data = state.data.filter((u) => u.id !== action.payload);
        })
        builder.addCase(removeUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to delete user"
        })
    }
})

export default userSlice.reducer