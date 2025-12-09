import { TestimonialWidget } from '@/components/widget/TestimonialWidget';

interface PageProps {
  searchParams: Promise<{
    categoriaId?: string;
    organizacionId?: string;
    limit?: string;
    destacados?: string;
    theme?: 'light' | 'dark';
  }>;
}

export default async function EmbedTestimonialsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className={params.theme === 'dark' ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <TestimonialWidget
        categoriaId={params.categoriaId}
        organizacionId={params.organizacionId}
        limit={params.limit ? parseInt(params.limit) : 10}
        destacados={params.destacados === 'true'}
        theme={params.theme || 'light'}
      />
    </div>
  );
}
