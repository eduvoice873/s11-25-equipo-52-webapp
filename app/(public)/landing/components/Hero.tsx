import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket } from "lucide-react";

const rocketAnimation = `
  @keyframes bounce-rocket {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(5deg);
    }
  }

  .animate-bounce-rocket {
    animation: bounce-rocket 2s infinite;
  }

  @keyframes pulse-scale {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }

  .animate-pulse-scale {
    animation: pulse-scale 3s ease-in-out infinite;
  }

  .avatar-dot:nth-child(1) {
    animation-delay: 0s;
  }

  .avatar-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .avatar-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  .avatar-dot:nth-child(4) {
    animation-delay: 0.6s;
  }
`;

export default function Hero() {
  return (
    <>
      <style>{rocketAnimation}</style>
      <section className="w-full flex justify-center bg-gray-50 pt-40 pb-24">
        <div className="max-w-6xl w-full px-6 flex flex-col md:flex-row items-center justify-between gap-16">

          {/* COLUMNA IZQUIERDA */}
          <div className="flex-1 flex flex-col">

            {/* Badge */}
            <div className="inline-flex bg-brand-light/30 rounded-full px-4 py-1 font-semibold text-brand-blue items-center gap-2">
              <Rocket className="w-4 h-4 text-orange-500 animate-bounce-rocket" />
              Sistema CMS Especializado en Testimonios
            </div>

            {/* Título */}
            <h1 className="mt-6 text-5xl font-bold text-brand-blue leading-tight max-w-2xl">
              Conviérte en tu <br />
              Mejor Estrategia de <br />
              Marketing
            </h1>

            {/* Párrafo */}
            <p className="mt-4 text-lg text-gray-600 max-w-xl font-lato">
              Gestiona, modera y publica testimonios en video, texto e imagen.
              Todo centralizado en un único CMS, diseñado para instituciones y
              empresas EdTech.
            </p>

            {/* Botones */}
            <div className="flex gap-4 mt-8">
              <Link href="/signup">
                <Button variant="yellow" size="lg" className="font-bold">Empezar Gratis</Button>
              </Link>
              <Link href="/#caracteristicas">
                <Button variant="outline" size="lg" className="font-bold">Ver Características</Button>
              </Link>
            </div>

            {/* Métricas mini */}
            <div className="flex items-center gap-3 mt-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="avatar-dot w-6 h-6 bg-brand-light rounded-full -ml-1 animate-pulse-scale"></div>
                <div className="avatar-dot w-6 h-6 bg-brand-blue rounded-full -ml-1 animate-pulse-scale"></div>
                <div className="avatar-dot w-6 h-6 bg-brand-yellow rounded-full -ml-1 animate-pulse-scale"></div>
                <div className="avatar-dot w-6 h-6 bg-gray-400 rounded-full -ml-1 animate-pulse-scale"></div>
              </div>
              <div className=" flex gap-2">
                <span className="font-semibold">Confiado por</span>
                <span className="text-brand-blue font-semibold">+200 instituciones</span>
              </div>
            </div>
          </div>


          {/* COLUMNA DERECHA: FIGURAS DEL HERO */}
          <div className="w-full flex justify-center md:w-1/2">
            <div className="relative">
              {/* Blobs de fondo */}
              <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 -top-8 -left-8 bg-brand-yellow animate-pulse"></div>
              <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 -bottom-8 -right-8 bg-brand-light animate-pulse animation-delay-1s"></div>

              {/* Mockup Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 animate-float w-72 mx-auto border border-gray-100">
                <div className="flex flex-col gap-5">
                  {/* Mockup Item (Header) */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-light rounded-full"></div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-gray-200 rounded-full h-2.5 w-12"></div>
                      <div className="bg-gray-100 rounded-full h-2 w-8"></div>
                    </div>
                  </div>

                  {/* Mockup Video Placeholder */}
                  <div className="bg-gray-900 rounded-xl h-48 flex items-center justify-center shadow-inner">
                    <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Mockup Actions */}
                  <div className="h-12 rounded-lg w-full bg-brand-blue shadow-md"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
