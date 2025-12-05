import CategoryDetails from "@/components/category/CategoryDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Este es un Server Component por defecto
export default async function CategoryPage({ params }: PageProps) {
  // Resolver la Promise AQUÍ en el Server Component
  const { id } = await params;

  console.log(" ID de categoría resuelto:", id);

  // Pasar el id ya resuelto al Client Component
  return <CategoryDetails id={id} />;
}
