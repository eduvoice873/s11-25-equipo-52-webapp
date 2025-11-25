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