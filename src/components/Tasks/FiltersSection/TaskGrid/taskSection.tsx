import React from 'react'

import type { Todos } from '@/src/types/todo';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TaskCard from './taskCard';
import { TaskSkeleton } from '../../../SharedComponents/Skeletons/skeletons';

type Props = {
  tasks: Todos[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalUsers: number;
  loading?: boolean;
};

export default function TaskSection({ tasks, totalPages, currentPage, setCurrentPage, totalUsers, loading }: Props) {

  const firstPage = Math.max(1, Math.min(currentPage, totalPages - 1));
  const windowPages = [firstPage, firstPage + 1].filter((p) => p <= totalPages);

  const lastInWindow = windowPages[windowPages.length - 1];
  const pageItems: (number | "...")[] = [...windowPages];

  if (lastInWindow < totalPages) {
    if (totalPages - lastInWindow > 1) pageItems.push("..."); 
    pageItems.push(totalPages);
  }

  const btnBase =
    'flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer';

  return (
    <div className='bg-white rounded-xl border border-slate-100 overflow-hidden w-full'>
      <div className='divide-y divide-slate-50'>
        {loading && tasks.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => <TaskSkeleton key={i} />)
        ) : tasks.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500 font-medium">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>

      <div className='border-t border-slate-100 px-4 sm:px-5 2xl:px-6 py-3 2xl:py-4 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-xs sm:text-sm 2xl:text-base text-slate-500 text-center sm:text-left'>
          {totalUsers === 0 ? 'No tasks found' : `Showing ${tasks.length} of ${totalUsers} tasks`}
        </p>
        <div className='flex items-center justify-center gap-1'>
          <button
            type='button'
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className={btnBase + ' 2xl:text-base 2xl:px-4 2xl:py-2'}
          >
            <ChevronLeft size={16} className='2xl:w-5 2xl:h-5' /> Prev
          </button>

          {pageItems.map((item, index) =>
            item === "..." ? (
              <span key={`dots-${index}`} className='w-8 h-8 2xl:w-10 2xl:h-10 flex items-center justify-center text-slate-400 2xl:text-base'>
                ...
              </span>
            ) : (
              <button
                key={item}
                type='button'
                onClick={() => setCurrentPage(item)}
                className={`w-8 h-8 2xl:w-10 2xl:h-10 text-sm 2xl:text-base font-bold rounded-lg transition-colors cursor-pointer ${
                  item === currentPage
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type='button'
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={btnBase + ' 2xl:text-base 2xl:px-4 2xl:py-2'}
          >
            Next <ChevronRight size={16} className='2xl:w-5 2xl:h-5' />
          </button>
        </div>
      </div>
    </div>
  )
}