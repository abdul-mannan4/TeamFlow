"use client"
import { useAppDispatch,useAppSelector } from "../redux/hook";
import { fetchUsers, addUser, editUser, removeUser } from "../redux/features/users/userThunk";
import { useEffect ,useState} from "react";
import { User } from "../types/users";

export const useUsers=(limit?:number)=>{
const dispatch=useAppDispatch();
const [page,setPage]=useState(1);

const users=useAppSelector((state)=>state.users.data)
const loading=useAppSelector((state)=>state.users.loading)
const error=useAppSelector((state)=>state.users.error)

useEffect(()=>{
    if(users.length === 0){
        dispatch(fetchUsers({page,limit}))
    }
},[dispatch,page,limit,users.length])

const createUser=async(
    user:Omit<User,"id">
)=>{
    return await dispatch(addUser(user))
}

const updateMember = async (id: number, user: Partial<User>) => {
    return await dispatch(editUser({ id, user }));
};

const deleteMember = async (id: number) => {
    return await dispatch(removeUser(id));
};

const nextPage=()=>setPage((prev)=>prev+1);
const prevPage=()=>setPage((prev)=>Math.max(1,prev-1))
return{
    users,loading,error,nextPage,prevPage,createUser,updateMember,deleteMember
}
}