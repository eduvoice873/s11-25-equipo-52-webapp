'use client';

import { useEffect, useState } from 'react';
import { Star, Loader2, Quote } from 'lucide-react';

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
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonios();
  }, [categoriaId, organizacionId, limit, destacados]);

  useEffect(() => {
    const updateHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        { type: 'voiceshub-height', height },
        '*'
      );
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [testimonios]);

  const loadTestimonios = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (categoriaId) params.append('categoriaId', categoriaId);
      if (organizacionId) params.append('organizacionId', organizacionId);
      params.append('limit', limit.toString());
      if (destacados) params.append('destacados', 'true');

      const response = await fetch(`/api/public/testimonials?${params.toString()}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      let data = await response.json();
      data = Array.isArray(data) ? data : [];

      // Ordenar testimonios
      data.sort((a: Testimonio, b: Testimonio) => {
        const multiplier = orderDirection === 'asc' ? 1 : -1;
        if (orderBy === 'calificacion') {
          return (a.calificacion - b.calificacion) * multiplier;
        } else if (orderBy === 'destacado') {
          return (Number(a.destacado) - Number(b.destacado)) * multiplier;
        } else {
          return (new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) * multiplier;
        }
      });

      setTestimonios(data);
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudieron cargar los testimonios');
    } finally {
      setLoading(false);
    }
  };

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
                p-6 flex flex-col
                ${hoverEffect ? 'hover:shadow-2xl hover:-translate-y-2' : ''}
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
              {/* Header con autor */}
              {showAvatar && (
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonio.autor.avatar}
                    alt={testimonio.autor.nombre}
                    className={`${avatarSizeClasses[avatarSize]} rounded-full object-cover`}
                    style={{ border: `2px solid ${styles.primary}` }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold truncate"
                      style={{ color: styles.text, fontSize: textSizeClasses[textSize] }}
                    >
                      {testimonio.autor.nombre}
                    </p>
                    {testimonio.autor.cargo && (
                      <p
                        className="text-xs truncate opacity-70"
                        style={{ color: styles.text }}
                      >
                        {testimonio.autor.cargo}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Calificación */}
              {showRating && (
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      style={{
                        color: i < testimonio.calificacion ? styles.star : styles.border,
                        fill: i < testimonio.calificacion ? styles.star : 'none',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Título */}
              {showTitle && testimonio.titulo && (
                <h3
                  className="font-semibold mb-2"
                  style={{ color: styles.text }}
                >
                  {testimonio.titulo}
                </h3>
              )}

              {/* Quote icon decorativo */}
              <Quote
                className="w-8 h-8 opacity-20 mb-2"
                style={{ color: styles.primary }}
              />

              {/* Texto */}
              <p
                className={`mb-4 flex-1 ${textSizeClasses[textSize]} leading-relaxed`}
                style={{ color: styles.text }}
              >
                {testimonio.texto}
              </p>

              {/* Medios */}
              {showMedia && testimonio.medios.length > 0 && (
                <div className="mb-4">
                  {testimonio.medios[0].tipo === 'imagen' && (
                    <img
                      src={testimonio.medios[0].url}
                      alt="Media"
                      className={`w-full h-48 object-cover ${radiusClasses[borderRadius]}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  {testimonio.medios[0].tipo === 'video' && (
                    <video
                      src={testimonio.medios[0].url}
                      controls
                      className={`w-full ${radiusClasses[borderRadius]}`}
                    />
                  )}
                </div>
              )}

              {/* Footer */}
              <div
                className="flex justify-between items-center pt-3 border-t border-opacity-20"
                style={{ borderColor: styles.border }}
              >
                {showDate && (
                  <span
                    className="text-xs opacity-60"
                    style={{ color: styles.text }}
                  >
                    {new Date(testimonio.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                )}
                {showHighlight && testimonio.destacado && (
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${styles.primary}20`,
                      color: styles.primary
                    }}
                  >
                    ⭐ Destacado
                  </span>
                )}
              </div>

              {/* Categoría */}
              {showCategory && testimonio.categoria && (
                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 ${radiusClasses[borderRadius]} text-xs font-medium`}
                    style={{
                      backgroundColor: `${styles.primary}15`,
                      color: styles.primary
                    }}
                  >
                    {testimonio.categoria.nombre}
                  </span>
                </div>
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
