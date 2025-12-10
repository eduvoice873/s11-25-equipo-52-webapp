import prisma from "@/lib/db";
import {
  TestimonialFullCreateDto,
  TestimonialFullUpdateDto,
} from "./dto/testimonialFull";
import { Medio } from "@/app/generated/prisma";

export class TestimonialFullService {
  async createTestimonialFull(
    data: TestimonialFullCreateDto,
    organizacionId: string
  ) {
    return await prisma.$transaction(async (tx) => {
      const person = await tx.persona.upsert({
        where: { correo: data.person.correo },
        update: {
          nombreCompleto: data.person.nombreCompleto,
          fotoUrl: data.person.fotoUrl ?? undefined,
        },
        create: {
          nombreCompleto: data.person.nombreCompleto,
          correo: data.person.correo,
          fotoUrl: data.person.fotoUrl ?? undefined,
        },
      });

      const testimonial = await tx.testimonio.create({
        data: {
          ...data.testimonial,
          titulo: data.testimonial.titulo || "",
          personaId: person.id,
        },
      });

      // ✅ Define el tipo correctamente
      let medio: Awaited<ReturnType<typeof tx.medio.create>> | null = null;

      if (data.medio) {
        medio = await tx.medio.create({
          data: {
            ...data.medio,
            organizacionId,
            testimonioId: testimonial.id,
          },
        });
      }

      return { person, testimonial, medio };
    });
  }

  async updateTestimonialFull(
    id: string,
    data: TestimonialFullUpdateDto | any,
    organizacionId: string
  ) {
    return await prisma.$transaction(async (tx) => {
      const testimonialExisting = await tx.testimonio.findUnique({
        where: { id },
      });
      if (!testimonialExisting) throw new Error("Testimonial not found");

      // Actualizar persona solo si se proporciona
      let person = testimonialExisting.personaId
        ? await tx.persona.findUnique({
            where: { id: testimonialExisting.personaId },
          })
        : null;

      if (data.person) {
        person = await tx.persona.update({
          where: { id: testimonialExisting.personaId },
          data: {
            ...(data.person.nombreCompleto && {
              nombreCompleto: data.person.nombreCompleto,
            }),
            ...(data.person.correo && { correo: data.person.correo }),
            ...(data.person.fotoUrl !== undefined && {
              fotoUrl: data.person.fotoUrl,
            }),
          },
        });
      }

      // Actualizar testimonio con solo los campos proporcionados
      const testimonialUpdateData: any = {};
      if (data.testimonial) {
        if (data.testimonial.titulo !== undefined)
          testimonialUpdateData.titulo = data.testimonial.titulo;
        if (data.testimonial.texto !== undefined)
          testimonialUpdateData.texto = data.testimonial.texto;
        if (data.testimonial.modalidad !== undefined)
          testimonialUpdateData.modalidad = data.testimonial.modalidad;
        if (data.testimonial.estado !== undefined)
          testimonialUpdateData.estado = data.testimonial.estado;
        if (data.testimonial.destacado !== undefined)
          testimonialUpdateData.destacado = data.testimonial.destacado;
        if (data.testimonial.calificacion !== undefined)
          testimonialUpdateData.calificacion = data.testimonial.calificacion;
        if (data.testimonial.tags !== undefined)
          testimonialUpdateData.tags = data.testimonial.tags;
      }

      const testimonial = await tx.testimonio.update({
        where: { id },
        data: {
          ...testimonialUpdateData,
          ...(person && { personaId: person.id }),
        },
      });

      const medioExisting = await tx.medio.findFirst({
        where: { testimonioId: id },
      });
      let medio: any = null;

      if (data.medio === undefined) {
        return { person, testimonial, medio: medioExisting };
      }

      if (data.medio === null) {
        if (medioExisting)
          await tx.medio.delete({ where: { id: medioExisting.id } });
        return { person, testimonial, medio: null };
      }

      if (medioExisting) {
        medio = await tx.medio.update({
          where: { id: medioExisting.id },
          data: {
            ...(data.medio.tipo !== undefined && { tipo: data.medio.tipo }),
            ...(data.medio.url !== undefined && { url: data.medio.url }),
            ...(data.medio.ancho !== undefined && { ancho: data.medio.ancho }),
            ...(data.medio.alto !== undefined && { alto: data.medio.alto }),
            ...(data.medio.duracionSegundos !== undefined && {
              duracionSegundos: data.medio.duracionSegundos,
            }),
            ...(data.medio.leyenda !== undefined && {
              leyenda: data.medio.leyenda,
            }),
          },
        });
      } else if (data.medio) {
        medio = await tx.medio.create({
          data: {
            organizacionId,
            testimonioId: testimonial.id,
            tipo: data.medio.tipo!,
            url: data.medio.url!,
            ancho: data.medio.ancho ?? 0,
            alto: data.medio.alto ?? 0,
            duracionSegundos: data.medio.duracionSegundos,
            bytes: data.medio.bytes ?? null,
            leyenda: data.medio.leyenda ?? null,
          },
        });
      }

      return { person, testimonial, medio };
    });
  }
}
