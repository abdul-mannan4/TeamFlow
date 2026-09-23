import type { Albums } from "../types/albums";

export const getAlbums = async (
  page?: number,
  limit?: number,
): Promise<Albums[]> => {
  const url =
    page !== undefined && limit !== undefined
      ? `https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`
      : "https://jsonplaceholder.typicode.com/albums";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Albums");
  }
  const albums: Albums[] = await response.json();
  return albums;
};


export const createAlbums = async (
  album: Omit<Albums, "id">
): Promise<Albums> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(album)
    }
  )
  if (!response.ok) {
    throw new Error("Failed to create a users")
  }
  const newAlbum: Albums = await response.json();

  return newAlbum;
}

export const updateAlbum = async (
  id: number,
  album: Partial<Albums>
): Promise<Albums> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  if (!response.ok) {
    throw new Error("Failed to update album");
  }
  const updatedAlbum: Albums = await response.json();
  return updatedAlbum;
};

export const deleteAlbum = async (id: number): Promise<number> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete album");
  }
  return id;
};

