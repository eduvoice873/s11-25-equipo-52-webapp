import prisma from "@/lib/db";
import { CategoryUpdateDto } from "./dto/category";

export class CategoryService {
    async getAllCategories() {
        return await prisma.categoria.findMany();
    }

    async getCategoryById(id: string) {
        return await prisma.categoria.findUnique({ where: { id }, include: { testimonios: true } });
    }

    async getCategoryByCreadoPorId(creadoPorId: string) {
        return await prisma.categoria.findMany({ where: { creadoPorId } });
    }

    async getCategoryByOrganizacionId(organizacionId: string) {
        return await prisma.categoria.findMany({ where: { organizacionId } });
    }

    async updateCategory(id: string, data: CategoryUpdateDto) {
        return await prisma.categoria.update({ where: { id }, data });
    }

    async deleteCategory(id: string) {
        return await prisma.categoria.delete({ where: { id } });
    }
};