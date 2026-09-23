import React from 'react'
import { LucideX } from 'lucide-react'

export default function 
({setIsOpen}:{setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div>
        
         <button className='text-slate-400 hover:text-slate-600 cursor-pointer transition-colors rounded-md p-1 hover:bg-slate-100  transition-transform hover:rotate-180' onClick={()=>setIsOpen(false)}>
                    <LucideX  size={18}/>
                </button>
    </div>
  )
}
