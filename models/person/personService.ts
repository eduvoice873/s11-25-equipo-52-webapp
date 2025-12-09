import prisma from "@/lib/db";
import { PersonUpdateDto } from './dto/person';

export class PersonService {
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