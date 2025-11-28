"use client";

import CategoriesCards from "@/components/category/CategoriesCards";
import { Button } from "@/components/ui/button";
import { clearNewCategory } from "@/contexts/global/globalActions";
import { useGlobalContext } from "@/contexts/global/globalContext";
import Link from "next/link";
import { useEffect } from "react";

export default function CategoriesPage() {
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch(clearNewCategory());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-start gap-4 h-full p-10">
      <CategoriesCards />
      <Button asChild>
        <Link href="/categories/create">Crear categoría</Link>
      </Button>
    </div>
  );
}
