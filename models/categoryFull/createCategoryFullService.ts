import prisma from "@/lib/db";
import { CategoryFullDTO } from "./dto/categoryFull";

export class CreateCategoryFullService {

    async createCategoryFull(data: CategoryFullDTO) {
        return await prisma.$transaction(async (tx) => {
            const category = await tx.categoria.create({ data: data.category });

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
};