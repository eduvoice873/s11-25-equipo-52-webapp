import CategoryDetails from "@/components/category/CategoryDetails";

export default async function CategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <CategoryDetails id={id} />
    </div>
  );
}
