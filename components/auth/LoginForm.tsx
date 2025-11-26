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

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginUser>({
    resolver: zodResolver(LoginUserSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      if (res.error === 'CredentialsSignin') {
        setError('root', { message: 'Credenciales inválidas' });
      } else {
        setError('root', { message: 'Error desconocido' });
      }
    } else {
      toast.success('Bienvenida 😄');
      router.push('/home');
    }
  };

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
          <GoogleBtn />
        </form>
      </Card>
    </div>
  );
}
