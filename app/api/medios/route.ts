import { NextRequest, NextResponse } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();

// =============================
// GET /api/medios  (todos los medios)
// =============================
export async function GET(request: NextRequest) {
  try {
    const medios = await medioService.getAllMedios();
    return NextResponse.json(sanitizeBigInt(medios), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}

// =============================
// DELETE /api/medios?publicId=x&tipo=video
// =============================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");
    const tipo = searchParams.get("tipo");

    if (!publicId || !tipo) {
      return NextResponse.json(
        { error: "publicId y tipo son requeridos" },
        { status: 400 }
      );
    }

    const resourceType = tipo === "video" ? "video" : "image";
    const timestamp = Math.round(Date.now() / 1000);

    const signature = require("crypto")
      .createHash("sha1")
      .update(
        `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
      )
      .digest("hex");

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`,
      { method: "POST", body: formData }
    );

    const result = await response.json();

    return NextResponse.json({
      success: result.result === "ok",
      message: "Medio eliminado correctamente",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al eliminar el medio",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}



// Si deseas este endpoint, debe ser:
// /api/medios/estado  → moverlo a otra ruta

export async function GET_STATUS(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json(
        { error: "publicId es requerido" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Endpoint para verificar el estado del medio",
      publicId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
