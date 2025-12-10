'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Loader2, Eye, ChevronDown, Palette, Target, Layout, Type } from 'lucide-react';
import { toast } from 'sonner';

interface Categoria {
  id: string;
  nombre: string;
}

interface Organizacion {
  id: string;
  nombre: string;
}

interface ConfiguracionSeccion {
  id: string;
  titulo: string;
  campos: string[];
}

// Componentes reutilizables
function ConfigSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
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

  if (!baseUrl) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Generador de Widget</h1>
          <p className="text-gray-600 text-sm">
            Personaliza el widget de testimonios para tu sitio web
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Barra lateral de configuración */}
          {/* Barra lateral de configuración */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Cargando...
              </div>
            ) : (
              <>
                {/* Filtros Básicos */}
                <ConfigSection title="Contenido" icon={<Target className="w-4 h-4" />}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Categoría
                      </label>
                      <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Todas</option>
                        {categorias.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Límite
                      </label>
                      <input
                        type="number"
                        value={config.limit}
                        onChange={(e) => setConfig({ ...config, limit: Number(e.target.value) })}
                        min="1"
                        max="50"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.destacados}
                      onChange={(e) => setConfig({ ...config, destacados: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Solo destacados</span>
                  </label>
                </ConfigSection>

                {/* Tema */}
                <ConfigSection title="Tema" icon={<Palette className="w-4 h-4" />}>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tema
                    </label>
                    <select
                      value={config.theme}
                      onChange={(e) => setConfig({ ...config, theme: e.target.value as any })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>

                  {config.theme === 'custom' && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <ColorInput
                        label="Color Primario"
                        value={config.primaryColor}
                        onChange={(val) => setConfig({ ...config, primaryColor: val })}
                      />
                      <ColorInput
                        label="Color Secundario"
                        value={config.secondaryColor}
                        onChange={(val) => setConfig({ ...config, secondaryColor: val })}
                      />
                    </div>
                  )}
                </ConfigSection>

                {/* Diseño */}
                <ConfigSection title="Diseño" icon={<Layout className="w-4 h-4" />}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Columnas
                      </label>
                      <select
                        value={config.columns}
                        onChange={(e) => setConfig({ ...config, columns: Number(e.target.value) as any })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Estilo
                      </label>
                      <select
                        value={config.cardStyle}
                        onChange={(e) => setConfig({ ...config, cardStyle: e.target.value as any })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="elevated">Elevada</option>
                        <option value="bordered">Borde</option>
                        <option value="minimal">Minimal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Radio
                      </label>
                      <select
                        value={config.borderRadius}
                        onChange={(e) => setConfig({ ...config, borderRadius: e.target.value as any })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="sm">Pequeño</option>
                        <option value="md">Mediano</option>
                        <option value="lg">Grande</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Espaciado
                      </label>
                      <select
                        value={config.cardSpacing}
                        onChange={(e) => setConfig({ ...config, cardSpacing: e.target.value as any })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="compact">Compacto</option>
                        <option value="normal">Normal</option>
                        <option value="relaxed">Amplio</option>
                      </select>
                    </div>
                  </div>
                </ConfigSection>

                {/* Textos */}
                <ConfigSection title="Textos" icon={<Type className="w-4 h-4" />}>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={config.titleText}
                        onChange={(e) => setConfig({ ...config, titleText: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Subtítulo
                      </label>
                      <input
                        type="text"
                        value={config.subtitleText}
                        onChange={(e) => setConfig({ ...config, subtitleText: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </ConfigSection>


              </>
            )}
          </div>

          {/* Panel derecho: Preview y Código */}
          <div className="lg:col-span-1 space-y-4">
            {/* Vista Previa */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Vista Previa
              </h3>

              {organizacion && (
                <p className="text-xs text-gray-600 mb-3">
                  <span className="font-medium">{organizacion.nombre}</span>
                </p>
              )}

              <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                {organizacionId ? (
                  <iframe
                    src={getPreviewUrl()}
                    className="w-full border-none bg-white"
                    style={{ height: '280px' }}
                    title="Widget preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-72 text-xs text-gray-400">
                    Sin organización
                  </div>
                )}
              </div>
            </div>

            {/* Código */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white">Código</h3>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copiar
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-gray-800 rounded p-2 overflow-x-auto max-h-56">
                <code className="text-green-400 text-xs font-mono leading-tight">
                  {generateCode()}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}