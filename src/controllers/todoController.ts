import type { Todos } from "../types/todo";

export const getTodos=async(
    page?:number,
    limit?:number
):Promise<Todos[]>=>{
    const URL=page && limit ? `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}` :
    "https:jsonplaceholder.typicode.com/todos"

    const response=await fetch(
        URL
    )
    if(!response.ok)
    {
        throw new Error ("Failed to fetch Todos")
    }
    const todos:Todos[]=await response.json();
    return todos;
}


export const createTask=async(
    todo:Omit<Todos,"id">
):Promise<Todos>=>{
    const response=await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(todo)
        }
    )

    const newTask:Todos=await response.json();
    return newTask;
}

export const updateTask = async (
    id: number,
    todo: Partial<Todos>
): Promise<Todos> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
    const updatedTask: Todos = await response.json();
    return updatedTask;
};

export const deleteTask = async (id: number): Promise<number> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
    return id;
};