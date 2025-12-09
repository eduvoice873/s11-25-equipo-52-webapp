"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HeaderLanding() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-background shadow-lg py-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="EduVoice CMS - Inicio"
        >
          <Image
            src="/EduVoiceCMS_logo-SN.png"
            alt="EduVoice CMS Logo"
            width={40}
            height={40}
            className="h-8 w-auto md:h-10"
          />
          <span className="text-2xl font-extrabold text-brand-blue font-nunito">
            EduVoice CMS
          </span>
        </Link>

        <nav
          className="hidden md:flex gap-8 text-lg text-gray-700 font-semibold font-lato"
          aria-label="Navegación principal"
        >
          <Link
            href="/"
            className="hover:text-brand-light font-nunito transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#caracteristicas"
            className="hover:text-brand-light transition-colors"
          >
            Características
          </Link>
          <Link href="/#widgets" className="hover:text-brand-light transition-colors">
            Widgets
          </Link>
          <Link
            href="/#casos"
            className="hover:text-brand-light transition-colors"
          >
            Casos de Uso
          </Link>
        </nav>

        {status === "loading" ? (
          <div className="hidden md:block bg-gray-200 text-transparent px-6 py-2 rounded-xl animate-pulse">
            Cargando...
          </div>
        ) : session ? (
          <Link
            href="/home"
            className="hidden md:block bg-brand-blue text-background px-6 py-2 rounded-xl shadow-md hover:bg-brand-blue/90 transition-colors font-bold font-lato"
          >
            Ir al Dashboard
          </Link>
        ) : (
          <Link
            href="/signup"
            className="hidden md:block bg-brand-blue text-background px-6 py-2 rounded-xl shadow-md hover:bg-brand-blue/90 transition-colors font-bold font-lato"
          >
            Empezar Gratis
          </Link>
        )}

        <button
          className="md:hidden p-2 text-brand-blue"
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
