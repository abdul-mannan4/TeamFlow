"use client"
import React from 'react'
import {Images,MessageSquare,Users,FileText,CheckSquare,FolderOpen} from 'lucide-react'
import { useUsers } from '@/src/hooks/useUsers'
import { usePosts } from '@/src/hooks/usePosts'
import { useComments } from '@/src/hooks/useComments'
import { useTodos } from '@/src/hooks/useTodos'
import { useAlbums } from '@/src/hooks/useAlbums'
import { usePhotos } from '@/src/hooks/usePhotos'
import Detailcard from './card'

export default function CardSection() {
    const { users, loading: usersLoading, error: usersError } = useUsers();
const { posts, loading: postsLoading, error: postsError } = usePosts();
const { comments, loading: commentsLoading, error: commentsError } = useComments();
const { todos, loading: todosLoading, error: todosError } = useTodos();
const {albums,loading:albumsLoadinf,error:albumsError}=useAlbums();
const {photos,loading:photosLoading,error:photoError}=usePhotos();

const cardDetails = [
  {
    logo: Users,
    size: usersLoading ? "—" : users.length,
    title: "Total Members",
    subtitle: "Active workspace members",
    color: "indigo",
  },
  {
    logo: FileText,
    size: postsLoading ? "—" : posts.length,
    title: "Total Posts",
    subtitle: "Across all members",
    color: "indigo",
  },
  {
    logo: MessageSquare,
    size: commentsLoading ? "—" : comments.length,
    title: "Total Comments",
    subtitle: "Community engagement",
    color: "amber",
  },
  {
    logo: CheckSquare,
    size: todosLoading ? "—" : todos.length,
    title: "Total Tasks",
    subtitle: "Tracked to-dos",
    color: "green",
  },
  {
    logo: FolderOpen,
    size: albumsLoadinf ? "—" : albums.length,
    title: "Total Albums",
    subtitle: "Photo collections",
    color: "indigo",
  },
  {
    logo: Images,
    size: photosLoading ? "—" : photos.length,
    title: "Total Photos",
    subtitle: "Stored in albums",
    color: "indigo",
  },
];


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cardDetails.map((item,index)=>(
            <Detailcard key={index} logo={item.logo} size={item.size} title={item.title} subtitle={item.subtitle} />
        ))}
    </div>
  )
}
