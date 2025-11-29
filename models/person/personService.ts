import prisma from "@/lib/db";
import { PersonCreateDto, PersonUpdateDto } from './dto/person';

export class PersonService {
    async createPerson(data: PersonCreateDto) {
        return await prisma.persona.create({ data });
    }

    async getAllPersons() {
        return await prisma.persona.findMany();
    }

    async getPersonById(id: string) {
        return await prisma.persona.findUnique({ where: { id } });
    }

    async getPersonByEmail(email: string) {
        return await prisma.persona.findUnique({ where: { correo: email } });
    };

    async updatePerson(id: string, data: PersonUpdateDto) {
        return await prisma.persona.update({
            where: { id },
            data,
        });
    }

    async deletePerson(id: string) {
        return await prisma.persona.delete({ where: { id } });
    }
}