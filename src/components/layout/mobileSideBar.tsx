import React from "react";
import { X } from "lucide-react";
import Sidebar from "./sidebar";

export default function MobileSideBar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[244px] bg-white z-50 shadow-lg transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0 " : "-translate-x-full"
        }`}>
      
        <Sidebar onClose={onClose}/>
      </div>
    </div>
  );
}
