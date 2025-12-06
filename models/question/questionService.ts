import prisma from "@/lib/db";
import { QuestionUpdateDto } from "./dto/question";

export class QuestionService {

    async getAllQuestions() {
        return prisma.pregunta.findMany();
    }

    async getQuestionById(id: string) {
        return prisma.pregunta.findUnique({ where: { id } });
    }

    async getQuestionsByCategoryId(categoriaId: string) {
        return prisma.pregunta.findMany({ where: { categoriaId } });
    }

    async updateQuestion(id: string, data: QuestionUpdateDto) {
        return prisma.pregunta.update({
            where: { id },
            data,
        });
    }

    async deleteQuestion(id: string) {
        return prisma.pregunta.delete({ where: { id } });
    }
};