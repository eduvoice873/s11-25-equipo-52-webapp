"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VoicesHub from "./VoicesHub";
import { PREVIEW_TESTIMONIALS } from "./data";

export default function VoicesHubPreview() {
  return (
    <section className="relative py-20 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 font-bold text-2xl uppercase tracking-wide px-3 py-1 rounded-full font-nunito">
            Prueba Social
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 font-nunito">
            Lo que dicen las instituciones sobre EduVoice
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-lg leading-relaxed font-lato">
            Testimonios reales de universidades, colegios, bootcamps y empresas que ya confían en EduVoice CMS
            para gestionar y potenciar su social proof.
          </p>
        </div>

        {/* Voices HubPREVIEW */}
        <div className="mt-12">
          <VoicesHub testimonials={PREVIEW_TESTIMONIALS} />
        </div>

        {/* CTA - VER COMPLETO */}
        <div className="text-center mt-16">
          <Link
            href="/voices-hub"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:gap-3 font-nunito"
          >
            Ver Voices Hub Completo
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-gray-500 text-sm mt-6 font-lato">
            Únete a más de <span className="font-bold text-gray-700">+500 instituciones</span> que ya usan EduVoice CMS
          </p>
        </div>
      </div>
    </section>
  );
}
