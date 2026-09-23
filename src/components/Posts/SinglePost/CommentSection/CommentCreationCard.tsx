import React, { FormEvent } from 'react'
import XBtn from '../../../SharedComponents/XBtn/XBtn'
import { useState } from 'react'
import { useComments } from '@/src/hooks/useComments'
import CreationBtn from '../../../SharedComponents/CreationBtn/creationBtn'
import InputComponent from '../../../SharedComponents/InputComponent/inputComponent'
import TextAreaComponent from '../../../SharedComponents/TextAreaComponent/textAreaComponent'
import { Post } from '@/src/types/post'

export default function CommentCreationCard({setIsOpen,post}:{setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,post?:Post}) {

    const {comments,createComment,loading:commentLoading,error:commentError}=useComments();
    const postId=post?.id
    const [formData,setFormData]=useState({
            name:"",
            email:"",
            body:""
        })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
          if (!post?.id) {
      console.error("No valid post ID found");
      return;
    }
        try {
            await createComment({
                ...formData,
                postId:post.id
            });
            setIsOpen(false);
        } catch(error){
            console.log("Failed to create a comment",error)
        }
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
        <div className='absolute inset-0 bg-black/40'>
        </div>
        <div className='relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
                <h2 className='text-base font-semibold text-slate-900'> 
                    Add Comment
                </h2>
                <XBtn setIsOpen={setIsOpen}/>
            </div>
            <div className='px-6 py-5'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <InputComponent name='name' value={formData.name} onChange={handleChange} label='Name' 
                        placeholder='Your Name'/>
                        <InputComponent name='email' value={formData.email} onChange={handleChange} label='Email' 
                        placeholder='your@email.com'/>
                        <TextAreaComponent name='body' value={formData.body} onChange={handleChange} label='Comment' 
                        placeholder='Write your comment...' />
                    </div>
                    
                    <CreationBtn setIsOpen={setIsOpen} loading={commentLoading} btnText='Add Comment'/>
                </form>

            </div>
        </div>
    </div>
  )
}
