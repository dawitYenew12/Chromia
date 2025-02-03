import React from "react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Delete Task
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete the task: <strong>{taskTitle}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                       focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500
                       transition duration-150 ease-in-out"
              style={{ borderRadius: "0.5em" }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg
                       hover:bg-red-700 focus:ring-4 focus:ring-red-500/50
                       transition duration-150 ease-in-out"
              style={{ borderRadius: "0.5em" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
