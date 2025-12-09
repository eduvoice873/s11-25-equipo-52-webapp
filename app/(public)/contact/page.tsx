import Link from 'next/link';
import { Mail, Phone, MessageCircle, MapPin, Briefcase, Wrench, Handshake } from 'lucide-react';
import HeaderLanding from "@/app/(public)/landing/components/Header";
import Footer from "@/app/(public)/landing/components/Footer";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Contacto</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Estamos aquí para ayudarte. Elige la mejor forma de comunicarte con nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-6">Envíanos un Mensaje</h2>
              <form className="space-y-6 font-lato">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo *</label>
                  <Input type="text" required placeholder="Juan Pérez" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Institucional *</label>
                  <Input type="email" required placeholder="juan@universidad.edu" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Institución / Empresa *</label>
                  <Input type="text" required placeholder="Universidad XYZ" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                  <Input type="tel" placeholder="+1 234 567 8900" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto *</label>
                  <select required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition">
                    <option value="">Selecciona una opción</option>
                    <option>Solicitar Demo</option>
                    <option>Consulta de Ventas</option>
                    <option>Soporte Técnico</option>
                    <option>Alianzas y Partnerships</option>
                    <option>Prensa y Medios</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                  <Textarea required rows={5} placeholder="Cuéntanos cómo podemos ayudarte..." />
                </div>

                <Button type="submit" variant="yellow" size="lg" className="w-full font-extrabold shadow-lg">
                  Enviar Mensaje
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-brand-blue mb-6">Información de Contacto</h3>
                <div className="space-y-6 font-lato">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg h-fit text-brand-blue">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:contacto@eduvoicecms.com"
                        className="text-brand-blue hover:underline">contacto@eduvoicecms.com</a>
                      <p className="text-sm text-gray-500 mt-1">Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg h-fit text-green-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Teléfono</h4>
                      <a href="tel:+1234567890" className="text-brand-blue hover:underline">+1 (234)
                        567-8900</a>
                      <p className="text-sm text-gray-500 mt-1">Lun-Vie 9am-6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg h-fit text-purple-600">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Chat en Vivo</h4>
                      <button className="text-brand-blue hover:underline">Iniciar conversación</button>
                      <p className="text-sm text-gray-500 mt-1">Disponible 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-lg h-fit text-yellow-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Oficina Principal</h4>
                      <p className="text-gray-600">123 Education Street<br />San Francisco, CA 94102<br />Estados
                        Unidos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-brand-blue mb-4">Horarios de Atención</h3>
                <div className="space-y-3 text-gray-700 font-lato">
                  <div className="flex justify-between">
                    <span className="font-semibold">Lunes - Viernes:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sábado:</span>
                    <span>10:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Domingo:</span>
                    <span>Cerrado</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Soporte de Emergencia:</strong> Disponible 24/7 para clientes Pro y Empresa
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-brand-blue to-blue-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">¿Prefieres una Demo en Vivo?</h3>
                <p className="text-blue-100 mb-6 font-lato">
                  Agenda una sesión personalizada con nuestro equipo para ver EduVoice CMS en acción
                </p>
                <Link href="/#demo"
                  className="inline-block bg-brand-yellow text-brand-blue px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition font-lato">
                  Agendar Demo →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Departamentos Especializados</h2>
            <div className="grid md:grid-cols-3 gap-8 font-lato">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Ventas</h4>
                <p className="text-gray-600 mb-3">Para consultas comerciales y cotizaciones</p>
                <a href="mailto:ventas@eduvoicecms.com"
                  className="text-brand-blue font-semibold hover:underline">ventas@eduvoicecms.com</a>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <Wrench className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Soporte Técnico</h4>
                <p className="text-gray-600 mb-3">Asistencia con problemas técnicos</p>
                <a href="mailto:soporte@eduvoicecms.com"
                  className="text-brand-blue font-semibold hover:underline">soporte@eduvoicecms.com</a>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  <Handshake className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Alianzas</h4>
                <p className="text-gray-600 mb-3">Oportunidades de partnership</p>
                <a href="mailto:alianzas@eduvoicecms.com"
                  className="text-brand-blue font-semibold hover:underline">alianzas@eduvoicecms.com</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}