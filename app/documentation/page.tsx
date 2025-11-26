import React from 'react';
import Link from 'next/link';
import { Rocket, BookOpen, Palette, Lock, CheckCircle, LightbulbIcon } from 'lucide-react';
import HeaderLanding from "@/app/landing/components/Header";
import Footer from "@/app/landing/components/Footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-brand-gray font-sans text-gray-900">
      <HeaderLanding />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Documentación</h1>
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
                  <li><strong>Crea tu cuenta:</strong> Regístrate en nuestra plataforma con tu email
                    institucional</li>
                  <li><strong>Configura tu espacio:</strong> Define categorías, tags y permisos de usuario
                  </li>
                  <li><strong>Sube tu primer testimonio:</strong> Agrega contenido en video, texto o imagen
                  </li>
                  <li><strong>Modera y publica:</strong> Revisa y aprueba el contenido antes de publicar</li>
                  <li><strong>Integra en tu web:</strong> Usa widgets o nuestra API REST</li>
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

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Autenticación</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-100 text-sm"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Endpoints Principales</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-brand-light bg-blue-50 p-4 rounded">
                    <p className="font-mono text-sm text-brand-light mb-2">GET /api/v1/testimonials</p>
                    <p className="text-gray-600">Obtiene lista de testimonios con filtros opcionales</p>
                  </div>
                  <div className="border-l-4 border-brand-light bg-blue-50 p-4 rounded">
                    <p className="font-mono text-sm text-brand-light mb-2">POST /api/v1/testimonials</p>
                    <p className="text-gray-600">Crea un nuevo testimonio</p>
                  </div>
                  <div className="border-l-4 border-brand-light bg-blue-50 p-4 rounded">
                    <p className="font-mono text-sm text-brand-light mb-2">PUT /api/v1/testimonials/:id</p>
                    <p className="text-gray-600">Actualiza un testimonio existente</p>
                  </div>
                  <div className="border-l-4 border-brand-light bg-blue-50 p-4 rounded">
                    <p className="font-mono text-sm text-brand-light mb-2">DELETE /api/v1/testimonials/:id</p>
                    <p className="text-gray-600">Elimina un testimonio</p>
                  </div>
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
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mt-4">
                  <pre className="text-gray-100 text-sm"><code>&lt;script src="https://cdn.eduvoicecms.com/widget.js"&gt;&lt;/script&gt;
                    &lt;div data-eduvoice-widget="carousel" data-category="ingenieria"&gt;&lt;/div&gt;</code></pre>
                </div>
                <p className="mt-4">Tipos de widgets disponibles:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Carousel:</strong> Carrusel automático de testimonios</li>
                  <li><strong>Grid:</strong> Cuadrícula responsive de testimonios</li>
                  <li><strong>Featured:</strong> Testimonio destacado individual</li>
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
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-brand-blue mb-2">Admin</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Acceso completo</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Gestión de usuarios</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Configuración global</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-brand-blue mb-2">Editor</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Crear testimonios</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Moderar contenido</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Publicar aprobados</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-brand-blue mb-2">Visitante</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Ver testimonios</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Enviar testimonios</li>
                      <li className="flex items-center gap-2"><span className="text-red-600">✗</span> No puede publicar</li>
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
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Categoriza correctamente:</strong> Usa tags consistentes para facilitar la
                      búsqueda</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Modera antes de publicar:</strong> Asegura la calidad del contenido</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Optimiza videos:</strong> Usa formatos compatibles (MP4, WebM)</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Actualiza regularmente:</strong> Mantén el contenido fresco y
                      relevante</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-brand-blue/5 rounded-xl p-8">
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
