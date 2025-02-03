"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTAppStore } from "@/store/appStore";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { byteToHex } from "@/utils/constants";
import CustomizedModal from "../ConnectWalletModal";

const ApexChartsDynamic = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Task {
  title: string;
  status: "completed" | "pending";
  due_date: string;
}

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  tasksDue: Record<string, number>;
}

const Dashboard: React.FC = () => {
  const { session } = useTAppStore();
  const [taskStats, setTaskStats] = useState<TaskStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    tasksDue: {},
  });
  const { toggleTheme, theme } = useTAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogin = () => {
    setIsModalOpen(false);
  };

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
      enabled: !!session,
    });

  const totalTasks = useMemo(
    () => data?.pages.flatMap((page) => page.tasks) ?? [],
    [data]
  );

  const stats = useMemo(() => {
    const completedTasks = totalTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pendingTasks = totalTasks.filter(
      (task) => task.status === "pending"
    ).length;

    const tasksDue = totalTasks.reduce((acc: Record<string, number>, task) => {
      const dueDate = task.due_date;
      acc[dueDate] = (acc[dueDate] || 0) + 1;
      return acc;
    }, {});

    return {
      totalTasks: totalTasks.length,
      completedTasks,
      pendingTasks,
      tasksDue,
    };
  }, [totalTasks]);

  useEffect(() => {
    setTaskStats(stats);
  }, [stats]);

  const taskCompletionChartOptions = {
    chart: {
      type: "donut" as const,
      background: "transparent",
    },
    labels: ["Completed Tasks", "Pending Tasks"],
    colors: ["#28a745", "#dc3545"],
    series: [stats.completedTasks, stats.pendingTasks],
  };

  const tasksByDueDateChartOptions = {
    chart: {
      type: "bar" as const,
    },
    xaxis: {
      categories: Object.keys(stats.tasksDue),
    },
    title: {
      text: "Tasks by Due Date",
    },
    series: [
      {
        name: "Number of Tasks",
        data: Object.values(stats.tasksDue),
      },
    ],
  };

  return (
    <>
      {session ? (
        <div className="p-8 space-y-8">
          <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
              style={{ borderRadius: "0.5rem" }}
            >
              <h2 className="text-xl text-gray-800 dark:text-white">
                Total Tasks
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.totalTasks}
              </p>
            </div>
            <div className="p-6 bg-gray-200 dark:bg-gray-600 rounded-lg shadow-md">
              <h2 className="text-xl text-gray-800 dark:text-white">
                Completed Tasks
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.completedTasks}
              </p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
              <h2 className="text-xl text-gray-800 dark:text-white">
                Pending Tasks
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.pendingTasks}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 dark:text-white">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl mb-4 text-center text-gray-900 dark:text-white">
                Task Completion Overview
              </h3>
              <ApexChartsDynamic
                options={taskCompletionChartOptions}
                series={taskCompletionChartOptions.series}
                type="donut"
                width="100%"
                height="90%"
              />
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl mb-4 text-center dark:text-white">
                Tasks by Due Date
              </h3>
              <ApexChartsDynamic
                options={tasksByDueDateChartOptions}
                series={tasksByDueDateChartOptions.series}
                type="bar"
                width="100%"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-32">
          <div className="w-2/5 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:bg-gradient-to-r dark:from-pink-600 dark:via-purple-600 dark:to-indigo-700 rounded-lg shadow-xl text-center">
            <h1 className="text-3xl font-bold text-gray-100 dark:text-white mb-4">
              Please Connect Your Wallet
            </h1>
            <p className="text-lg text-gray-300 dark:text-gray-300 mb-8">
              Connect your wallet and start managing your tasks!
            </p>
            {!session && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="group px-8 py-[12px] bg-pink-500 text-white rounded-lg font-semibold shadow-xl border-4 border-transparent duration-300 animate-pulse hover:animate-none"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <CustomizedModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLogin={handleLogin}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
