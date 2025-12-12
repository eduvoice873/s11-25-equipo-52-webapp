'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleBtn from './GoogleBtn';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUser, LoginUserSchema } from '@/models/zod/auth';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { useState } from 'react';
import { toast } from 'sonner';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { AlertCircle, Mail } from 'lucide-react';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginUser>({
    resolver: zodResolver(LoginUserSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const router = useRouter();
  const { data: session } = useSession();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [inactiveUser, setInactiveUser] = useState<{ email: string; adminEmail: string | null } | null>(null);

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        // Mostrar toast de error
        if (res.error === 'CredentialsSignin') {
          toast.error('Email o contraseña incorrectos');
          setError('email', { message: 'Credenciales inválidas' });
          setError('password', { message: 'Credenciales inválidas' });
        } else {
          toast.error(res.error || 'Error al iniciar sesión');
          setError('root', { message: res.error || 'Error desconocido' });
        }

        // Limpiar solo el campo de contraseña (mantener email)
        reset((values) => ({
          ...values,
          password: '',
        }));
      } else if (res?.ok) {
        // Obtener la sesión actualizada para verificar si está activo
        const updatedSession = await fetch('/api/auth/session').then(r => r.json());

        if (!updatedSession?.user?.activo) {
          // Usuario inactivo - obtener información del admin
          const adminInfo = await fetch(`/api/auth/admin-info?email=${data.email}`).then(r => r.json()).catch(() => ({ adminEmail: null }));

          setInactiveUser({
            email: data.email,
            adminEmail: adminInfo.adminEmail,
          });

          // Cerrar sesión inmediatamente
          await signIn('credentials', {
            email: data.email,
            password: 'logout',
            redirect: false,
          });

          reset();
          return;
        }

        toast.success('¡Bienvenido/a!');

        if (updatedSession?.user?.rol === 'admin') {
          router.push("/home");
        } else if (updatedSession?.user?.rol === 'editor') {
          router.push("/editor-dashboard");
        } else {
          router.push("/home");
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Error al procesar el login');
      reset();
    }
  };

  // Si hay un usuario inactivo, mostrar el mensaje
  if (inactiveUser) {
    return (
      <div className="flex flex-col items-center w-full px-4 py-6">
        <Card className="w-full max-w-md">
          <div className="p-8 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-red-100 rounded-full p-4">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Cuenta Inactiva
              </h2>
              <p className="text-gray-600">
                Tu cuenta se encuentra inactiva
              </p>
            </div>

            {/* Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                Contacta con soporte o con la persona que te invitó como editor para reactivar tu cuenta.
              </p>
            </div>

            {/* Admin Contact */}
            {inactiveUser.adminEmail ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-blue-900">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Contacto del Administrador:</span>
                </div>
                <a
                  href={`mailto:${inactiveUser.adminEmail}`}
                  className="inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full text-center"
                >
                  {inactiveUser.adminEmail}
                </a>
                <p className="text-xs text-blue-800">
                  Haz clic para enviar un correo al administrador
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  Por favor, contacta al soporte técnico para obtener ayuda.
                </p>
              </div>
            )}

            {/* Back Button */}
            <button
              onClick={() => setInactiveUser(null)}
              className="w-full bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver al Login
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4 py-6">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          {/* Email */}
          <FormField label="Email" error={errors.email}>
            <Input
              type="email"
              placeholder="tu@email.com"
              variant="default"
              {...register('email')}
            />
          </FormField>

          {/* Password */}
          <div className="relative">
            <FormField label="Contraseña" error={errors.password}>
              <div className="relative ">
                <Link
                  href="/forgot-password"
                  className=" absolute right-1 -top-6 text-sm  text-blue-600 hover:underline mt-1 inline-block"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
                <Input
                  type={passwordVisibility ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  {...register('password')}
                />

                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  {passwordVisibility ? <LuEyeClosed /> : <LuEye />}
                </button>
              </div>
            </FormField>
          </div>

          {/* BOTÓN LOGIN */}
          <Button
            type="submit"
            variant="login"
            size="md"
            disabled={Object.keys(errors).length > 0 || isSubmitting}
            className="w-full rounded-xl"
          >
            {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>

          {/* Divider */}
          <hr className="border-slate-200" />

          {/* Google */}
          <GoogleBtn
            disabled={true}
            title="Próximamente podrás iniciar sesión con Google"
          />
        </form>
      </Card>
    </div>
  );
}
