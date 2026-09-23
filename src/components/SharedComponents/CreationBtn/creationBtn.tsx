import React from 'react'

export default function CreationBtn({setIsOpen,loading,btnText="Add Member"}:{setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,loading:boolean,btnText?:string}) {
  return (
      <div className='flex justify-end gap-3 pt-2 border-t border-slate-100'>
                        <button className='px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer' type='button' onClick={()=>setIsOpen(false)}>
                                Cancel
                        </button>
                        <button 
                        type='submit'
                        disabled={loading}
                        className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed' >
                            {loading? "Adding...": `${btnText}`}
                        </button>
                    </div>
  )
}
