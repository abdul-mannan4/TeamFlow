import React from 'react'
import { LucidePlus } from 'lucide-react'

export default function Btn({btnText,onClick,css}:{btnText?:string,onClick:()=>void,css?:string}) {
  return (
    <button  className={ css ||  "flex items-center gap-2 rounded-lg px-3.5 sm:px-4 2xl:px-5 py-2 2xl:py-2.5 text-sm sm:text-base 2xl:text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"} 
    onClick={onClick}
    >
      <span className='font-semibold text-lg sm:text-xl 2xl:text-2xl leading-none'><LucidePlus size={13} /></span>
      <span>{btnText}</span>
    </button>
  )
}
