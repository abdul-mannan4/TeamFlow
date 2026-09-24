import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, createUser,updateUser, deleteUser } from "@/src/controllers/userController";
import type { User } from "@/src/types/users";

export const fetchUsers=createAsyncThunk(
    "users/fetch",
    async(params?:{page?:number;limit?:number})=>{
        const users=await getUsers(params?.page,params?.limit);
        return users
    }
)

export const addUser=createAsyncThunk(
    "users/create",
    async(user:Omit<User,"id">)=>{
        const newUser=await createUser(user);
        return newUser
    }
)

export const editUser = createAsyncThunk(
    "users/update",
    async ({ id, user }: { id: number; user: Partial<User> }) => {
        const updated = await updateUser(id, user);
        return { ...user, id } as User;
    }
);

export const removeUser = createAsyncThunk(
    "users/delete",
    async (id: number) => {
        await deleteUser(id);
        return id;
    }
);