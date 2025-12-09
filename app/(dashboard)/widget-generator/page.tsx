'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Categoria {
  id: string;
  nombre: string;
}

interface Organizacion {
  id: string;
  nombre: string;
}

export default function WidgetGeneratorPage() {
  const [categoriaId, setCategoriaId] = useState('');
  const [organizacionId, setOrganizacionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [organizacion, setOrganizacion] = useState<Organizacion | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado de configuración completo
  const [config, setConfig] = useState({
    // Filtros
    limit: 10,
    destacados: false,

    // Tema
    theme: 'light' as 'light' | 'dark' | 'custom',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    backgroundColor: '',
    cardBackgroundColor: '',
    textColor: '',
    starColor: '#FBBF24',

    // Layout
    layout: 'grid' as 'grid' | 'masonry' | 'carousel' | 'list',
    columns: 3,
    cardStyle: 'elevated' as 'elevated' | 'bordered' | 'minimal' | 'gradient',
    borderRadius: 'lg' as 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full',
    cardSpacing: 'normal' as 'compact' | 'normal' | 'relaxed',

    // Contenido
    showTitle: true,
    showAvatar: true,
    showDate: true,
    showCategory: true,
    showRating: true,
    showMedia: true,
    showHighlight: true,

    // Textos
    titleText: 'Lo que dicen nuestros clientes',
    subtitleText: 'Testimonios reales de personas que confían en nosotros',

    // Tamaños
    titleSize: '4xl' as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
    textSize: 'sm' as 'xs' | 'sm' | 'base' | 'lg',
    avatarSize: 'md' as 'sm' | 'md' | 'lg' | 'xl',

    // Efectos
    hoverEffect: true,
    animateOnScroll: false,

    // Fuente
    fontFamily: '',
  });

  useEffect(() => {
    setBaseUrl(window.location.origin);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Cargar organización del usuario
      const orgRes = await fetch('/api/organizations');
      if (orgRes.ok) {
        const orgsData = await orgRes.json();
        if (orgsData.length > 0) {
          const userOrg = orgsData[0];
          setOrganizacion(userOrg);
          setOrganizacionId(userOrg.id);

          // Cargar categorías de la organización
          const catRes = await fetch(`/api/categories`);
          if (catRes.ok) {
            const categoriesData = await catRes.json();
            setCategorias(categoriesData);
          }
        }
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      toast.error('Error al cargar categorías y organización');
    } finally {
      setLoading(false);
    }
  };

  const generateCode = () => {
    if (!baseUrl || !organizacionId) return '';

    const params = new URLSearchParams({
      organizacionId,
      ...(categoriaId && { categoriaId }),
    });

    // Agregar solo propiedades no-default
    Object.entries(config).forEach(([key, value]) => {
      if (value !== '' && value !== false) {
        params.append(key, String(value));
      }
    });

    return `<!-- Widget EduVoice CMS -->
<div id="eduvoice-widget"></div>
<script>
  (function() {
    const iframe = document.createElement('iframe');
    iframe.src = '${baseUrl}/widget/embed?${params.toString()}';
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.minHeight = '600px';

    // Ajustar altura automáticamente
    window.addEventListener('message', function(e) {
      if (e.data.type === 'voiceshub-height') {
        iframe.style.height = e.data.height + 'px';
      }
    });

    document.getElementById('eduvoice-widget').appendChild(iframe);
  })();
</script>`;
  };

  const copyCode = () => {
    const code = generateCode();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Código copiado al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPreviewUrl = () => {
    if (!organizacionId) return '';

    const params = new URLSearchParams({
      organizacionId,
      ...(categoriaId && { categoriaId }),
      ...Object.fromEntries(
        Object.entries(config)
          .filter(([_, v]) => v !== '' && v !== false)
          .map(([k, v]) => [k, String(v)])
      ),
    });

    return `/widget/embed?${params.toString()}`;
  };

  if (!baseUrl || loading) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            Cargando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Generador de Widget Personalizado</h1>
        <p className="text-gray-600">
          Crea un widget completamente personalizado para mostrar testimonios en tu sitio web
        </p>
      </div>

      <div className="space-y-6">
        {/* Preview */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Vista Previa en Tiempo Real
            </h3>
            {organizacion && (
              <span className="text-sm text-gray-600">
                Organización: <strong>{organizacion.nombre}</strong>
              </span>
            )}
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 overflow-hidden">
            {organizacionId ? (
              <iframe
                src={getPreviewUrl()}
                className="w-full border-none"
                style={{ minHeight: '600px' }}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                No hay organización seleccionada
              </div>
            )}
          </div>
        </div>

        {/* Configuración */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-6">Personalización del Widget</h3>

          <div className="space-y-6">
            {/* Filtros Básicos */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Filtros de Contenido</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoría</label>
                  <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas las categorías</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Límite de testimonios</label>
                  <input
                    type="number"
                    value={config.limit}
                    onChange={(e) => setConfig({ ...config, limit: Number(e.target.value) })}
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.destacados}
                    onChange={(e) => setConfig({ ...config, destacados: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Solo mostrar testimonios destacados</span>
                </label>
              </div>
            </div>

            {/* Tema y Colores */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Tema y Colores</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tema</label>
                  <select
                    value={config.theme}
                    onChange={(e) => setConfig({ ...config, theme: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>

                {config.theme === 'custom' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Color Primario</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                          className="h-10 w-20 rounded-lg cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={config.primaryColor}
                          onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Color Secundario</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.secondaryColor}
                          onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                          className="h-10 w-20 rounded-lg cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={config.secondaryColor}
                          onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Diseño */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Diseño y Distribución</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Columnas</label>
                  <select
                    value={config.columns}
                    onChange={(e) => setConfig({ ...config, columns: Number(e.target.value) as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="1">1 Columna</option>
                    <option value="2">2 Columnas</option>
                    <option value="3">3 Columnas</option>
                    <option value="4">4 Columnas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Estilo de Tarjeta</label>
                  <select
                    value={config.cardStyle}
                    onChange={(e) => setConfig({ ...config, cardStyle: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="elevated">Elevada (sombra)</option>
                    <option value="bordered">Con Borde</option>
                    <option value="minimal">Minimal</option>
                    <option value="gradient">Gradiente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Radio de Borde</label>
                  <select
                    value={config.borderRadius}
                    onChange={(e) => setConfig({ ...config, borderRadius: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">Sin redondeo</option>
                    <option value="sm">Pequeño</option>
                    <option value="md">Mediano</option>
                    <option value="lg">Grande</option>
                    <option value="xl">Extra Grande</option>
                    <option value="full">Completo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Textos Personalizables */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Textos</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Título Principal</label>
                  <input
                    type="text"
                    value={config.titleText}
                    onChange={(e) => setConfig({ ...config, titleText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Lo que dicen nuestros clientes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={config.subtitleText}
                    onChange={(e) => setConfig({ ...config, subtitleText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Testimonios reales de personas que confían en nosotros"
                  />
                </div>
              </div>
            </div>

            {/* Opciones de Visualización */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Elementos a Mostrar</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { key: 'showAvatar', label: 'Avatar del autor' },
                  { key: 'showRating', label: 'Calificación con estrellas' },
                  { key: 'showDate', label: 'Fecha del testimonio' },
                  { key: 'showCategory', label: 'Categoría' },
                  { key: 'showMedia', label: 'Imágenes/Videos' },
                  { key: 'showHighlight', label: 'Badge de destacado' },
                  { key: 'hoverEffect', label: 'Efecto hover' },
                  { key: 'animateOnScroll', label: 'Animación al scroll' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={config[key as keyof typeof config] as boolean}
                      onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Código generado */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Código para Insertar en tu Sitio Web</h3>
            <button
              onClick={copyCode}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Código
                </>
              )}
            </button>
          </div>
          <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm font-mono">
              {generateCode()}
            </code>
          </pre>
          <p className="text-gray-400 text-xs mt-3">
            Copia este código y pégalo en tu sitio web donde quieras que aparezcan los testimonios
          </p>
        </div>
      </div>
    </div>
  );
}
