import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function MainHeading({title,btnName,href}:{title:string,btnName:string,href:string}) {
  return (
    <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-slate-50">
      <h3 className="text-[20px] 2xl:text-[24px] font-bold text-slate-900">{title}</h3>
      <Link
        href={href}
        className="text-[15px] 2xl:text-[17px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
        {btnName}
        <ArrowRight size={16} className="2xl:w-5 2xl:h-5" />
      </Link>
    </div>
  )
}
