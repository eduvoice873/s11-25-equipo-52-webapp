"use client";
//

import Link from "next/link";
import { SignupUserSchema, SignupUser } from "@/models/zod/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleBtn from "./GoogleBtn";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/FormField';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupUser>({
    resolver: zodResolver(SignupUserSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignupUser> = async (data) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        organizacion_slug: slugify(data.organizacion, { lower: true }),
      }),
    });

    if (res.ok) {
      const resAuth = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resAuth.error) {
        router.push('/home');
      }
    } else {
      if (res.status === 400) {
        const parsedRes = await res.json();
        if (parsedRes.field === 'email') {
          setError('root', { message: 'Email asociado a otra cuenta' });
        }
        if (parsedRes.field === 'organization') {
          setError('root', { message: 'Organización asociada a otra cuenta' });
        }
      } else if (res.status === 500) {
        setError('root', { message: 'Error interno del servidor' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-6">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <FormField label="Nombre de usuario" error={errors.name}>
            <Input type="text" placeholder="Tu nombre" {...register('name')} />
          </FormField>
          <FormField label="Email" error={errors.email}>
            <Input
              type="email"
              placeholder="tu@email.com"
              {...register('email')}
            />
          </FormField>
          <FormField label="Organización" error={errors.organizacion}>
            <Input
              type="text"
              placeholder="Nombre de tu organización"
              {...register('organizacion')}
            />
          </FormField>
          <FormField label="Contraseña" error={errors.password}>
            <div className="relative">
              <Input
                type={passwordVisibility ? 'text' : 'password'}
                placeholder="Crea una contraseña"
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
          <FormField label="Confirmar contraseña" error={errors.confirm}>
            <div className="relative">
              <Input
                type={confirmVisibility ? 'text' : 'password'}
                placeholder="Repite la contraseña"
                {...register('confirm')}
              />

              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setConfirmVisibility(!confirmVisibility)}
              >
                {confirmVisibility ? <LuEyeClosed /> : <LuEye />}
              </button>
            </div>
          </FormField>
          {/* Errores raiz */}
          {errors.root && (
            <span className="text-sm text-red-500">{errors.root.message}</span>
          )}
          <Button
            type="submit"
            variant="login"
            size="md"
            disabled={Object.keys(errors).length > 0 || isSubmitting}
            className="w-full rounded-xl"
          >
            {isSubmitting ? 'Cargando...' : 'Crear cuenta'}
          </Button>
          <hr className="border" />
          <GoogleBtn />
        </form>
      </Card>
    </div>
  );
}
