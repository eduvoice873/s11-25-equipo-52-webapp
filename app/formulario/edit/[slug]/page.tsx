"use client";

import { useParams } from "next/navigation";
import FormularioBuilderPage from "../../[slug]/builder/FormularioBuilderPage";

export default function EditFormularioPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // En modo edición, el slug es el ID del formulario
  return <FormularioBuilderPage formularioId={slug} mode="edit" />;
}
