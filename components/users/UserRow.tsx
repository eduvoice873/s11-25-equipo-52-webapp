
"use client";
import Link from 'next/link';

import { useState } from "react";
import { UserType } from "@/types/user";
import { Pencil, Trash2 } from "lucide-react";

interface UserRowProps {
  user: UserType;
}

export function UserRow({ user }: UserRowProps) {
  const [status, setStatus] = useState(user.status);

  const getStatusClasses = () => {
    switch (status) {
      case "active":
        return "bg-green-200 text-green-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "inactive":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-4 flex items-center gap-3 cursor-pointer">
<Link href={`/users/${user.id}`}>
<img
  src={user.avatar ?? "https://i.pravatar.cc/150"}
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
          onChange={(e) => setStatus(e.target.value as UserType["status"])}
          className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${getStatusClasses()}`}
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>

      <td className="p-4 text-gray-700">{user.createdAt}</td>

      {/* Actions mantenidas ✅ */}
      <td className="p-4 flex justify-center gap-4">
        <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
          <Pencil size={16} />
        </button>
        <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
          <Trash2 size={16} />
        </button>
      </td>
      
    </tr>
  );
}
