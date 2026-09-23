
import { getComments,createComment } from "@/src/controllers/commentContoller";
import { createAsyncThunk} from "@reduxjs/toolkit";
import type { Comments } from "@/src/types/comments";
export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (params?: { page?: number; limit?: number }) => {
    const comments = await getComments(params?.page, params?.limit);
    return comments;
  }
);

export const addComment=createAsyncThunk(
  "comment/create",
  async(comment:Omit<Comments,"id">)=>{
    const newComment= await createComment(comment)
    return newComment;
  }
)