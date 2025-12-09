import { TestimonialVisitor } from '@/components/ui/testimonial/Visitor';
import { AdminTestimonial } from '@/components/ui/testimonial/Admin';
import { Button, Card, Input, AlertSimple, Typography } from "@/components/ui/design-system";

export default function StyleGuide() {
  return (
    <div className="p-10 space-y-12">
      <h1 className="text-3xl font-bold text-brand-blue">Design System</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tipografía </h2>
        <Typography />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Botones</h2>
        <div className="flex gap-4">
          <Button variant="primary" className={undefined} size={undefined}>
            Primary
          </Button>

          <Button variant="secondary" className={undefined} size={undefined}>
            Secondary
          </Button>
          <Button variant="outline" className={undefined} size={undefined}>
            Outline
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>
        <Input placeholder="Escribe algo..." />
        <Input state="error" placeholder="Error input" />
        <Input size="lg" placeholder="Grande" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>

        <Input placeholder="Default" />

        <Input variant="outline" placeholder="Outline" />

        <Input size="sm" placeholder="Pequeño" />
        <Input size="lg" placeholder="Grande" />

        <Input state="error" placeholder="Error input" />
        <Input state="success" placeholder="Success input" />

        <Input disabled placeholder="Deshabilitado" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alerts</h2>
        <AlertSimple variant="info" description="Este es un mensaje." />
        <AlertSimple variant="error" description="Algo salió mal." />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <Card title="Ejemplo Card">Contenido aquí.</Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Testimonial Card: Visualizacion para Visitante</h2>
        <TestimonialVisitor
          person={{
            nombreCompleto: 'Ana García',
            role: "Ingeniería de Software"
          }}
          testimonial={{
            titulo: "Respuesta a la página web",
            texto: 'Una experiencia transformadora que cambió mi carrera. Estoy agradecida por el apoyo que me han otorgado durante mi carrera.',
            media: {
              type: "image",
              previewUrl: "https://img.freepik.com/fotos-premium/mujer-feliz-su-dia-graduacion-universidad-educacion-personas-esta-bien-firmar_115086-260.jpg"
            },
            calificacion: 4,
            date: '22 de noviembre de 2025',
            destacado: true,
            tags: ["Evento", "Servicio"],
          }}>
        </TestimonialVisitor>

        <h2 className="text-2xl font-semibold">Testimonial Card: Previsualización para Admin</h2>
        <AdminTestimonial
          testimonial={{
            titulo: "Respuesta a la página web",
            texto: 'Una experiencia transformadora que cambió mi carrera. Estoy agradecida por el apoyo que me han otorgado durante mi carrera.',
            media: {
              type: "image",
              previewUrl: "https://img.freepik.com/fotos-premium/mujer-feliz-su-dia-graduacion-universidad-educacion-personas-esta-bien-firmar_115086-260.jpg"
            },
            calificacion: 4,
            estado: 'aprobado',
            date: '22 de noviembre de 2025',
            tags: ["Evento", "Servicio"],
            destacado: true
          }}
          person={{
            nombreCompleto: 'Ana García',
            role: "Ingeniería de Software",
            correo: "ana.garcia1@email.com"
          }}
          variant="mini">
        </AdminTestimonial>
        <h2 className="text-2xl font-semibold">Testimonial Card: Panel moderacion para Admin</h2>
        <AdminTestimonial
          testimonial={{
            titulo: "Respuesta a la página web",
            texto: 'Una experiencia transformadora que cambió mi carrera. Estoy agradecida por el apoyo que me han otorgado durante mi carrera.',
            media: {
              type: "image",
              previewUrl: "https://img.freepik.com/fotos-premium/mujer-feliz-su-dia-graduacion-universidad-educacion-personas-esta-bien-firmar_115086-260.jpg"
            },
            calificacion: 4,
            date: '22 de noviembre de 2025',
            tags: ["Evento", "Servicio"],
            estado: 'borrador',
            history: [{ user: 'Elena', message: "aprobó el testimonio", notes: "Tema relevante del evento", time: "2 hours ago" }, { user: 'Admin', message: "archivó el testimonio", time: "10 hours ago" }],
            destacado: true
          }}
          person={{
            nombreCompleto: 'Ana García',
            role: "Ingeniería de Software",
            correo: "ana.garcia1@email.com"
          }}
          variant="full">
        </AdminTestimonial>
      </section>

    </div>
  );
}