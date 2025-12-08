import TestimonioPublicForm from "@/app/formulario/[slug]/TestimonioPublicForm";


export default async function EnviarTestimonioPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ← Promise
}) {
  const { slug } = await params; // ← Await aquí

  console.log(" Slug recibido en page.tsx:", slug);

  return <TestimonioPublicForm slug={slug} />;
}