import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("🔥 Iniciando upload...");

    let formData: FormData;
    try {
      formData = await request.formData();
      console.log("✅ FormData parseado correctamente");
    } catch (parseError) {
      console.error("❌ Error parseando FormData:", parseError);
      return NextResponse.json(
        {
          error: "Error procesando el archivo",
          details:
            parseError instanceof Error
              ? parseError.message
              : "FormData parse error",
        },
        { status: 400 }
      );
    }

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      console.error("❌ No se recibió archivo válido");
      return NextResponse.json(
        { error: "No se recibió ningún archivo válido" },
        { status: 400 }
      );
    }

    // Detectar tipo por MIME
    let tipoFinal: "imagen" | "video" = "imagen";
    if (file.type.startsWith("video/")) {
      tipoFinal = "video";
    }

    console.log(`📦 Archivo: ${file.name}`);
    console.log(`   MIME: ${file.type}`);
    console.log(`   Tamaño: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Tipo: ${tipoFinal}`);

    // Validar tipos permitidos
    const allowedTypes = {
      imagen: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      video: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
    };

    if (!allowedTypes[tipoFinal].includes(file.type)) {
      console.error(`❌ Tipo MIME no permitido: ${file.type}`);
      return NextResponse.json(
        {
          error: `Tipo de archivo no permitido: ${file.type}`,
          allowedTypes: allowedTypes[tipoFinal],
        },
        { status: 400 }
      );
    }

    // Validar tamaño
    const maxSize =
      tipoFinal === "video" ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error(`❌ Archivo demasiado grande: ${file.size} bytes`);
      return NextResponse.json(
        {
          error: `Archivo demasiado grande (máx: ${maxSize / 1024 / 1024}MB)`,
        },
        { status: 400 }
      );
    }

    // Verificar configuración Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    console.log(`🔍 Cloud Name: ${cloudName ? "✅ Configurado" : "❌ NO"}`);
    console.log(
      `🔍 Upload Preset: ${uploadPreset ? "✅ Configurado" : "❌ NO"}`
    );

    if (!cloudName || !uploadPreset) {
      console.error("❌ Falta configuración de Cloudinary");
      return NextResponse.json(
        { error: "Configuración de Cloudinary incompleta" },
        { status: 500 }
      );
    }

    // Convertir archivo a buffer para Cloudinary
    const buffer = await file.arrayBuffer();

    // Crear FormData para Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", new Blob([buffer], { type: file.type }));
    cloudinaryFormData.append("upload_preset", uploadPreset);
    cloudinaryFormData.append("folder", `testimonios/${tipoFinal}s`);

    // URL de Cloudinary
    const resourceType = tipoFinal === "video" ? "video" : "image";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    console.log(`📤 Enviando a: ${cloudinaryUrl}`);

    // Hacer request a Cloudinary
    const cloudinaryRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    console.log(`📥 Respuesta Cloudinary: ${cloudinaryRes.status}`);

    if (!cloudinaryRes.ok) {
      const errorText = await cloudinaryRes.text();
      console.error(`❌ Error Cloudinary: ${errorText}`);

      let errorData: any = {};
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }

      return NextResponse.json(
        {
          error: "Error al subir a Cloudinary",
          details: errorData.error?.message || errorData.message || errorText,
        },
        { status: 500 }
      );
    }

    const responseData = await cloudinaryRes.json();

    console.log(`✅ Upload exitoso`);
    console.log(`   URL: ${responseData.secure_url}`);
    console.log(`   Public ID: ${responseData.public_id}`);

    return NextResponse.json({
      success: true,
      url: responseData.secure_url,
      publicId: responseData.public_id,
      format: responseData.format,
      resourceType: responseData.resource_type,
      width: responseData.width || null,
      height: responseData.height || null,
      size: responseData.bytes || null,
      duration: responseData.duration || null,
    });
  } catch (error) {
    console.error(`❌ Error general:`, error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    console.error(`   ${message}`);

    return NextResponse.json(
      {
        error: "Error al procesar el archivo",
        details: message,
      },
      { status: 500 }
    );
  }
}
