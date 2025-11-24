"use client";

import React from 'react';
import { SidebarItem } from './SidebarItem';
import { menuItems } from './menuItems';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number; // altura del navbar
}

export const Sidebar = ({ isOpen, onClose, topOffset = 64 }: SidebarProps) => {
  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 z-40 w-[260px] h-screen top-0 
          bg-white shadow-xl p-4 rounded-tr-2xl rounded-br-2xl
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        <div className="flex flex-col  gap-2">
          {menuItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </aside>
    </>
  );
};
