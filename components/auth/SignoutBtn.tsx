"use client";
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function SignoutBtn() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      onClick={() => signOut({ redirectTo: '/login' })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 group ${isHovering
          ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
          : 'bg-brand-light text-gray-900 shadow-md hover:shadow-lg'
        }`}
      title="Cerrar sesión"
    >
      {/* Icono con animación */}
      <FaSignOutAlt className={`transition-transform duration-300 ${isHovering ? 'rotate-180' : ''}`} />

      {/* Texto que aparece al hover */}
      <span className={`transition-all duration-300 overflow-hidden ${isHovering ? 'w-20 opacity-100' : 'w-0 opacity-0'
        }`}>
        Salir
      </span>

      {/* Efecto de brillo */}
      {isHovering && (
        <div className="absolute inset-0 rounded-lg cursor-pointer from-transparent via-white to-transparent opacity-20 animate-pulse" />
      )}
    </button>
  );
}
