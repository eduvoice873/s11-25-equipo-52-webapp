import prisma from "@/lib/db";
import { MedioUpdateDto } from "./dto/medio";

export class MedioService {
  async getAllMedios() {
    return await prisma.medio.findMany();
  }

  async getMedioById(id: string) {
    return await prisma.medio.findUnique({ where: { id } });
  }

  async getMedioByTestimonioId(testimonioId: string) {
    return await prisma.medio.findMany({ where: { testimonioId } });
  }

  async getMedioByOrganizationId(organizacionId: string) {
    return await prisma.medio.findMany({ where: { organizacionId } });
  }

  async updateMedio(id: string, datos: MedioUpdateDto) {
    return await prisma.medio.update({
      where: { id },
      data: {
        tipo: datos.tipo,
        url: datos.url,
        // Para campos numéricos que pueden ser null, usa set
        ancho: datos.ancho !== undefined && datos.ancho !== null ? datos.ancho : undefined,
        alto: datos.alto !== undefined && datos.alto !== null ? datos.alto : undefined,
        duracionSegundos:
          datos.duracionSegundos !== undefined && datos.duracionSegundos !== null
            ? datos.duracionSegundos
            : undefined,
        bytes: datos.bytes,
        leyenda:
          datos.leyenda !== undefined ? datos.leyenda : undefined,


      },
    });
  }

  async deleteMedio(id: string) {
    return await prisma.medio.delete({ where: { id } });
  }
}
