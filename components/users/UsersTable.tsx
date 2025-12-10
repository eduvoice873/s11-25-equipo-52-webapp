"use client";
import { UserType } from '@/types/user';
import { InviteMemberModal } from './InviteMemberModal';
import { useState, useMemo } from 'react';
import { UserRow } from './UserRow';

interface ApiUser {
  id: string;
  name: string | null;
  email: string;
  rol: 'admin' | 'editor';
  activo: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UsersTable({ users = [] }: { users?: ApiUser[] }) {
  const [inviteOpen, setInviteOpen] = useState(false);

  // Mapear usuarios de la API al formato de UserType
  const mappedUsers: UserType[] = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      name: user.name || 'Sin nombre',
      email: user.email,
      role: user.rol,
      status: user.activo ? 'active' : 'inactive',
      avatar: user.image || undefined,
      createdAt: new Date(user.createdAt).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      lastSeen: new Date(user.updatedAt).toLocaleDateString('es-ES'),
      category: '', // No disponible en la API
      tags: [], // No disponible en la API
      testimonials: [], // No disponible en la API
    }));
  }, [users]);

  return (
    <div className="w-full  flex flex-col gap-6">
      {/* Header */}
      <div className="w-full relative">
        <p className="text-3xl font-bold text-[#111618]">Gestión de Usuarios</p>
        <p className="text-base text-[#617c89]">
          Gestiona colaboradores, roles y permisos.
        </p>

        <button
          onClick={() => setInviteOpen(true)}
          className="absolute right-0 top-0 flex items-center gap-2 bg-[#1152d4] text-white px-4 py-2 rounded-lg"
        >
          <span className="text-lg font-medium">+</span>
          <span className="text-sm font-medium">Invite Member</span>
        </button>
      </div>

      {/* Modal */}
      <InviteMemberModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />

      {/* Table */}
      {mappedUsers.length === 0 ? (
        <div className="w-full bg-white shadow-md rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">No hay usuarios registrados</p>
          <p className="text-gray-400 text-sm mt-2">
            Comienza invitando a un miembro del equipo
          </p>
        </div>
      ) : (
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-4">Usuario</th>
              <th className="p-4">Email</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Creado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {mappedUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
