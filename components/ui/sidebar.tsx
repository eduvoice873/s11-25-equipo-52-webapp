"use client";

import React from "react";
import { SidebarItem } from "./SidebarItem";
import { menuItems } from "./menuItems";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number; // altura del navbar
}

export const Sidebar = ({ isOpen, onClose, topOffset = 64 }: SidebarProps) => {
  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/40 z-30 md:hidden" />}

      <aside
        className={cn(
          `absolute left-0 top-0 h-full z-40 w-[260px]
          bg-white shadow-xl p-4 rounded-tr-2xl rounded-br-2xl
          transition-transform duration-300 md:translate-x-0 md:relative`,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
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
