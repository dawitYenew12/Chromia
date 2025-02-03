import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

type TaskStatus = "pending" | "completed";
interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, "id">) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    if (due_date < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    onAdd({
      title,
      description,
      status: "pending",
      due_date,
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl w-full max-w-md transform transition-all">
      <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-400 focus:outline-none border border-gray-200 rounded-full focus:border-gray-500 focus:text-gray-500"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[24px] w-[24px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6 mt-2">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
            <span className="flex justify-center flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-500 dark:text-pink-400"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h5.772a6.5 6.5 0 0 1-.709-1.5H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v5.063a6.5 6.5 0 0 1 1.5.709V6.25A3.25 3.25 0 0 0 17.75 3zm6.25 6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m-1.72-.47a.75.75 0 1 0-1.06-1.06L8.25 9.19l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0M23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z"
                />
              </svg>
              <span className="text-gray-700 mt-2">

              Add New Task
              </span>
            </span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded border-2 dark:border-gray-600 rounded-lg
                  focus:border-blue-500 focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out"
                required
                placeholder="Enter task title"
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="space-y-2 rounded-lg">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border-2 dark:border-gray-600 rounded-lg 
                  focus:border-blue-500 focus:outline-none
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out min-h-[100px]"
                required
                placeholder="Enter task description"
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Due Date
              </label>
              <input
                type="date"
                value={due_date}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border-2 dark:border-gray-600 rounded-lg 
                  focus:border-blue-500 focus:outline-none
                  dark:bg-gray-700 dark:text-white
                  transition duration-150 ease-in-out"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-[6px] rounded-lg border focus:outline-none dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                style={{ borderRadius: "0.5rem" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-[6px] bg-pink-500 text-white rounded-lg hover:bg-pink-900 transition duration-150 ease-in-out"
                style={{ borderRadius: "0.5rem" }}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
