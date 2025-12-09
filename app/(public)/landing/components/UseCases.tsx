import React from 'react';
import { GraduationCap, School, Laptop, Lightbulb, ArrowRight } from 'lucide-react';

export default function UseCases() {
  return (
    <section id="casos" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-light font-extrabold text-sm uppercase tracking-wider">Casos de Uso</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 font-nunito">
            Para todo el ecosistema <span className="bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">educativo</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto font-lato">
            Desde universidades hasta bootcamps, más de 200 instituciones confían en EduVoice CMS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Case 1 */}
          <div className="group p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white border-brand-blue/20 hover:border-brand-blue">
            <div className="flex justify-between items-start mb-4">
              <div className="text-brand-blue group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={48} strokeWidth={1.5} />
              </div>
              <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full font-nunito">
                Enterprise
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3 font-nunito">Universidades</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Gestiona testimonios por facultad, carrera y cohorte. Muestra casos de éxito de egresados.
            </p>
            <div className="bg-brand-blue/5 rounded-lg p-3 text-sm text-gray-600 font-lato mb-4 border-l-4 border-brand-blue">
              <strong className="text-brand-blue">Caso real:</strong> Universidad aumentó matrículas 35% con testimonios segmentados por carrera.
            </div>
            <a href="/voices-hub?category=universidad" className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm hover:gap-3 transition-all font-nunito group-hover:text-brand-light">
              Ver ejemplos <ArrowRight size={16} />
            </a>
          </div>

          {/* Case 2 */}
          <div className="group p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white border-brand-blue/20 hover:border-brand-blue">
            <div className="flex justify-between items-start mb-4">
              <div className="text-brand-blue group-hover:scale-110 transition-transform duration-300">
                <School size={48} strokeWidth={1.5} />
              </div>
              <span className="bg-brand-light/20 text-brand-blue text-xs font-bold px-3 py-1 rounded-full font-nunito">
                B2C
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3 font-nunito">Colegios</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Testimonios de familias y estudiantes. Fortalece tu propuesta de valor para nuevas matrículas.
            </p>
            <div className="bg-brand-blue/5 rounded-lg p-3 text-sm text-gray-600 font-lato mb-4 border-l-4 border-brand-blue">
              <strong className="text-brand-blue">Caso real:</strong> Colegio incrementó conversión 40% con videos de padres en landing.
            </div>
            <a href="/voices-hub?category=colegio" className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm hover:gap-3 transition-all font-nunito group-hover:text-brand-light">
              Ver ejemplos <ArrowRight size={16} />
            </a>
          </div>

          {/* Case 3 */}
          <div className="group p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white border-brand-blue/20 hover:border-brand-blue">
            <div className="flex justify-between items-start mb-4">
              <div className="text-brand-blue group-hover:scale-110 transition-transform duration-300">
                <Laptop size={48} strokeWidth={1.5} />
              </div>
              <span className="bg-brand-yellow/30 text-gray-800 text-xs font-bold px-3 py-1 rounded-full font-nunito">
                High Growth
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3 font-nunito">Bootcamps</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Historias de empleabilidad y transformación profesional. El mejor argumento de venta.
            </p>
            <div className="bg-brand-blue/5 rounded-lg p-3 text-sm text-gray-600 font-lato mb-4 border-l-4 border-brand-blue">
              <strong className="text-brand-blue">Caso real:</strong> Bootcamp logró 92% de empleabilidad mostrando testimonios de graduados.
            </div>
            <a href="/voices-hub?category=bootcamp" className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm hover:gap-3 transition-all font-nunito group-hover:text-brand-light">
              Ver ejemplos <ArrowRight size={16} />
            </a>
          </div>

          {/* Case 4 */}
          <div className="group p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white border-brand-blue/20 hover:border-brand-blue">
            <div className="flex justify-between items-start mb-4">
              <div className="text-brand-blue group-hover:scale-110 transition-transform duration-300">
                <Lightbulb size={48} strokeWidth={1.5} />
              </div>
              <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full font-nunito">
                B2B SaaS
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-brand-blue mb-3 font-nunito">Empresas EdTech</h3>
            <p className="text-gray-700 mb-4 font-lato">
              Prueba social irrefutable para productos SaaS educativos. Aumenta confianza y conversión.
            </p>
            <div className="bg-brand-blue/5 rounded-lg p-3 text-sm text-gray-600 font-lato mb-4 border-l-4 border-brand-blue">
              <strong className="text-brand-blue">Caso real:</strong> Plataforma LMS integró testimonios vía API y aumentó ventas 28%.
            </div>
            <a href="/voices-hub?category=edtech" className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm hover:gap-3 transition-all font-nunito group-hover:text-brand-light">
              Ver ejemplos <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
