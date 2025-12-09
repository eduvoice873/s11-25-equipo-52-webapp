import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Star, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

const animations = `
  @keyframes bounce-rocket {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(5deg);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes float-delayed {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  .animate-bounce-rocket {
    animation: bounce-rocket 2s infinite;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 6s ease-in-out infinite 1s;
  }
`;

export default function Hero() {
  return (
    <>
      <style>{animations}</style>
      <section className="relative w-full bg-gray-50 pt-32 pb-24 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-10 -top-48 -left-48 bg-blue-600"></div>
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-10 -bottom-48 -right-48 bg-blue-400"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* COLUMNA IZQUIERDA - Contenido */}
            <div className="flex flex-col space-y-8">

              {/* Badge */}
              <div className="inline-flex self-start bg-blue-100 rounded-full px-4 py-2 font-semibold text-brand-blue items-center gap-2 shadow-sm font-lato">
                <Rocket className="w-4 h-4 text-orange-500 animate-bounce-rocket" />
                <span className="text-sm">Sistema CMS Especializado en Testimonios</span>
              </div>

              {/* Título principal */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold font-nunito text-gray-900 leading-tight">
                  Convierte los testimonios de tu comunidad en tu{" "}
                  <span className="text-brand-blue">
                    mejor estrategia de marketing
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed font-lato">
                  Gestiona, modera y publica testimonios en video, texto e imagen.
                  Todo centralizado en un único CMS, diseñado para instituciones y
                  empresas EdTech.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-brand-blue hover:bg-brand-light text-white font-nunito font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Empezar Gratis
                  </Button>
                </Link>
                <Link href="/#caracteristicas">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="hover:bg-brand-yellow text-white font-nunito font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Caracteristicas
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2,].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-md"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-brand-yellow border-2 border-white flex items-center justify-center text-xs font-semibold font-lato text-gray-600 shadow-md">
                    +50
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-sm font-lato text-gray-600">
                    <span className="font-semibold font-nunito text-gray-900">+200 instituciones</span> confían en nosotros
                  </p>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <Users className="w-5 h-5" />
                    <span className="text-2xl font-bold font-nunito">10K+</span>
                  </div>
                  <p className="text-sm font-lato text-gray-600">Usuarios activos</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold font-nunito">95%</span>
                  </div>
                  <p className="text-sm font-lato text-gray-600">Satisfacción</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Star className="w-5 h-5" />
                    <span className="text-2xl font-bold font-nunito">4.9</span>
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA - Imágenes */}
            <div className="relative lg:h-[600px]">
              {/* Imagen principal */}
              <div className="relative z-10 animate-float">
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                  <Image
                    src="/dashboard.jpg"
                    alt="Dashboard Preview"
                    width={600}
                    height={300}
                    className="rounded-xl"
                    priority
                  />
                </div>
                {/* Imagen secundaria flotante */}
                <div className="absolute -bottom-8 -left-8 z-20 animate-float-delayed hidden lg:block">
                  <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
                    <Image
                      src="/testimonio.jpg"
                      alt="Testimonial Card"
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>

                </div>

                {/* Badge flotante */}
                <div className="absolute -top-4 -right-4 z-20 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  En vivo
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
