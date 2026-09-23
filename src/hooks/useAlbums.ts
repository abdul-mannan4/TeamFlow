"use client"
import { useEffect,useState } from "react"
import { fetchAlbums, addAlbum, editAlbum, removeAlbum } from "../redux/features/albums/albumThunk"
import { useAppSelector,useAppDispatch } from "../redux/hook"
import { Albums } from "../types/albums"

export const useAlbums=(limit?:number)=>{

    const dispatch=useAppDispatch();
    const [page,setpage]=useState(1);

    const albums=useAppSelector(state=>state.albums.data);
    const loading=useAppSelector(state=>state.albums.loading);
    const error=useAppSelector(state=>state.albums.error);

    useEffect(()=>{
        if(albums.length===0)
        {
            dispatch(fetchAlbums({page,limit}))
        }
    },[dispatch,page,limit,albums.length])

    const createAlbum=async(
        album:Omit<Albums,"id">
    )=>{
        return dispatch(addAlbum(album))
    }

    const updateAlbumItem = async (id: number, album: Partial<Albums>) => {
        return dispatch(editAlbum({ id, album }))
    }

    const deleteAlbumItem = async (id: number) => {
        return dispatch(removeAlbum(id))
    }

    const nextPage=()=>setpage((prev)=>prev+1)
    const prevPage=()=>setpage((prev)=>Math.max(1,prev-1))

    return {
        albums,
        loading,
        error,
        page,
        nextPage,
        prevPage,
        createAlbum,
        updateAlbum: updateAlbumItem,
        deleteAlbum: deleteAlbumItem
    }
}