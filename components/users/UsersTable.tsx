"use client";
import { UserType } from '@/types/user';
import { mockUsers } from './mockUsers';
import { InviteMemberModal } from './InviteMemberModal';
import { useState } from 'react';
import { UserRow } from './UserRow';

export default function UsersTable({
  users = mockUsers,
}: {
  users?: UserType[];
}) {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="w-full  flex flex-col gap-6">
      {/* Header */}
      <div className="w-full relative">
        <p className="text-3xl font-bold text-[#111618]">User Management</p>
        <p className="text-base text-[#617c89]">
          Manage collaborators, roles, and permissions.
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
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
