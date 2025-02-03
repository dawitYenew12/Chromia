import CustomizedModal from "./ConnectWalletModal";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTAppStore } from "@/store/appStore";
import AddTaskModal from "./Tasks/AddTaskModal";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

type TaskStatus = "pending" | "completed";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

export default function NavBar() {
  const { client, session, setSession, setLogout, logout } = useTAppStore();
  const { toggleTheme, theme } = useTAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const queryClient = useQueryClient();

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
    } catch (error) {
      toast.error("Error adding task");
      console.log("Error adding task", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    setSession(undefined);
    await logout();
  };

  const navLinks = [
    { path: "/tasks", label: "Tasks" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full shadow-lg"
            />
            <h1 className="text-xl font-bold text-white relative">
              <span
                className="absolute bg-purple-400 rounded-full w-8 h-8"
                style={{
                  top: "28px",
                  right: "-16px",
                  transform: "translateY(-50%)",
                  mixBlendMode: "multiply",
                }}
              ></span>
              <span className="text-pink-400">To-Do</span> dApp
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  pathname === link.path
                    ? "text-white border-b-2 border-pink-400"
                    : "text-gray-200 hover:text-white transition-colors duration-300"
                } text-sm font-semibold`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-20 left-0 right-0 bg-indigo-600 shadow-lg py-4 px-6`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  pathname === link.path
                    ? "text-white border-b-2 border-pink-400"
                    : "text-gray-200 hover:text-white transition-colors duration-300"
                } block py-2 text-sm font-semibold`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hidden md:flex items-center justify-center p-2 bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white"
              >
                <path
                  fill="currentColor"
                  d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h5.772a6.5 6.5 0 0 1-.709-1.5H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v5.063a6.5 6.5 0 0 1 1.5.709V6.25A3.25 3.25 0 0 0 17.75 3zm6.25 6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m-1.72-.47a.75.75 0 1 0-1.06-1.06L8.25 9.19l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0M23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z"
                />
              </svg>
            </button>

            {!session ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z" />
                    <path
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 14a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
                    />
                    <path d="M18 7V5.603a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 3 8.537V9" />
                  </g>
                </svg>
                <span className="text-sm font-semibold">Connect Wallet</span>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z" />
                    <path
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 14a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
                    />
                    <path d="M18 7V5.603a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 3 8.537V9" />
                  </g>
                </svg>
                <span className="text-sm font-semibold">Disconnect Wallet</span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 hover:shadow-lg transition-all duration-300"
            >
              {theme === "light" ? (
                <svg
                  className="h-[28px] w-[28px] text-pink-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CustomizedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </nav>
  );
}
