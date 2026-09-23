"use client"
import React from 'react'
import {LayoutGrid,Users,FileText,CheckSquare,FolderOpen} from 'lucide-react'
import Logo from './logo'
import { title } from 'process'
import SidebarLinks from './sidebarLinks'
import { X } from 'lucide-react'

export default function Sidebar({onClose}:{onClose?:()=>void}) {

    const navLinks=[
        {logo:LayoutGrid,title:"Dashboard", href:"/"},
         {logo:Users,title:"Members",href:"/members"},
          {logo:FileText,title:"Posts",href:"/posts"},
           {logo:CheckSquare,title:"Tasks",href:"/tasks"},
            {logo:FolderOpen,title:"Albums",href:"/albums"},
    ]
 

  return (
    <div className='flex flex-col h-full w-full bg-white'>
      <div className='flex justify-between items-center px-6 h-[70px] sm:h-[81px] border-b border-gray-200 shrink-0'>
        <Logo />
        <button
          onClick={onClose}
          type="button"
          aria-label="Close Sidebar"
          className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer">
          <X size={22} />
        </button>
      </div>
      <div className='flex-1 overflow-y-auto px-4 2xl:px-5 py-6 2xl:py-8 space-y-1.5 2xl:space-y-2.5'>
        <p className='px-3 font-bold text-xs 2xl:text-sm text-slate-400 uppercase tracking-wider mb-3 2xl:mb-4'>Workspace</p>
        {navLinks.map((link) => (
          <SidebarLinks
            key={link.title}
            logo={link.logo}
            title={link.title}
            href={link.href}
            onClick={onClose}
          />
        ))}
      </div>
    </div>
  );

 
  
}
