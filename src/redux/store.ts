import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice"
import postReducer from "./features/posts/postSlice"
import photoReducer from "./features/photos/photoSlice"
import commentReducer from './features/comments/commentSlice'
import albumReducer from './features/albums/albumSlice'
import todoReducer from "./features/todos/todoSlice"


export const store=configureStore({
    reducer:{
        users:usersReducer,
        posts:postReducer,
        photos:photoReducer,
        comments:commentReducer,
        albums:albumReducer,
        todos:todoReducer
    },
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch