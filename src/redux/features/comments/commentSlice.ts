import { ApiState } from "../../State/apiState";
import { createSlice } from "@reduxjs/toolkit";
import type { Comments } from "@/src/types/comments";
import { fetchComments,addComment } from "./commentThunk";

type CommentState=ApiState<Comments[]>

const initialState:CommentState={
    data:[],
    loading:false,
    error:null,
}

const commentSlice=createSlice({
    name:"comments",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchComments.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchComments.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        builder.addCase(fetchComments.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to Fetch Comments"
        })

        builder.addCase(addComment.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(addComment.fulfilled,(state,action)=>{
            state.loading=false
            state.data.push(action.payload);
        })
        builder.addCase(addComment.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to Fetch Comments"
        })
    }
})

export default commentSlice.reducer