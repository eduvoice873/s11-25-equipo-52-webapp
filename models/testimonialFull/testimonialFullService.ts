import prisma from "@/lib/db";
import { TestimonialFullCreateDto, TestimonialFullUpdateDto } from "./dto/testimonialFull";
import { Medio } from "@/app/generated/prisma";

export class TestimonialFullService {
    async createTestimonialFull(data: TestimonialFullCreateDto, organizacionId: string) {
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
                }
            });

            const testimonial = await tx.testimonio.create({
                data: {
                    ...data.testimonial,
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
                        testimonioId: testimonial.id
                    }
                });
            }

            return { person, testimonial, medio };
        });
    };

    async updateTestimonialFull(id: string, data: TestimonialFullUpdateDto, organizacionId: string) {
        return await prisma.$transaction(async (tx) => {
            const testimonialExisting = await tx.testimonio.findUnique({
                where: { id },
            });
            if (!testimonialExisting) throw new Error("Testimonial not found");

            const person = await tx.persona.update({
                where: { id: testimonialExisting.personaId },
                data: {
                    nombreCompleto: data.person.nombreCompleto,
                    correo: data.person.correo,
                    fotoUrl: data.person.fotoUrl ?? undefined,
                },
            });

            const testimonial = await tx.testimonio.update({
                where: { id },
                data: {
                    ...data.testimonial,
                    personaId: person.id,
                },
            });

            const medioExisting = await tx.medio.findFirst({ where: { testimonioId: id } });

            let medio: Medio | null = null;

            if (data.medio === undefined) return { person, testimonial, medio: medioExisting };

            if (data.medio === null) {
                if (medioExisting) await tx.medio.delete({ where: { id: medioExisting.id } });

                return { person, testimonial, medio: null };
            }

            if (medioExisting) {
                medio = await tx.medio.update({
                    where: { id: medioExisting.id },
                    data: {
                        tipo: data.medio.tipo ?? undefined,
                        url: data.medio.url ?? undefined,
                        ancho: data.medio.ancho ?? undefined,
                        alto: data.medio.alto ?? undefined,
                        duracionSegundos: data.medio.duracionSegundos ?? undefined,
                        leyenda: data.medio.leyenda ?? undefined,
                    }
                });
            } else {
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
                        leyenda: data.medio.leyenda ?? null
                    }
                });
            }

            return { person, testimonial, medio };
        });
    };
};