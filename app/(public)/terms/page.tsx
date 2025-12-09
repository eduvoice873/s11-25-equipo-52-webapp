import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Términos de Servicio - EduVoice CMS',
  description: 'Términos y condiciones de uso de EduVoice CMS',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Términos de Servicio
          </h1>
          <p className="text-gray-600">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
          <Section
            title="1. Aceptación de los Términos"
            content={
              <p>
                Al acceder y usar EduVoice CMS, usted acepta estar sujeto a estos
                Términos de Servicio y todas las leyes y regulaciones aplicables. Si no está de
                acuerdo con alguno de estos términos, no debe usar el Servicio.
              </p>
            }
          />

          <Section
            title="2. Descripción del Servicio"
            content={
              <>
                <p className="mb-4">
                  EduVoice CMS es una plataforma web que permite a diferentes instituciones:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Crear y gestionar formularios para recopilar testimonios</li>
                  <li>Recibir testimonios en formato texto, video e imagen</li>
                  <li>Moderar y aprobar testimonios antes de su publicación</li>
                  <li>Publicar testimonios aprobados mediante widgets embebidos</li>
                  <li>Organizar testimonios por categorías y etiquetas</li>
                </ul>
              </>
            }
          />

          <Section
            title="3. Registro y Cuenta de Usuario"
            content={
              <>
                <p className="mb-4">
                  Para usar el Servicio, debe:
                </p>
                <ul className="list-disc pl-6 space-y-2">

                  <li>Tener al menos 18 años de edad</li>
                  <li>Crear una cuenta con su correo electrónico y nombre de la organización</li>
                  <li>Puede registrarse usandon una cuenta de google valida</li>
                  <li>Proporcionar información precisa y completa</li>
                  <li>Mantener la seguridad de su cuenta</li>
                  <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                </ul>
                <p className="mt-4">
                  Usted es responsable de todas las actividades que ocurran bajo su cuenta.
                </p>
              </>
            }
          />

          <Section
            title="4. Uso Aceptable"
            content={
              <>
                <p className="mb-4">
                  <strong>Está permitido:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Usar el Servicio para fines educativos legítimos</li>
                  <li>Recopilar testimonios auténticos de su comunidad</li>
                  <li>Publicar contenido que cumpla con las leyes aplicables</li>
                  <li>Compartir widgets en sitios web de su propiedad</li>
                </ul>

                <p className="mb-4">
                  <strong className="text-red-600">Está prohibido:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Publicar contenido ilegal, difamatorio, obsceno o fraudulento</li>
                  <li>Violar derechos de autor o propiedad intelectual</li>
                  <li>Enviar spam o contenido no solicitado</li>
                  <li>Intentar acceder a cuentas de otros usuarios</li>
                  <li>Realizar ingeniería inversa o intentar vulnerar el sistema</li>
                  <li>Usar el Servicio para fines distintos a su propósito educativo</li>
                  <li>Recopilar información de usuarios sin consentimiento</li>
                </ul>
              </>
            }
          />

          <Section
            title="5. Contenido del Usuario"
            content={
              <>
                <p className="mb-4">
                  <strong>5.1 Propiedad del Contenido</strong>
                </p>
                <p className="mb-4">
                  Usted retiene todos los derechos sobre el contenido que publica (testimonios,
                  formularios, configuraciones). Al publicar contenido, nos otorga una licencia
                  limitada para almacenarlo, mostrarlo y procesarlo según sea necesario para
                  proporcionar el Servicio.
                </p>

                <p className="mb-4">
                  <strong>5.2 Responsabilidad del Contenido</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usted es responsable de todo el contenido que publica o aprueba</li>
                  <li>Debe obtener los permisos necesarios antes de publicar testimonios</li>
                  <li>Debe cumplir con las leyes de privacidad aplicables (GDPR, CCPA, etc.)</li>
                  <li>Nos reservamos el derecho de eliminar contenido que viole estos términos</li>
                </ul>
              </>
            }
          />

          <Section
            title="6. Moderación de Contenido"
            content={
              <p>
                EduVoice CMS proporciona herramientas de moderación, pero usted es el único
                responsable de revisar y aprobar contenido antes de su publicación. No somos
                responsables del contenido publicado por sus usuarios ni de las consecuencias
                de su publicación.
              </p>
            }
          />

          <Section
            title="7. Privacidad y Protección de Datos"
            content={
              <>
                <p className="mb-4">
                  El uso del Servicio también está regido por nuestra{' '}
                  <Link href="/privacy-policy" className="text-indigo-600 hover:underline">
                    Política de Privacidad
                  </Link>
                  , que forma parte integral de estos Términos.
                </p>
                <p>
                  Al usar el Servicio, usted acepta el procesamiento de datos personales según
                  se describe en la Política de Privacidad y se compromete a cumplir con todas
                  las leyes de protección de datos aplicables al recopilar testimonios.
                </p>
              </>
            }
          />

          <Section
            title="8. Disponibilidad del Servicio"
            content={
              <>
                <p className="mb-4">
                  Nos esforzamos por mantener el Servicio disponible 24/7, pero:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No garantizamos disponibilidad ininterrumpida</li>
                  <li>Podemos realizar mantenimiento programado con aviso previo</li>
                  <li>Podemos suspender el servicio temporalmente sin previo aviso en caso de emergencia</li>
                  <li>No somos responsables por interrupciones causadas por terceros o fuerza mayor</li>
                </ul>
              </>
            }
          />

          <Section
            title="9. Límites de Uso"
            content={
              <>
                <p className="mb-4">
                  El plan gratuito puede tener limitaciones en:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Número de testimonios almacenados</li>
                  <li>Número de formularios activos</li>
                  <li>Almacenamiento de archivos multimedia</li>
                  <li>Solicitudes a la API</li>
                </ul>
                <p className="mt-4">
                  Nos reservamos el derecho de modificar estos límites con previo aviso.
                </p>
              </>
            }
          />

          <Section
            title="10. Propiedad Intelectual"
            content={
              <>
                <p className="mb-4">
                  EduVoice CMS, su logo, diseño y funcionalidades son propiedad exclusiva de
                  sus creadores y están protegidos por leyes de propiedad intelectual.
                </p>
                <p>
                  No puede copiar, modificar, distribuir o crear obras derivadas sin nuestro
                  consentimiento explícito por escrito.
                </p>
              </>
            }
          />

          <Section
            title="11. Limitación de Responsabilidad"
            content={
              <>
                <p className="mb-4">
                  <strong>El Servicio se proporciona "tal cual" sin garantías de ningún tipo.</strong>
                </p>
                <p className="mb-4">
                  En la medida máxima permitida por la ley, no seremos responsables por:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Daños directos, indirectos, incidentales o consecuentes</li>
                  <li>Pérdida de datos, ingresos o beneficios</li>
                  <li>Contenido publicado por usuarios</li>
                  <li>Interrupciones del servicio</li>
                  <li>Accesos no autorizados a su cuenta</li>
                </ul>
              </>
            }
          />

          <Section
            title="12. Indemnización"
            content={
              <p>
                Usted acepta indemnizar y eximir de responsabilidad a EduVoice CMS, sus
                directores, empleados y afiliados de cualquier reclamo, daño, pérdida o gasto
                (incluyendo honorarios legales) que surja de: (a) su uso del Servicio, (b)
                violación de estos Términos, (c) violación de derechos de terceros, o (d)
                contenido que publique o apruebe.
              </p>
            }
          />

          <Section
            title="13. Terminación"
            content={
              <>
                <p className="mb-4">
                  <strong>13.1 Por su parte:</strong> Puede cancelar su cuenta en cualquier
                  momento desde la configuración.
                </p>
                <p className="mb-4">
                  <strong>13.2 Por nuestra parte:</strong> Podemos suspender o terminar su
                  cuenta si:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Viola estos Términos</li>
                  <li>No paga servicios contratados</li>
                  <li>Su cuenta permanece inactiva por más de 12 meses</li>
                  <li>Es necesario por razones legales o de seguridad</li>
                </ul>
                <p className="mt-4">
                  Tras la terminación, perderá acceso a su cuenta y datos. Los testimonios
                  públicos pueden permanecer visibles hasta su eliminación manual.
                </p>
              </>
            }
          />

          <Section
            title="14. Modificaciones a los Términos"
            content={
              <p>
                Nos reservamos el derecho de modificar estos Términos en cualquier momento.
                Notificaremos cambios significativos por correo electrónico o mediante aviso
                en la plataforma. El uso continuado del Servicio después de cambios constituye
                aceptación de los nuevos términos.
              </p>
            }
          />

          <Section
            title="15. Ley Aplicable y Jurisdicción"
            content={
              <p>
                Estos Términos se rigen por las leyes del país donde se encuentra registrada
                la empresa operadora del Servicio. Cualquier disputa será resuelta en los
                tribunales competentes de dicha jurisdicción.
              </p>
            }
          />

          <Section
            title="16. Contacto"
            content={
              <>
                <p className="mb-4">
                  Para preguntas sobre estos Términos, contáctenos:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:legal@eduvoice.com" className="text-indigo-600 hover:underline">
                      legal@eduvoice.com
                    </a>
                  </p>
                  <p>
                    <strong>Soporte:</strong>{' '}
                    <a href="mailto:soporte@eduvoice.com" className="text-indigo-600 hover:underline">
                      soporte@eduvoice.com
                    </a>
                  </p>
                </div>
              </>
            }
          />

          <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 mt-8">
            <p className="text-sm text-gray-700">
              <strong>Nota Importante:</strong> Al usar EduVoice CMS, usted reconoce haber
              leído, entendido y aceptado estos Términos de Servicio en su totalidad. Si no
              está de acuerdo, debe dejar de usar el Servicio inmediatamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-700 space-y-3 leading-relaxed">
        {content}
      </div>
    </section>
  );
}