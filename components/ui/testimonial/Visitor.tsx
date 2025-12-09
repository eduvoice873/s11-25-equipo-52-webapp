//components/ui/testimonial/TestimonialVisitor.tsx

import { theme } from "../theme";
import { RatingStars } from "./ratingStars";
import { Heart } from "lucide-react";


interface TestimonialVisitorProps {
  person: {
    nombreCompleto: string;
    role?: string;
  },
  testimonial: {
    titulo?: string
    texto: string
    media?: {
      type: "image" | "video";
      previewUrl: string;
    };
    destacado: boolean
    calificacion?: number
    date: string
    tags?: string[]
  }
  className?: string
}

export function TestimonialVisitor({
  person: {
    nombreCompleto,
    role,
  },
  testimonial: {
    titulo,
    texto,
    media,
    destacado = false,
    calificacion = 0,
    date,
    tags,
  },
  className = "",
}: TestimonialVisitorProps) {
  return (
    <div className={`shadow-md rounded-xl p-4 border border-gray-200 bg-white ${className}`}>

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

      <div className="flex justify-between items-center">
        <div className="text-left">
          <RatingStars rating={calificacion} className="mb-2"></RatingStars>
        </div>
        <div className="text-right">
          <p style={{ color: theme.colors.lightBlue }} className="text-xs">{date}</p>
        </div>
      </div>

      <p className="text-sm line-clamp-3 mb-3 font-semibold">{titulo}</p>
      <p className="text-sm line-clamp-3 mb-3">{texto}</p>

      <div className="flex justify-between items-center">
        <div style={{ color: theme.colors.lightBlue }}>
          <p className="font-semibold text-sm">{nombreCompleto}</p>
          {role && <p className="text-xs">{role}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
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
          </div>
        )}

        {destacado === true && (
          <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
        )}

      </div>

    </div>
  );
}
