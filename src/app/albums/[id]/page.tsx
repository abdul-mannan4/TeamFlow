"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePhotos } from "@/src/hooks/usePhotos";
import { useAlbums } from "@/src/hooks/useAlbums";
import { useUsers } from "@/src/hooks/useUsers";
import { ArrowLeft, Image as ImageIcon, ExternalLink, X, User } from "lucide-react";
import type { Photos } from "@/src/types/photos";

export default function AlbumDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const albumId = Number(params?.id);

  const {
    photos,
    loading,
    error,
    usePhotobyAlbumId,
  } = usePhotos(20, false);

  const { albums } = useAlbums();
  const { users } = useUsers();

  const [selectedPhoto, setSelectedPhoto] = useState<Photos | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (albumId) {
      usePhotobyAlbumId(albumId);
    }
  }, [albumId]);

  const currentAlbum = useMemo(() => {
    return albums.find((a) => a.id === albumId);
  }, [albums, albumId]);

  const author = useMemo(() => {
    if (!currentAlbum) return null;
    return users.find((u) => u.id === currentAlbum.userId);
  }, [users, currentAlbum]);

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 gap-6 w-full max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <button
            onClick={() => router.push("/albums")}
            type="button"
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shrink-0 cursor-pointer"
            title="Back to Albums"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Album #{albumId}
              </span>
              {author && (
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <User size={12} /> {author.name}
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 capitalize mt-1">
              {currentAlbum?.title || `Album Collection #${albumId}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
          <ImageIcon size={16} className="text-indigo-600" />
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
          </span>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-100 p-3 flex flex-col gap-2.5 animate-pulse"
            >
              <div className="w-full aspect-square bg-slate-200 rounded-lg" />
              <div className="h-3 bg-slate-200 rounded w-3/4" />
              <div className="h-2.5 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && photos.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <ImageIcon size={28} />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No photos in this album</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            This album does not have any uploaded photos yet.
          </p>
        </div>
      )}

      {/* Photos Grid */}
      {!loading && !error && photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => {
            const hasError = failedImages[photo.id];

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group bg-white rounded-xl border border-slate-100 hover:border-indigo-100 p-2.5 sm:p-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5 flex items-center justify-center">
                  {!hasError ? (
                    <img
                      src={photo.thumbnailUrl || photo.url}
                      alt={photo.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(photo.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-500">
                      <ImageIcon size={26} className="mb-1 opacity-70" />
                      <span className="text-[10px] text-slate-500 text-center line-clamp-1 font-medium">
                        Photo #{photo.id}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-white/90 rounded-full text-slate-800 shadow-sm">
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight capitalize">
                    {photo.title}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    ID #{photo.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Photo Detail Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Photo #{selectedPhoto.id}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="aspect-square w-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.url || selectedPhoto.thumbnailUrl}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                onError={() => handleImageError(selectedPhoto.id)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 capitalize leading-snug">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Album #{selectedPhoto.albumId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}