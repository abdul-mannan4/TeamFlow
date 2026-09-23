"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import type { User } from "@/src/types/users";

type AuthorDropdownProps = {
  users: User[];
  value: number;
  onChange: (userId: number) => void;
};

export default function AuthorDropdown({
  users,
  value,
  onChange,
}: AuthorDropdownProps) {
  return (
    <div className="relative group">
      <select
        required
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full appearance-none
          px-3.5 py-2.5 pr-10
          text-sm text-slate-700
          bg-white
          border border-slate-200
          rounded-lg
          outline-none
          cursor-pointer
          transition-all duration-200
          hover:border-indigo-300
          hover:bg-slate-50
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-100
        "
      >
        <option value="" disabled>Select Author</option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* Custom arrow */}
      <div
        className="
          pointer-events-none
          absolute right-3 top-1/2
          -translate-y-1/2
          text-slate-400
          transition-transform duration-300
          group-hover:rotate-180
        "
      >
        <ChevronDown size={17} strokeWidth={2} />
      </div>
    </div>
  );
}