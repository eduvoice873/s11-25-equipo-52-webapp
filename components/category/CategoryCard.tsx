import Link from "next/link";
import { Card } from "../ui/card";
import type { Categoria } from "@/app/generated/prisma";

export default function CategoryCard({ category }: { category: Categoria }) {
  return (
    <Link href={`/categories/${category.id}`}>
      <Card>
        <h1 className="text-xl font-bold">{category.titulo}</h1>
        <p>{category.mensaje}</p>
      </Card>
    </Link>
  );
}
