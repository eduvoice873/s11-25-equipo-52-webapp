import TestimonioPublicForm from "@/app/formulario/[slug]/TestimonioPublicForm";


export default async function EnviarTestimonioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;



  return <TestimonioPublicForm slug={slug} />;
}