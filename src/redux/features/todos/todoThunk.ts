import { createAsyncThunk} from "@reduxjs/toolkit";
import { getTodos, createTask, updateTask, deleteTask } from "@/src/controllers/todoController";
import type { Todos } from "@/src/types/todo";

export const fetchTodos=createAsyncThunk(
    "todos/fetch",
    async(params?:{page?:number,limit?:number})=>{
        const todos=await getTodos(params?.page,params?.limit)
        return todos;
    }
)

export const addTask=createAsyncThunk(
    "todos/create",
    async(task:Omit<Todos,"id">)=>{
        const newTask =await createTask(task);
        return newTask
    }
)

export const editTask = createAsyncThunk(
    "todos/update",
    async ({ id, todo }: { id: number; todo: Partial<Todos> }) => {
        const updated = await updateTask(id, todo);
        return { ...todo, id } as Todos;
    }
);

export const removeTask = createAsyncThunk(
    "todos/delete",
    async (id: number) => {
        await deleteTask(id);
        return id;
    }
);