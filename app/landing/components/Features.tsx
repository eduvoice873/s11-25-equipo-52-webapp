import React from 'react';
import { Video, ShieldCheck, Tag, Plug, BarChart3, Palette } from 'lucide-react';

export default function Features() {
  return (
    <section id="caracteristicas" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-light font-extrabold text-sm uppercase tracking-wider">Características</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            Todo lo que necesitas para <span className="bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">gestionar testimonios</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto font-lato">
            EduVoice CMS está diseñado específicamente para la recolección, moderación y publicación de
            testimonios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-background p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-brand-light/10 to-transparent transition-all duration-500 group-hover:left-full"></div>
            <div className="mb-4 text-brand-blue">
              <Video size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Multimedia Completo</h3>
            <p className="text-gray-600 text-lg mb-4 font-lato">
              Soporta video, texto e imagen. Integración nativa con YouTube y Cloudinary para
              almacenamiento optimizado.
            </p>
            <ul className="space-y-2 text-gray-700 font-lato">
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Videos HD con CDN global
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Imágenes optimizadas automáticamente
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Transcripciones de texto
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-background p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-brand-light/10 to-transparent transition-all duration-500 group-hover:left-full"></div>
            <div className="mb-4 text-brand-blue">
              <ShieldCheck size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Moderación Avanzada</h3>
            <p className="text-gray-600 text-lg mb-4 font-lato">
              Sistema de revisión y aprobación antes de publicación. Control total sobre el contenido
              publicado.
            </p>
            <ul className="space-y-2 text-gray-700 font-lato">
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Workflow de aprobación
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Edición antes de publicar
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Roles: Admin, Editor, Visitante
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-background p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-brand-light/10 to-transparent transition-all duration-500 group-hover:left-full"></div>
            <div className="mb-4 text-brand-blue">
              <Tag size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Clasificación Inteligente</h3>
            <p className="text-gray-600 text-lg mb-4 font-lato">
              Organiza por categorías: producto, evento, cliente, industria. Sistema de tags
              personalizado.
            </p>
            <ul className="space-y-2 text-gray-700 font-lato">
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Tags personalizados ilimitados
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Búsqueda inteligente
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Filtros avanzados
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-background p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-brand-light/10 to-transparent transition-all duration-500 group-hover:left-full"></div>
            <div className="mb-4 text-brand-blue">
              <Plug size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">API REST Documentada</h3>
            <p className="text-gray-600 text-lg mb-4 font-lato">
              API pública completa con documentación Swagger. Integra testimonios en cualquier plataforma.
            </p>
            <ul className="space-y-2 text-gray-700 font-lato">
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Endpoints RESTful
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Autenticación por tokens
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Documentación en vivo
              </li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-background p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-brand-light/10 to-transparent transition-all duration-500 group-hover:left-full"></div>
            <div className="mb-4 text-brand-blue">
              <BarChart3 size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Analytics de Engagement</h3>
            <p className="text-gray-600 text-lg mb-4 font-lato">
              Mide el impacto de tus testimonios. Visualizaciones, clics y engagement en tiempo real.
            </p>
            <ul className="space-y-2 text-gray-700 font-lato">
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Dashboard de métricas
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Reportes exportables
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Análisis de tendencias
              </li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-background p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-brand-light/10 to-transparent transition-all duration-500 group-hover:left-full"></div>
            <div className="mb-4 text-brand-blue">
              <Palette size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Widgets Embebibles</h3>
            <p className="text-gray-600 text-lg mb-4 font-lato">
              Widgets listos para integrar en tu web. Personaliza diseño y comportamiento sin código.
            </p>
            <ul className="space-y-2 text-gray-700 font-lato">
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Carrusel de testimonios
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Grid responsive
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-brand-light text-2xl leading-none">•</span> Personalización visual
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
