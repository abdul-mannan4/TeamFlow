"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Construction } from "lucide-react";
import XBtn from "../XBtn/XBtn";

export default function UnderConstructionModal({
  title = "Under Construction",
  featureName = "This feature",
  isOpen,
  setIsOpen,
}: {
  title?: string;
  featureName?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center border border-slate-100">
        <div className="absolute top-4 right-4">
          <XBtn setIsOpen={setIsOpen} />
        </div>

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
          <Construction size={28} />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          <span className="font-semibold text-slate-700">{featureName}</span> is currently under construction and will be available soon!
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body
  );
}
