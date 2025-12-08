import prisma from "@/lib/db";
import { OrganizationCreateDto, OrganizationUpdateDto } from './dto/organization';

export class OrganizationService {
    async createOrganization(data: OrganizationCreateDto) {
        return await prisma.organizacion.create({ data });
    }

    async getAllOrganizations() {
        return await prisma.organizacion.findMany();
    }

    async getOrganizationById(id: string) {
        return await prisma.organizacion.findUnique({ where: { id } });
    }

    async getOrganizationIdByUserId(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { organizacionId: true },
        });
        return user?.organizacionId || null;
    }

    async getOrganizationIdByCategoryId(categoriaId: string) {
        const category = await prisma.categoria.findUnique({
            where: { id: categoriaId },
            select: { organizacionId: true }
        });
        return category?.organizacionId || null;
    }

    async getOrganizationBySlug(slug: string) {
        return await prisma.organizacion.findUnique({ where: { slug } });
    }

    async updateOrganization(id: string, data: OrganizationUpdateDto) {
        return await prisma.organizacion.update({
            where: { id },
            data,
        });
    }

    async deleteOrganization(id: string) {
        return await prisma.organizacion.delete({ where: { id } });
    }
};