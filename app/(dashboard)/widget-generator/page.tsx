'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Loader2, Eye, ChevronDown, Palette, Target, Layout, Type, Settings, Folder, Star, BarChart3, Lightbulb, CheckCircle, FileText, Sun, Moon } from 'lucide-react';
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
  const [customDomain, setCustomDomain] = useState('');
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

    // Ordenamiento
    orderBy: 'fecha' as 'fecha' | 'calificacion',
    orderDirection: 'desc' as 'asc' | 'desc',
  });

  useEffect(() => {
    setBaseUrl(window.location.origin);
    loadData();
  }, []);

  // Forzar reload del iframe cuando cambian los parámetros
  useEffect(() => {
    if (!organizacionId || !baseUrl) return;

    // Pequeño delay para permitir que React renderice primero
    const timer = setTimeout(() => {
      const iframeEl = document.querySelector('iframe[title="Widget preview"]') as HTMLIFrameElement;
      if (iframeEl) {
        iframeEl.src = getPreviewUrl();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [config, organizacionId, categoriaId]);

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
    if (!organizacionId) return '';

    const domain = customDomain || baseUrl;

    // Construir atributos data - TODOS los parámetros
    const dataAttrs: Record<string, string> = {
      'data-orgid': organizacionId,
    };

    // Parámetros básicos
    if (categoriaId) dataAttrs['data-category'] = categoriaId;
    dataAttrs['data-layout'] = config.layout;
    if (config.theme !== 'light') dataAttrs['data-theme'] = config.theme;
    if (config.destacados) dataAttrs['data-featured-only'] = 'true';
    if (config.limit !== 10) dataAttrs['data-limit'] = config.limit.toString();

    // Parámetros de diseño
    if (config.columns !== 3) dataAttrs['data-columns'] = config.columns.toString();
    if (config.cardStyle !== 'elevated') dataAttrs['data-cardstyle'] = config.cardStyle;
    if (config.borderRadius !== 'lg') dataAttrs['data-borderradius'] = config.borderRadius;

    // Parámetros de contenido
    if (config.showTitle !== true) dataAttrs['data-showtitle'] = config.showTitle.toString();
    if (config.showAvatar !== true) dataAttrs['data-showavatar'] = config.showAvatar.toString();
    if (config.showDate !== true) dataAttrs['data-showdate'] = config.showDate.toString();
    if (config.showCategory !== true) dataAttrs['data-showcategory'] = config.showCategory.toString();
    if (config.showRating !== true) dataAttrs['data-showrating'] = config.showRating.toString();
    if (config.showMedia !== true) dataAttrs['data-showmedia'] = config.showMedia.toString();
    if (config.showHighlight !== true) dataAttrs['data-showhighlight'] = config.showHighlight.toString();

    // Parámetros de colores (solo en tema personalizado)
    if (config.theme === 'custom') {
      if (config.primaryColor) dataAttrs['data-primarycolor'] = config.primaryColor;
      if (config.secondaryColor) dataAttrs['data-secondarycolor'] = config.secondaryColor;
      if (config.backgroundColor) dataAttrs['data-backgroundcolor'] = config.backgroundColor;
      if (config.cardBackgroundColor) dataAttrs['data-cardbackgroundcolor'] = config.cardBackgroundColor;
      if (config.textColor) dataAttrs['data-textcolor'] = config.textColor;
      if (config.starColor) dataAttrs['data-starcolor'] = config.starColor;
    }

    // Parámetros de textos
    if (config.titleText !== 'Lo que dicen nuestros clientes') dataAttrs['data-titletext'] = config.titleText;
    if (config.subtitleText !== 'Testimonios reales de personas que confían en nosotros') {
      dataAttrs['data-subtitletext'] = config.subtitleText;
    }

    // Parámetros de tamaños
    if (config.titleSize !== '4xl') dataAttrs['data-titlesize'] = config.titleSize;
    if (config.textSize !== 'sm') dataAttrs['data-textsize'] = config.textSize;
    if (config.avatarSize !== 'md') dataAttrs['data-avatarsize'] = config.avatarSize;

    // Parámetros de efectos
    if (config.hoverEffect !== true) dataAttrs['data-hovereffect'] = config.hoverEffect.toString();
    if (config.animateOnScroll !== false) dataAttrs['data-animateonscroll'] = config.animateOnScroll.toString();

    // Font family
    if (config.fontFamily) dataAttrs['data-fontfamily'] = config.fontFamily;

    const attrsString = Object.entries(dataAttrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join('\n  ');

    return `<!-- EduVoice CMS Widget -->
<div id="eduvoice-widget"
  ${attrsString}
></div>
<script src="${domain}/widget.js"><\/script>`;
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

    // Siempre pasar estos parámetros
    const baseParams: Record<string, string> = {
      organizacionId,
      layout: config.layout,
      theme: config.theme,
      limit: config.limit.toString(),
      destacados: config.destacados.toString(), // SIEMPRE pasar destacados
    };

    if (categoriaId) baseParams.categoriaId = categoriaId;

    // Parámetros opcionales de configuración
    const optionalParams: Record<string, string> = {};

    if (config.columns !== 3) optionalParams.columns = config.columns.toString();
    if (config.cardStyle !== 'elevated') optionalParams.cardStyle = config.cardStyle;
    if (config.borderRadius !== 'lg') optionalParams.borderRadius = config.borderRadius;
    if (config.showTitle !== true) optionalParams.showTitle = config.showTitle.toString();
    if (config.showAvatar !== true) optionalParams.showAvatar = config.showAvatar.toString();
    if (config.showDate !== true) optionalParams.showDate = config.showDate.toString();
    if (config.showCategory !== true) optionalParams.showCategory = config.showCategory.toString();
    if (config.showRating !== true) optionalParams.showRating = config.showRating.toString();
    if (config.showMedia !== true) optionalParams.showMedia = config.showMedia.toString();
    if (config.showHighlight !== true) optionalParams.showHighlight = config.showHighlight.toString();

    if (config.theme === 'custom') {
      if (config.primaryColor) optionalParams.primaryColor = config.primaryColor;
      if (config.secondaryColor) optionalParams.secondaryColor = config.secondaryColor;
      if (config.backgroundColor) optionalParams.backgroundColor = config.backgroundColor;
      if (config.cardBackgroundColor) optionalParams.cardBackgroundColor = config.cardBackgroundColor;
      if (config.textColor) optionalParams.textColor = config.textColor;
      if (config.starColor) optionalParams.starColor = config.starColor;
    }

    if (config.titleText !== 'Lo que dicen nuestros clientes') optionalParams.titleText = config.titleText;
    if (config.subtitleText !== 'Testimonios reales de personas que confían en nosotros') {
      optionalParams.subtitleText = config.subtitleText;
    }

    if (config.titleSize !== '4xl') optionalParams.titleSize = config.titleSize;
    if (config.textSize !== 'sm') optionalParams.textSize = config.textSize;
    if (config.avatarSize !== 'md') optionalParams.avatarSize = config.avatarSize;
    if (config.hoverEffect !== true) optionalParams.hoverEffect = config.hoverEffect.toString();
    if (config.animateOnScroll !== false) optionalParams.animateOnScroll = config.animateOnScroll.toString();
    if (config.fontFamily) optionalParams.fontFamily = config.fontFamily;
    if (config.orderBy !== 'fecha') optionalParams.orderBy = config.orderBy;
    if (config.orderDirection !== 'desc') optionalParams.orderDirection = config.orderDirection;

    const params = new URLSearchParams({
      ...baseParams,
      ...optionalParams,
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

                  {/* <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.destacados}
                      onChange={(e) => setConfig({ ...config, destacados: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Solo destacados</span>
                  </label>
                    */}
                </ConfigSection>


                {/* Tema */}
                <ConfigSection title="Tema" icon={<Palette className="w-4 h-4" />}>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Tema
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['light', 'dark', 'custom'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setConfig({ ...config, theme: t as any })}
                          className={`p-2 px-3 rounded-lg text-xs font-medium transition-all border-2 ${config.theme === t
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                        >
                          {t === 'light' ? <><Sun className="inline w-3 h-3 mr-1" /> Claro</> : t === 'dark' ? <><Moon className="inline w-3 h-3 mr-1" /> Oscuro</> : <><Palette className="inline w-3 h-3 mr-1" /> Personal</>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {config.theme === 'custom' && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                      <h5 className="text-xs font-semibold text-gray-900">Colores Personalizados</h5>

                      <div className="grid grid-cols-2 gap-3">
                        <ColorInput
                          label="Primario (Acentos)"
                          value={config.primaryColor}
                          onChange={(val) => setConfig({ ...config, primaryColor: val })}
                        />
                        <ColorInput
                          label="Secundario (Tags)"
                          value={config.secondaryColor}
                          onChange={(val) => setConfig({ ...config, secondaryColor: val })}
                        />
                        <ColorInput
                          label="Estrellas"
                          value={config.starColor}
                          onChange={(val) => setConfig({ ...config, starColor: val })}
                        />
                        <ColorInput
                          label="Fondo Tarjetas"
                          value={config.cardBackgroundColor}
                          onChange={(val) => setConfig({ ...config, cardBackgroundColor: val })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <ColorInput
                          label="Fondo General"
                          value={config.backgroundColor}
                          onChange={(val) => setConfig({ ...config, backgroundColor: val })}
                        />
                        <ColorInput
                          label="Texto"
                          value={config.textColor}
                          onChange={(val) => setConfig({ ...config, textColor: val })}
                        />
                      </div>
                    </div>
                  )}
                </ConfigSection>

                {/* Tipos de Widgets */}
                <ConfigSection title="Tipo de Widget" icon={<Layout className="w-4 h-4" />}>
                  <div className="space-y-3">
                    <div
                      onClick={() => setConfig({ ...config, layout: 'grid' })}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${config.layout === 'grid'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <h4 className="font-semibold text-gray-900 text-sm">Cuadrícula</h4>
                      <p className="text-xs text-gray-600 mt-1">Disposición responsive en múltiples columnas de testimonios</p>
                    </div>

                    <div
                      onClick={() => setConfig({ ...config, layout: 'list' })}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${config.layout === 'list'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <h4 className="font-semibold text-gray-900 text-sm">Lista</h4>
                      <p className="text-xs text-gray-600 mt-1">Vista en lista vertical de todos los testimonios</p>
                    </div>

                    <div
                      onClick={() => setConfig({ ...config, layout: 'masonry' })}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${config.layout === 'masonry'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <h4 className="font-semibold text-gray-900 text-sm">Masonry</h4>
                      <p className="text-xs text-gray-600 mt-1">Disposición tipo Pinterest con columnas balanceadas</p>
                    </div>
                  </div>
                </ConfigSection>

                {/* Diseño */}
                <ConfigSection title="Diseño" icon={<Layout className="w-4 h-4" />}>
                  <div className="grid grid-cols-2 gap-3">
                    {(config.layout === 'grid' || config.layout === 'masonry') && (
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
                    )}


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

                    {config.layout !== 'carousel' && (
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
                    )}

                    {config.layout !== 'carousel' && (
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
                    )}
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
          <div className="lg:col-span-1 space-y-4 sticky top-4">
            {/* Vista Previa */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Vista Previa
                </h3>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {config.layout === 'carousel' && 'Carrusel'}
                  {config.layout === 'grid' && 'Cuadrícula'}
                  {config.layout === 'list' && 'Lista'}
                  {config.layout === 'masonry' && 'Masonry'}
                </span>
              </div>

              {organizacion && (
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-3 py-3 mb-3">
                  <p className="text-xs text-gray-600">
                    <span className="font-bold text-gray-900 text-sm">{organizacion.nombre}</span>
                  </p>
                  {categoriaId && categorias.find(c => c.id === categoriaId) && (
                    <p className="text-xs text-gray-500 mt-2">
                      <Folder className="inline w-3 h-3 mr-1 text-gray-600" /> Categoría: <span className="font-semibold text-gray-700">{categorias.find(c => c.id === categoriaId)?.nombre}</span>
                    </p>
                  )}
                  <div className="flex gap-2 mt-3 text-xs">
                    <span className={`px-2 py-1 rounded-full font-medium ${config.destacados ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {config.destacados ? <><Star className="inline w-3 h-3 mr-1" /> Solo destacados</> : <><BarChart3 className="inline w-3 h-3 mr-1" /> Todos</>}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium flex items-center gap-1">
                      {config.theme === 'light' ? <><Palette className="inline w-3 h-3" /> Claro</> : config.theme === 'dark' ? <><Palette className="inline w-3 h-3" /> Oscuro</> : <><Palette className="inline w-3 h-3" /> Personalizado</>}
                    </span>
                  </div>
                </div>
              )}

              <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
                {organizacionId ? (
                  <>
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-600" />
                      <span className="text-xs font-semibold text-gray-700">Vista Previa</span>
                    </div>
                    <iframe
                      src={getPreviewUrl()}
                      className="w-full border-none bg-white"
                      style={{ minHeight: '600px' }}
                      title="Widget preview"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center bg-linear-to-b from-gray-50 to-white">
                    <div className="text-gray-300 mb-3">
                      <Eye className="w-12 h-12 mx-auto opacity-40" />
                    </div>
                    <p className="text-sm font-bold text-gray-600">Selecciona una organización</p>
                    <p className="text-xs text-gray-500 mt-2">para ver la vista previa del widget</p>
                  </div>
                )}
              </div>
            </div>

            {/* Dominio Personalizado
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3"> Configuración de Dominio</h3>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  URL personalizada (opcional)
                </label>
                <input
                  type="url"
                  placeholder={baseUrl}
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-600 mt-2">
                  <CheckCircle className="inline w-3 h-3 mr-1 text-green-600" /> Automático: Si está vacío, usa <span className="font-mono font-semibold">{baseUrl}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <FileText className="inline w-3 h-3 mr-1 text-gray-500" /> Útil si quieres usar un CDN o dominio alterno
                </p>
              </div>
            </div>
            */}

            {/* Código */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Código para Embed
                </h3>
                <button
                  onClick={copyCode}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
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

              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="font-mono text-xs leading-relaxed">
                  <code className="text-green-400">
                    {generateCode()}
                  </code>
                </pre>
              </div>

              <p className="text-xs text-gray-500 mt-3 p-2 bg-gray-50 rounded border border-gray-200">
                <Lightbulb className="inline w-3 h-3 mr-1" /> Copia este código y pégalo en cualquier sitio web donde quieras mostrar los testimonios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}