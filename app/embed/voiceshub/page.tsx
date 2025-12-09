'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VoicesHubWidget from '@/components/widget/VoicesHubWidget';

function VoicesHubContent() {
  const searchParams = useSearchParams();

  const categoriaId = searchParams.get('categoriaId') || undefined;
  const organizacionId = searchParams.get('organizacionId') || undefined;
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const destacados = searchParams.get('destacados') === 'true';
  const theme = (searchParams.get('theme') || 'light') as 'light' | 'dark';

  return (
    <VoicesHubWidget
      categoriaId={categoriaId}
      organizacionId={organizacionId}
      limit={limit}
      destacados={destacados}
      theme={theme}
    />
  );
}

export default function VoicesHubEmbedPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Cargando...</div>
      </div>
    }>
      <VoicesHubContent />
    </Suspense>
  );
}
