"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { Button } from '@/components/ui/button';

export default function GoogleBtn() {
  return (
    <Button
      variant="yellow"
      size="md"
      onClick={() => signIn('google')}
      className="flex w-full  gap-2 m-1"
    >
      <FcGoogle fontSize="30px" />
      Google
    </Button>
  );
}
