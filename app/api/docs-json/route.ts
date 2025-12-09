import { NextResponse } from "next/server";
import { getSwaggerSpec } from "@/lib/swagger";

export async function GET() {
    const swaggerSpec = await getSwaggerSpec();
    return NextResponse.json(swaggerSpec);
};