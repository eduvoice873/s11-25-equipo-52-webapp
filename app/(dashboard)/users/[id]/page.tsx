import { mockUsers } from "@/components/users/mockUsers";
import UserDetailsClient from "@/components/users/UserDetailsClient";


export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = mockUsers.find(u => u.id === id)

  if (!user) {
    return <div>User not found</div>
  }

return <UserDetailsClient user={user} />;
}
