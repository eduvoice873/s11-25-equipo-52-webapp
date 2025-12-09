import { SingleTestimonialWidget } from '@/components/widget/SingleTestimonialWidget';

interface EmbedTestimonialPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ theme?: 'light' | 'dark' }>;
}

export default async function EmbedTestimonialPage({
  params,
  searchParams
}: EmbedTestimonialPageProps) {
  const { id } = await params;
  const { theme = 'light' } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <SingleTestimonialWidget testimonioId={id} theme={theme} />
    </div>
  );
}
