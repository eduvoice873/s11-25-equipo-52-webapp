// Este archivo ya no se usa para /formulario/nuevo
// La ruta /formulario/nuevo ahora usa directamente FormularioBuilderPage
// Este wrapper se mantiene solo para otras rutas dinámicas si las hay

import { use } from "react";
import FormularioBuilderPage from "./FormularioBuilderPage";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Wrapper para rutas dinámicas con [slug]
export default function FormularioBuilderPageWrapper({ params, searchParams }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || 'nuevo';

  // Este componente ya no maneja searchParams
  return (
    <FormularioBuilderPage
      formularioId={slug !== 'nuevo' ? slug : undefined}
      mode={slug !== 'nuevo' ? 'edit' : 'create'}
    />
  );
}
