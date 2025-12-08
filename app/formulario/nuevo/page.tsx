import FormularioBuilderPage from "../[slug]/builder/page";

type NewFormularioPageProps = {
  searchParams?: {
    categoriaId?: string;
  };
};

export default function NewFormularioPage({ searchParams }: NewFormularioPageProps) {
  return <FormularioBuilderPage categoriaId={searchParams?.categoriaId} />;
}
