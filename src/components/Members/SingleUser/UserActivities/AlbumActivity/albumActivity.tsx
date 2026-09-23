import { Albums } from '@/src/types/albums'
import AlbumCard from './albumCard'
import React from 'react'

export default function AlbumActivity({userAlbums}:{userAlbums:Albums[]}) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {userAlbums.map((album)=>(
            <AlbumCard key={album.id} album={album}/>
        ))}
    </div>
  )
}
