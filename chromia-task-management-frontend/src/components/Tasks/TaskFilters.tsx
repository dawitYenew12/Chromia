"use client";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface TaskFiltersProps {
  filterStatus: string;
  sortOrder: string;
  onFilterChange: (status: string) => void;
  onSortChange: (order: string) => void;
}

export default function TaskFilters({
  filterStatus,
  sortOrder,
  onFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);

  const handleReset = () => {
    onFilterChange("all");
    onSortChange("asc");
  };

  // Custom Dropdown Component
  const Dropdown = ({
    label,
    value,
    options,
    onSelect,
    isOpen,
    toggleDropdown,
  }: {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
    isOpen: boolean;
    toggleDropdown: () => void;
  }) => (
    <div className="flex-1 relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div
        onClick={toggleDropdown}
        className="relative w-full px-3 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 cursor-pointer"
        style={{ borderRadius: "0.5rem" }}
      >
        <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <KeyboardArrowDownIcon />
        </span>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
          style={{ borderRadius: "0.5rem" }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option);
                toggleDropdown();
              }}
              className="px-2 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer"
              style={{ borderRadius: "0.5rem" }} 
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="flex m-4 z-9999 flex-col sm:flex-row gap-4 justify-center mr-2 items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      style={{ borderRadius: "0.5rem" }}
    >
      {/* Filter by Status */}
      <Dropdown
        label="Filter by Status"
        value={filterStatus}
        onSelect={onFilterChange}
        options={["all", "pending", "completed"]}
        isOpen={isFilterOpen}
        toggleDropdown={() => setIsFilterOpen((prev) => !prev)}
      />

      {/* Sort by Due Date */}
      <Dropdown
        label="Sort by Due Date"
        value={sortOrder}
        onSelect={onSortChange}
        options={["asc", "desc"]}
        isOpen={isSortOpen}
        toggleDropdown={() => setIsSortOpen((prev) => !prev)}
      />

      {/* Reset Button with Custom SVG */}
      <button
        onClick={handleReset}
        className="mt-8 flex justify-center items-center text-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
        >
          <g>
            <path d="M78.466,35.559L50.15,63.633L22.078,35.317c-0.777-0.785-2.044-0.789-2.828-0.012s-0.789,2.044-0.012,2.827L48.432,67.58c0.365,0.368,0.835,0.563,1.312,0.589c0.139,0.008,0.278-0.001,0.415-0.021c0.054,0.008,0.106,0.021,0.16,0.022c0.544,0.029,1.099-0.162,1.515-0.576l29.447-29.196c0.785-0.777,0.79-2.043,0.012-2.828S79.249,34.781,78.466,35.559z" />
          </g>
        </svg>
      </button>
    </div>
  );
}
