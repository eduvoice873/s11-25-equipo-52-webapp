import React from 'react';

export default function Stats() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-light font-extrabold text-sm uppercase tracking-wider">Impacto Real</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            Resultados que hablan por sí solos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-background p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl font-black leading-none mb-2 bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">200+</div>
            <p className="text-gray-600 font-semibold text-lg font-lato">Instituciones Activas</p>
          </div>

          <div className="bg-background p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl font-black leading-none mb-2 bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">15K+</div>
            <p className="text-gray-600 font-semibold text-lg font-lato">Testimonios Gestionados</p>
          </div>

          <div className="bg-background p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl font-black leading-none mb-2 bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">45%</div>
            <p className="text-gray-600 font-semibold text-lg font-lato">Aumento en Conversión</p>
          </div>

          <div className="bg-background p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl font-black leading-none mb-2 bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">99.9%</div>
            <p className="text-gray-600 font-semibold text-lg font-lato">Uptime Garantizado</p>
          </div>
        </div>
      </div>
    </section>
  );
}
