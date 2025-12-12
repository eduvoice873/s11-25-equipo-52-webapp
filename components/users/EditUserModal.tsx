"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useUsers } from "@/hooks/swr/useUsers";
import { useCategories } from "@/hooks/swr/useCategories";
import type { UserType } from "@/types/user";

// Schema de validación para edición
const EditUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  activo: z.boolean(),
  categoriaAsignadaId: z.string().optional(),
});

type EditUserFormData = z.infer<typeof EditUserSchema>;

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const { updateUser } = useUsers();
  const { categories, isLoading: loadingCategories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user.name,
      activo: user.status === "active",
      categoriaAsignadaId: user.category || "",
    },
  });

  const onSubmit = async (data: EditUserFormData) => {
    setIsSubmitting(true);
    const success = await updateUser(user.id, {
      name: data.name,
      activo: data.activo,
      categoriaAsignadaId: data.categoriaAsignadaId || null,
    });
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const content = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Editar Usuario</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre del usuario"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email (solo lectura) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              Email</label>

          </div>

          {/* Estado */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("activo")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Usuario activo</span>
            </label>
          </div>

          {/* Categoría Asignada (solo para editores) */}
          {user.role === 'editor' && (
            <div>
              <label htmlFor="categoriaAsignadaId" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría Asignada
              </label>
              <select
                id="categoriaAsignadaId"
                {...register("categoriaAsignadaId")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loadingCategories}
              >
                <option value="">
                  {loadingCategories ? 'Cargando...' : 'Seleccionar categoría'}
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
              {errors.categoriaAsignadaId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoriaAsignadaId.message}</p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
