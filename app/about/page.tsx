import Link from 'next/link';
import { Target, Lightbulb, Handshake, Check } from 'lucide-react';
import HeaderLanding from "@/app/landing/components/Header";
import Footer from "@/app/landing/components/Footer";
import { buttonVariants } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Sobre <span
              className="bg-clip-text text-transparent bg-linear-to-r from-brand-blue to-brand-light">Nosotros</span></h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Transformando la forma en que las instituciones educativas gestionan y comparten testimonios
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-6">Nuestra Misión</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-lato">
              En EduVoice CMS, creemos que los testimonios auténticos son la forma más poderosa de demostrar el
              impacto real de la educación. Nuestra misión es proporcionar a las instituciones educativas y
              empresas EdTech las herramientas necesarias para recolectar, gestionar y publicar testimonios de
              manera profesional y escalable.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-lato">
              Fundada en 2023 por un equipo de desarrolladores apasionados, hemos ayudado a más de
              200 instituciones a transformar sus testimonios dispersos en una estrategia de marketing cohesiva y
              efectiva.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <Target className="w-16 h-16 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-brand-blue mb-3">Nuestra Visión</h3>
              <p className="text-gray-600 font-lato">
                Ser la plataforma líder mundial en gestión de testimonios para el sector educativo
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <Lightbulb className="w-16 h-16 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-brand-blue mb-3">Innovación</h3>
              <p className="text-gray-600 font-lato">
                Desarrollamos tecnología de vanguardia para simplificar la gestión de contenido social proof
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <Handshake className="w-16 h-16 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-brand-blue mb-3">Compromiso</h3>
              <p className="text-gray-600 font-lato">
                Soporte 24/7 y actualizaciones constantes para garantizar tu éxito
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-brand-yellow">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Autenticidad</h4>
                  <p className="text-gray-600 font-lato">Promovemos testimonios genuinos que reflejen experiencias reales
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-yellow">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Simplicidad</h4>
                  <p className="text-gray-600 font-lato">Tecnología compleja, experiencia de usuario simple</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-yellow">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Transparencia</h4>
                  <p className="text-gray-600 font-lato">Precios claros, sin costos ocultos ni sorpresas</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-yellow">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Excelencia</h4>
                  <p className="text-gray-600 font-lato">Calidad superior en producto, servicio y soporte</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-brand-blue to-blue-900 rounded-2xl p-12 text-white mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Impacto</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-black mb-2">200+</div>
                <p className="text-blue-200 font-lato">Instituciones Activas</p>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">15K+</div>
                <p className="text-blue-200 font-lato">Testimonios Gestionados</p>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">45%</div>
                <p className="text-blue-200 font-lato">Aumento Promedio en Conversión</p>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">99.9%</div>
                <p className="text-blue-200 font-lato">Uptime Garantizado</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-6">¿Quieres formar parte de nuestra historia?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-lato">
              Únete a más de 200 instituciones que ya están transformando sus testimonios en resultados reales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className={buttonVariants({ variant: "yellow", size: "lg" })}>
                Empezar Gratis
              </Link>
              <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Contactar Ventas
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}