"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './SidebarItem';
import { SidebarItemType } from '@/types/sidebar';
import SignoutBtn from '@/components/auth/SignoutBtn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number;
  items: SidebarItemType[];
}

export const Sidebar = ({ items, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Área de activación hover (solo visible en md+) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        className="hidden md:block fixed left-0 top-20 w-4 h-screen z-40"
      />

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed left-0 top-20 z-40 h-screen w-[260px]
          bg-white shadow-xl p-4 rounded-tr-2xl rounded-br-2xl
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${!isHovered ? 'md:-translate-x-full md:hover:translate-x-0' : 'md:translate-x-0'}
        `}
      >
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              active={pathname.startsWith(item.href)}
            />
          ))}

          <SignoutBtn />
        </div>
      </aside>
    </>
  );
};
