import React, { useState, useEffect } from "react";

interface Task {
  title: string;
  description: string;
  due_date: string;
  status: TaskStatus;
  id: string;
}

type TaskStatus = "pending" | "completed";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (task: Task) => void;
  task: Task;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onEdit,
  task,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [due_date, setdue_date] = useState(task.due_date);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setdue_date(task.due_date);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...task,
      title,
      description,
      due_date,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <h2 className="text-2xl flex justify-center font-semibold my-4  text-gray-900 dark:text-white">
            Edit Task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border-2 text-black border-gray-300 dark:border-gray-600 rounded-lg 
            focus:border-blue-500 focus:outline-none
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            transition duration-150 ease-in-out"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border-2 text-black border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:border-blue-500 focus:outline-none
                          dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                          transition duration-150 ease-in-out min-h-[100px]"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Due Date
              </label>
              <input
                type="date"
                value={due_date}
                onChange={(e) => setdue_date(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 text-black dark:border-gray-600 rounded-lg   focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                style={{ borderRadius: "0.5rem" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-pink-400 text-white rounded-lg hover:bg-pink-500 focus:border-pink-500/50 transition duration-150 ease-in-out"
                style={{ borderRadius: "0.5rem" }}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
