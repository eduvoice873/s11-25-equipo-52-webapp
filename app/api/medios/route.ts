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


export async function DELETE(request: NextResponse){
    try {
        const { searchParams} = new URL(request.url);
        const publicId = searchParams.get("publicId");
        const tipo = searchParams.get("tipo");

        if (!publicId || !tipo){
            return NextResponse.json(
                { error : "publicId son requeridos"}),
                { status: 400}
        }


    console.log(" Eliminando de cloudinary:");

    const resourceType = tipo === "video" ? "video" : "image";

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = require("crypto")
        .createHash("sha1")
        .update(
            `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
        )
        .digest("hex");

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString())
    formData.append("api_key", process.env.CLOUDINARY_API_KEY!)
    formData.append("signature", signature);

    const response = await fetch(
         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`,
         {
            method: "POST",
            body: formData,
         }
    );

    const result = await response.json();
    console.log(" Resultado: ", result)

    return NextResponse.json({
        success: result.result === "ok",
        message: "Medio eliminado correctamente",
        result,
    });
    } catch (error){
        console.error(" Error al eleminar medio: ", error)
        return NextResponse.json(
            { error: "Error al eliminar el medio",
                details: error instanceof Error ? error.message : "Error desconocido"
            },
            {status: 500}
        );
    }
}
   //Verificar el estado del medio -> GET
export async function get(request: NextResponse){
    try {
        const { searchParams} = new URL(request.url);
        const publicId = searchParams.get("publicId");

        if (!publicId){
            return NextResponse.json(
                { error: "publicId es requerido"},
                {status: 400}
            );
        }

        return NextResponse.json(
            {
                message: "Endpoint para verificar el estado del medio",
                publicId,

            });
    }catch (error) {
        console.error( " Error al verificar el estado del medio:" , error)
        return NextResponse.json(
            {error: "Error interno del servidor"},
            { status: 500}

        )
    }
}