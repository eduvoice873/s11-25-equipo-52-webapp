// pagina de terminos y condiciones para EduVoice CMS

import HeaderLanding from "@/app/landing/components/Header";
import Footer from "@/app/landing/components/Footer";
import {
  FileCheck,
  Info,
  User,
  ShieldCheck,
  FileText,
  CreditCard,
  Activity,
  Copyright,
  AlertTriangle,
  Ban,
  RefreshCw,
  Scale,
  Mail,
  MapPin
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-brand-blue mb-4">Términos del Servicio</h1>
            <p className="text-gray-600 font-lato">Última actualización: 1 de enero de 2025</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12 font-lato">
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">1. Aceptación de los Términos</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                Al acceder y usar EduVoice CMS, aceptas estar sujeto a estos Términos del Servicio. Si no estás
                de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">2. Descripción del Servicio</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                EduVoice CMS es una plataforma de gestión de contenido especializada en testimonios para
                instituciones educativas y empresas EdTech. Proporcionamos herramientas para recolectar,
                moderar, organizar y publicar testimonios en múltiples formatos.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">3. Cuentas de Usuario</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed pl-16">
                <p><strong>Registro:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Debes proporcionar información precisa y completa al registrarte</li>
                  <li>Eres responsable de mantener la seguridad de tu cuenta</li>
                  <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                </ul>

                <p className="mt-4"><strong>Elegibilidad:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Debes tener al menos 18 años para usar el servicio</li>
                  <li>Debes representar a una institución o empresa legítima</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">4. Uso Aceptable</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 pl-16">Te comprometes a NO:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-20">
                <li>Publicar contenido ilegal, difamatorio u ofensivo</li>
                <li>Violar derechos de propiedad intelectual de terceros</li>
                <li>Intentar acceder sin autorización a sistemas o datos</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Usar el servicio para spam o actividades fraudulentas</li>
                <li>Revender o redistribuir el servicio sin autorización</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">5. Contenido de Usuario</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed pl-16">
                <p><strong>Propiedad:</strong> Mantienes todos los derechos sobre el contenido que subes a
                  EduVoice CMS.</p>

                <p><strong>Licencia:</strong> Nos otorgas una licencia mundial, no exclusiva y libre de regalías
                  para almacenar, procesar y distribuir tu contenido según sea necesario para proporcionar el
                  servicio.</p>

                <p><strong>Responsabilidad:</strong> Eres responsable de asegurar que tienes los derechos
                  necesarios para publicar todo el contenido que subes, incluyendo consentimientos de las
                  personas que aparecen en testimonios.</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">6. Planes y Pagos</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed pl-16">
                <p><strong>Suscripciones:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Los planes pagos se facturan mensual o anualmente según tu elección</li>
                  <li>Los pagos se procesan automáticamente al inicio de cada período</li>
                  <li>Los precios pueden cambiar con 30 días de aviso previo</li>
                </ul>

                <p className="mt-4"><strong>Cancelación:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Puedes cancelar tu suscripción en cualquier momento</li>
                  <li>No se ofrecen reembolsos por períodos parciales</li>
                  <li>El acceso continúa hasta el final del período pagado</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">7. Disponibilidad del Servicio</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                Nos esforzamos por mantener un uptime del 99.9%, pero no garantizamos que el servicio esté
                disponible sin interrupciones. Podemos realizar mantenimiento programado con aviso previo cuando
                sea posible.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <Copyright className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">8. Propiedad Intelectual</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                EduVoice CMS, su logo, diseño y funcionalidades son propiedad de nuestra empresa y están
                protegidos por leyes de propiedad intelectual. No puedes usar nuestras marcas sin autorización
                escrita previa.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">9. Limitación de Responsabilidad</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                En la máxima medida permitida por la ley, EduVoice CMS no será responsable por daños indirectos,
                incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar el
                servicio.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <Ban className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">10. Terminación</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                Podemos suspender o terminar tu acceso al servicio si violas estos términos. También puedes
                terminar tu cuenta en cualquier momento desde la configuración de tu cuenta.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">11. Modificaciones</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos
                sobre cambios significativos por email o mediante un aviso en la plataforma. El uso continuado
                del servicio después de los cambios constituye tu aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">12. Ley Aplicable</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-16">
                Estos términos se rigen por las leyes del Estado de California, Estados Unidos, sin considerar
                conflictos de disposiciones legales.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-brand-blue">13. Contacto</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 pl-16">
                Si tienes preguntas sobre estos términos, contáctanos:
              </p>
              <div className="bg-blue-50 rounded-lg p-6 ml-16">
                <p className="text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-blue" />
                  <strong>Email:</strong>
                  <a href="mailto:legal@eduvoicecms.com" className="text-brand-blue hover:underline">legal@eduvoicecms.com</a>
                </p>
                <p className="text-gray-700 mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  <strong>Dirección:</strong> 123 Education Street, Dirección, CA 94102
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
