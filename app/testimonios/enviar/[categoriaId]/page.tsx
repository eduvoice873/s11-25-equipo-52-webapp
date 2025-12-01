import TestimonioPublicForm from "@/app/testimonios/components/TestimonioPublicForm";

interface PageProps {
  params: {
    categoriaId: string;
  };
}

export default function EnviarTestimonioPage({ params }: PageProps) {
  return <TestimonioPublicForm params={{ slug: params.categoriaId }} />;
}
