import prisma from "@/lib/db";
import { ReviewCreateDto, ReviewUpdateDto } from "./dto/review";

export class ReviewService {
    async createReview(data: ReviewCreateDto) {
        return await prisma.revision.create({ data });
    }

    async getAllReviews() {
        return await prisma.revision.findMany();
    }

    async getReviewById(id: string) {
        return await prisma.revision.findUnique({ where: { id } });
    }

    async updateReview(id: string, data: ReviewUpdateDto) {
        return await prisma.revision.update({ where: { id }, data });
    }

    async deleteReview(id: string) {
        return await prisma.revision.delete({ where: { id } });
    }
};