"use client"
import { useAppDispatch,useAppSelector } from "../redux/hook";
import { useEffect,useState } from "react";
import { fetchComments,addComment } from "../redux/features/comments/commentThunk";
import { Comments } from "../types/comments";


export const useComments=(limit:number=20)=>{
    const [page,setPage]=useState(1)

    const dispatch=useAppDispatch();
    const comments=useAppSelector(state=>state.comments.data)
    const loading=useAppSelector(state=>state.comments.loading)
    const error=useAppSelector(state=>state.comments.error)

    useEffect(()=>{
        if(comments.length===0){
            dispatch(fetchComments()); 
        }
    },[dispatch,page,limit])

    const createComment=async(
        comment:Omit<Comments,"id">
    )=>{
        return await dispatch(addComment(comment))
    }

    const nextPage=()=>setPage((prev)=>prev+1);
    const prevPage=()=>setPage((prev)=>Math.max(1,prev-1))
    return {comments,loading,error,page,nextPage,prevPage,createComment}
}