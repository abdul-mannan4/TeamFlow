"use client"
import { LucideX } from 'lucide-react'
import { useUsers } from '@/src/hooks/useUsers';
import { useState } from 'react';
import type { User } from '@/src/types/users';
import XBtn from '../../SharedComponents/XBtn/XBtn';
import CreationBtn from '../../SharedComponents/CreationBtn/creationBtn';

export default function CreatUserCard({setIsOpen}:{ setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;}) {
    const {users,createUser,loading,error}=useUsers();

    const [formData,setFormData]=useState<Omit<User,"id">>({    
    name:"",
    username:"",
    email:"",
    address:{
        street:"",
        city:"",
        zipCode:"",
     
    },
    phone:"",
    website:"",
    company:{
        name:"",
    }
    })

    const handleChange=(
        e:React.ChangeEvent<HTMLInputElement>
    )=>{
        const {name,value}=e.target
        setFormData((prev)=>({
                ...prev,
                [name]:value
        }))
    }
    
    const handleNestedChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
   
        const {name,value}=e.target
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }))
  
    }

    const handleCompanyChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { value } = e.target;

  setFormData((prev) => ({
    ...prev,
    company: {
      ...prev.company,
      name: value,
    },
  }));
};

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

  try {
    const result = await createUser(formData);

    console.log("Created user:", result);

    setIsOpen(false);
  } catch (error) {
    console.error("Failed to create user:", error);
  }

}
  return (
    <div className='fixed inset-0 flex items-center justify-center p-4'>
        <div className='absolute inset-0 bg-black/40'>
        </div>
        <div className='relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
                <h2 className='text-base font-semibold text-slate-900'>Add Member</h2>
                    <XBtn setIsOpen={setIsOpen} />
            </div>
            <div className='px-6 py-5'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='col-span-2'>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>Full Name</label>
                                <input type="text"
                                 name="name" 
                                 value={formData.name} 
                                required
                                 onChange={handleChange}   
                                className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Leanne Graham'/>
                            </div>
                            <div>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>Email</label>
                                <input 
                                name="email"
                                value={formData.email}
                                required
                                onChange={handleChange}
                                className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" 
                                placeholder='leanne@example.com'/>
                            </div>
                            <div>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>Phone</label>
                                <input
                                name='phone'
                                value={formData.phone}
                                required
                                onChange={handleChange}
                                 className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" 
                                 placeholder='+1 555-000-1234'/>
                            </div>
                            <div>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>Website</label>
                                <input
                                name='website'
                                value={formData.website}
                                required
                                onChange={handleChange}
                                 className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text"  placeholder='example.com'/>
                            </div>
                            <div>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>UserName</label>
                                <input
                                name='username'
                                value={formData.username}
                                required
                                onChange={handleChange}
                                className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text"  placeholder='leanne'/>
                            </div>
                        </div>
                        <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider pt-1'>
                            Address
                        </p>
                        <div className='grid grid-cols-2 gap-3'>
                              <div className='col-span-2'>
                                <label  className='block text-xs font-medium text-slate-700 mb-1.5'>Street</label>
                                <input type="text"
                                name='street'
                                value={formData.address.street}
                                required  
                                onChange={handleNestedChange}
                                className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                 placeholder='123 Main St'/>
                            </div>
                            <div>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>City</label>
                                <input
                                name='city'
                                value={formData.address.city}
                                required
                                onChange={handleNestedChange}
                                className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" 
                                placeholder='New York'/>
                            </div>
                             <div>
                                <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>Zip Code</label>
                                <input 
                                name='zipCode'
                                value={formData.address.zipCode}
                                required
                                onChange={handleNestedChange}
                                className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" 
                                placeholder='10001'/>
                            </div>
                        </div>
                          <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider pt-1'>
                            Company
                        </p>
                        <div>
                            <label htmlFor="" className='block text-xs font-medium text-slate-700 mb-1.5'>Company Name</label>
                            <input
                            name='company'
                            value={formData.company.name}
                            required
                            onChange={handleCompanyChange}
                            className='w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" 
                            placeholder='Acme Corp'/>
                        </div>
                    </div>
                    <CreationBtn setIsOpen={setIsOpen} loading={loading} />
                </form>
            </div>
        </div>
    </div>
  )
}
