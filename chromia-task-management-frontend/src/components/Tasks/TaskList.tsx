"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";
import { useTAppStore } from "@/store/appStore";
import AddTaskModal from "./AddTaskModal";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { byteToHex } from "../../utils/constants";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}
type TaskStatus = "pending" | "completed";

export default function TaskList() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const { session } = useTAppStore();
  const [isLoading, setIsLoading] = useState(false);
  // const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const queryClient = useQueryClient();

  const fetchTasks = async ({ pageParam = 0 }) => {
    const result = await session?.query<any>("get_all_tasks", {
      user_id: session.account.id,
      pointer: pageParam,
      n_tasks: 10,
    });
    const tasks = result?.tasks ?? [];
    const pointer = result?.pointer ?? null;
    return { tasks, pointer };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tasks", byteToHex(session?.account.id as any)],
      queryFn: fetchTasks,
      getNextPageParam: (lastPage) => lastPage.pointer ?? false,
      initialPageParam: 0,
      enabled: !!session,
    });

  const handleUpdateTask = async (updatedTask: Task) => {
    if (!session) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      await session?.call({
        name: "update_task",
        args: [
          updatedTask.id,
          updatedTask.title,
          updatedTask.description,
          updatedTask.status,
          new Date(updatedTask.due_date).getTime(),
        ],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!session) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      await session?.call({
        name: "delete_task",
        args: [taskId],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully");
    } finally {
      console.log("Error deleting task");
      setIsLoading(false);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    if (!session) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      await session?.call({
        name: "create_task",
        args: [
          newTask.title,
          newTask.description,
          new Date(newTask.due_date).getTime(),
        ],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task added successfully");
    } catch (eror) {
      toast.error("Error adding task");
      console.log("Error adding task", eror);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTaskCompletion = async (task: Task) => {
    try {
      await session?.call({
        name: "complete_task",
        args: [task.id],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };
  const filteredAndSortedTasks = data?.pages
    .flatMap((page) => page.tasks)
    .filter((task) => {
      console.log("filterStatus: ", filterStatus);
      console.log("task values: ", task.status);
      if (task.status === filterStatus) {
        return true;
      } else if (filterStatus === "all") {
        return true;
      } else {
        return false;
      }
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return (
        (new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) *
        order
      );
    });

  return (
    <>
      <button
        onClick={() => setFilterOpen(!filterOpen)}
        className="fixed left-2 top-16 mt-1 z-[9999] w-14 h-14 bg-pink-300 rounded-full shadow-lg hover:bg-pink-400 transition-all duration-300 flex items-center justify-center"
        aria-expanded={filterOpen}
        aria-controls="filter-panel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="h-6 w-6 text-gray-700"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m-1 2h-11m16 0h-3"
          />
        </svg>
      </button>

      <div className="rounded-lg z-9999 px-4">
        {filterOpen && (
          <div className="w-96 mt-4">
            <TaskFilters
              filterStatus={filterStatus}
              sortOrder={sortOrder}
              onFilterChange={setFilterStatus}
              onSortChange={setSortOrder}
            />
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedTasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleTaskCompletion}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4 text-black dark:text-white">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="btn"
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "No More Tasks"}
            </button>
          </div>
        </div>
        <motion.div
          className="flex justify-end fixed right-6 bottom-20 transform -translate-y-1/2 z-10 shadow-xl rounded-full bg-pink-400 hover:bg-pink-500 transition-all duration-300"
          animate={{ y: ["-2px", "2px", "-2px"] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-white px-4 py-[12px] rounded-full flex items-center space-x-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                fill="white"
                d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h5.772a6.5 6.5 0 0 1-.709-1.5H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v5.063a6.5 6.5 0 0 1 1.5.709V6.25A3.25 3.25 0 0 0 17.75 3zm6.25 6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m-1.72-.47a.75.75 0 1 0-1.06-1.06L8.25 9.19l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0M23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z"
              />
            </svg>
            <span>Add New Task</span>
          </button>
        </motion.div>
      </div>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </>
  );
}
