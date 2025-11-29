"use client";
import { Menu } from 'lucide-react';

export const Navbar = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <header className="w-full h-full bg-white shadow flex items-center px-4 z-50">
      <button className="md:hidden" onClick={onToggle}>
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="ml-4 font-semibold text-lg">Dashboard</h1>
    </header>
  );
};
