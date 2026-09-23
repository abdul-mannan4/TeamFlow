import React from 'react'

export default function ProgressCard({size,text,bgColor,textColor1,textColor2}:{size:number,text:string,bgColor:string,textColor1:string,textColor2:string}) {
  return (
    <div className={`${bgColor} rounded-xl border border-slate-100 p-3 sm:p-4 2xl:p-5 text-center`}>
      <p className={`text-xl sm:text-2xl 2xl:text-3xl font-bold ${textColor1}`}>{size}</p>
      <p className={`text-xs sm:text-sm 2xl:text-base font-semibold mt-0.5 2xl:mt-1 ${textColor2}`}>{text}</p>
    </div>
  )
}
