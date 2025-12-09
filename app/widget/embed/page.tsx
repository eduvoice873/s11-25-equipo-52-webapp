import { Suspense } from 'react';
import VoicesHubWidget from '@/components/widget/VoicesHubWidget';
import { Loader2 } from 'lucide-react';

export default async function WidgetEmbedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  // Convertir string a tipo correcto
  const parseParam = (value: string | string[] | undefined, defaultValue: any) => {
    if (value === undefined) return defaultValue;
    const str = Array.isArray(value) ? value[0] : value;

    // Booleanos
    if (str === 'true') return true;
    if (str === 'false') return false;

    // Números
    if (!isNaN(Number(str))) return Number(str);

    return str;
  };

  const widgetProps = {
    organizacionId: params.organizacionId as string,
    categoriaId: params.categoriaId as string | undefined,
    limit: parseParam(params.limit, 10),
    destacados: parseParam(params.destacados, false),
    theme: parseParam(params.theme, 'light'),
    primaryColor: params.primaryColor as string,
    secondaryColor: params.secondaryColor as string,
    backgroundColor: params.backgroundColor as string,
    cardBackgroundColor: params.cardBackgroundColor as string,
    textColor: params.textColor as string,
    starColor: parseParam(params.starColor, '#FBBF24'),
    layout: parseParam(params.layout, 'grid'),
    columns: parseParam(params.columns, 3),
    cardStyle: parseParam(params.cardStyle, 'elevated'),
    borderRadius: parseParam(params.borderRadius, 'lg'),
    cardSpacing: parseParam(params.cardSpacing, 'normal'),
    showTitle: parseParam(params.showTitle, true),
    showAvatar: parseParam(params.showAvatar, true),
    showDate: parseParam(params.showDate, true),
    showCategory: parseParam(params.showCategory, true),
    showRating: parseParam(params.showRating, true),
    showMedia: parseParam(params.showMedia, true),
    showHighlight: parseParam(params.showHighlight, true),
    titleText: params.titleText as string,
    subtitleText: params.subtitleText as string,
    titleSize: parseParam(params.titleSize, '4xl'),
    textSize: parseParam(params.textSize, 'sm'),
    avatarSize: parseParam(params.avatarSize, 'md'),
    hoverEffect: parseParam(params.hoverEffect, true),
    animateOnScroll: parseParam(params.animateOnScroll, false),
    fontFamily: params.fontFamily as string,
    orderBy: parseParam(params.orderBy, 'fecha'),
    orderDirection: parseParam(params.orderDirection, 'desc'),
  };

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <VoicesHubWidget {...widgetProps} />
    </Suspense>
  );
}
