// app\gestionTestimonio\testimonial_render.tsx
import { useState } from "react";
import { AdminTestimonial, AdminTestimonialProps } from "@/components/ui/testimonial/Admin";
import { X } from "lucide-react";

export function TestimonialRender_admin({ testimonials }) {
  const [selected, setSelected] = useState<AdminTestimonialProps | null>(null)

  {/* INICIO TESTIMONIOS EN PANTALLA COMPLETA */ }
  if (!selected) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {testimonials.map((item, i) => (
          <AdminTestimonial
            key={i}
            person={item.person}
            testimonial={item.testimonial}
            variant="mini"
            onClick={() => setSelected(item)}
          />
        ))}
      </div>
    )
  }
  {/* EDITOR & TESTIMONIOS EN UNA COLUMNA */ }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen relative">

      {/* Columna izquierda: mini con scroll */}
      <div className="col-span-1 overflow-y-auto space-y-4 p-4">
        {testimonials.map((item, i) => (
          <AdminTestimonial
            key={i}
            person={item.person}
            testimonial={item.testimonial}
            variant="mini"
            onClick={() => setSelected(item)}
            isActive={item.person.correo === selected.person.correo}
          />
        ))}
      </div>

      {/* Botón cerrar */}
      <button
        onClick={() => setSelected(null)}
        className="absolute -top-1 -right-1 z-50">
        <X className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black"/>
      </button>


      {/* Columna derecha: full */}
      <div className="col-span-2 flex justify-center items-start p-6">
        <div className="max-w-3xl w-full">
          <AdminTestimonial
            person={selected.person}
            testimonial={selected.testimonial}
            variant="full"
          />
        </div>
      </div>

    </div>
  );
}