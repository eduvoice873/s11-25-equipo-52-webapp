import prisma from "@/lib/db";
import { TestimonialUpdateDto } from "./dto/testimonial";

export class TestimonialService {

    async getAllTestimonials() {
        return await prisma.testimonio.findMany();
    }

    async getTestimonialById(id: string) {
        return await prisma.testimonio.findUnique({ where: { id } });
    }

    async getTestimonialsByCategoriaId(categoriaId: string) {
        return await prisma.testimonio.findMany({ where: { categoriaId } });
    }

    async getTestimonialsByPersonaId(personaId: string) {
        return await prisma.testimonio.findMany({ where: { personaId } });
    }

    async updateTestimonial(id: string, data: TestimonialUpdateDto) {
        return await prisma.testimonio.update({ where: { id }, data });
    }

    async deleteTestimonial(id: string) {
        return await prisma.testimonio.delete({ where: { id } });
    }
};