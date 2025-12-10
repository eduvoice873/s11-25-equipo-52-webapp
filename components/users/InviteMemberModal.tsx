"use client";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { useCategories } from '@/hooks/swr/useCategories';
import { useUsers } from '@/hooks/swr/useUsers';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  role: 'editor' | 'admin';
  password: string;
  confirmPassword: string;
  categoriaId?: string;
}

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const { categories, isLoading: loadingCategories } = useCategories();
  const { createEditor } = useUsers();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      role: 'editor',
      password: '',
      confirmPassword: '',
      categoriaId: '',
    },
  });

  const role = watch('role');
  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirm: data.confirmPassword,
        image: null as string | null, // Explicitly type as nullable
      };

      await createEditor(userData);

      reset();
      onClose();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      // El error ya se muestra con toast en el hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New Member">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField label="Name" error={errors.name}>
          <Input
            placeholder="User Name"
            {...register('name', { required: 'Name is required' })}
          />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <Input
            placeholder="user@email.com"
            {...register('email', {
              required: 'Email is required',
            })}
          />
        </FormField>

        <FormField label="Role" error={errors.role}>
          <select {...register('role')} className="border rounded-lg p-2">
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>

        <FormField label="Password" error={errors.password}>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 6 chars: uppercase, lowercase, number & special char"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    'Must contain at least 1 uppercase letter',
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    'Must contain at least 1 lowercase letter',
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || 'Must contain at least 1 number',
                  hasSpecialChar: (value) =>
                    /[\W_]/.test(value) ||
                    'Must contain at least 1 special character',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        <FormField label="Confirm Password" error={errors.confirmPassword}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
        </FormField>

        {role === 'editor' && (
          <FormField label="Assign Category" error={errors.categoriaId}>
            <select
              {...register('categoriaId', {
                required:
                  role === 'editor'
                    ? 'Category is required for editors'
                    : false,
              })}
              className="border rounded-lg p-2"
              disabled={loadingCategories}
            >
              <option value="">
                {loadingCategories ? 'Loading...' : 'Select a category'}
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </FormField>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creando...' : 'Crear usuario'}
        </button>
      </form>
    </Modal>
  );
}
