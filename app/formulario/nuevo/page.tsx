import FormularioBuilderPage from "../[slug]/builder/FormularioBuilderPage";

type NewFormularioPageProps = {
  searchParams: Promise<{
    categoriaId?: string;
  }>;
};

export default async function NewFormularioPage({ searchParams }: NewFormularioPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoriaId = resolvedSearchParams?.categoriaId;

 

  return (
    <FormularioBuilderPage
      categoriaId={categoriaId}
      mode="create"
    />
  );
}
