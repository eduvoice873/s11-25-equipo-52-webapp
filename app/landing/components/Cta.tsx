import React from 'react';
import Link from 'next/link';

export default function Cta() {
  return (
    <section id="demo" className="py-24 bg-linear-to-br from-brand-blue via-[#104C8B] to-[#15326B] text-background relative overflow-hidden text-center">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-brand-yellow animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-brand-light animate-pulse animation-delay-1s"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          ¿Listo para transformar tus testimonios en <span className="text-brand-yellow">resultados reales</span>?
        </h2>
        <p className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto font-lato">
          Únete a más de 200 instituciones que ya están usando EduVoice CMS para gestionar su social proof de
          forma profesional.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/login" className="bg-brand-yellow text-brand-blue px-10 py-5 rounded-xl font-extrabold text-xl shadow-2xl transition-all duration-300 hover:bg-yellow-400 hover:scale-105">
            Empezar Gratis Ahora
          </Link>
          <Link href="/contact" className="border-2 border-background text-background bg-transparent px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-background hover:text-brand-blue hover:scale-105">
            Agendar Demo Personalizada
          </Link>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center text-blue-200 font-lato">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"></path>
            </svg>
            <span>Sin tarjeta de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"></path>
            </svg>
            <span>Setup en 5 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"></path>
            </svg>
            <span>Soporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
