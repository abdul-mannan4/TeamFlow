import { Albums } from '@/src/types/albums'
import Link from 'next/link'
import { LucideFolderOpen } from 'lucide-react'
import { useState,useEffect } from 'react'
import { getPhotosbyAlbum } from '@/src/controllers/photoController'
export default function AlbumCard({album}:{album:Albums}) {

    const albumsId=album.id
    const [photoCount,setPhotoCount]=useState<number|null>();
    useEffect(()=>{
        getPhotosbyAlbum(album.id)
        .then((photos)=>setPhotoCount(photos.length))
        .catch((error)=>console.error(error))
    },[album.id] )
    
  return (
    <Link href={`/albums/${albumsId}`} className='border border-slate-100 rounded-lg p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group'>
        <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors'>
                <LucideFolderOpen size={16} className='text-slate-400 group-hover:text-indigo-500' />
            </div>
            <div className='min-w-0'>
                <p className='text-sm font-medium text-slate-900 capitalize truncate'>{album.title}</p>
                <p className='text-xs text-slate-400'>{photoCount}</p>

            </div>

        </div>
    </Link>

  )
}
