"use client";

import { Star, Play, Heart, Video, FileText, Sparkles } from "lucide-react";

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
  videoThumbnail?: string;
  videoDuration?: string;
}

export interface VoicesHubProps {
  testimonials: Testimonial[];
}

export function TarjetaTestimonio({ t }: { t: Testimonial }) {
  const tipoBadge = {
    video: { icon: Video, label: 'Video', color: 'bg-brand-blue text-white' },
    texto: { icon: FileText, label: 'Testimonio', color: 'bg-brand-light/20 text-brand-blue' },
    imagen: { icon: Sparkles, label: 'Destacado', color: 'bg-brand-yellow text-gray-900' }
  };

  const Badge = tipoBadge[t.tipo];
  const IconComponent = Badge.icon;

  return (
    <div
      className={`
        group rounded-2xl p-6 border-2 border-gray-200 shadow-md
        bg-white transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl hover:border-brand-light
        relative flex flex-col h-full
      `}
    >
      {/* Badge de tipo */}
      <div className="absolute top-4 right-4">
        <span className={`${Badge.color} text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 font-nunito`}>
          <IconComponent className="w-3 h-3" />
          {Badge.label}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={t.autor.avatar}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-blue/20"
          alt={`Avatar de ${t.autor.nombre}`}
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate font-nunito">{t.autor.nombre}</p>
          {t.autor.cargo && (
            <span className="text-xs text-gray-500 truncate block font-lato">{t.autor.cargo}</span>
          )}
        </div>
      </div>

      {/* Estrellas */}
      <div className="flex gap-1 mb-3">
        {[...Array(t.estrellas)].map((_, j) => (
          <Star key={j} className="w-4 h-4 text-brand-yellow fill-brand-yellow transition-transform hover:scale-125" />
        ))}
      </div>

      {/* Contenido */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1 line-clamp-4 font-lato">
        {t.contenido}
      </p>

      {/* Video */}
      {t.tipo === "video" && (
        <div className="relative mt-auto mb-4 aspect-video rounded-xl overflow-hidden bg-brand-blue shadow-lg">
          {/* Thumbnail */}
          {t.videoThumbnail && (
            <img
              src={t.videoThumbnail}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Play Button */}
          <button
            className="absolute inset-0 flex items-center justify-center group/play"
            aria-label="Reproducir video testimonial"
          >
            <div className="bg-white text-brand-blue shadow-2xl rounded-full w-16 h-16 flex items-center justify-center transform transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-brand-yellow">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          </button>

          {/* Duration badge */}
          {t.videoDuration && (
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded font-nunito">
              {t.videoDuration}
            </div>
          )}
        </div>
      )}

      {/* Imagen o Destacado */}
      {t.tipo === "imagen" && t.destacado && (
        <div className="mt-auto mb-4 flex items-center justify-center text-center text-white font-black text-lg bg-brand-blue rounded-xl p-6 shadow-xl font-nunito leading-tight">
          {t.destacado}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-auto">
        <span className="text-xs text-gray-400 font-lato">{t.fecha}</span>
        {t.likes && (
          <button
            className="text-xs text-gray-600 flex items-center gap-1 hover:text-red-500 transition-colors group/like"
            aria-label={`${t.likes} me gusta`}
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover/like:scale-125 transition-transform" />
            <span className="font-semibold font-nunito">{t.likes}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function VoicesHub({ testimonials }: VoicesHubProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <TarjetaTestimonio key={t.id} t={t} />
      ))}
    </div>
  );
}
