import prisma from "@/lib/db";
import { UserCreateDto, UserUpdateDto } from "./dto/user";

export class UserService {
    async createUserEditor(data: UserCreateDto, newPassword: string, organizacionId: string) {
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: newPassword,
                rol: "editor",
                organizacion: {
                    connect: {
                        id: organizacionId
                    }
                },
                image: data.image
            }
        });
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    async getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
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