"use client";

import { useComments } from "@/src/hooks/useComments";

export default function comments() {
  const { comments, loading, error, page, nextPage, prevPage } = useComments(20);

  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Comments Gallery (Page {page})</h1>
        <div className="flex gap-2 items-center self-start sm:self-auto">
          <button
            onClick={prevPage}
            disabled={page === 1 || loading}
            className="px-3.5 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors font-medium cursor-pointer"
          >
            Previous
          </button>
          <span className="font-semibold text-xs sm:text-sm text-slate-700">Page {page}</span>
          <button
            onClick={nextPage}
            disabled={loading}
            className="px-3.5 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors font-medium cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {loading && <p className="p-4 text-gray-500">Loading comments for page {page}...</p>}

      {error && <p className="p-4 text-red-500">Error: {error}</p>}

      {!loading && !error && comments.length === 0 && (
        <p className="p-4">No comments found.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-3 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
        
              <p className="text-xs text-gray-700 font-medium line-clamp-2">{comment.email}</p>
              <span className="text-[10px] text-gray-400 mt-1">ID: #{comment.id} | Body: {comment.body}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
