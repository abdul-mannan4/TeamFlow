
import { getAlbums, createAlbums, updateAlbum, deleteAlbum } from "@/src/controllers/albumController";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Albums } from "@/src/types/albums";

export const fetchAlbums=createAsyncThunk(
    "albums/fetch",
    async(params?:{page?:number,limit?:number})=>{
        const albums=await getAlbums(params?.page,params?.limit);
        return albums;
    }
)

export const addAlbum=createAsyncThunk(
    "albums/create",
    async(album:Omit<Albums,"id">)=>{
        const newAlbum=await createAlbums(album);
        return newAlbum
    }
)

export const editAlbum = createAsyncThunk(
    "albums/update",
    async ({ id, album }: { id: number; album: Partial<Albums> }) => {
        const updated = await updateAlbum(id, album);
        return { ...album, id } as Albums;
    }
);

export const removeAlbum = createAsyncThunk(
    "albums/delete",
    async (id: number) => {
        await deleteAlbum(id);
        return id;
    }
);