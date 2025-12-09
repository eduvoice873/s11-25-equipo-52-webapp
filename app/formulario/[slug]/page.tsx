import TestimonioPublicForm from "./TestimonioPublicForm";


export default async function EnviarTestimonioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✔ Necesario en Next 15+ con Turbopack

  console.log("Slug recibido desde page.tsx:", slug);

  return <TestimonioPublicForm slug={slug} />;
}
