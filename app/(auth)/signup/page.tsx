import SignupForm from "@/components/auth/SignupForm";
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-[#1a202c]">
          Crea tu cuenta
        </h1>

        <p className="text-center text-[#a0aec0]">
          Comienza a recolectar y gestionar los testimonios que impulsan tu
          crecimiento.
        </p>

        <SignupForm />
      </div>

      <p className="text-center text-sm p-4">
        <span className="text-[#a0aec0]">¿Ya tienes una cuenta?</span>{' '}
        <Link
          href="/login"
          className="text-[#4a55e1] font-medium hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
