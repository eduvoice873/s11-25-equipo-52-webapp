import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from 'next/link';


export const metadata: Metadata = {
  title: "Login - EduVoice CMS",
  description: "Inicia sesión en tu cuenta de EduVoice CMS",
  icons: {
    icon: '/EduVoiceCMS_logo-SN.png',
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-[#1a202c]">
          Bienvenido de nuevo
        </h1>

        <p className="text-center text-[#a0aec0]">
          Inicia sesión para acceder a tu cuenta de EduVoice.
        </p>

        <LoginForm />
      </div>
      <p className="text-center text-sm p-4">
        <span className="text-[#a0aec0]">¿No tienes una cuenta?</span>{' '}
        <Link
          href="/signup"
          className="text-[#4a55e1] font-medium hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
}
