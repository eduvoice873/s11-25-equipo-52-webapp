import UsersTable from "@/components/users/UsersTable";
import { EmptyUsers } from "@/components/dashboard/EmptyUsers";
import  { mockUsers } from "@/components/users/mockUsers";
import { useUsers } from '@/hooks/swr/useUsers';

export default async function UsersPage() {
  // const res = await fetch(`${process.env.API_URL}/users`);
  // const users = await res.json();

  const users = mockUsers; // mock mientras llega el backend

  return (
    <div className="w-full p-6">
      {users.length === 0 ? <EmptyUsers /> : <UsersTable users={users} />}
    </div>
  );
}
