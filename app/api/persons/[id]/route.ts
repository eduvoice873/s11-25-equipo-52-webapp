import { NextRequest, NextResponse } from "next/server";
import { PersonService } from "@/models/person/personService";
import { PersonUpdateSchema } from "@/models/person/dto/person";

const personService = new PersonService();

//Obtiene una persona por su ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const person = await personService.getPersonById(id);
        if (!person) return NextResponse.json({ error: "Person not found" }, { status: 404 });

        return NextResponse.json(person, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza una persona por su ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const personFounded = await personService.getPersonById(id);
        if (!personFounded) return NextResponse.json({ error: "Person not found" }, { status: 404 });

        const body = await request.json();
        const dto = PersonUpdateSchema.parse(body);
        const updatedPerson = await personService.updatePerson(id, dto);

        return NextResponse.json(updatedPerson, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Elimina una persona por su ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const personFounded = await personService.getPersonById(id);
        if (!personFounded) return NextResponse.json({ error: "Person not found" }, { status: 404 });

        await personService.deletePerson(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}