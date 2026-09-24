import React from 'react'
import type { Albums } from '@/src/types/albums';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import AlbumCard from './albumCard';
import { AlbumCardSkeleton } from '../../SharedComponents/Skeletons/skeletons';

type Props = {
  albums: Albums[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  authorNameMap?: Map<number, string>;
  photoCounts?: Record<number, number>;
  loading?: boolean;
};

export default function AlbumSection({
  albums,
  totalPages,
  currentPage,
  setCurrentPage,
  authorNameMap,
  photoCounts,
  loading,
}: Props) {
    
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
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 2xl:gap-6 w-full'>
      {loading && albums.length === 0 ? (
        Array.from({ length: 8 }).map((_, i) => <AlbumCardSkeleton key={i} />)
      ) : albums.length === 0 ? (
        <div className="col-span-full py-12 text-center text-sm text-slate-500 font-medium bg-white rounded-xl border border-slate-100">
          No albums found
        </div>
      ) : (
        albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            authorName={authorNameMap?.get(album.userId) ?? "Unknown"}
            photoCount={photoCounts?.[album.id] ?? 0}
          />
        ))
      )}

      <div className='col-span-full bg-white rounded-xl border border-slate-100 px-4 sm:px-5 2xl:px-6 py-3 2xl:py-4'>
        <div className='flex items-center justify-center gap-1 flex-wrap'>
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
  );
}
