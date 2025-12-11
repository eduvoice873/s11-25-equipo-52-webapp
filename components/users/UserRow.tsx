
"use client";
import Link from 'next/link';
import { useState } from 'react';
import { UserType } from '@/types/user';
import { Pencil, Trash2 } from 'lucide-react';
import { useUsers } from '@/hooks/swr/useUsers';
import { EditUserModal } from './EditUserModal';

interface UserRowProps {
  user: UserType;
}

export function UserRow({ user }: UserRowProps) {
  const [status, setStatus] = useState(user.status);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateUser, deleteUser } = useUsers();

  const getStatusClasses = () => {
    switch (status) {
      case 'active':
        return 'bg-green-200 text-green-800';
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'inactive':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  const handleStatusChange = async (newStatus: UserType['status']) => {
    const previousStatus = status;
    setStatus(newStatus);
    setIsUpdating(true);

    try {
      await updateUser(user.id, {
        activo: newStatus === 'active',
      });
    } catch {
      // Revertir el cambio si falla
      setStatus(previousStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
      try {
        await deleteUser(user.id);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-4 flex items-center gap-3 cursor-pointer">
        <Link href={`/users/${user.id}`}>
          <img
            src={user.avatar ?? 'https://i.pravatar.cc/150'}
            alt={user.name}
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition"
          />
        </Link>
        <Link href={`/users/${user.id}`}>
          <span className="font-medium text-[#111618] hover:underline cursor-pointer">
            {user.name}
          </span>
        </Link>
      </td>

      <td className="p-4 text-gray-700">{user.email}</td>
      <td className="p-4 capitalize text-gray-700">{user.role}</td>

      {/* Status editable 👇 */}
      <td className="p-4">
        <select
          aria-label="Change user status"
          value={status}
          onChange={(e) =>
            handleStatusChange(e.target.value as UserType['status'])
          }
          disabled={isUpdating}
          className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getStatusClasses()}`}
        >
          <option value="active">Activo</option>
          <option value="pending">Pendiente</option>
          <option value="inactive">Inactivo</option>
        </select>
      </td>

      <td className="p-4 text-gray-700">{user.createdAt}</td>

      {/* Actions mantenidas ✅ */}
      <td className="p-4 flex justify-center gap-4">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          title="Editar usuario"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          title="Eliminar usuario"
        >
          <Trash2 size={16} />
        </button>
      </td>

      {/* Modal de edición */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </tr>
  );
}
