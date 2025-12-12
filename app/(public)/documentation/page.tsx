import React from 'react';
import Link from 'next/link';
import { Rocket, BookOpen, Palette, Lock, CheckCircle, LightbulbIcon } from 'lucide-react';
import HeaderLanding from "@/app/(public)/landing/components/Header";
import Footer from "@/app/(public)/landing/components/Footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-brand-gray font-sans text-gray-900">
      <HeaderLanding />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-blue mb-6">Documentación</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Guía completa para integrar y usar EduVoice CMS en tu institución
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-brand-blue" />
                <h2 className="text-3xl font-bold text-brand-blue">Inicio Rápido</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed font-lato">
                <p>Comienza a usar EduVoice CMS en solo 5 minutos siguiendo estos pasos:</p>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>Crea tu cuenta: Regístrate en nuestra plataforma con tu email institucional</li>
                  <li>Configura tu espacio: Define categorías, tags y permisos de usuario</li>
                  <li>Sube tu primer testimonio: Agrega contenido en video, texto o imagen</li>
                  <li>Modera y publica: Revisa y aprueba el contenido antes de publicar</li>
                  <li>Integra en tu web: Usa widgets o nuestra API REST</li>
                </ol>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-brand-blue" />
                <h2 className="text-3xl font-bold text-brand-blue">API REST</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed font-lato">
                <p>Nuestra API REST te permite integrar testimonios en cualquier plataforma.</p>

                <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Endpoints Públicos</h3>
                <p className="text-gray-600 mb-3">Los siguientes endpoints son públicos y NO requieren autenticación:</p>
                <div className="space-y-3">
                  <div className="border-l-4 border-brand-blue bg-white p-4 rounded">
                    <p className="font-mono text-sm text-brand-blue mb-2">GET /api/public/testimonials</p>
                    <p className="text-gray-600">Obtiene testimonios públicos con filtros opcionales (categoriaId, organizacionId, destacados)</p>
                  </div>
                  <div className="border-l-4 border-brand-blue bg-white p-4 rounded">
                    <p className="font-mono text-sm text-brand-blue mb-2">GET /api/public/testimonials/:id</p>
                    <p className="text-gray-600">Obtiene un testimonio público específico por ID</p>
                  </div>
                  <div className="border-l-4 border-brand-blue bg-white p-4 rounded">
                    <p className="font-mono text-sm text-brand-blue mb-2">GET /api/public/categories</p>
                    <p className="text-gray-600">Obtiene todas las categorías públicas disponibles</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Endpoints Protegidos</h3>
                <p className="text-gray-600 mb-3">Los endpoints protegidos requieren autenticación mediante session token:</p>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto border border-gray-200">
                  <pre className="text-gray-700 text-sm"><code>Cookie: next-auth.session-token=YOUR_SESSION_TOKEN</code></pre>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-8 h-8 text-brand-blue" />
                <h2 className="text-3xl font-bold text-brand-blue">Widgets</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed font-lato">
                <p>Integra testimonios en tu web sin escribir código:</p>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto border border-gray-200 mt-4">
                  <pre className="text-gray-700 text-sm"><code>&lt;script src="https://cdn.eduvoicecms.com/widget.js"&gt;&lt;/script&gt;
                    &lt;div data-eduvoice-widget="carousel" data-category="ingenieria"&gt;&lt;/div&gt;</code></pre>
                </div>
                <p className="mt-4">Tipos de widgets disponibles:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Carousel: Carrusel automático de testimonios</li>
                  <li>Grid: Cuadrícula responsive de testimonios</li>
                  <li>Featured: Testimonio destacado individual</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-brand-blue" />
                <h2 className="text-3xl font-bold text-brand-blue">Roles y Permisos</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed font-lato">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-brand-blue mb-2">Admin</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Acceso completo</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Gestión de usuarios</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Configuración global</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-brand-blue mb-2">Editor</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Crear testimonios</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Moderar contenido</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Publicar aprobados</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-brand-blue mb-2">Visitante</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Ver testimonios</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-blue" /> Enviar testimonios</li>
                      <li className="flex items-center gap-2"><span className="text-gray-400">✗</span> No puede publicar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <LightbulbIcon className="w-8 h-8 text-brand-blue" />
                <h2 className="text-3xl font-bold text-brand-blue">Mejores Prácticas</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed font-lato">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span>Categoriza correctamente: Usa tags consistentes para facilitar la búsqueda</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span>Modera antes de publicar: Asegura la calidad del contenido</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span>Optimiza videos: Usa formatos compatibles (MP4, WebM)</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span>Actualiza regularmente: Mantén el contenido fresco y relevante</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-brand-blue mb-4">¿Necesitas ayuda?</h2>
              <p className="text-gray-700 mb-4 font-lato">Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
              <Link href="#"
                className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-900 transition">
                Contactar Soporte →
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
