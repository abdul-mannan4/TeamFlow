"use client";
import FilterBtn from "./filterBtn";
import Seachbar from "../../layout/seachbar";
import DropDownBtn from "../../SharedComponents/DropDownBtn/dropDownBtn";
import { useTodos } from "@/src/hooks/useTodos";
import { useMemo, useState, useEffect } from "react";
import { useUsers } from "@/src/hooks/useUsers";
import MembersDropDown from "../../Albums/membersDropDown";
import SortDropDown from "../../SharedComponents/SortDropDown/sortDropDown";
import TaskSection from "./TaskGrid/taskSection";

export default function FilterSectionn() {
  const { todos, loading: todoLoading, error: todoError } = useTodos();
  const { users, loading: userLoading, error: userError } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("");
  const sorts = ["Default", "Title A-Z"];
  const itemsPerPage = 15;

  const authorName = useMemo(() => {
    const map = new Map<number, string>();
    users.forEach((u) => map.set(u.id, u.name));
    return map;
  }, [users]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedUser, selectedSort, selectedFilter]);

  const filteredTasks = useMemo(() => {
    return todos
      .filter((todo) => {
        const matcheSearch =
          !searchQuery.trim() ||
          todo.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchSelectedUser =
          !selectedUser || authorName.get(todo.userId) === selectedUser;

        const matchesStatus =
          selectedFilter === "All" ||
          (selectedFilter === "Completed" && todo.completed) ||
          (selectedFilter === "Pending" && !todo.completed);

        return matcheSearch && matchSelectedUser && matchesStatus;
      })
      .sort((a, b) => {
        if (selectedSort === "Title A-Z") return a.title.localeCompare(b.title);
        return a.id - b.id;
      });
  }, [searchQuery, selectedSort, selectedUser, todos, selectedFilter]);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTasks, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;

  return (
    <div className="w-full space-y-5">
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="flex w-full lg:w-auto rounded-lg border border-slate-200 overflow-hidden shrink-0">
            <div className="flex-1 lg:flex-initial">
              <FilterBtn
                btnText="All"
                selected={selectedFilter === "All"}
                onClick={() => setSelectedFilter("All")}
              />
            </div>
            <div className="flex-1 lg:flex-initial">
              <FilterBtn
                btnText="Completed"
                selected={selectedFilter === "Completed"}
                onClick={() => setSelectedFilter("Completed")}
              />
            </div>
            <div className="flex-1 lg:flex-initial">
              <FilterBtn
                btnText="Pending"
                selected={selectedFilter === "Pending"}
                onClick={() => setSelectedFilter("Pending")}
              />
            </div>
          </div>

          <div className="flex-1 min-w-[160px]">
            <Seachbar
              placeHolder="Search Tasks..."
              width="w-full !flex"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full lg:w-auto items-center gap-3 shrink-0">
            <MembersDropDown
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              className="flex-1 lg:w-56"
            />
            <SortDropDown
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              sorts={sorts}
              className="flex-1 lg:w-40"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <TaskSection
          tasks={paginatedTasks}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalUsers={filteredTasks.length}
          loading={todoLoading}
        />
      </div>
    </div>
  );
}
