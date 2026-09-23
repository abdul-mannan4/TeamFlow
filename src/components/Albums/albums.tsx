"use client"
import PageHeader from '../SharedComponents/PageHeader/pageHeader'
import Btn from '../BtnComponent/btn'
import Seachbar from '../layout/seachbar'
import MembersDropDown from './membersDropDown'
import { useState, useMemo, useEffect } from 'react'
import { useUsers } from '@/src/hooks/useUsers'
import { useAlbums } from '@/src/hooks/useAlbums'
import AlbumSection from './AlbumGrid/albumSection'
import { getPhotoCountsForAlbums } from '@/src/controllers/photoController'
import CreateAlbumCard from './CreateAlbum/createAlbumCard'

export default function AlbumsComp() {
  const [selectedUser, setSelectedUser] = useState("");
  const { users, loading: userLoading, error: userError } = useUsers();
  const { albums, loading: albumLoading, error: albumError } = useAlbums();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [photoCounts, setPhotoCounts] = useState<Record<number, number>>({});
  const [isOpen,setIsOpen]=useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedUser]);

  const authorName = useMemo(() => {
    const map = new Map<number, string>();
    users.forEach((u) => map.set(u.id, u.name));
    return map;
  }, [users]);

  const itemsPerPage = 12;
  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchSearch =
        !searchQuery.trim() ||
        album.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSelectUser =
        !selectedUser || authorName.get(album.userId) === selectedUser;

      return matchSearch && matchSelectUser;
    });
  }, [selectedUser, albums, searchQuery, authorName]);

  const paginatedAlbums = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAlbums.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAlbums, currentPage]);

  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage) || 1;

  // Fetch photo counts for currently visible albums on this page
  useEffect(() => {
    const albumIds = paginatedAlbums.map((a) => a.id);
    if (albumIds.length > 0) {
      getPhotoCountsForAlbums(albumIds).then(setPhotoCounts);
    }
  }, [paginatedAlbums]);

  return (
    <div className='flex flex-col p-4 sm:p-6 gap-5 sm:gap-6 w-full'>
      <PageHeader
        title="Albums"
        subtitle="Browse photo collections created by team members."
        action={<Btn btnText='Create Album' onClick={()=>setIsOpen(prev=>!prev)}/>}
      />
      <div className='bg-white rounded-xl border border-slate-100 p-4'>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
          <div className='flex-1 min-w-[160px]'>
            <Seachbar
              width='w-full !flex'
              placeHolder='Search Albums...'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <MembersDropDown
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            className="w-full sm:w-56"
          />
        </div>
      </div>
      <AlbumSection
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        albums={paginatedAlbums}
        authorNameMap={authorName}
        photoCounts={photoCounts}
      />
      {isOpen && <CreateAlbumCard setIsOpen={setIsOpen}/>}

    </div>
  );
}

