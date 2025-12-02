import { NextResponse } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();

// Obtiene todos los medios
export async function GET() {
    try {
        const medios = await medioService.getAllMedios();
        console.log(medios);
        return NextResponse.json(sanitizeBigInt(medios), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}