import Link from 'next/link';
import { BarChart3, GraduationCap, Lock, Rocket, Laptop, Palette } from 'lucide-react';
import HeaderLanding from "@/app/(public)/landing/components/Header";
import Footer from "@/app/(public)/landing/components/Footer";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-brand-blue mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato">
              Noticias, guías y mejores prácticas sobre gestión de testimonios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-lato">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white">
                <BarChart3 className="w-16 h-16" />
              </div>
              <div className="p-6">
                <div className="text-sm text-brand-light font-semibold mb-2">15 Nov 2024</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cómo aumentar conversiones con testimonios en
                  video</h3>
                <p className="text-gray-600 mb-4">
                  Los testimonios en video generan 45% más conversiones que el texto. Descubre cómo
                  optimizarlos.
                </p>
                <Link href="#" className="text-brand-blue font-bold hover:text-brand-light transition">Leer más →</Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center text-white">
                <GraduationCap className="w-16 h-16" />
              </div>
              <div className="p-6">
                <div className="text-sm text-brand-light font-semibold mb-2">10 Nov 2024</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Casos de éxito: Universidad aumenta matrículas
                  35%</h3>
                <p className="text-gray-600 mb-4">
                  Conoce cómo la Universidad XYZ usó EduVoice CMS para mostrar testimonios segmentados.
                </p>
                <Link href="#" className="text-brand-blue font-bold hover:text-brand-light transition">Leer más →</Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white">
                <Lock className="w-16 h-16" />
              </div>
              <div className="p-6">
                <div className="text-sm text-brand-light font-semibold mb-2">5 Nov 2024</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Guía completa de moderación de testimonios
                </h3>
                <p className="text-gray-600 mb-4">
                  Aprende a crear un workflow de moderación efectivo para mantener la calidad del contenido.
                </p>
                <Link href="#" className="text-brand-blue font-bold hover:text-brand-light transition">Leer más →</Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 bg-linear-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white">
                <Rocket className="w-16 h-16" />
              </div>
              <div className="p-6">
                <div className="text-sm text-brand-light font-semibold mb-2">1 Nov 2024</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nuevas funciones: Analytics de engagement</h3>
                <p className="text-gray-600 mb-4">
                  Ahora puedes medir el impacto de tus testimonios con métricas en tiempo real.
                </p>
                <Link href="#" className="text-brand-blue font-bold hover:text-brand-light transition">Leer más →</Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center text-white">
                <Laptop className="w-16 h-16" />
              </div>
              <div className="p-6">
                <div className="text-sm text-brand-light font-semibold mb-2">28 Oct 2024</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Integración API: Tutorial paso a paso</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a integrar testimonios en tu LMS o sitio web usando nuestra API REST.
                </p>
                <Link href="#" className="text-brand-blue font-bold hover:text-brand-light transition">Leer más →</Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white">
                <Palette className="w-16 h-16" />
              </div>
              <div className="p-6">
                <div className="text-sm text-brand-light font-semibold mb-2">20 Oct 2024</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Diseño de widgets: Mejores prácticas</h3>
                <p className="text-gray-600 mb-4">
                  Personaliza tus widgets para que se integren perfectamente con el diseño de tu sitio.
                </p>
                <Link href="#" className="text-brand-blue font-bold hover:text-brand-light transition">Leer más →</Link>
              </div>
            </article>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-brand-blue/5 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Suscríbete a nuestro newsletter</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-lato">
                Recibe las últimas noticias, guías y casos de éxito directamente en tu email
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center">
                <div className="w-full sm:flex-1">
                  <Input type="email" placeholder="tu@email.com" />
                </div>
                <Button variant="primary" size="lg" className="">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}