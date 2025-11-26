"use client";
import React from "react";
import Link from "next/link";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
  active?: boolean;
}

export const SidebarItem = ({
  icon,
  label,
  href,
  badge,
  active,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-xl transition
      ${
        active
          ? "bg-blue-900 text-gray-100"
          : "bg-white text-black hover:bg-gray-100"
      }`}
    >
      <div className="w-6 h-6 flex-shrink-0">{icon}</div>

      <p className={`flex-1 text-base font-medium`}>{label}</p>

      {badge !== undefined && (
        <div className="px-2 py-1 rounded-full bg-[#febc2f] text-xs font-semibold text-black">
          {badge}
        </div>
      )}
    </Link>
  );
};
