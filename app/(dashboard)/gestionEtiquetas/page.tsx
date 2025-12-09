import GestionEtiquetas from "@/components/gestionEtiquetas/page";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Gestión de Etiquetas",
  description: "Administra las etiquetas para organizar tus testimonios",
};

export default function GestionEtiquetasPage() {
  return <GestionEtiquetas />;
}