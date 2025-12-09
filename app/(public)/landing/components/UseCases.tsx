import React from 'react';
import { GraduationCap, School, Laptop, Lightbulb } from 'lucide-react';

export default function UseCases() {
  return (
    <section id="casos" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-light font-extrabold text-sm uppercase tracking-wider">Casos de Uso</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            Diseñado para el sector <span className="bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">EdTech</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto font-lato">
            Instituciones y empresas educativas confían en EduVoice CMS para gestionar su social proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Case 1 */}
          <div className="p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="mb-4 text-brand-blue">
              <GraduationCap size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Universidades</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Gestiona testimonios por facultad, carrera y cohorte. Muestra casos de éxito de egresados.
            </p>
            <div className="bg-white/50 rounded-lg p-3 text-sm text-gray-600 font-lato">
              <strong>Ejemplo:</strong> Universidad XYZ aumentó matrículas 35% mostrando testimonios
              segmentados por carrera.
            </div>
          </div>

          {/* Case 2 */}
          <div className="p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-linear-to-br from-green-50 to-green-100 border-green-200">
            <div className="mb-4 text-brand-blue">
              <School size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Colegios</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Testimonios de familias y estudiantes. Fortalece tu propuesta de valor para nuevas
              matrículas.
            </p>
            <div className="bg-white/50 rounded-lg p-3 text-sm text-gray-600 font-lato">
              <strong>Ejemplo:</strong> Colegio ABC usa videos de padres en su landing para aumentar
              conversión.
            </div>
          </div>

          {/* Case 3 */}
          <div className="p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="mb-4 text-brand-blue">
              <Laptop size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Bootcamps</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Historias de empleabilidad y transformación profesional. El mejor argumento de venta.
            </p>
            <div className="bg-white/50 rounded-lg p-3 text-sm text-gray-600 font-lato">
              <strong>Ejemplo:</strong> Bootcamp DEV muestra testimonios de graduados empleados en tech.
            </div>
          </div>

          {/* Case 4 */}
          <div className="p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-linear-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="mb-4 text-brand-blue">
              <Lightbulb size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3">Empresas EdTech</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Prueba social irrefutable para productos SaaS educativos. Aumenta confianza y conversión.
            </p>
            <div className="bg-white/50 rounded-lg p-3 text-sm text-gray-600 font-lato">
              <strong>Ejemplo:</strong> Plataforma LMS integra testimonios vía API en su marketplace.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
