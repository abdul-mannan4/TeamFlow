import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function DropDownBtn({selectedComponent,setIsOpen,isOpen,placeholder}:{selectedComponent:string,setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,isOpen:boolean,placeholder:string}) {
  return (
    <div className="w-full">
      <button 
        type="button"
        onClick={()=>setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 2xl:px-5 py-3 2xl:py-3.5 text-[16px] 2xl:text-[18px] font-medium text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors'
      >
        <span className="truncate">{selectedComponent || placeholder }</span>
        <span className={`shrink-0 transition-transform duration-200 ${
          isOpen ? "rotate-180": ""}`}><ChevronDown className="2xl:w-5 2xl:h-5" /></span>
      </button>
    </div>
  )
}
