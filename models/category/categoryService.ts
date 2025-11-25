import prisma from "@/lib/db";
import { CategoryUpdateDto } from "./dto/category";

export class CategoryService {

    async getAllCategories() {
        return prisma.categoria.findMany();
    }

    async getCategoryById(id: string) {
        return prisma.categoria.findUnique({ where: { id } });
    }

    async getCategoryByCreadoPorId(creadoPorId: string) {
        return prisma.categoria.findMany({ where: { creadoPorId } });
    }

    async getCategoryByOrganizacionId(organizacionId: string) {
        return prisma.categoria.findMany({ where: { organizacionId } });
    }

    async updateCategory(id: string, data: CategoryUpdateDto) {
        return prisma.categoria.update({ where: { id }, data });
    }

    async deleteCategory(id: string) {
        return prisma.categoria.delete({ where: { id } });
    }
};