"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WallOfLove from "./WallofLove";
import { PREVIEW_TESTIMONIALS } from "./testimonials-data";

export default function WallOfLovePreview() {
  return (
    <section className="relative py-20 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wide px-3 py-1 rounded-full">
            Prueba Social
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
            Lo que dicen las instituciones sobre EduVoice
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-lg leading-relaxed">
            Testimonios reales de universidades, colegios, bootcamps y empresas que ya confían en EduVoice CMS
            para gestionar y potenciar su social proof.
          </p>
        </div>

        {/* WALL OF LOVE PREVIEW */}
        <div className="mt-12">
          <WallOfLove testimonials={PREVIEW_TESTIMONIALS} />
        </div>

        {/* CTA - VER COMPLETO */}
        <div className="text-center mt-16">
          <Link
            href="/wall-of-love"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:gap-3"
          >
            Ver Wall of Love Completo
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-gray-500 text-sm mt-6">
            Únete a más de <span className="font-bold text-gray-700">500 instituciones</span> que ya usan EduVoice CMS
          </p>
        </div>
      </div>
    </section>
  );
}
