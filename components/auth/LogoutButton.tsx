'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
    >
      <LogOut className="w-5 h-5" />
      Cerrar Sesión
    </button>
  );
}
