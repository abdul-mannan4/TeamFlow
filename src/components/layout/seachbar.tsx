import React from 'react'
import { Search } from 'lucide-react'

export default function Seachbar({width,placeHolder,onChange,value}:{width?:string,placeHolder?:string,
  onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void ,value?:string
}) {
  return (
     <div className={`${width} hidden md:flex px-3 2xl:px-4 py-2.5 2xl:py-3.5 text-sm 2xl:text-base bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus-within:ring-indigo-500 focus:border-transparent placeholder:text-slate-400 gap-3 items-center focus-within:border-indigo-500 `}>
          <Search size={22} className="text-gray-400 2xl:w-6 2xl:h-6 shrink-0" />
          <input
            placeholder={placeHolder}
            onChange={onChange}
            value={value}
            className="text-base 2xl:text-lg outline-none w-full placeholder:text-gray-400 bg-transparent"
          />
        </div>
  )
}
