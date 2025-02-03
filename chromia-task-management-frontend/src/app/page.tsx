"use client";
import React, { useState } from "react";
import Image from "next/image";
import CustomizedModal from "../components/ConnectWalletModal";

export default function Home() {
  const [seeMore, setSeeMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const features = [
    {
      title: "User Account Management",
      description:
        "Enable users to create accounts using either an EVM wallet or a generated keypair securely stored in local storage.",
      icon: "👤", // Replace with an actual icon or SVG
    },
    {
      title: "Task Creation",
      description:
        "Allow users to create tasks with a title, description, and due date to organize their activities effectively.",
      icon: "➕", // Replace with an actual icon or SVG
    },
    {
      title: "Task Updates",
      description:
        "Provide the ability to update task details such as title, description, and due date to reflect changes dynamically.",
      icon: "🔄", // Replace with an actual icon or SVG
    },
    {
      title: "Task Completion & Deletion",
      description:
        "Mark tasks as completed or delete them permanently to keep the task list relevant and clutter-free.",
      icon: "✅", // Replace with an actual icon or SVG
    },
    {
      title: "View & Filter Tasks",
      description:
        "Display tasks specific to the authenticated user with filtering by status and sorting by due date.",
      icon: "🔍", // Replace with an actual icon or SVG
    },
    {
      title: "Secure Authentication",
      description:
        "Authenticate users with the selected method to ensure data privacy and secure task management.",
      icon: "🔒", // Replace with an actual icon or SVG
    },
  ];

  const handleConnectWallet = () => {
    setIsModalOpen(true); // Open the Connect Wallet modal
  };

  const handleLogin = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to To-do dApp
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Stay on top of your tasks with our powerful to-do dApp. Organize,
          prioritize, and track tasks with ease, boosting your productivity and
          helping you get things done faster. Whether for personal goals or work
          projects, turn your to-do list into a done list!
        </p>
        <button
          onClick={() => setSeeMore(!seeMore)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          {seeMore ? "See Less" : "Explore Features"}
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <h2 className="flex text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 border-b-[3px] border-pink-500 w-[fit-content]">
            Features
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features
            .slice(0, seeMore ? features.length : 4)
            .map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4 text-indigo-600 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Connect your wallet and start managing your tasks with our intuitive
            to-do dApp.
          </p>
          <button
            onClick={handleConnectWallet}
            className="bg-pink-500 text-indigo-600 px-8 py-[10px] text-gray-50 rounded-lg font-semibold hover:bg-pink-600 transition-all duration-300 transform hover:scale-101"
          >
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Connect Wallet Modal */}
      {isModalOpen && (
        <CustomizedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
