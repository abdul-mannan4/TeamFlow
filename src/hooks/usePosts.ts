"use client"
import { useAppSelector,useAppDispatch } from "../redux/hook";
import { useEffect } from "react";
import { fetchPosts, addPost, editPost, removePost } from "../redux/features/posts/postThunk";
import type { Post } from "../types/post";

export const usePosts=()=>{

    const dispatch=useAppDispatch();
    const posts=useAppSelector(state=>state.posts.data)
    const loading=useAppSelector(state=>state.posts.loading)
    const error=useAppSelector(state=>state.posts.error)

    useEffect(()=>{
        if(posts.length===0)
        {
            dispatch(fetchPosts())
        }
    },[dispatch,posts.length])

    
    const createPost=async(post:Omit<Post,"id">)=>{
        return dispatch(addPost(post))
    }

    const updatePostItem = async (id: number, post: Partial<Post>) => {
        return dispatch(editPost({ id, post }))
    }

    const deletePostItem = async (id: number) => {
        return dispatch(removePost(id))
    }

    return {
        posts,loading,error,createPost,updatePost: updatePostItem,deletePost: deletePostItem
    }
}