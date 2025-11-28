"use client";

import { useCategory } from "@/hooks/swr/useCategory";

export default function CategoryDetails({ id }: { id: string }) {
  const { category, isLoading, error } = useCategory(id);

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div>
      <h1>{category.titulo}</h1>
      {category.testimonios.map((testimonio) => (
        <p key={testimonio.id}>{testimonio.titulo}</p>
      ))}
    </div>
  );
}
