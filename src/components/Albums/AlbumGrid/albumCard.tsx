"use client";
import React, { useState } from 'react'
import type { Albums } from '@/src/types/albums';
import { LucideFolderOpen, LucidePencil, LucideTrash2, LucideExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useAlbums } from '@/src/hooks/useAlbums';
import EditAlbumCard from '../EditAlbum/editAlbumCard';
import ConfirmModal from '../../SharedComponents/ConfirmModal/confirmModal';

type Props = {
  album: Albums;
  authorName?: string;
  photoCount?: number;
};

export default function AlbumCard({ album, authorName = "Unknown", photoCount = 0 }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteAlbum } = useAlbums();

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteAlbum(album.id);
      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Failed to delete album:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className='bg-white rounded-xl border border-slate-100/80 overflow-hidden hover:border-indigo-100 hover:shadow-md transition-all group w-full flex flex-col justify-between'>
        <div>
          <div className='h-36 2xl:h-44 flex items-center justify-center relative bg-[rgba(8,145,178,0.07)]'>
            <div className='w-16 h-16 2xl:w-20 2xl:h-20 rounded-xl flex items-center justify-center bg-[rgba(8,145,178,0.13)]'>
              <LucideFolderOpen size={28} className="text-[rgb(8,145,178)] 2xl:w-9 2xl:h-9" />
            </div>
            <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                onClick={() => setIsEditOpen(true)}
                className='p-1.5 2xl:p-2 bg-white/90 text-slate-500 hover:text-amber-600 rounded-md shadow-sm transition-colors cursor-pointer'
                title='Edit'
                type='button'
              >
                <LucidePencil size={12} className="2xl:w-4 2xl:h-4" />
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className='p-1.5 2xl:p-2 bg-white/90 text-slate-500 hover:text-red-500 rounded-md shadow-sm transition-colors cursor-pointer'
                title='Delete'
                type='button'
              >
                <LucideTrash2 size={12} className="2xl:w-4 2xl:h-4" />
              </button>
            </div>
          </div>
          <div className='p-4 2xl:p-5'>
            <p className='text-sm sm:text-base 2xl:text-lg font-bold text-slate-900 capitalize line-clamp-2 leading-snug'>
              {album.title}
            </p>
            <p className='text-xs 2xl:text-sm text-slate-500 mt-1 2xl:mt-1.5 font-medium'>By {authorName}</p>
          </div>
        </div>
        <div className='px-4 2xl:px-5 pb-4 2xl:pb-5 pt-0'>
          <div className='flex items-center justify-between pt-3 border-t border-slate-50'>
            <span className='text-xs 2xl:text-sm text-slate-400 font-medium'>
              {photoCount} {photoCount === 1 ? 'photo' : 'photos'}
            </span>
            <Link
              href={`/albums/${album.id}`}
              className='text-xs 2xl:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors'
            >
              Open <LucideExternalLink size={12} className="2xl:w-3.5 2xl:h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {isEditOpen && <EditAlbumCard album={album} setIsOpen={setIsEditOpen} />}

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Album"
        message={`Are you sure you want to delete "${album.title}"?`}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDeleteOpen(false)}
      />
    </>
  )
}

