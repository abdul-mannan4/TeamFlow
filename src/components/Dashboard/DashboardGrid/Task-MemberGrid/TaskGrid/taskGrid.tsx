"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTodos } from "@/src/hooks/useTodos";
import TaskStatus from "./taskStatus";
import MainHeading from "../mainHeading";

export default function TaskGrid() {
  const { todos, loading, error } = useTodos();
  const completedTasks = todos.filter((todo) => todo.completed).length;


  const taskProgress =
    todos.length === 0 ? 0 :Math.round( (completedTasks / todos.length) * 100);

  const pendingTask = todos.length - completedTasks;

  const pendingProgress =
    todos.length === 0 ? 0 : Math.round((pendingTask / todos.length) * 100);
  return (
    <div className="bg-white rounded-xl border border-slate-100/80 overflow-hidden">
      <MainHeading title="Tasks Overview" btnName="View Tasks" href="/tasks"/>
      <div className="px-5 2xl:px-6 py-5 2xl:py-6 space-y-4 2xl:space-y-5">
        <div className="flex items-center justify-between text-sm 2xl:text-base">
          <span className="text-slate-600 font-semibold text-[16px] 2xl:text-[18px]">Tasks Progress</span>
          <span className="font-bold text-[18px] 2xl:text-[20px] text-slate-900">{taskProgress}%</span>
        </div>
        <div className="h-2 2xl:h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${taskProgress}%` }}></div>
        </div>
        <div className="grid grid-cols-2 gap-3 2xl:gap-4">
          <TaskStatus
            percentage={completedTasks}
            status="Completed"
            textColor="text-green-700"
            bgColor="bg-green-50"
          />

          <TaskStatus
            percentage={pendingTask}
            status="Pending"
            textColor="text-amber-700"
            bgColor="bg-amber-50"
          />
        </div>
      </div>
    </div>
  );
}
