"use client";

import { ContextProvider } from "@/components/ContextProvider";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useTAppStore } from "@/store/appStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const DefaultComponent = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTAppStore();
  if (typeof window === "undefined") {
    // Prevent rendering if window is not available
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <header className="fixed w-full z-50">
        <NavBar />
      </header>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <main className="flex-1 mt-24 flex flex-col">{children}</main>
          <ToastContainer />
        </ContextProvider>
      </QueryClientProvider>
      <footer className="bg-gray-200">
        <Footer />
      </footer>
    </QueryClientProvider>
  );
};
export default DefaultComponent;
