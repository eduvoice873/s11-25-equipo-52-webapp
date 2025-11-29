import Link from 'next/link';
import { Clapperboard, Plug, Tag, Shield, BarChart3, Palette } from 'lucide-react';
import HeaderLanding from "@/app/landing/components/Header";
import Footer from "@/app/landing/components/Footer";
import { buttonVariants } from '@/components/ui/button';

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Guías</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Tutoriales paso a paso para sacar el máximo provecho de EduVoice CMS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                  <Clapperboard className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue">Guía de Video Testimonios</h2>
                  <p className="text-sm text-gray-500 font-lato">15 min de lectura</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 font-lato">
                Aprende a grabar, editar y publicar testimonios en video de alta calidad que generen confianza.
              </p>
              <div className="space-y-3 mb-6 font-lato">
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Preparación y equipamiento necesario</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Técnicas de grabación profesional</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Edición básica y optimización</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Subida y publicación en EduVoice</span>
                </div>
              </div>
              <Link href="/guides/video-testimonials" className={buttonVariants({ variant: "primary", size: "md" })}>
                Ver guía completa →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-xl text-green-600">
                  <Plug className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue">Integración con API</h2>
                  <p className="text-sm text-gray-500 font-lato">20 min de lectura</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 font-lato">
                Tutorial completo para integrar testimonios en tu sitio web o LMS usando nuestra API REST.
              </p>
              <div className="space-y-3 mb-6 font-lato">
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Obtener credenciales de API</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Autenticación y primeras llamadas</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Filtrado y paginación de resultados</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Manejo de errores y mejores prácticas</span>
                </div>
              </div>
              <Link href="/guides/api-integration" className={buttonVariants({ variant: "primary", size: "md" })}>
                Ver guía completa →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
                  <Tag className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue">Sistema de Categorización</h2>
                  <p className="text-sm text-gray-500 font-lato">10 min de lectura</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 font-lato">
                Organiza tus testimonios de forma efectiva usando categorías, tags y filtros inteligentes.
              </p>
              <div className="space-y-3 mb-6 font-lato">
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Definir estructura de categorías</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Crear tags personalizados</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Aplicar filtros y búsquedas</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Mantener consistencia en el tiempo</span>
                </div>
              </div>
              <Link href="/guides/categorization" className={buttonVariants({ variant: "primary", size: "md" })}>
                Ver guía completa →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-600">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue">Workflow de Moderación</h2>
                  <p className="text-sm text-gray-500 font-lato">12 min de lectura</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 font-lato">
                Configura un proceso de revisión y aprobación para mantener la calidad de tus testimonios.
              </p>
              <div className="space-y-3 mb-6 font-lato">
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Configurar roles y permisos</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Definir criterios de aprobación</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Proceso de revisión y edición</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Publicación y seguimiento</span>
                </div>
              </div>
              <Link href="/guides/moderation" className={buttonVariants({ variant: "primary", size: "md" })}>
                Ver guía completa →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 p-4 rounded-xl text-red-600">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue">Analytics y Métricas</h2>
                  <p className="text-sm text-gray-500 font-lato">8 min de lectura</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 font-lato">
                Mide el impacto de tus testimonios con analytics avanzados y toma decisiones basadas en datos.
              </p>
              <div className="space-y-3 mb-6 font-lato">
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Configurar tracking de eventos</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Interpretar métricas clave</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Crear reportes personalizados</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Optimizar basado en resultados</span>
                </div>
              </div>
              <Link href="/guides/analytics" className={buttonVariants({ variant: "primary", size: "md" })}>
                Ver guía completa →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-4 rounded-xl text-indigo-600">
                  <Palette className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue">Personalización de Widgets</h2>
                  <p className="text-sm text-gray-500 font-lato">10 min de lectura</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 font-lato">
                Personaliza el diseño de los widgets para que se integren perfectamente con tu sitio web.
              </p>
              <div className="space-y-3 mb-6 font-lato">
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Tipos de widgets disponibles</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Opciones de personalización CSS</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Configuración responsive</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Ejemplos y casos de uso</span>
                </div>
              </div>
              <Link href="/guides/widget-customization" className={buttonVariants({ variant: "primary", size: "md" })}>
                Ver guía completa →
              </Link>
            </div>
          </div>

          <div className="mt-16 bg-brand-blue/5 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-gray-600 mb-6 font-lato">
              Consulta nuestra documentación completa o contacta a soporte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/documentation" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Ver Documentación
              </Link>
              <Link href="/support" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Contactar Soporte
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}