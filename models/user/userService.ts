import prisma from "@/lib/db";
import { UserUpdateDto } from "./dto/user";

export class UserService {
    async getAllUsers() {
        return prisma.user.findMany();
    }

    async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    async getUserByAdminRol() {
        return prisma.user.findMany({ where: { rol: 'admin' } });
    }

    async getUserByEditorRol() {
        return prisma.user.findMany({ where: { rol: 'editor' } });
    }

    async updateUser(id: string, data: UserUpdateDto) {
        return prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } });
    }
};