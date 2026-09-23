"use client"
import PageHeader from '../SharedComponents/PageHeader/pageHeader'
import Btn from '../BtnComponent/btn'
import Seachbar from '../layout/seachbar'
import AuthorsDropwDown from './authorsDropwDown'
import { usePosts } from '@/src/hooks/usePosts'
import { useState,useMemo,useEffect } from 'react'
import { useUsers } from "@/src/hooks/useUsers";
import SortDropDown from '../SharedComponents/SortDropDown/sortDropDown'
import PostSection from './PostGrid/postSection'
import CreatePostCard from './CreatePost/createPostCard'

export default function MembersComp() {
  const {posts,loading:postLoading,error:postError}=usePosts();
  const {users,loading:userLoading,error:userError}=useUsers();
  const [isOpen,setIsOpen]=useState(false)

  const [selectedAuthor,setSelectedAuthor]=useState("");
  const sorts=["Newest","Oldest","Title A-Z","Title Z-A"]
  const [selectedSort,setSelectedSort]=useState("");
  const [searchQuery,setSearchQuery]=useState("");
  const [currentPage,setCurrentPage]=useState(1)

  useEffect(()=>{
    setCurrentPage(1);
  },[searchQuery,selectedAuthor,selectedSort])

  const authorName=useMemo(()=>{
    const map = new Map <number,string>();
    users.forEach((u) => map.set(u.id, u.name));
  return map; 
  },[users])

  const itemsPerPage = 12;

  const filteredPosts=useMemo(()=>{
      return posts
      .filter((post)=>{
        const matchSearch=
        !searchQuery.trim() || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.body.toLowerCase().includes(searchQuery.toLowerCase());
        const matchAuthor=!selectedAuthor || authorName.get(post.userId)===selectedAuthor;
        return matchSearch && matchAuthor
      }).sort((a,b)=>{
        if(selectedSort==="Oldest") return a.id-b.id
        if(selectedSort==="Title A-Z") return a.title.localeCompare(b.title)
        if(selectedSort==="Title Z-A") return b.title.localeCompare(a.title);
        return b.id-a.id
      })

  },[posts,selectedAuthor,selectedSort,searchQuery])

  const paginatedPost=useMemo(()=>{
      const startIndex=(currentPage-1)*itemsPerPage;
      return filteredPosts.slice(startIndex,startIndex+itemsPerPage);
  },[filteredPosts,currentPage,itemsPerPage])


  const totalPages=Math.ceil(filteredPosts.length/itemsPerPage)||1;



  return (
    <div className='flex flex-col p-4 sm:p-6 gap-5 sm:gap-6 w-full'>
      <PageHeader
        title="Posts"
        subtitle="Explore posts shared by team members."
        action={
          <Btn btnText='Create Post' onClick={()=>setIsOpen(prev=>!prev)}/>
        }
      />
      <div className='bg-white rounded-xl border border-slate-100 p-4'>
        <div className='flex flex-col md:flex-row items-stretch md:items-center gap-3'>
          <div className='flex-1 min-w-[160px]'>
            <Seachbar
              width='w-full !flex'
              placeHolder='Search Posts...'
              value={searchQuery}
              onChange={(e)=>{
                setSearchQuery(e.target.value)
              }}
            />
          </div>
          <div className='flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0'>
            <AuthorsDropwDown
              posts={posts}
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
              users={users}
              className="flex-1 sm:w-56"
            />
            <SortDropDown
              sorts={sorts}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              className="flex-1 sm:w-40"
            />
          </div>
        </div>
      </div>
      <PostSection posts={paginatedPost} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {isOpen && <CreatePostCard setIsOpen={setIsOpen}/>}
    </div>
  )
}
