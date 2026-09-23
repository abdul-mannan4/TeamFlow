import React from "react";

export default function FilterBtn({
  btnText,
  selected,
  onClick,
  css,
}: {
  btnText: string;
  selected: boolean;
  onClick: () => void;
  css?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        css ||
        "w-full px-4 2xl:px-5 py-3 2xl:py-3.5 text-[16px] 2xl:text-[18px] font-medium capitalize transition-colors cursor-pointer text-center "

      } ${
        selected
          ? "bg-indigo-600 text-white shadow-xs font-semibold"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {btnText}
    </button>
  );
}