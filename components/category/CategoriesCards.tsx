"use client";

import { useCategories } from "@/hooks/swr/useCategories";
import {CategoryCard} from "./CategoryCard";

export default function CategoriesCards() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <div className="">LOADING...</div>;
  if (error) return <div>ERROR</div>;
  if (!categories.length) return <div className="text-gray-500">Aún no hay categorías creadas.</div>;

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  );
}
