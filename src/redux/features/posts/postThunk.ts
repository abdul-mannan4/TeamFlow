import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost, deletePost } from "@/src/controllers/postController";
import type { Post } from "@/src/types/post";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async () => {
    const posts = await getPosts();

    return posts;
  }
);

export const addPost=createAsyncThunk(
  "posts/create",
  async(post:Omit<Post,"id">)=>{
    const newUser=await createPost(post)
    return newUser
  }
)

export const editPost = createAsyncThunk(
  "posts/update",
  async ({ id, post }: { id: number; post: Partial<Post> }) => {
    const updated = await updatePost(id, post);
    return { ...post, id } as Post;
  }
);

export const removePost = createAsyncThunk(
  "posts/delete",
  async (id: number) => {
    await deletePost(id);
    return id;
  }
);