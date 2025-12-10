'use client';

import UsersTable from '@/components/users/UsersTable';
import { EmptyUsers } from '@/components/dashboard/EmptyUsers';
import { useUsers } from '@/hooks/swr/useUsers';

export default function UsersPage() {
  const { users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="w-full p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error al cargar usuarios</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {users.length === 0 ? <EmptyUsers /> : <UsersTable users={users} />}
    </div>
  );
}
