"use client"
import type { User } from "@/src/types/users"
import { useState } from "react"
import DropDownBtn from "../../SharedComponents/DropDownBtn/dropDownBtn";
import UseClickOutside from "../../../hooks/useClickOutside";

export default function CityDropDown({
  users,
  selectedCity,
  setSelectedCity,
  className = "w-56",
}: {
  users: User[];
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const cities = [
    ...new Set(users.map((user) => user.address.city))
  ];
  const handleSelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  const dropdownRef = UseClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <DropDownBtn selectedComponent={selectedCity} isOpen={isOpen} setIsOpen={setIsOpen} placeholder="Select City"/>
                   
       
        {isOpen && (
        <div className='absolute left-0 top-full z-50 w-full mt-2 rounded-lg border border-slate-200 bg-white p-1 shadow-lg'>

                        <button
  type="button"
  onClick={() => handleSelect("")}
  className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
    selectedCity === ""
      ? "bg-indigo-50 text-indigo-600"
      : "text-slate-600"
  }`}
>
 All Cities
</button>
            {cities.map((city)=>(
                <button
                type="button"
                key={city}
                onClick={()=>handleSelect(city)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
                selectedCity === city
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-700"
              }`}
                >
                    {city}
                </button>
            )
        
        )}
        </div>
        )}

    </div>
  )
}
