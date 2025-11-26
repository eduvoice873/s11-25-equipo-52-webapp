'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import HeaderLanding from "@/app/landing/components/Header";
import Footer from "@/app/landing/components/Footer";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Básico');

  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Planes y <span
              className="bg-clip-text text-transparent bg-linear-to-br from-brand-blue to-brand-light">Precios</span></h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Elige el plan perfecto para tu institución. Sin costos ocultos, sin sorpresas.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg inline-flex">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full font-bold transition ${!isAnnual ? 'bg-brand-blue text-white' : 'text-gray-600 hover:text-brand-blue'}`}
              >
                Mensual
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full font-bold transition ${isAnnual ? 'bg-brand-blue text-white' : 'text-gray-600 hover:text-brand-blue'}`}
              >
                Anual <span className="text-green-600 text-sm ml-1">(Ahorra 20%)</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {/* Plan Gratis */}
            <div
              onClick={() => setSelectedPlan('Gratis')}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer relative ${selectedPlan === 'Gratis' ? 'ring-4 ring-brand-blue scale-105' : ''}`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratis</h3>
                <p className="text-gray-600 text-sm font-lato">Para empezar</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-brand-blue mb-2">$0</div>
                <p className="text-gray-500 text-sm font-lato">Por siempre</p>
              </div>
              <ul className="space-y-3 mb-8 font-lato">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Hasta 50 testimonios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">1 usuario</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Almacenamiento 1GB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Widget básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-gray-300 mt-0.5" />
                  <span className="text-gray-400">Sin API</span>
                </li>
              </ul>
              <Link href="#"
                className="block w-full bg-gray-200 text-gray-700 text-center px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition font-lato">
                Empezar Gratis
              </Link>
            </div>

            {/* Plan Básico */}
            <div
              onClick={() => setSelectedPlan('Básico')}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative cursor-pointer ${selectedPlan === 'Básico' ? 'ring-4 ring-brand-blue scale-105 border-transparent' : 'border-2 border-brand-light'}`}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-light text-white text-xs font-bold px-3 py-1 rounded-full">
                MÁS POPULAR
              </div>
              <div className="text-center mb-6 mt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                <p className="text-gray-600 text-sm font-lato">Para instituciones pequeñas</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-brand-blue mb-2">
                  {isAnnual ? '$39' : '$49'}
                </div>
                <p className="text-gray-500 text-sm font-lato">Por mes</p>
              </div>
              <ul className="space-y-3 mb-8 font-lato">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Hasta 500 testimonios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">3 usuarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Almacenamiento 10GB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Widgets personalizables</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">API REST completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Analytics básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Soporte por email</span>
                </li>
              </ul>
              <Link href="#"
                className="block w-full bg-brand-light text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition font-lato">
                Comenzar Ahora
              </Link>
            </div>

            {/* Plan Pro */}
            <div
              onClick={() => setSelectedPlan('Pro')}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer relative ${selectedPlan === 'Pro' ? 'ring-4 ring-brand-blue scale-105' : ''}`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600 text-sm font-lato">Para instituciones medianas</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-brand-blue mb-2">
                  {isAnnual ? '$119' : '$149'}
                </div>
                <p className="text-gray-500 text-sm font-lato">Por mes</p>
              </div>
              <ul className="space-y-3 mb-8 font-lato">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Hasta 2,000 testimonios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">10 usuarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Almacenamiento 50GB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Widgets ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">API avanzada</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Analytics avanzado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Soporte prioritario</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Marca personalizada</span>
                </li>
              </ul>
              <Link href="#"
                className="block w-full bg-brand-blue text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-blue-900 transition font-lato">
                Comenzar Ahora
              </Link>
            </div>

            {/* Plan Enterprise */}
            <div
              onClick={() => setSelectedPlan('Empresa')}
              className={`bg-linear-to-br from-brand-blue to-blue-900 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-white relative cursor-pointer ${selectedPlan === 'Empresa' ? 'ring-4 ring-brand-yellow scale-105' : ''}`}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-brand-blue text-xs font-bold px-3 py-1 rounded-full">
                ENTERPRISE
              </div>
              <div className="text-center mb-6 mt-2">
                <h3 className="text-2xl font-bold mb-2">Empresa</h3>
                <p className="text-blue-200 text-sm font-lato">Para grandes instituciones</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-black mb-2">Custom</div>
                <p className="text-blue-200 text-sm font-lato">Contacta ventas</p>
              </div>
              <ul className="space-y-3 mb-8 font-lato">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Testimonios ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Usuarios ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Almacenamiento ilimitado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Infraestructura dedicada</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>SLA 99.9%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Soporte 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Account manager dedicado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-0.5" />
                  <span>Desarrollo personalizado</span>
                </li>
              </ul>
              <Link href="/contact"
                className="block w-full bg-brand-yellow text-brand-blue text-center px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition font-lato">
                Contactar Ventas
              </Link>
            </div>
          </div>

          {/* Tabla Comparativa */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Comparación de Planes</h2>
            <div className="overflow-x-auto">
              <table className="w-full font-lato">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Característica</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Gratis</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Básico</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Pro</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Empresa</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Testimonios</td>
                    <td className="text-center py-4 px-4">50</td>
                    <td className="text-center py-4 px-4">500</td>
                    <td className="text-center py-4 px-4">2,000</td>
                    <td className="text-center py-4 px-4">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Usuarios</td>
                    <td className="text-center py-4 px-4">1</td>
                    <td className="text-center py-4 px-4">3</td>
                    <td className="text-center py-4 px-4">10</td>
                    <td className="text-center py-4 px-4">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Almacenamiento</td>
                    <td className="text-center py-4 px-4">1GB</td>
                    <td className="text-center py-4 px-4">10GB</td>
                    <td className="text-center py-4 px-4">50GB</td>
                    <td className="text-center py-4 px-4">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">API REST</td>
                    <td className="text-center py-4 px-4"><X className="inline w-4 h-4 text-red-500" /></td>
                    <td className="text-center py-4 px-4"><Check className="inline w-4 h-4 text-green-500" /></td>
                    <td className="text-center py-4 px-4"><Check className="inline w-4 h-4 text-green-500" /></td>
                    <td className="text-center py-4 px-4"><Check className="inline w-4 h-4 text-green-500" /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Analytics</td>
                    <td className="text-center py-4 px-4"><X className="inline w-4 h-4 text-red-500" /></td>
                    <td className="text-center py-4 px-4">Básico</td>
                    <td className="text-center py-4 px-4">Avanzado</td>
                    <td className="text-center py-4 px-4">Completo</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Widgets</td>
                    <td className="text-center py-4 px-4">Básico</td>
                    <td className="text-center py-4 px-4">Personalizable</td>
                    <td className="text-center py-4 px-4">Ilimitado</td>
                    <td className="text-center py-4 px-4">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Soporte</td>
                    <td className="text-center py-4 px-4">Comunidad</td>
                    <td className="text-center py-4 px-4">Email</td>
                    <td className="text-center py-4 px-4">Prioritario</td>
                    <td className="text-center py-4 px-4">24/7 Dedicado</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">SLA</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">99%</td>
                    <td className="text-center py-4 px-4">99.5%</td>
                    <td className="text-center py-4 px-4">99.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">¿Necesitas ayuda para elegir?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-lato">
              Nuestro equipo está listo para ayudarte a encontrar el plan perfecto para tu institución
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 transition font-lato">
                Hablar con Ventas
              </Link>
              <Link href="/#demo"
                className="border-2 border-brand-blue text-brand-blue px-8 py-4 rounded-lg font-bold hover:bg-brand-blue hover:text-white transition font-lato">
                Solicitar Demo
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}