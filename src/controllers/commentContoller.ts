import type { Comments } from "../types/comments";

export const getComments = async (
  page?: number,
  limit?: number
): Promise<Comments[]> => {
  const url = page && limit
    ? `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
    : `https://jsonplaceholder.typicode.com/comments`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const comments: Comments[] = await response.json();
  return comments;
};

export const createComment=async(
  comment:Omit<Comments,"id">
):Promise<Comments>=>{
  const response=await fetch(
    "https://jsonplaceholder.typicode.com/comments",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(comment)
    }
  )
  if(!response.ok)
  {
    throw new Error ("Failed to create a Comment")
  }
  const newComment:Comments=await response.json();
      
  return newComment;
}