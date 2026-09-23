import React from 'react'

export default function EditwithTextBtn({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      type="button"
      className='px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shrink-0 cursor-pointer'
    >
      {text}
    </button>
  )
}
