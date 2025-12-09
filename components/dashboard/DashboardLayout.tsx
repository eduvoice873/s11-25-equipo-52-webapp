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

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={handleClose} items={items} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggle={handleToggle} />

        <main className="flex-1 overflow-y-auto px-6 py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
