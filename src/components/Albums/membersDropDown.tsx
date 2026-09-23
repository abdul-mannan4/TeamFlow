import React from "react";
import type { User } from "@/src/types/users";
import { useState } from "react";
import UseClickOutside from "@/src/hooks/useClickOutside";
import DropDownBtn from "../SharedComponents/DropDownBtn/dropDownBtn";

export default function MembersDropDown({
  users,
  selectedUser,
  setSelectedUser,
  className = "w-56",
}: {
  users: User[];
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = UseClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleSelect = (user: string) => {
    setSelectedUser(user);
    setIsOpen(false);
  };
  const members = users.map((user) => user.name);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <DropDownBtn
        placeholder="All Members"
        selectedComponent={selectedUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full mt-2 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          <button
            type="button"
            onClick={() => handleSelect("")}
            className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
              selectedUser === ""
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600"
            }`}>
            All Members
          </button>
          {members.map((member) => (
            <button
              type="button"
              key={member}
              onClick={() => handleSelect(member)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 ${
                selectedUser === member
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-700"
              }`}>
              {member}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
