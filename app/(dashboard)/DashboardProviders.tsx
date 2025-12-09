"use client";

import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "@/contexts/global/globalContext";

export function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
    </SessionProvider>
  );
}
