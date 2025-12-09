import Link from 'next/link';
import { Target, Lightbulb, Handshake, Check, Shield, Lock, Mail, User, ArrowRight } from 'lucide-react';
import HeaderLanding from "@/app/(public)/landing/components/Header";
import Footer from "@/app/(public)/landing/components/Footer";
import { buttonVariants } from '@/components/ui/button';

export const metadata = {
  title: 'Sobre Nosotros - EduVoice CMS',
  description: 'Conoce nuestra misión, visión y cómo utilizamos tus datos de manera transparente y segura.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">
              Sobre <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-blue to-brand-light">Nosotros</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Transformando la forma en que las diferentes  instituciones gestionan y comparten testimonios
            </p>
          </div>

          {/* Sección de Misión */}
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

          {/* Sección de Visión, Innovación, Compromiso */}
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

          {/* NUEVA SECCIÓN: USO DE DATOS - CRÍTICO PARA GOOGLE OAUTH */}
          <div className=" from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 md:p-12 mb-16 border-2 border-blue-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-brand-blue mb-2">Uso Transparente de Datos</h2>
                <p className="text-gray-600 font-lato">Tu privacidad y seguridad son nuestra prioridad</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">¿Qué información recopilamos?</h3>
              <p className="text-gray-700 mb-4 font-lato">
                EduVoice CMS utiliza Google OAuth para proporcionar un acceso seguro. Solicitamos únicamente
                los datos mínimos necesarios para el funcionamiento del servicio:
              </p>

              <div className="space-y-4">
                {/* Correo Electrónico */}
                <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-brand-blue">
                  <Mail className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">📧 Dirección de Correo Electrónico</h4>
                    <p className="text-sm text-gray-700 mb-3 font-lato">
                      <strong>Para qué lo usamos:</strong>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 font-lato">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Crear y gestionar tu cuenta de usuario</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Enviarte notificaciones sobre nuevos testimonios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Contactarte sobre cambios importantes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Recuperación de cuenta si es necesario</span>
                      </li>
                    </ul>
                    <div className="mt-3 flex gap-2">
                      <span className="px-2 py-1 bg-brand-blue text-white text-xs rounded-full font-mono">email</span>
                    </div>
                  </div>
                </div>

                {/* Información de Perfil */}
                <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-brand-blue">
                  <User className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">👤 Información de Perfil Básica</h4>
                    <p className="text-sm text-gray-700 mb-3 font-lato">
                      <strong>Para qué lo usamos:</strong>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 font-lato">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Mostrar tu nombre en el panel de administración</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Identificar al autor de testimonios enviados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Personalizar tu experiencia en la plataforma</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Mostrar tu foto de perfil (opcional)</span>
                      </li>
                    </ul>
                    <div className="mt-3 flex gap-2">
                      <span className="px-2 py-1 bg-brand-blue text-white text-xs rounded-full font-mono">openid</span>
                      <span className="px-2 py-1 bg-brand-blue text-white text-xs rounded-full font-mono">profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compromiso de Privacidad */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <h3 className="text-xl font-bold text-gray-900">Nuestro Compromiso de Privacidad</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-lato">
                    <strong>Nunca compartimos</strong> tu información con terceros sin tu consentimiento
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-lato">
                    <strong>Solo solicitamos</strong> los datos mínimos necesarios
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-lato">
                    <strong>Puedes eliminar</strong> tu cuenta y datos en cualquier momento
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-lato">
                    <strong>Cumplimos</strong> con todas las regulaciones de protección de datos
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 text-brand-blue hover:text-blue-800 font-bold transition-colors"
              >
                Lee nuestra Política de Privacidad completa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Nuestros Valores */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-brand-yellow">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Autenticidad</h4>
                  <p className="text-gray-600 font-lato">Promovemos testimonios genuinos que reflejen experiencias reales</p>
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

          {/* Nuestro Impacto */}
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

          {/* CTA Final */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-6">¿Quieres formar parte de nuestra historia?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-lato">
              Únete a más de 200 instituciones que ya están transformando sus testimonios en resultados reales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin" className={buttonVariants({ variant: "yellow", size: "lg" })}>
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
  );
}