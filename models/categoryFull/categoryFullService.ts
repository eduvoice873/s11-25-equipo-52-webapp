import prisma from "@/lib/db";
import { CategoryFullCreateDto, CategoryFullUpdateDto } from "./dto/categoryFull";

export class CategoryFullService {
    async createCategoryFull(data: CategoryFullCreateDto, creadoPorId: string, organizacionId: string) {
        return await prisma.$transaction(async (tx) => {
            const category = await tx.categoria.create({
                data: {
                    ...data.category,
                    creadoPorId,
                    organizacionId,
                }
            });

            const question = await Promise.all(
                data.questions.map((question) => {
                    return tx.pregunta.create({
                        data: {
                            ...question,
                            categoriaId: category.id,
                        }
                    });
                })
            );

            return { category, question };
        });
    };

    async updateCategoryFull(id: string, data: CategoryFullUpdateDto) {
        return await prisma.$transaction(async (tx) => {
            const category = await tx.categoria.update({
                where: { id },
                data: data.category
            });

            await tx.pregunta.deleteMany({
                where: { categoriaId: id },
            });

            const question = await Promise.all(
                data.questions.map((question) => {
                    return tx.pregunta.create({

                        data: {
                            ...question,
                            categoriaId: id,
                        }
                    });
                })
            );

            return { category, question };
        });
    };
};