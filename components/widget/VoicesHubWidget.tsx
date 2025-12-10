'use client';

import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { Star, Loader2, Quote, Heart } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Testimonio {
  id: string;
  titulo: string | null;
  texto: string;
  calificacion: number;
  destacado: boolean;
  fecha: string;
  autor: {
    nombre: string;
    cargo: string;
    avatar: string;
  };
  medios: Array<{
    tipo: string;
    url: string;
  }>;
  etiquetas?: Array<{
    id: string;
    nombre: string;
  }>;
  categoria: {
    id: string;
    nombre: string;
  } | null;
}

interface VoicesHubWidgetProps {
  // Filtros de contenido
  categoriaId?: string;
  organizacionId?: string;
  limit?: number;
  destacados?: boolean;

  // Personalización de tema
  theme?: 'light' | 'dark' | 'custom';

  // Colores personalizados (cuando theme es 'custom')
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  starColor?: string;

  // Personalización de diseño
  layout?: 'grid' | 'masonry' | 'carousel' | 'list';
  columns?: 1 | 2 | 3 | 4;
  cardStyle?: 'elevated' | 'bordered' | 'minimal' | 'gradient';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  cardSpacing?: 'compact' | 'normal' | 'relaxed';

  // Personalización de contenido
  showTitle?: boolean;
  showAvatar?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  showMedia?: boolean;
  showHighlight?: boolean;

  // Personalización de textos
  titleText?: string;
  subtitleText?: string;
  emptyStateText?: string;
  loadingText?: string;

  // Personalización de tamaños
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  textSize?: 'xs' | 'sm' | 'base' | 'lg';
  avatarSize?: 'sm' | 'md' | 'lg' | 'xl';

  // Efectos y animaciones
  hoverEffect?: boolean;
  animateOnScroll?: boolean;
  transitionDuration?: number;

  // Fuentes
  fontFamily?: string;

  // Orden y filtrado
  orderBy?: 'fecha' | 'calificacion' | 'destacado';
  orderDirection?: 'asc' | 'desc';
}

export default function VoicesHubWidget({
  // Filtros
  categoriaId,
  organizacionId,
  limit = 10,
  destacados = false,

  // Tema
  theme = 'light',
  primaryColor = '#3B82F6',
  secondaryColor = '#10B981',
  backgroundColor,
  cardBackgroundColor,
  textColor,
  borderColor,
  starColor = '#FBBF24',

  // Layout
  layout = 'grid',
  columns = 3,
  cardStyle = 'elevated',
  borderRadius = 'lg',
  cardSpacing = 'normal',

  // Contenido
  showTitle = true,
  showAvatar = true,
  showDate = true,
  showCategory = true,
  showRating = true,
  showMedia = true,
  showHighlight = true,

  // Textos
  titleText = 'Lo que dicen nuestros clientes',
  subtitleText = 'Testimonios reales de personas que confían en nosotros',
  emptyStateText = 'No hay testimonios disponibles',
  loadingText = 'Cargando testimonios...',

  // Tamaños
  titleSize = '4xl',
  textSize = 'sm',
  avatarSize = 'md',

  // Efectos
  hoverEffect = true,
  animateOnScroll = false,
  transitionDuration = 300,

  // Fuente
  fontFamily,

  // Orden
  orderBy = 'fecha',
  orderDirection = 'desc',
}: VoicesHubWidgetProps) {
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (categoriaId) params.append('categoriaId', categoriaId);
    if (organizacionId) params.append('organizacionId', organizacionId);
    params.append('limit', limit.toString());
    if (destacados) params.append('destacados', 'true');
    return params.toString();
  }, [categoriaId, organizacionId, limit, destacados]);

  const { data: rawData, error, isLoading } = useSWR(
    `/api/public/testimonials?${queryString}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  const testimonios = useMemo(() => {
    if (!rawData || !Array.isArray(rawData)) return [];

    const sorted = [...rawData];
    sorted.sort((a: Testimonio, b: Testimonio) => {
      const multiplier = orderDirection === 'asc' ? 1 : -1;
      if (orderBy === 'calificacion') {
        return (a.calificacion - b.calificacion) * multiplier;
      } else if (orderBy === 'destacado') {
        return (Number(a.destacado) - Number(b.destacado)) * multiplier;
      } else {
        return (new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) * multiplier;
      }
    });

    return sorted;
  }, [rawData, orderBy, orderDirection]);

  useEffect(() => {
    const updateHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        { type: 'voiceshub-height', height },
        '*'
      );
    };

    // Small delay to ensure rendering is complete
    const timer = setTimeout(updateHeight, 100);
    window.addEventListener('resize', updateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeight);
    };
  }, [testimonios, isLoading]);

  const loading = isLoading;


  // Estilos dinámicos según tema
  const isDark = theme === 'dark';
  const isCustom = theme === 'custom';

  const styles = {
    bg: isCustom && backgroundColor ? backgroundColor : isDark ? '#111827' : '#F9FAFB',
    cardBg: isCustom && cardBackgroundColor ? cardBackgroundColor : isDark ? '#1F2937' : '#FFFFFF',
    text: isCustom && textColor ? textColor : isDark ? '#F3F4F6' : '#111827',
    border: isCustom && borderColor ? borderColor : isDark ? '#374151' : '#E5E7EB',
    primary: primaryColor,
    secondary: secondaryColor,
    star: starColor,
  };

  // Clases de diseño
  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-2xl',
  };

  const spacingClasses = {
    compact: 'gap-3',
    normal: 'gap-6',
    relaxed: 'gap-8',
  };

  const titleSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const avatarSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const cardStyleClasses = {
    elevated: 'shadow-lg',
    bordered: 'border-2',
    minimal: 'border',
    gradient: 'bg-gradient-to-br shadow-md',
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: styles.bg, fontFamily }}
      >
        <div className="flex items-center gap-2" style={{ color: styles.text }}>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{loadingText}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: styles.bg, fontFamily }}
      >
        <div className="text-red-500 text-center">
          <p className="font-semibold mb-2">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (testimonios.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: styles.bg, fontFamily }}
      >
        <div className="text-center" style={{ color: styles.text }}>
          <p className="text-lg font-semibold mb-2">{emptyStateText}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: styles.bg, fontFamily }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {titleText && (
            <h1
              className={`font-bold mb-4 ${titleSizeClasses[titleSize]}`}
              style={{ color: styles.text }}
            >
              {titleText}
            </h1>
          )}
          {subtitleText && (
            <p
              className="text-lg opacity-70"
              style={{ color: styles.text }}
            >
              {subtitleText}
            </p>
          )}
        </div>

        {/* Grid de testimonios */}
        <div className={`grid ${columnClasses[columns]} ${spacingClasses[cardSpacing]}`}>
          {testimonios.map((testimonio, index) => (
            <div
              key={testimonio.id}
              className={`
                ${radiusClasses[borderRadius]}
                ${cardStyleClasses[cardStyle]}
                p-6 flex flex-col relative
                ${hoverEffect ? 'hover:shadow-2xl hover:-translate-y-1' : ''}
                ${animateOnScroll ? 'opacity-0 animate-fade-in' : ''}
              `}
              style={{
                backgroundColor: cardStyle === 'gradient'
                  ? undefined
                  : styles.cardBg,
                borderColor: styles.border,
                backgroundImage: cardStyle === 'gradient'
                  ? `linear-gradient(135deg, ${styles.primary}15, ${styles.secondary}15)`
                  : undefined,
                transition: `all ${transitionDuration}ms ease`,
                animationDelay: animateOnScroll ? `${index * 100}ms` : undefined,
              }}
            >
              {/* Header: Avatar/Info + Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {showAvatar && (
                    <div
                      className={`${avatarSizeClasses[avatarSize]} rounded-full object-cover shrink-0 flex items-center justify-center font-bold text-white overflow-hidden`}
                      style={{ backgroundColor: styles.primary }}
                    >
                      {testimonio.autor.avatar ? (
                        <img
                          src={testimonio.autor.avatar}
                          alt={testimonio.autor.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        testimonio.autor.nombre
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)
                      )}
                    </div>
                  )}
                  <div>
                    <h3
                      className="font-bold leading-tight"
                      style={{ color: styles.text, fontSize: textSizeClasses[textSize] }}
                    >
                      {testimonio.autor.nombre}
                    </h3>
                    {testimonio.autor.cargo && (
                      <p
                        className="text-xs opacity-60 mt-0.5"
                        style={{ color: styles.text }}
                      >
                        {testimonio.autor.cargo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Badge Tipo Testimonio */}
                <div
                  className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${styles.primary}10`,
                    color: styles.primary
                  }}
                >
                  {testimonio.medios.some(m => m.tipo === 'video') ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Video
                    </>
                  ) : (
                    <>
                      <Quote className="w-3 h-3" />
                      Testimonio
                    </>
                  )}
                </div>
              </div>

              {/* Calificación */}
              {showRating && (
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{
                        color: i < testimonio.calificacion ? styles.star : styles.border,
                        fill: i < testimonio.calificacion ? styles.star : 'none',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Texto */}
              <div className="flex-1 mb-4">
                {showTitle && testimonio.titulo && (
                  <h4
                    className="font-semibold mb-2 text-sm"
                    style={{ color: styles.text }}
                  >
                    {testimonio.titulo}
                  </h4>
                )}

                {/* Etiquetas */}
                {testimonio.etiquetas && testimonio.etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {testimonio.etiquetas.map((etiqueta) => (
                      <span
                        key={etiqueta.id}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: `${styles.primary}15`,
                          color: styles.primary,
                        }}
                      >
                        #{etiqueta.nombre}
                      </span>
                    ))}
                  </div>
                )}

                <p
                  className={`${textSizeClasses[textSize]} leading-relaxed opacity-90 line-clamp-4`}
                  style={{ color: styles.text }}
                >
                  {testimonio.texto}
                </p>
              </div>

              {/* Medios */}
              {showMedia && testimonio.medios.length > 0 && (
                <div className="mb-4 rounded-lg overflow-hidden border border-opacity-10" style={{ borderColor: styles.border }}>
                  {testimonio.medios[0].tipo === 'imagen' && (
                    <img
                      src={testimonio.medios[0].url}
                      alt="Media"
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  {testimonio.medios[0].tipo === 'video' && (
                    <video
                      src={testimonio.medios[0].url}
                      controls
                      className="w-full h-40 object-cover bg-black"
                    />
                  )}
                </div>
              )}

              {/* Footer: Fecha + Likes */}
              <div
                className="flex justify-between items-center pt-4 mt-auto border-t border-opacity-10"
                style={{ borderColor: styles.border }}
              >
                {showDate && (
                  <span
                    className="text-xs opacity-50 font-medium"
                    style={{ color: styles.text }}
                  >
                    {/* Calcular "Hace X tiempo" de forma simple */}
                    {(() => {
                      const diff = Date.now() - new Date(testimonio.fecha).getTime();
                      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                      if (days === 0) return 'Hoy';
                      if (days === 1) return 'Ayer';
                      if (days < 30) return `Hace ${days} días`;
                      return new Date(testimonio.fecha).toLocaleDateString('es-ES', {
                        month: 'short',
                        day: 'numeric'
                      });
                    })()}
                  </span>
                )}

                <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  <Heart
                    className={`w-4 h-4 ${testimonio.destacado ? 'fill-red-500 text-red-500' : ''}`}
                    style={{ color: testimonio.destacado ? undefined : styles.text }}
                  />
                  <span className="text-xs font-medium" style={{ color: styles.text }}>
                    {testimonio.destacado ? '12' : '0'}
                  </span>
                </div>
              </div>

              {/* Etiqueta Destacado (Opcional, si se quiere mantener visualmente distinto) */}
              {showHighlight && testimonio.destacado && (
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-sm z-10"
                  title="Destacado"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
