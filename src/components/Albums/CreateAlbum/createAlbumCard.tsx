import React from 'react'
import XBtn from '../../SharedComponents/XBtn/XBtn'
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn'
import { useAlbums } from '@/src/hooks/useAlbums'
import AuthorDropdown from '../../SharedComponents/MemberDropdown/authorDropDown'
import { useState } from 'react'
import { useUsers } from '@/src/hooks/useUsers'



export default function CreateAlbumCard({setIsOpen}:{setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) {

    const {albums,createAlbum,loading:albumLoading,error:albumError}=useAlbums();
    const {users,loading:userLoading,error:userError}=useUsers();
    const [validationError, setValidationError] = useState<string | null>(null);
    const [formData,setFormData]=useState({
         userId:0,
        title:""
    })
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setValidationError(null);
            const {name,value}=e.target
            setFormData((prev)=>({
                ...prev,
                [name]:value
            }))
    }

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!formData.userId || formData.userId === 0) {
            setValidationError("Please select an author.");
            return;
        }
        try{
            await createAlbum(formData)
            setIsOpen(false);
        }
        catch(error){
            console.log("Failed to create an album",error);
        }
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
        <div className='absolute inset-0 bg-black/40'>
        </div>
        <div className='relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto'>
           
            <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
                <h2 className='text-base font-semibold text-slate-900'>Add Album</h2>
                <XBtn setIsOpen={setIsOpen} />
            </div>
            <div className='px-6 py-5'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <label className='block text-xs font-medium text-slate-700 mb-1.5'>Album Title</label>
                        <input type="text" 
                        name="title"
                        required 
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='e.g. Team Offsite 2025'
                        className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label className='block text-xs font-medium text-slate-700 mb-1.5'>Created by</label>
                        <AuthorDropdown users={users} value={formData.userId} onChange={(userId)=>{
                            setFormData((prev)=>(
                                {
                                    ...prev,
                                    userId
                                }
                            ))

                        }}/>
                    </div>
                    {validationError && (
                      <p className="text-xs text-red-600 font-medium">{validationError}</p>
                    )}
                    <CreationBtn setIsOpen={setIsOpen} loading={albumLoading} btnText='Create Album' />
                </form>

            </div>
        </div>

    </div>
  )
}
