import prisma from "@/lib/db"; 
export async function actualizarFormulario(id: string, data: any) {
  "use server";

  try {

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



    return formularioActualizado;
  } catch (error) {
    console.error(" Error al actualizar formulario:", error);
    throw error;
  }
}
