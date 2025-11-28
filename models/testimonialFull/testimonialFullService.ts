import prisma from "@/lib/db";
import { TestimonialFullCreateDto, TestimonialFullUpdateDto } from "./dto/testimonialFull";

export class CreateTestimonialFullService {
    async createTestimonialFull(data: TestimonialFullCreateDto) {
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

            return { person, testimonial };
        });
    };

    async updateTestimonialFull(id: string, data: TestimonialFullUpdateDto) {
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

            return { person, testimonial };
        });
    };
};