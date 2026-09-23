"use client"
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useState } from "react";
import MobileSideBar from "./mobileSideBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop Fixed Sidebar */}
      <aside className="w-[280px] 2xl:w-[300px] h-screen border-r border-gray-200 hidden lg:flex flex-col shrink-0 bg-white z-20">
        <Sidebar />
      </aside>

      {/* Main Content Viewport */}
      <div className="flex flex-col flex-1 h-screen min-w-0 overflow-hidden">
        <header className="h-[70px] sm:h-[81px] border-b border-gray-200 shrink-0 bg-white z-10">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 min-w-0">
          {children}
        </main>
      </div>

      <MobileSideBar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}