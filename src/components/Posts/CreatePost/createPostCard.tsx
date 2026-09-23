import React from 'react'
import XBtn from '../../SharedComponents/XBtn/XBtn'
import { usePosts } from '@/src/hooks/usePosts';
import { useState } from 'react';
import AuthorDropdown from '../../SharedComponents/MemberDropdown/authorDropDown';
import { useUsers } from '@/src/hooks/useUsers';
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn';


export default function CreatePostCard({setIsOpen}:{setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) {

    const [formData,setFormData]=useState({
    userId:0,
    title:"",
    body:""
    })
    const {posts,createPost,loading:postLoading,error:postError}=usePosts();
    const {users,loading:userLoading,error:userError}=useUsers();


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
                const result =await createPost(formData);
                
                setIsOpen(false)
        } catch(error){
            console.error("Failed to create user:", error);
        }
    }

    const handleChange=(
        e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    )=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div className='absolute inset-0 bg-black/40'></div>
             <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
                    <h2 className='text-base font-semibold text-slate-900'>
                            Create Post
                    </h2>
                    <XBtn setIsOpen={setIsOpen}/>
                </div>
                <div className='px-6 py-5'>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-1.5'>Author</label>
                            <AuthorDropdown users={users} value={formData.userId} onChange={(userId)=>
                                setFormData((prev)=>({
                                    ...prev,
                                    userId
                                }))
                            } />
                        </div>
                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-1.5'>Title</label>
                            <input type="text" 
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            placeholder='Select Title'
                            />
                        </div>
                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-1.5'>Body</label>
                            <textarea 
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            placeholder='Write Your Post'
                            required
                            className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none'
                            ></textarea>
                        </div>
                         <CreationBtn setIsOpen={setIsOpen} loading={postLoading} btnText='Add Post'/>
                    </form>


                </div>

             </div>

    </div>
  )
}
