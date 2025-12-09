import { Clapperboard, Plug, Tag, Shield, BarChart3, Palette } from 'lucide-react';

export const guides = [
  {
    slug: 'video-testimonials',
    icon: Clapperboard,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    title: 'Guía de Video Testimonios',
    readTime: '15 min de lectura',
    description: 'Aprende a grabar, editar y publicar testimonios en video de alta calidad que generen confianza.',
    steps: [
      'Preparación y equipamiento necesario',
      'Técnicas de grabación profesional',
      'Edición básica y optimización',
      'Subida y publicación en EduVoice'
    ],
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">1. Preparación y equipamiento necesario</h3>
          <p class="text-gray-700 mb-4">
            Antes de comenzar a grabar, es fundamental contar con el equipo adecuado. No necesitas una cámara de cine profesional; un smartphone moderno puede ser suficiente si se usa correctamente.
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Cámara:</strong> Smartphone con buena resolución (1080p o 4K) o cámara DSLR.</li>
            <li><strong>Iluminación:</strong> Luz natural frente a una ventana o un aro de luz (ring light).</li>
            <li><strong>Audio:</strong> Micrófono de solapa (lavalier) o un entorno silencioso.</li>
            <li><strong>Trípode:</strong> Para mantener la imagen estable.</li>
          </ul>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">2. Técnicas de grabación profesional</h3>
          <p class="text-gray-700 mb-4">
            La composición y la iluminación son clave para un video profesional.
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Regla de los tercios:</strong> Coloca al sujeto ligeramente a un lado del centro.</li>
            <li><strong>Iluminación:</strong> La fuente de luz debe estar frente al sujeto, nunca detrás.</li>
            <li><strong>Fondo:</strong> Busca un fondo limpio y ordenado, preferiblemente relacionado con el contexto educativo.</li>
          </ul>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">3. Edición básica y optimización</h3>
          <p class="text-gray-700 mb-4">
            No necesitas ser un experto en edición. Herramientas como CapCut, Adobe Premiere Rush o incluso el editor de EduVoice pueden ayudarte.
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Recorta los silencios largos y las pausas incómodas.</li>
            <li>Añade subtítulos para mayor accesibilidad.</li>
            <li>Incluye el nombre y cargo de la persona entrevistada.</li>
          </ul>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">4. Subida y publicación en EduVoice</h3>
          <p class="text-gray-700 mb-4">
            Una vez que tengas tu video listo, subirlo a EduVoice es sencillo.
          </p>
          <ol class="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Inicia sesión en tu panel de control.</li>
            <li>Ve a la sección "Testimonios" y haz clic en "Nuevo Testimonio".</li>
            <li>Selecciona "Video" y sube tu archivo.</li>
            <li>Completa los metadatos y asigna una categoría.</li>
            <li>Publica y obtén el código de inserción para tu web.</li>
          </ol>
        </section>
      </div>
    `
  },
  {
    slug: 'api-integration',
    icon: Plug,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    title: 'Integración con API',
    readTime: '20 min de lectura',
    description: 'Tutorial completo para integrar testimonios en tu sitio web o LMS usando nuestra API REST.',
    steps: [
      'Obtener credenciales de API',
      'Autenticación y primeras llamadas',
      'Filtrado y paginación de resultados',
      'Manejo de errores y mejores prácticas'
    ],
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">1. Obtener credenciales de API</h3>
          <p class="text-gray-700 mb-4">
            Para interactuar con la API de EduVoice, necesitas una API Key.
          </p>
          <p class="text-gray-700">
            Ve a <strong>Configuración > API</strong> en tu dashboard y genera una nueva clave. Guárdala en un lugar seguro.
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">2. Autenticación y primeras llamadas</h3>
          <p class="text-gray-700 mb-4">
            La API utiliza autenticación Bearer Token.
          </p>
          <pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
<code>curl -X GET "https://api.eduvoice.com/v1/testimonials" \
-H "Authorization: Bearer TU_API_KEY"</code>
          </pre>
        </section>

        <section>
            <h3 class="text-2xl font-bold text-brand-blue mb-4">3. Filtrado y paginación</h3>
            <p class="text-gray-700 mb-4">Puedes filtrar los resultados por categoría, etiquetas o calificación.</p>
             <pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
<code>GET /testimonials?category=engineering&rating=5&page=1&limit=10</code>
          </pre>
        </section>
      </div>
    `
  },
  {
    slug: 'categorization',
    icon: Tag,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    title: 'Sistema de Categorización',
    readTime: '10 min de lectura',
    description: 'Organiza tus testimonios de forma efectiva usando categorías, tags y filtros inteligentes.',
    steps: [
      'Definir estructura de categorías',
      'Crear tags personalizados',
      'Aplicar filtros y búsquedas',
      'Mantener consistencia en el tiempo'
    ],
    content: `
       <div class="space-y-8">
        <section>
          <h3 class="text-2xl font-bold text-brand-blue mb-4">1. Definir estructura de categorías</h3>
          <p class="text-gray-700 mb-4">
            Una buena estructura de categorías facilita la navegación. Recomendamos categorizar por:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Programa o Curso (ej. Ingeniería, Medicina)</li>
            <li>Tipo de Usuario (ej. Alumno, Exalumno, Profesor)</li>
            <li>Año de Graduación</li>
          </ul>
        </section>
        <section>
            <h3 class="text-2xl font-bold text-brand-blue mb-4">2. Crear tags personalizados</h3>
            <p class="text-gray-700 mb-4">Los tags permiten una granularidad mayor. Úsalos para destacar habilidades específicas o logros.</p>
        </section>
       </div>
    `
  },
  {
    slug: 'moderation',
    icon: Shield,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    title: 'Workflow de Moderación',
    readTime: '12 min de lectura',
    description: 'Configura un proceso de revisión y aprobación para mantener la calidad de tus testimonios.',
    steps: [
      'Configurar roles y permisos',
      'Definir criterios de aprobación',
      'Proceso de revisión y edición',
      'Publicación y seguimiento'
    ],
    content: `
        <div class="space-y-8">
            <section>
                <h3 class="text-2xl font-bold text-brand-blue mb-4">1. Configurar roles y permisos</h3>
                <p class="text-gray-700 mb-4">Asigna roles específicos a tu equipo: Administrador, Editor, Moderador.</p>
            </section>
            <section>
                <h3 class="text-2xl font-bold text-brand-blue mb-4">2. Criterios de aprobación</h3>
                <p class="text-gray-700 mb-4">Establece qué hace que un testimonio sea válido. Verifica la identidad del usuario y el contenido del mensaje.</p>
            </section>
        </div>
    `
  },
  {
    slug: 'analytics',
    icon: BarChart3,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
    title: 'Analytics y Métricas',
    readTime: '8 min de lectura',
    description: 'Mide el impacto de tus testimonios con analytics avanzados y toma decisiones basadas en datos.',
    steps: [
      'Configurar tracking de eventos',
      'Interpretar métricas clave',
      'Crear reportes personalizados',
      'Optimizar basado en resultados'
    ],
    content: `
        <div class="space-y-8">
            <section>
                <h3 class="text-2xl font-bold text-brand-blue mb-4">1. Métricas Clave</h3>
                <p class="text-gray-700 mb-4">EduVoice te proporciona métricas como:</p>
                <ul class="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Vistas del testimonio</li>
                    <li>Clics en el CTA asociado</li>
                    <li>Tiempo de reproducción (para video)</li>
                </ul>
            </section>
        </div>
    `
  },
  {
    slug: 'widget-customization',
    icon: Palette,
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    title: 'Personalización de Widgets',
    readTime: '10 min de lectura',
    description: 'Personaliza el diseño de los widgets para que se integren perfectamente con tu sitio web.',
    steps: [
      'Tipos de widgets disponibles',
      'Opciones de personalización CSS',
      'Configuración responsive',
      'Ejemplos y casos de uso'
    ],
    content: `
        <div class="space-y-8">
            <section>
                <h3 class="text-2xl font-bold text-brand-blue mb-4">1. Tipos de Widgets</h3>
                <p class="text-gray-700 mb-4">Elige entre carrusel, grid, lista o tarjeta individual.</p>
            </section>
            <section>
                <h3 class="text-2xl font-bold text-brand-blue mb-4">2. Personalización CSS</h3>
                <p class="text-gray-700 mb-4">Puedes inyectar tu propio CSS o usar nuestras variables de configuración para ajustar colores y fuentes.</p>
            </section>
        </div>
    `
  }
];
