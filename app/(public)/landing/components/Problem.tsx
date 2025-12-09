import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-light font-extrabold text-sm uppercase tracking-wider">El Desafío</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            ¿Por qué necesitas un CMS especializado en testimonios?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start p-6 rounded-xl border-l-4 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl bg-red-50 border-red-500">
              <div className="shrink-0 text-red-500">
                <XCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Testimonios Dispersos</h3>
                <p className="text-gray-600 font-lato">Videos en YouTube, textos en emails, imágenes en carpetas. Sin organización central ni capacidad de búsqueda.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-xl border-l-4 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl bg-red-50 border-red-500">
              <div className="shrink-0 text-red-500">
                <XCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sin Control de Calidad</h3>
                <p className="text-gray-600 font-lato">Publicar testimonios sin revisión previa arriesga la imagen institucional y la autenticidad del contenido.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-xl border-l-4 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl bg-red-50 border-red-500">
              <div className="shrink-0 text-red-500">
                <XCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integración Compleja</h3>
                <p className="text-gray-600 font-lato">Mostrar testimonios en tu web requiere desarrollo custom, sin APIs ni widgets listos para usar.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start p-6 rounded-xl border-l-4 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl bg-green-50 border-green-500">
              <div className="shrink-0 text-green-500">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión Centralizada</h3>
                <p className="text-gray-600 font-lato">Todos tus testimonios en un solo lugar. Búsqueda inteligente por tags, categorías, programas y más.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-xl border-l-4 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl bg-green-50 border-green-500">
              <div className="shrink-0 text-green-500">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Moderación Avanzada</h3>
                <p className="text-gray-600 font-lato">Revisa, edita y aprueba testimonios antes de publicar. Control total sobre tu contenido social proof.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-xl border-l-4 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl bg-green-50 border-green-500">
              <div className="shrink-0 text-green-500">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">API REST Completa</h3>
                <p className="text-gray-600 font-lato">Integra testimonios en cualquier plataforma con nuestra API documentada. Widgets embebibles listos para usar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
