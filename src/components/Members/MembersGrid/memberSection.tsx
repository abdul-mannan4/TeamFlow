"use client"
import React from 'react'
import { useUsers } from '@/src/hooks/useUsers'
import MemberCard from './memberCard'
import type { User } from '@/src/types/users'
import { ChevronLeft,ChevronRight } from 'lucide-react'


export default function MemberSection({
  users,
  startingIndex,
  endingIndex,
  totalUsers,
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  users: User[];
  startingIndex?: number;
  endingIndex?: number;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const firstPage = Math.max(1, Math.min(currentPage, totalPages - 1));
  const pageNumber = [firstPage, firstPage + 1].filter((p) => p <= totalPages);

  return (
    <div className='bg-white rounded-xl border border-slate-100 overflow-hidden w-full'>
      <div className='overflow-x-auto w-full'>
        <table className='w-full text-sm 2xl:text-base text-left'>
          <thead>
            <tr className='border-b border-slate-100 bg-slate-50/50'>
              <th className='px-4 sm:px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider'>Members</th>
              <th className='hidden md:table-cell px-4 sm:px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider'>Username</th>
              <th className='hidden lg:table-cell px-4 sm:px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider'>Email</th>
              <th className='hidden lg:table-cell px-4 sm:px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider'>Company</th>
              <th className='hidden xl:table-cell px-4 sm:px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider'>City</th>
              <th className='px-4 sm:px-5 2xl:px-6 py-3.5 2xl:py-4.5 text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider text-right'>Action</th>
            </tr>
          </thead>
          {users.map((user, index) => (
            <MemberCard key={index} user={user} />
          ))}
        </table>
      </div>

      <div className='border-t border-slate-100 px-4 sm:px-5 2xl:px-6 py-3 2xl:py-4 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-xs sm:text-sm 2xl:text-base text-slate-500 text-center sm:text-left'>
          {totalUsers === 0
            ? 'No members found'
            : `Showing ${startingIndex}-${endingIndex} of ${totalUsers} Members`}
        </p>
        <div className='flex items-center justify-center gap-1'>
          <button
            type='button'
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className='flex items-center gap-1 px-3 2xl:px-4 py-1.5 2xl:py-2 text-sm 2xl:text-base font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer'
          >
            <ChevronLeft size={16} className='2xl:w-5 2xl:h-5' /> Prev
          </button>
          {pageNumber.map((page) => (
            <button
              key={page}
              type='button'
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 2xl:w-10 2xl:h-10 text-sm 2xl:text-base font-bold rounded-lg transition-colors cursor-pointer ${
                page === currentPage
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type='button'
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className='flex items-center gap-1 px-3 2xl:px-4 py-1.5 2xl:py-2 text-sm 2xl:text-base font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer'
          >
            Next <ChevronRight size={16} className='2xl:w-5 2xl:h-5' />
          </button>
        </div>
      </div>
    </div>
  );
}
