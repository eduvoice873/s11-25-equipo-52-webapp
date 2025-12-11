import TestimonioPublicForm from "./TestimonioPublicForm";


export default async function EnviarTestimonioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; 



  return <TestimonioPublicForm slug={slug} />;
}
