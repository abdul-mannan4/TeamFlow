import { fetchPosts, addPost, editPost, removePost } from "./postThunk";
import { createSlice } from "@reduxjs/toolkit";
import type { Post } from "@/src/types/post";
import type { ApiState } from "../../State/apiState";

type PostState=ApiState<Post[]>

const initialState:PostState={
    data:[],
    loading:false,
    error:null
}

const PostSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        builder.addCase(fetchPosts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Posts"
        })
        builder.addCase(addPost.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(addPost.fulfilled,(state,action)=>{
            state.loading=false
            state.data.unshift(action.payload)
        })
        builder.addCase(addPost.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Posts"
        })

        // Edit Post
        builder.addCase(editPost.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(editPost.fulfilled,(state,action)=>{
            state.loading=false
            const index = state.data.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...action.payload };
            }
        })
        builder.addCase(editPost.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to update post"
        })

        // Remove Post
        builder.addCase(removePost.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(removePost.fulfilled,(state,action)=>{
            state.loading=false
            state.data = state.data.filter((p) => p.id !== action.payload);
        })
        builder.addCase(removePost.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to delete post"
        })
    }
}
)
export default PostSlice.reducer;