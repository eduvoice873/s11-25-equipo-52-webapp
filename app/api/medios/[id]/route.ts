import { NextResponse } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { MedioUpdateSchema } from "@/models/medio/dto/medio";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();

// Obtiene un medio por su ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const medio = await medioService.getMedioById(id);
        if (!medio) return NextResponse.json({ error: "Medio not found" }, { status: 404 });

        return NextResponse.json(sanitizeBigInt(medio), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza un medio por su ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const medio = await medioService.getMedioById(id);
        if (!medio) return NextResponse.json({ error: "Medio not found" }, { status: 404 });

        const body = await request.json();
        const dto = MedioUpdateSchema.parse(body);
        const updateMedio = await medioService.updateMedio(id, dto);

        return NextResponse.json(sanitizeBigInt(updateMedio), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Elimina un medio por su ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const medio = await medioService.getMedioById(id);
        if (!medio) return NextResponse.json({ error: "Medio not found" }, { status: 404 });

        await medioService.deleteMedio(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};