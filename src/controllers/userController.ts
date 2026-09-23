import { User } from "../types/users";

export const getUsers=async(
    page?:number,
    limit?:number

):Promise<User[]>=>{

        const URL= page !== undefined && limit !== undefined ?
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`:"https://jsonplaceholder.typicode.com/users"
        const response =await fetch(
            URL
        )
        if(!response.ok)
        {
            throw new Error ("Failed to fetch")
        }

        const users:User[]=await response.json();

    return users;
}

export const createUser=async(
    user:Omit<User,"id">
): Promise<User>=>{

    const response=await fetch(
        "https://jsonplaceholder.typicode.com/users",
    
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
    },
        body:JSON.stringify(user)
}
)
   if(!response.ok)
        {
            throw new Error ("Failed to create user")
        }
    const newUser:User=await response.json();

    return newUser;
}

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const updatedUser: User = await response.json();
  return updatedUser;
};

export const deleteUser = async (id: number): Promise<number> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return id;
};