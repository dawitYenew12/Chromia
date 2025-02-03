"use client";
import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

type TaskStatus = "pending" | "completed";
interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => any;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskItem({
  task,
  onUpdate,
  onDelete,
  onToggleComplete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleComplete = async () => {
    onToggleComplete({ ...task, status: "pending" });
  };

  return (
    <div
      className="group bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm ml-4
                    hover:shadow-lg transition-all duration-300 overflow-hidden
                    border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex relative items-center justify-center mt-10">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={toggleComplete}
                className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              {task.status === "completed" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                    <path
                      d="M3.5 6.5l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  task.status === "completed"
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {task.description && (
          <div className="mt-4 pl-9">
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {isExpanded
                ? task.description
                : `${task.description.slice(0, 32)}${
                    task.description.length > 32 ? "..." : ""
                  }`}
              {task.description.length > 32 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 text-blue-500 hover:underline"
                >
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}
            </p>
          </div>
        )}
        <div className="flex flex-end justify-end  gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={onUpdate}
        task={task}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDelete(task.id)}
        taskTitle={task.title}
      />
    </div>
  );
}
