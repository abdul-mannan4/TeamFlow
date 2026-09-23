
import type { Post } from "../types/post";

export const getPosts=async():Promise<Post[]>=>{

    const response=await fetch(
        "https://jsonplaceholder.typicode.com/posts");
    
        if(!response.ok)
        {
            throw new Error("Failed to fetch posts")
        }
        const posts:Post[]=await response.json();

    return posts
}

export const createPost=async(post:Omit<Post,"id">):Promise<Post>=>{
    const response=await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(post)
        }
    )
    const newPost:Post=await response.json();

    return newPost;
}

export const updatePost = async (
    id: number,
    post: Partial<Post>
): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error("Failed to update post");
    }
    const updatedPost: Post = await response.json();
    return updatedPost;
};

export const deletePost = async (id: number): Promise<number> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete post");
    }
    return id;
};