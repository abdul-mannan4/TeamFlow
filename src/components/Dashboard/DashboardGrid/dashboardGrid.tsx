import PostGrid from "./PostGrid/postGrid"
import TaskMemberGrid from "./Task-MemberGrid/task-memberGrid"

export default function DashboardGrid() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
        <PostGrid />
        <TaskMemberGrid />

    </div>
  )
}
