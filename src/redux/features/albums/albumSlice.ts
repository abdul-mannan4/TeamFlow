import type { Albums } from "@/src/types/albums";
import { createSlice } from "@reduxjs/toolkit";
import { ApiState } from "../../State/apiState";
import { fetchAlbums, addAlbum, editAlbum, removeAlbum } from "./albumThunk";

type albumState=ApiState<Albums[]>;
const initialState:albumState={
    data:[],
    loading:false,
    error:null
}

const albumSlice=createSlice({
    name:"albums",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAlbums.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchAlbums.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload
        })
        builder.addCase(fetchAlbums.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Albums"
        })
        builder.addCase(addAlbum.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(addAlbum.fulfilled,(state,action)=>{
            state.loading=false;
            state.data.unshift(action.payload)
        })
        builder.addCase(addAlbum.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Albums"
        })

        // Edit Album
        builder.addCase(editAlbum.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(editAlbum.fulfilled,(state,action)=>{
            state.loading=false
            const index = state.data.findIndex((a) => a.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...action.payload };
            }
        })
        builder.addCase(editAlbum.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to update album"
        })

        // Remove Album
        builder.addCase(removeAlbum.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(removeAlbum.fulfilled,(state,action)=>{
            state.loading=false
            state.data = state.data.filter((a) => a.id !== action.payload);
        })
        builder.addCase(removeAlbum.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to delete album"
        })
    }
})

export default albumSlice.reducer