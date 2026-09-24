import React from "react";

export default function InputComponent({
  value,
  name,
  onChange,
  label,
  placeholder,
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label:string;
  placeholder:string
  name:string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        name={name}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-xs"
      />
    </div>
  );
}
