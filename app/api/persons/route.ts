import { NextResponse } from "next/server";
import { PersonService } from "@/models/person/personService";

const personService = new PersonService();

// Obtiene todas las personas
export async function GET() {
    const persons = await personService.getAllPersons();
    return NextResponse.json(persons, { status: 200 });
};