import type { Photos } from "@/src/types/photos";
import { createSlice } from "@reduxjs/toolkit";
import { ApiState } from "../../State/apiState";
import { fetchPhotos,fetchPhotosbyAlbumId } from "./photoThunk";


type PhotosState=ApiState<Photos[]>

const initialState:PhotosState={
    data:[],
    loading:false,
    error:null
}

const photoSlice=createSlice({
    name:"photos",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchPhotos.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchPhotos.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        builder.addCase(fetchPhotos.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Photos"
        })
            builder.addCase(fetchPhotosbyAlbumId.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchPhotosbyAlbumId.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        builder.addCase(fetchPhotosbyAlbumId.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch Photos"
        })
    }
})

export default photoSlice.reducer