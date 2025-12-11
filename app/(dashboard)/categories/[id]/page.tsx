import CategoryDetails from "@/components/category/CategoryDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;

 

  return <CategoryDetails id={id} />;
}
