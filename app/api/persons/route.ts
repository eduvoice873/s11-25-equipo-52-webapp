import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
import { PersonService } from "@/models/person/personService";
import { PersonCreateSchema } from "@/models/person/dto/person";

const personService = new PersonService();

// Crea una nueva persona
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const dto = PersonCreateSchema.parse(body);
        const newPerson = await personService.createPerson(dto);
        return NextResponse.json(newPerson, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Obtiene todas las personas
export async function GET() {
    const persons = await personService.getAllPersons();
    return NextResponse.json(persons, { status: 200 });
};