import prisma from "@/lib/db";
import { MedioUpdateDto } from "./dto/medio";

export class MedioService {
    async getAllMedios() {
        return await prisma.medio.findMany();
    }

    async getMedioById(id: string) {
        return await prisma.medio.findUnique({ where: { id } });
    }

    async getMedioByTestimonioId(testimonioId: string) {
        return await prisma.medio.findMany({ where: { testimonioId } });
    }

    async getMedioByOrganizationId(organizacionId: string) {
        return await prisma.medio.findMany({ where: { organizacionId } });
    }

    async updateMedio(id: string, data: MedioUpdateDto) {
        return await prisma.medio.update({ where: { id }, data });
    }

    async deleteMedio(id: string) {
        return await prisma.medio.delete({ where: { id } });
    }
};