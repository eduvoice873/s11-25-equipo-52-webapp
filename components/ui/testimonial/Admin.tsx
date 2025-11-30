//components/ui/testimonial/TestimonialAdmin.tsx
// 2 variantes: mini / full

//import { Card } from "../card"
import { RatingStars } from "./ratingStars"
import { theme } from "../theme"
import { Heart, Share2 } from "lucide-react";

export type TestimonialStatus =
| "borrador" 
| "aprobado" 
| "rechazado" 
| "archivado" 
| "publicado" 
| "en_revision";

export interface AdminTestimonialProps {
  person: {
    nombreCompleto: string
    correo: string
    role?: string
  };
  testimonial: {
    titulo?: string
    texto: string
    estado: TestimonialStatus
    media?: {
      type: "image" | "video";
      previewUrl: string;
    };
    destacado: boolean
    calificacion?: number
    date: string
    tags?: string[]
    history?: {
      user: string
      message: string
      notes?: string
      time: string
    }[]
  }
  variant?: "mini" | "full"
  className?: string
  onClick?: () => void
  isActive?: boolean
}

const statusStyles: Record<TestimonialStatus, { border: string; text: string; label: string }> = {
  borrador: {
    border: theme.colors.mediumgray,
    text: theme.colors.mediumgray,
    label: "Borrador",
  },
  aprobado: {
    border: theme.colors.green,
    text: theme.colors.green,
    label: "Aprobado",
  },
  rechazado: {
    border: theme.colors.red,
    text: theme.colors.red,
    label: "Rechazado",
  },
  archivado: {
    border: theme.colors.darkgray,
    text: theme.colors.darkgray,
    label: "Archivado",
  },
  publicado: {
    border: theme.colors.lightBlue,
    text: theme.colors.lightBlue,
    label: "Publicado",
  },
  en_revision: {
    border: theme.colors.yellow,
    text: theme.colors.yellow,
    label: "En revisión",
  },
};


export function AdminTestimonial({
  person: {
    nombreCompleto,
    role,
    correo, 
  },
  testimonial: {
    titulo,
    texto,
    estado = "borrador",
    media,
    destacado = false,
    calificacion = 0,
    date,
    tags,
    history = []
  },
  variant = "mini",
  className = "",
  onClick,
  isActive = false
}: AdminTestimonialProps) {
  if (variant === "mini") {
    return (
      <div onClick={onClick} className={`shadow-md rounded-xl p-4 border border-gray-200 bg-white
      cursor-pointer hover:scale-[1.02]
      ${isActive ? "border-blue-600 ring-2 ring-blue-300" : "border-gray-200"}
       ${className}`}>
        <div className="flex justify-between items-center mb-3">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs justify-center">
              {tags.map((tag) => (
                <span key={tag} style={{
                  borderColor: theme.colors.lightBlue,
                  color: theme.colors.lightBlue,
                }} className="px-2 py-1 border rounded-lg">
                  {tag}
                </span>
              ))}
              <button
                className="px-2 py-1 border rounded-lg text-xs"
                style={{
                  borderColor: statusStyles[estado].border,
                  color: statusStyles[estado].text,
                }}>
                {statusStyles[estado].label}
              </button>
            </div>
          )}
          {destacado === true && (
            <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
          )}
        </div>

        {media && (
          <div className="mb-3">
            {media.type === "image" && (
              <img
                src={media.previewUrl}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg"
              />
            )}

            {media.type === "video" && (
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                🎬 Video
              </div>
            )}
          </div>
        )}

        <p className="text-sm line-clamp-3 mb-3 font-semibold">{titulo}</p>
        <p className="text-sm line-clamp-3 mb-3">{texto}</p>

        <div className="flex justify-between items-center">
          <div style={{ color: theme.colors.lightBlue }}>
            <p className="font-semibold text-sm">{nombreCompleto}</p>
            {role && <p className="text-xs">{role}</p>}
            {correo && <p className="text-xs">{correo}</p>}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-left">
            <RatingStars rating={calificacion} className="mt-2"></RatingStars>
          </div>
          <div className="text-right">
            <p style={{ color: theme.colors.lightBlue }} className="text-xs">{date}</p>
          </div>
        </div>
      </div>
    );

  }

  return (
    <div className={`shadow-md rounded-xl p-4 border border-gray-200 bg-white ${className}`}>
      <div className="flex justify-between mb-4">
        <div style={{ color: theme.colors.lightBlue }}>
          <p className="font-bold">{nombreCompleto}</p>
          {role && <p className="text-sm">{role}</p>}
          {correo && <p className="text-sm">{correo}</p>}
        </div>

        <div className="text-right">

          <button
            className="px-2 py-1 border rounded-lg text-xs"
            style={{
              borderColor: statusStyles[estado].border,
              color: statusStyles[estado].text,
            }}>
            {statusStyles[estado].label}
          </button>

          <p style={{ color: theme.colors.lightBlue }} className="text-xs mt-1">{date}</p>

        </div>

      </div>



      <div className="flex gap-4 mb-4">

        <div className="flex-1">
          <RatingStars rating={calificacion} className="mb-2"></RatingStars>
          <p className="font-semibold">{titulo}</p>
          <p>{texto}</p>
        </div>

        {media && (
          <div className="w-1/3">
            {media.type === "image" && (
              <img
                src={media.previewUrl}
                className="w-full h-32 object-cover rounded"
              />
            )}
            {media.type === "video" && (
              <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-600">
                🎬 Video
              </div>
            )}
          </div>
        )}
      </div>


      {
        tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {tags.map(tag => (
              <span key={tag} style={{
                borderColor: theme.colors.lightBlue,
                color: theme.colors.lightBlue,
              }} className="px-2 py-1 border rounded-lg">
                {tag}
              </span>
            ))}
            <button id="btn-addtag" style={{ color: theme.colors.lightBlue }} className="text-xs" >
              + Añadir etiqueta
            </button>
          </div>
        )
      }


      <div className="flex gap-2 mb-4 justify-between">
        <button id="aprobar" style={{
          borderColor: theme.colors.green,
          color: theme.colors.green,
        }} className="text-xs border px-2 py-1 rounded">Aprobar</button>
        <button id="rechazar" style={{
          borderColor: theme.colors.red,
          color: theme.colors.red,
        }} className="text-xs border px-2 py-1 rounded">Rechazar</button>
        <button id="archivar" style={{
          borderColor: theme.colors.darkgray,
          color: theme.colors.darkgray,
        }} className="text-xs border px-2 py-1 rounded">Archivar</button>
        <button id="spam" style={{
          borderColor: theme.colors.orange,
          color: theme.colors.orange,
        }} className="text-xs border px-2 py-1 rounded">Spam</button>
        <button id="compartir" style={{
          borderColor: theme.colors.lightBlue,
          color: theme.colors.lightBlue,
        }} className="text-xs border px-2 py-1 rounded flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          Compartir
        </button>

        <button id="destacar" style={{
          borderColor: theme.colors.lightBlue,
          color: theme.colors.lightBlue,
        }} className="text-xs border px-2 py-1 rounded flex items-center gap-1">
          <Heart className="w-4 h-4" />
          Destacar
        </button>

      </div>


      <h3 className="font-semibold mb-2 border-b">Historial de revisiones</h3>
      {
        history.length === 0 && (
          <p className="text-xs text-gray-500">Sin cambios registrados</p>
        )
      }

      {
        history.map((item, i) => (
          <div key={i} className="text-sm mb-2 border-b pb-1">
            <strong>{item.user}</strong> {item.message}
            {item.notes && <p className="text-xs">Nota: {item.notes}</p>}
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        ))
      }
    </div >


  )
}
