//Voices Hub completo para la landing page
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
<<<<<<<< HEAD:app/Voiceshub/page.tsx
import VoicesHub from "@/app/landing/components/VoicesHub";
import { ALL_TESTIMONIALS } from "@/app/landing/data/dataTestimonios";
|||||||| 083a8ef:app/wall-of-love/page.tsx
import WallOfLove from "@/app/landing/components/WallofLove";
import { ALL_TESTIMONIALS } from "@/app/landing/components/testimonials-data";
========
import VoicesHub from "@/app/(public)/landing/components/VoicesHub";
import { ALL_TESTIMONIALS, testimonialsData } from "@/app/(public)/landing/components/data";
import { TestimonialRender } from "./testimonial_render-visitor";
>>>>>>>> bcb62cb48aeb620cc32db1d4131d2e57293cf72c:app/voices-hub/page.tsx

<<<<<<<< HEAD:app/Voiceshub/page.tsx
export default function VoiceHubPage() {
|||||||| 083a8ef:app/wall-of-love/page.tsx
export default function WallOfLovePage() {
========

export default function VoicesHubPage() {
>>>>>>>> bcb62cb48aeb620cc32db1d4131d2e57293cf72c:app/voices-hub/page.tsx
  return (
    <main className="min-h-screen">
      {/* Header Navigation */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la Landing
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          {/* HEADER */}
          <div className="text-center mb-20">
            <span className="inline-block bg-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wide px-3 py-1 rounded-full">
              Comunidad de EduVoice CMS
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mt-6">
              Voices Hub Completo
            </h1>

            <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg leading-relaxed">
              Conoce las historias reales de cientos de instituciones educativas que han transformado su
              <span className="font-bold"> social proof</span> con EduVoice CMS. Desde universidades de renombre
              hasta pequeños bootcamps, todos confían en nosotros para recopilar y mostrar testimonios auténticos.
            </p>
          </div>

          {/* VOICES HUB COMPLETO */}
          <div className="mt-16">
<<<<<<<< HEAD:app/Voiceshub/page.tsx
            <VoicesHub testimonials={ALL_TESTIMONIALS} />
|||||||| 083a8ef:app/wall-of-love/page.tsx
            <WallOfLove testimonials={ALL_TESTIMONIALS} />
========
            <TestimonialRender testimonials={testimonialsData} />
            <VoicesHub testimonials={ALL_TESTIMONIALS} />
>>>>>>>> bcb62cb48aeb620cc32db1d4131d2e57293cf72c:app/voices-hub/page.tsx
          </div>



          {/* CTA FINAL */}
          <div className="text-center mt-20 py-16 bg-linear-to-r from-brand-blue to-blue-700 rounded-3xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              ¿Listo para crear tu propio Voices Hub?
            </h2>

            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Comienza a recopilar testimonios auténticos de tus estudiantes o clientes hoy mismo.
              Aumenta tu social proof y convierte más visitantes en inscritos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
              >
                Comenzar Gratis
              </Link>

              <Link
                href="/pricing"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-10 py-4 rounded-xl transition-colors"
              >
                Ver Precios
              </Link>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Instituciones Activas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">50k+</div>
              <p className="text-gray-600">Testimonios Recopilados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Tasa de Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <p>© 2025 EduVoice CMS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
