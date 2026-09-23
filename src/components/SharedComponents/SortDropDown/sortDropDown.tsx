"use client"
import { useState } from "react"
import DropDownBtn from "../DropDownBtn/dropDownBtn"
import type { User } from "@/src/types/users";
import UseClickOutside from "@/src/hooks/useClickOutside";

export default function SortDropDown({
  component,
  selectedSort,
  setSelectedSort,
  sorts,
  className = "w-40",
}: {
  component?: User[];
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  sorts: string[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (sort: string) => {
    setSelectedSort(sort);
    setIsOpen(false);
  };
  const dropdownRef = UseClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
        <DropDownBtn selectedComponent={selectedSort} isOpen={isOpen} setIsOpen={setIsOpen} placeholder={sorts[0]}/>
         {isOpen && (
                <div className='absolute left-0 top-full z-50 w-full mt-2 rounded-lg border border-slate-200 bg-white p-1 shadow-lg'>
             <button
  type="button"
  onClick={() => handleSelect("")}
  className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
    selectedSort === ""
      ? "bg-indigo-50 text-indigo-600"
      : "text-slate-600"
  }`}
>
  {sorts[0]}
</button>


                    {sorts.slice(1).map((sort)=>(
                        <button 
                        type='button'
                        key={sort}
                        onClick={()=>handleSelect(sort)}
                                      className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
                selectedSort === sort
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-700"
              }`}
 >
                            {sort}
                        </button>
                    ))}
                </div>
            )}
    </div>
  )
}
