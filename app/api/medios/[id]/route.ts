import { NextResponse, NextRequest } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { MedioUpdateSchema } from "@/models/medio/dto/medio";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();

// =========================
// GET /api/medios/[id]
// =========================
export async function GET(
  request: NextRequest,
  { params }: { params:  Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const medio = await medioService.getMedioById(id);
    if (!medio) {
      return NextResponse.json({ error: "Medio not found" }, { status: 404 });
    }

    return NextResponse.json(sanitizeBigInt(medio), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// =========================
// PUT /api/medios/[id]
// =========================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const medio = await medioService.getMedioById(id);
    if (!medio) {
      return NextResponse.json({ error: "Medio not found" }, { status: 404 });
    }

    const body = await request.json();
    const dto = MedioUpdateSchema.parse(body);

    const updated = await medioService.updateMedio(id, dto);

    return NextResponse.json(sanitizeBigInt(updated), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// =========================
// DELETE /api/medios/[id]
// =========================
export async function DELETE(
  request: NextRequest,
  { params }: { params:  Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const medio = await medioService.getMedioById(id);
    if (!medio) {
      return NextResponse.json(
        { error: "Medio not found" },
        { status: 404 }
      );
    }

    await medioService.deleteMedio(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
