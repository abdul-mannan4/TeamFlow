import React from 'react'
import { Loader2 } from 'lucide-react'

interface CreationBtnProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  btnText?: string
  loadingText?: string
}

export default function CreationBtn({
  setIsOpen,
  loading,
  btnText = 'Add Member',
  loadingText,
}: CreationBtnProps) {
  const defaultLoadingText =
    loadingText ||
    (btnText.toLowerCase().includes('save')
      ? 'Saving...'
      : btnText.toLowerCase().includes('update')
      ? 'Updating...'
      : 'Adding...')

  return (
    <div className='flex justify-end items-center gap-3 pt-3 border-t border-slate-100'>
      <button
        className='px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        type='button'
        disabled={loading}
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
      <button
        type='submit'
        disabled={loading}
        className='inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-all shadow-xs'
      >
        {loading && <Loader2 size={16} className='animate-spin' />}
        <span>{loading ? defaultLoadingText : btnText}</span>
      </button>
    </div>
  )
}
