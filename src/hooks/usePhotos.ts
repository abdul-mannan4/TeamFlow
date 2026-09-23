"use client";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { fetchPhotos,fetchPhotosbyAlbumId } from "../redux/features/photos/photoThunk";

export const usePhotos = (limit: number = 20, autoFetch: boolean = true) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const photos = useAppSelector((state) => state.photos.data);
  const loading = useAppSelector((state) => state.photos.loading);
  const error = useAppSelector((state) => state.photos.error);

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchPhotos({ page, limit }));
    }
  }, [dispatch, page, limit, autoFetch]);

  const usePhotobyAlbumId = async (albumId: number) => {
    return await dispatch(fetchPhotosbyAlbumId(albumId));
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return {
    photos,
    loading,
    error,
    page,
    nextPage,
    prevPage,
    setPage,
    usePhotobyAlbumId,
  };
};
