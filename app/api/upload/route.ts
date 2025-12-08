import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Debug: Ver todos los campos del FormData
    console.log(" FormData recibido:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `File: ${value.name}` : value);
    }

    const file = formData.get("file") as File;
    const tipo = formData.get("tipo") as string | null;

    console.log(" Valores extraídos:");
    console.log("  - file:", file?.name);
    console.log("  - tipo (raw):", tipo);
    console.log("  - tipo (type):", typeof tipo);

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo" },
        { status: 400 }
      );
    }

    // Detectar tipo automáticamente si no viene en el FormData
    let tipoFinal = tipo || "imagen";

    // Si el tipo es null o undefined, detectar por el MIME type
    if (!tipo || tipo === "null") {
      if (file.type.startsWith("video/")) {
        tipoFinal = "video";
        console.log(" Tipo detectado automáticamente: video");
      } else if (file.type.startsWith("image/")) {
        tipoFinal = "imagen";
        console.log(" Tipo detectado automáticamente: imagen");
      }
    }

    console.log(" Archivo recibido:");
    console.log("  - Nombre:", file.name);
    console.log("  - Tipo MIME:", file.type);
    console.log("  - Tamaño:", (file.size / 1024 / 1024).toFixed(2), "MB");
    console.log("  - Categoría:", tipoFinal);

    // Validar tipo
    const allowedTypes = {
      imagen: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      video: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
    };

    const tipoKey = tipoFinal as keyof typeof allowedTypes;
    if (!allowedTypes[tipoKey]?.includes(file.type)) {
      console.error("❌ Tipo no permitido:", file.type);
      return NextResponse.json(
        {
          error: `Tipo de archivo no permitido: ${file.type}`,
          expectedCategory: tipoFinal,
          allowedTypes: allowedTypes[tipoKey]
        },
        { status: 400 }
      );
    }

    // Validar tamaño
    const maxSize = tipoFinal === "video" ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error("❌ Archivo muy grande:", file.size, "bytes");
      return NextResponse.json(
        {
          error: `Archivo demasiado grande. Máximo: ${maxSize / 1024 / 1024}MB`,
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
          maxSize: `${maxSize / 1024 / 1024}MB`
        },
        { status: 400 }
      );
    }

    // Verificar variables de entorno
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "next-upload";

    console.log(" Configuración Cloudinary:");
    console.log("  - Cloud Name:", cloudName);
    console.log("  - Upload Preset:", uploadPreset);

    if (!cloudName) {
      console.error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está configurado");
      return NextResponse.json(
        { error: "Configuración de Cloudinary incompleta" },
        { status: 500 }
      );
    }

    // Preparar FormData para Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", uploadPreset);
    cloudinaryFormData.append("folder", `testimonios/${tipoFinal}s`);

    const resourceType = tipoFinal === "video" ? "video" : "image";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    console.log(" Subiendo a Cloudinary...");
    console.log("  - URL:", cloudinaryUrl);
    console.log("  - Resource Type:", resourceType);

    const cloudinaryRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    console.log(" Respuesta de Cloudinary:");
    console.log("  - Status:", cloudinaryRes.status);
    console.log("  - Status Text:", cloudinaryRes.statusText);

    if (!cloudinaryRes.ok) {
      const errorText = await cloudinaryRes.text();
      console.error("❌ Error de Cloudinary (raw):", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
        console.error("❌ Error de Cloudinary (parsed):", errorData);
      } catch {
        console.error("❌ No se pudo parsear el error");
        errorData = { message: errorText };
      }

      return NextResponse.json(
        {
          error: "Error al subir a Cloudinary",
          details: errorData.error?.message || errorData.message || errorText,
          status: cloudinaryRes.status,
        },
        { status: 500 }
      );
    }

    const data = await cloudinaryRes.json();
    console.log(" Archivo subido exitosamente:");
    console.log("  - URL:", data.secure_url);
    console.log("  - Public ID:", data.public_id);
    console.log("  - Formato:", data.format);
    console.log("  - Tamaño:", (data.bytes / 1024 / 1024).toFixed(2), "MB");

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      resourceType: data.resource_type,
      width: data.width,
      height: data.height,
      size: data.bytes,
      duration: data.duration,
    });
  } catch (error) {
    console.error("❌ Error general:", error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");

    return NextResponse.json(
      {
        error: "Error al procesar el archivo",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
