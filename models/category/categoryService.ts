import prisma from "@/lib/db";
import { CategoryUpdateDto, CategoryCreateDto } from "./dto/category";

export class CategoryService {
  async getAllCategories() {
    return await prisma.categoria.findMany({
      include: {
        _count: {
          select: {
            testimonios: true,
          },
        },
      },
    });
  }

  async getCategoryById(id: string) {
    return await prisma.categoria.findUnique({
      where: { id },
      include: {
        testimonios: {
          include: {
            persona: {
              select: {
                id: true,
                nombreCompleto: true,
              },
            },
          },
        },
        formularios: {
          include: {
            respuestas: {
              orderBy: { creadoEn: "desc" },
              include: {
                persona: {
                  select: {
                    id: true,
                    nombreCompleto: true,
                    correo: true,
                    fotoUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getCategoryByCreadoPorId(creadoPorId: string) {
    return await prisma.categoria.findMany({ where: { creadoPorId } });
  }

  async getCategoryByOrganizacionId(organizacionId: string) {
    return await prisma.categoria.findMany({ where: { organizacionId } });
  }

  async createCategory(
    data: CategoryCreateDto,
    creadoPorId: string,
    organizacionId: string
  ) {
    return await prisma.categoria.create({
      data: {
        ...data,
        creadoPorId,
        organizacionId,
      },
    });
  }

  async updateCategory(id: string, data: CategoryUpdateDto) {
    return await prisma.categoria.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return await prisma.categoria.delete({ where: { id } });
  }
}
