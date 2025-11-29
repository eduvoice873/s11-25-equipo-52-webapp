"use client";

import { Star, Play, Heart } from "lucide-react";

export interface Autor {
  nombre: string;
  cargo: string;
  avatar: string;
}

export interface Testimonial {
  id: number;
  tipo: 'texto' | 'video' | 'imagen';
  autor: Autor;
  contenido: string;
  estrellas: number;
  fecha: string;
  destacado?: string;
  likes?: number;
}

export interface VoicesHubProps {
  testimonials: Testimonial[];
}

export function TarjetaTestimonio({ t }: { t: Testimonial }) {
  return (
    <div
      className={`
        group rounded-2xl p-5 border border-gray-200 shadow-md
        bg-white transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg relative flex flex-col justify-between
        ${t.tipo === "video" ? "row-span-2" : ""}
        ${t.tipo === "imagen" ? "aspect-square" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={t.autor.avatar}
          className="w-10 h-10 rounded-full object-cover"
          alt={t.autor.nombre}
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-xs truncate">{t.autor.nombre}</p>
          {t.autor.cargo && (
            <span className="text-xs text-gray-500 truncate block">{t.autor.cargo}</span>
          )}
        </div>
      </div>

      {/* Estrellas */}
      <div className="flex gap-1 mb-2">
        {[...Array(t.estrellas)].map((_, j) => (
          <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Contenido */}
      <p className="text-gray-700 text-xs mb-3 flex-1 line-clamp-3">
        {t.contenido}
      </p>

      {/* Video */}
      {t.tipo === "video" && (
        <div className="relative mt-3 aspect-video rounded-xl bg-blue-100 flex items-center justify-center overflow-hidden group-hover:bg-blue-200 transition">
          <button className="bg-white text-blue-600 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition">
            <Play className="w-5 h-5 fill-current" />
          </button>
        </div>
      )}

      {/* Imagen o Destacado */}
      {t.tipo === "imagen" && (
        <div className="flex items-center justify-center text-center text-white font-black text-lg bg-linear-to-br from-blue-600 to-blue-700 rounded-xl p-4 h-full shadow-inner">
          {t.destacado}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-400">{t.fecha}</span>
        {t.likes && (
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-500 fill-red-500" /> {t.likes}
          </span>
        )}
      </div>
    </div>
  );
}

export default function WallOfLove({ testimonials }: VoicesHubProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
      {testimonials.map((t) => (
        <TarjetaTestimonio key={t.id} t={t} />
      ))}
    </div>
  );
}
