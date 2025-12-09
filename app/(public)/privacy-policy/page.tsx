import { Shield, Mail, MapPin, Phone } from 'lucide-react';
import HeaderLanding from "@/app/(public)/landing/components/Header";
import Footer from "@/app/(public)/landing/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-brand-blue" />
            </div>
            <h1 className="text-5xl font-black text-brand-blue mb-4">Política de Privacidad</h1>
            <p className="text-gray-600 font-lato">Última actualización: 1 de enero de 2025</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8 font-lato">
            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">1. Introducción</h2>
              <p className="text-gray-700 leading-relaxed">
                En EduVoice CMS, nos comprometemos a proteger tu privacidad y la seguridad de tus datos. Esta
                política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas
                nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">2. Información que Recopilamos</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p><strong>Información de cuenta:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Nombre completo y email institucional</li>
                  <li>Nombre de la institución o empresa</li>
                  <li>Información de facturación (si aplica)</li>
                </ul>

                <p className="mt-4"><strong>Contenido de usuario:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Testimonios en video, texto e imagen</li>
                  <li>Categorías, tags y metadatos asociados</li>
                  <li>Configuraciones de moderación y permisos</li>
                </ul>

                <p className="mt-4"><strong>Datos de uso:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Métricas de engagement y visualizaciones</li>
                  <li>Logs de actividad y acceso a la plataforma</li>
                  <li>Información técnica del dispositivo y navegador</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">3. Cómo Usamos tu Información</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Procesar pagos y gestionar suscripciones</li>
                <li>Enviar notificaciones importantes sobre tu cuenta</li>
                <li>Analizar el uso de la plataforma para mejoras</li>
                <li>Prevenir fraude y garantizar la seguridad</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">4. Compartir Información</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                No vendemos ni alquilamos tu información personal a terceros. Solo compartimos datos en las
                siguientes circunstancias:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li><strong>Proveedores de servicios:</strong> Para procesamiento de pagos, hosting y CDN</li>
                <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o autoridades</li>
                <li><strong>Con tu consentimiento:</strong> Cuando nos autorices explícitamente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">5. Seguridad de Datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
                <li>Encriptación SSL/TLS para todas las transmisiones</li>
                <li>Almacenamiento seguro con encriptación en reposo</li>
                <li>Autenticación de dos factores disponible</li>
                <li>Auditorías de seguridad regulares</li>
                <li>Control de acceso basado en roles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">6. Tus Derechos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Acceder a tu información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Exportar tus datos en formato portable</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">7. Retención de Datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Conservamos tu información mientras tu cuenta esté activa o según sea necesario para
                proporcionarte servicios. Puedes solicitar la eliminación de tus datos en cualquier momento,
                sujeto a obligaciones legales de retención.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">8. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso de la
                plataforma y personalizar contenido. Puedes gestionar tus preferencias de cookies en la
                configuración de tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">9. Cambios a esta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos
                por email o mediante un aviso en la plataforma. La fecha de "Última actualización" al inicio de
                este documento indica cuándo se realizó la última modificación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">10. Contacto</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos,
                contáctanos:
              </p>
              <div className="bg-brand-blue/5 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-blue" />
                  <p className="text-gray-700">
                    <strong>Email:</strong> <a href="mailto:privacidad@eduvoicecms.com" className="text-brand-blue hover:underline ml-1">privacidad@eduvoicecms.com</a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                  <p className="text-gray-700">
                    <strong>Dirección:</strong> <span className="ml-1">123 Education Street, San Francisco, CA 94102</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-blue" />
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> <span className="ml-1">+1 (234) 567-8900</span>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}