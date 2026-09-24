"use client";
import React from "react";

export function TaskSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 2xl:px-6 py-3.5 2xl:py-4.5 w-full animate-pulse">
      <div className="w-5 h-5 2xl:w-6 2xl:h-6 rounded-full bg-slate-200 shrink-0" />
      <div className="h-4 bg-slate-200 rounded-md flex-1 max-w-md" />
      <div className="flex items-center gap-2.5 shrink-0 sm:w-48 2xl:w-56">
        <div className="w-8 h-8 2xl:w-9 2xl:h-9 rounded-full bg-slate-200 shrink-0" />
        <div className="h-3.5 w-24 bg-slate-200 rounded-md hidden sm:block" />
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 2xl:p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-slate-200 shrink-0" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 bg-slate-200 rounded w-1/2" />
          <div className="h-2.5 bg-slate-200 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2 py-2">
        <div className="h-4 bg-slate-200 rounded w-4/5" />
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-3/4" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
        <div className="h-3 bg-slate-200 rounded w-12" />
        <div className="h-3 bg-slate-200 rounded w-16" />
      </div>
    </div>
  );
}

export function MemberRowSkeleton() {
  return (
    <tbody className="divide-y divide-slate-50 animate-pulse">
      <tr>
        <td className="px-5 2xl:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-slate-200 shrink-0" />
            <div className="h-4 bg-slate-200 rounded w-28" />
          </div>
        </td>
        <td className="px-5 2xl:px-6 py-4 hidden md:table-cell">
          <div className="h-3.5 bg-slate-200 rounded w-20" />
        </td>
        <td className="px-5 2xl:px-6 py-4 hidden lg:table-cell">
          <div className="h-3.5 bg-slate-200 rounded w-36" />
        </td>
        <td className="px-5 2xl:px-6 py-4 hidden lg:table-cell">
          <div className="h-3.5 bg-slate-200 rounded w-24" />
        </td>
        <td className="px-5 2xl:px-6 py-4 hidden xl:table-cell">
          <div className="h-3.5 bg-slate-200 rounded w-16" />
        </td>
        <td className="px-5 2xl:px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-1">
            <div className="w-6 h-6 rounded bg-slate-200" />
            <div className="w-6 h-6 rounded bg-slate-200" />
            <div className="w-6 h-6 rounded bg-slate-200" />
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export function AlbumCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-36 2xl:h-44 bg-slate-200 flex items-center justify-center">
        <div className="w-16 h-16 rounded-xl bg-slate-300" />
      </div>
      <div className="p-4 2xl:p-5 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/3" />
      </div>
      <div className="px-4 2xl:px-5 pb-4 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="h-3 bg-slate-200 rounded w-12" />
          <div className="h-3 bg-slate-200 rounded w-14" />
        </div>
      </div>
    </div>
  );
}

export function PhotoCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-200 w-full" />
      <div className="p-3 space-y-1.5">
        <div className="h-3 bg-slate-200 rounded w-4/5" />
        <div className="h-2.5 bg-slate-200 rounded w-1/2" />
      </div>
    </div>
  );
}
