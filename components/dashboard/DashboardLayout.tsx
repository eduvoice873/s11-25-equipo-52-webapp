// components/dashboard/DashboardLayout.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleClose = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen grid grid-rows-[64px_1fr] bg-gray-100">
      <Navbar onToggle={handleToggle} />
      <div className="relative flex h-full">
        <Sidebar isOpen={isSidebarOpen} onClose={handleClose} />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
