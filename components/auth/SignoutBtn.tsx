"use client";
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export default function SignoutBtn() {
  return (
    <button onClick={() => signOut({ redirectTo: '/login' })}>
      <FaSignOutAlt />
    </button>
  );
}
