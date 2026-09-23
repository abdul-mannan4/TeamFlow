import React from "react";

export default function FilterButton({
  text,
  active,
  onClick,
  length
}: {
  text: string;
  active: boolean;
  onClick: () => void;
  length:number
}) {
  return (
    <button
      className={`px-4 py-3 text-sm font-medium border-b-2 cursor-pointer ${
        active
          ? "text-indigo-600 border-indigo-600"
          : "text-slate-500 border-transparent hover:text-slate-700"
      }`}
      onClick={onClick}>
      {text}({length})
    </button>
  );
}
