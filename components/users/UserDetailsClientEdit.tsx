"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const UserUpdateFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  password: z.string().optional().or(z.literal('')),
  activo: z.boolean(),
  categoriaId: z.string().optional(),
});

type UserUpdateForm = z.infer<typeof UserUpdateFormSchema>;

export default function UserDetailsClient({ user }: { user: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [userCategory, setUserCategory] = useState<any>(null);

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Buscar categoría asignada al usuario
  useEffect(() => {
    const findUserCategory = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`);
        if (response.ok) {
          const userData = await response.json();
          // Buscar la categoría donde el usuario es creadoPor
          const userCat = categories.find(cat => cat.creadoPorId === userData.id);
          if (userCat) {
            setUserCategory(userCat);
          }
        }
      } catch (error) {
        console.error('Error al buscar categoría del usuario:', error);
      }
    };

    if (categories.length > 0) {
      findUserCategory();
    }
  }, [categories, user.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateForm>({
    resolver: zodResolver(UserUpdateFormSchema),
    defaultValues: {
      name: user.name || '',
      activo: user.activo !== false,
      categoriaId: userCategory?.id || '',
    },
  });

  const onSubmit = async (data: UserUpdateForm) => {
    try {
      setIsSaving(true);

      const payload = {
        name: data.name,
        activo: data.activo,
        ...(data.password && { password: data.password }),
        ...(data.categoriaId && { categoriaId: data.categoriaId }),
      };

      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al actualizar usuario');
      }

      toast.success('Usuario actualizado correctamente');
      router.push('/users');
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error(error instanceof Error ? error.message : 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Usuario</h1>
          <p className="text-gray-500 mt-1">Actualiza los datos del usuario</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Información del Usuario */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Usuario</h2>

            {/* Avatar e Email (readonly) */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500">No editable</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 capitalize">{user.rol}</p>
                  <p className="text-xs text-gray-500">No editable</p>
                </div>
              </div>
            </div>

            {/* Nombre */}
            <FormField label="Nombre" error={errors.name}>
              <Input
                placeholder="Nombre completo"
                {...register('name')}
              />
            </FormField>
          </div>

          {/* Seguridad */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h2>
            <p className="text-sm text-gray-600 mb-4">
              Deja en blanco si no deseas cambiar la contraseña
            </p>

            <FormField label="Nueva Contraseña" error={errors.password}>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 chars: uppercase, lowercase, number & special char"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormField>
          </div>

          {/* Estado */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado</h2>

            <FormField label="Estado del Usuario" error={errors.activo}>
              <select
                {...register('activo', {
                  setValueAs: (value) => value === 'true' || value === true,
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </FormField>
          </div>

          {/* Categoría (solo para editores) */}
          {user.rol === 'editor' && (
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categoría Asignada</h2>

              <FormField label="Categoría" error={errors.categoriaId}>
                <select
                  {...register('categoriaId')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loadingCategories}
                >
                  <option value="">
                    {loadingCategories ? 'Cargando categorías...' : 'Seleccionar categoría'}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nombre}
                    </option>
                  ))}
                </select>
              </FormField>

              {userCategory && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Categoría actual:</strong> {userCategory.nombre}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Información General */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>Creado: {new Date(user.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
            <p>Última actualización: {new Date(user.updatedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
