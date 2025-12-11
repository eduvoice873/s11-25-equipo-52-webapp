"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

interface GoogleBtnProps {
  disabled?: boolean;
  title?: string;
}

export default function GoogleBtn({ disabled = false, title }: GoogleBtnProps) {
  return (
    <div className="relative group">
      <Button
        type="button"
        variant="yellow"
        size="md"
        disabled={disabled}
        onClick={() => !disabled && signIn("google")}
        className="flex w-full gap-2 m-1"
      >
        <FcGoogle fontSize="30px" />
        Google
      </Button>
      {disabled && title && (
        <div className="absolute left-0 right-0 bottom-full mb-2 bg-slate-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {title}
        </div>
      )}
    </div>
  );
}
