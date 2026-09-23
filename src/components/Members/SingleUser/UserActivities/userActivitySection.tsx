import { User } from '@/src/types/users'
import React from 'react'
import FilterButton from './filterButton'
import { useState } from 'react'
import PostActivity from './PostActivity/postActivity'
import TaskActivity from './TaskActivity/taskActivity'
import AlbumActivity from './AlbumActivity/albumActivity'
import { usePosts } from '@/src/hooks/usePosts'
import { useTodos } from '@/src/hooks/useTodos'
import { useAlbums } from '@/src/hooks/useAlbums'

export default function UserActivitySection({user,}:{user?:User}) {

    const {posts,loading:postLoading,error:postError}=usePosts();
    const {todos,loading:todoLoading,error:todoError}=useTodos();
    const {albums,loading:albumLoading,error:albumError}=useAlbums();
    const userId=user?.id

    const userPosts=posts.filter((post)=>post.userId===user?.id);
    const totalPosts=userPosts.length;

    const userTodos=todos.filter((todo)=>todo.userId===user?.id);
    const totalTodos=userTodos.length;

    const userAlbums=albums.filter((album)=>album.userId===user?.id);
    const totalAlbums=userAlbums.length

    const [activeTab,setActiveTab]=useState<"Posts"|"Tasks"|"Albums">("Posts")


  return (
    <div className='bg-white rounded-xl border border-slate-100'>
        <div className='flex border-b border-slate-100 px-5'>
            <FilterButton text='Posts' length={totalPosts} active={activeTab==='Posts'} onClick={()=>setActiveTab("Posts")}/>
            <FilterButton text='Tasks' length={totalTodos} active={activeTab==="Tasks"} onClick={()=>setActiveTab("Tasks")}/>
            <FilterButton text='Albums' length={totalAlbums} active={activeTab==="Albums"} onClick={()=>setActiveTab("Albums")}/>
        </div>
        <div className='p-5'>
            {activeTab === "Posts" && <PostActivity userPosts={userPosts} />}
            {activeTab==="Tasks" && <TaskActivity userTasks={userTodos}/>}
            {activeTab==="Albums" && <AlbumActivity userAlbums={userAlbums}/>}
        </div>

    </div>
  )
}
