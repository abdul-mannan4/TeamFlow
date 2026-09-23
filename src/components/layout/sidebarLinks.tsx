"use client"
import React from 'react'
import div from 'next/link'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SidebarLinksProps {
  logo: LucideIcon;
  title: string;
  href: string;
  onClick?: () => void;
}

export default function SidebarLinks({ logo: Icon, title, href, onClick }: SidebarLinksProps) {
  const pathName = usePathname();
  const active = pathName === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`py-2.5 2xl:py-3.5 px-3 2xl:px-4 flex items-center gap-3 text-base 2xl:text-lg font-medium rounded-lg transition-colors cursor-pointer ${
        active
          ? "text-indigo-700 bg-indigo-50 font-bold shadow-xs"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon size={20} className="2xl:w-6 2xl:h-6" />
      {title}
    </Link>
  );
}
