import { getPhotos,getPhotosbyAlbum } from "@/src/controllers/photoController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk(
  "photos/fetch",
  async ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) => {
    const photos = await getPhotos(page, limit);
    return photos;
  }
);


export const fetchPhotosbyAlbumId=createAsyncThunk(
  "photos/fetchByAlbumId",
  async(albumId:number)=>{
    const photos=await getPhotosbyAlbum(albumId);
    return photos;
  }
)