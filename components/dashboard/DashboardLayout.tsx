// components/dashboard/DashboardLayout.tsx
"use client";
import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Navbar } from '@/components/ui/navbar';
import { adminMenu, editorMenu } from '@/components/ui/menuItems';

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: 'admin' | 'editor';
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleClose = () => setIsSidebarOpen(false);
  const items = role === 'admin' ? adminMenu : editorMenu;

  console.log(role);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={handleClose} items={items} />

      <div className="flex flex-col flex-1">
        <Navbar onToggle={handleToggle} />

        <main className="pt-20 ">{children}</main>
      </div>
    </div>
  );
}
