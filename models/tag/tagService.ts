import prisma from "@/lib/db";
import { TagCreateDTO, TagUpdateDTO } from "./dto/tag";

export class TagService {
  async createTag(data: TagCreateDTO) {
    return await prisma.etiqueta.create({ data });
  }

  async getAllTags() {
    return await prisma.etiqueta.findMany({
      include: {
        _count: {
          select: { testimonios: true },
        },
      },
    });
  }

  async getTagById(id: string) {
    return await prisma.etiqueta.findUnique({ where: { id } });
  }

  async getTagsByOrganizacionId(organizacionId: string) {
    return await prisma.etiqueta.findMany({
      where: { organizacionId },
      include: {
        _count: {
          select: { testimonios: true },
        },
      },
    });
  }

  async updateTag(id: string, data: TagUpdateDTO) {
    return await prisma.etiqueta.update({
      where: { id },
      data,
    });
  }

  async deleteTag(id: string) {
    return await prisma.etiqueta.delete({ where: { id } });
  }
}
