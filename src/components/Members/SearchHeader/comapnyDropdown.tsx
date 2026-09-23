"use client"
import React from 'react'

import { useState } from 'react';
import { useUsers } from '@/src/hooks/useUsers'
import type { User } from '@/src/types/users';
import { ChevronDown } from 'lucide-react';
import DropDownBtn from '../../SharedComponents/DropDownBtn/dropDownBtn';
import UseClickOutside from '@/src/hooks/useClickOutside';

export default function ComapnyDropdown({
  users,
  selectedCompany,
  setSelectedCompany,
  className = "w-56",
}: {
  users: User[];
  selectedCompany: string;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const companies = [
    ...new Set(users.map((user) => user.company.name))
  ];

  const handleSelect = (company: string) => {
    setSelectedCompany(company);
    setIsOpen(false);
  };
    
  const dropdownRef = UseClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <DropDownBtn selectedComponent={selectedCompany} isOpen={isOpen} setIsOpen={setIsOpen} placeholder='Select Company' />
            

            {isOpen && (
                <div className='absolute left-0 top-full z-50 w-full mt-2 rounded-lg border border-slate-200 bg-white p-1 shadow-lg'>
                         <button
  type="button"
  onClick={() => handleSelect("")}
  className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
    selectedCompany === ""
      ? "bg-indigo-50 text-indigo-600"
      : "text-slate-600"
  }`}
>
  All Companies
</button>


                    {companies.map((company)=>(
                        <button 
                        type='button'
                        key={company}
                        onClick={()=>handleSelect(company)}
                                      className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
                selectedCompany === company
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-700"
              }`}
 >
                            {company}
                        </button>
                    ))}
                </div>
            )}
    </div>
  )
}
