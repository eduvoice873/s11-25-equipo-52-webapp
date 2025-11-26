// components/dashboard/DashboardLayout.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleClose = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={handleClose} />

      <div className="flex flex-col flex-1">
        <Navbar onToggle={handleToggle} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
