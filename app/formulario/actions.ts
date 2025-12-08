import { prisma } from "@/lib/prisma";

export async function actualizarFormulario(id: string, data: any) {
  "use server";

  try {
    console.log(" Actualizando formulario:", id);
    console.log(" Datos a actualizar:", data);

    if (!id) {
      throw new Error("ID del formulario es requerido");
    }

    // TODO: Implement authentication when auth module is available
    // const session = await auth();
    // if (!session?.user?.email) {
    //   throw new Error("No autorizado");
    // }

    const formularioActualizado = await prisma.formulario.update({
      where: { id }, // ← Ahora el ID está definido
      data: {
        nombreFormulario: data.titulo,
        descripcion: data.descripcion,
        pedirNombre: data.pedirNombre,
        pedirCorreo: data.pedirCorreo,
        permitirTexto: data.permitirTexto,
        permitirTextoImagen: data.permitirTextoImagen,
        permitirVideo: data.permitirVideo,
        mensajeGracias: data.mensajeGracias,
        slugPublico: data.slugPublico,
        estado: data.estado,
      },
    });

    console.log(" Formulario actualizado:", formularioActualizado.id);

    return formularioActualizado;
  } catch (error) {
    console.error("❌ Error al actualizar formulario:", error);
    throw error;
  }
}
