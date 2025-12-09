import Link from 'next/link';
import { MessageCircle, Mail, Phone, Send, HelpCircle } from 'lucide-react';
import HeaderLanding from "@/app/(public)/landing/components/Header";
import Footer from "@/app/(public)/landing/components/Footer";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Soporte</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Estamos aquí para ayudarte 24/7. Elige la mejor forma de contactarnos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Chat en Vivo</h3>
              <p className="text-gray-600 mb-4 font-lato">Respuesta inmediata de nuestro equipo</p>
              <p className="text-sm text-gray-500 mb-4 font-lato">Disponible 24/7</p>
              <Button
                variant="disabled"
                className="w-full"
                size='lg'
                disabled
              >
                Iniciar Chat
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Email</h3>
              <p className="text-gray-600 mb-4 font-lato">Envíanos un mensaje detallado</p>
              <p className="text-sm text-gray-500 mb-4 font-lato">Respuesta en 2-4 horas</p>
              <Link href="mailto:soporte@eduvoicecms.com">
                <Button variant="primary" className="w-full" size='lg'>
                  Enviar Email
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Teléfono</h3>
              <p className="text-gray-600 mb-4 font-lato">Habla directamente con un experto</p>
              <p className="text-sm text-gray-500 mb-4 font-lato">Lun-Vie 9am-6pm</p>
              <Link href="tel:+1234567890">
                <Button variant="disabled" className="w-full" size='lg'>
                  Llamar Ahora
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-6 text-center">Envíanos un Mensaje</h2>
            <form className="space-y-6 font-lato">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
                  <Input type="text" placeholder="Juan Pérez" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="juan@universidad.edu" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Institución</label>
                <Input type="text" placeholder="Universidad XYZ" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Consulta</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 rounded-md border border-brand-blue/30 text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 appearance-none bg-white"
                  >
                    <option>Soporte Técnico</option>
                    <option>Pregunta sobre Funcionalidades</option>
                    <option>Problema con API</option>
                    <option>Consulta de Ventas</option>
                    <option>Otro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <Textarea rows={6} placeholder="Describe tu consulta o problema..." className="resize-none" />
              </div>

              <div className="text-center">
                <Button variant="yellow" size="lg" className="px-10 font-extrabold text-lg shadow-lg">
                  Enviar Mensaje
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="space-y-6 font-lato">
              <div className="border-l-4 border-brand-light bg-blue-50 p-6 rounded-r-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">¿Cómo empiezo a usar EduVoice CMS?</h4>
                <p className="text-gray-600">Regístrate con tu email institucional, configura tu espacio y comienza
                  a subir testimonios. El proceso toma menos de 5 minutos.</p>
              </div>

              <div className="border-l-4 border-brand-light bg-blue-50 p-6 rounded-r-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">¿Puedo integrar testimonios en mi LMS?</h4>
                <p className="text-gray-600">Sí, nuestra API REST te permite integrar testimonios en cualquier
                  plataforma. Consulta nuestra <Link href="/documentation" className="text-brand-blue font-semibold hover:underline">documentación</Link>.</p>
              </div>

              <div className="border-l-4 border-brand-light bg-blue-50 p-6 rounded-r-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">¿Qué formatos de video soportan?</h4>
                <p className="text-gray-600">Soportamos MP4, WebM, MOV y también integración directa con YouTube.
                  Los videos se optimizan automáticamente.</p>
              </div>

              <div className="border-l-4 border-brand-light bg-blue-50 p-6 rounded-r-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">¿Cómo funciona la moderación?</h4>
                <p className="text-gray-600">Configura roles (Admin, Editor, Visitante) y define un workflow de
                  aprobación. Los testimonios solo se publican después de ser revisados.</p>
              </div>

              <div className="border-l-4 border-brand-light bg-blue-50 p-6 rounded-r-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">¿Ofrecen soporte en español?</h4>
                <p className="text-gray-600">Sí, nuestro equipo de soporte habla español e inglés. Estamos
                  disponibles 24/7 por chat, email y teléfono.</p>
              </div>

              <div className="border-l-4 border-brand-light bg-blue-50 p-6 rounded-r-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">¿Cuánto cuesta EduVoice CMS?</h4>
                <p className="text-gray-600">Tenemos un plan gratuito para empezar y planes pagos desde $49/mes.
                  Consulta todos los <Link href="/pricing" className="text-brand-blue font-semibold hover:underline">planes y precios</Link>.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-linear-to-br from-brand-blue to-blue-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">¿Necesitas Soporte Prioritario?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto font-lato">
              Los planes Pro y Empresa incluyen soporte prioritario 24/7 con tiempos de respuesta garantizados
            </p>
            <Link href="/pricing">
              <Button variant="yellow" size="lg" className="font-bold">
                Ver Planes Premium
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
