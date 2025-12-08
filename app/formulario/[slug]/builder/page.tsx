"use client";

import { useParams, useSearchParams } from "next/navigation";
import FormularioBuilderPage from "./FormularioBuilderPage";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Wrapper para modo creación - solo se usa con slug="nuevo"
export default function FormularioBuilderPageWrapper({ params, searchParams }: PageProps) {
  const resolvedParams = useParams();
  const resolvedSearchParams = useSearchParams();

  // En modo builder, siempre esperamos slug="nuevo" para creación
  const slug = typeof resolvedParams?.slug === 'string' ? resolvedParams.slug : 'nuevo';

  // Extraer categoriaId de searchParams (requerido para crear)
  const categoriaId = resolvedSearchParams?.get('categoriaId') || undefined;

  // Si el slug no es "nuevo", estamos en la ruta incorrecta
  if (slug !== "nuevo") {
    console.warn("⚠️ Builder page recibió slug diferente a 'nuevo':", slug);
  }

  return (
    <FormularioBuilderPage
      categoriaId={categoriaId}
      mode="create"
    />
  );
}
