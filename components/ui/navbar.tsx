"use client";
import { Menu, User } from 'lucide-react';
import SignoutBtn from '@/components/auth/SignoutBtn';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const Navbar = ({ onToggle }: { onToggle: () => void }) => {
  const { data: session } = useSession();
  const name = session?.user?.name ?? 'Usuario';
  const email = session?.user?.email;

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 md:px-6 z-50">
      {/* Left Section - Menu & Logo */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={onToggle}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-3">
          <Image
            src="/EduVoiceCMS_logo-SN.png"
            alt="EduVoice CMS Logo"
            width={40}
            height={40}
            className="h-8 w-auto md:h-10"
            priority
          />
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-600">
              EduVoice CMS
            </h1>
            <p className="text-xs text-slate-500 hidden md:block">
              Sistema de gestión de testimonios
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - User Info & Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full">
            <User className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">{name}</span>
            {email && (
              <span className="text-xs text-slate-500">{email}</span>
            )}
          </div>
        </div>

        {/* Mobile user indicator */}
        <div className="md:hidden flex items-center justify-center w-9 h-9 bg-indigo-100 rounded-full">
          <User className="w-5 h-5 text-indigo-600" />
        </div>

        <SignoutBtn />
      </div>
    </header>
  );
};
