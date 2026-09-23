import { Photos } from "../types/photos";

export const getPhotos = async (
  page: number = 1,
  limit: number = 20
): Promise<Photos[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Photos");
  }
  const rawPhotos: Photos[] = await response.json();
  const photos = rawPhotos.map((photo) => ({
    ...photo,
    thumbnailUrl: `https://picsum.photos/seed/${photo.id}/150/150`,
    url: `https://picsum.photos/seed/${photo.id}/600/600`,
  }));

  return photos;
};

export const getPhotoCountsForAlbums = async (
  albumIds: number[]
): Promise<Record<number, number>> => {
  if (albumIds.length === 0) return {};

  const query = albumIds.map((id) => `albumId=${id}`).join("&");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?${query}`
  );
  if (!response.ok) return {};
  const photos: { albumId: number }[] = await response.json();

  const counts: Record<number, number> = {};
  photos.forEach((photo) => {
    counts[photo.albumId] = (counts[photo.albumId] || 0) + 1;
  });

  return counts;
};

export const getPhotosbyAlbum = async (
  albumId: number
): Promise<Photos[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  const rawPhotos: Photos[] = await response.json();
  const photos = rawPhotos.map((photo) => ({
    ...photo,
    thumbnailUrl: `https://picsum.photos/seed/${photo.id}/300/300`,
    url: `https://picsum.photos/seed/${photo.id}/800/800`,
  }));

  return photos;
};
