// components/testimonial_render.tsx
import { TestimonialVisitor } from "@/components/ui/testimonial/Visitor";

export function TestimonialRender({ testimonials }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
      {testimonials.map((item, i) => (
        <TestimonialVisitor
          key={i}
          person={item.person}
          testimonial={item.testimonial}
        />
      ))}
    </div>
  );
}

/*
Estructura de la base de datos para testimonio:
{
    "person": {
        "nombreCompleto": "Martin Perez",
        "correo": "martin@gmail.com",
        "fotoUrl": "image.png"
    },
    "testimonial": {
        "categoriaId": "0834877a-8464-48cd-8da3-a9f0e875800a",
        "titulo": "Respuesta a la página web",
        "texto": "Estuvo muy malo, y el rendimiento está muy lento",
        "modalidad": "texto_imagen",
        "estado": "borrador",
        "destacado": false,
        "calificacion": 2
    }
}*/