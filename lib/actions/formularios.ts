'use server';

import prisma from '@/lib/db';

export async function getFormularioPorSlug(slug: string | undefined | null) {
  if (!slug) {
    console.error('No se proporcionó un slug válido');
    return null;
  }

  try {
    const formulario = await prisma.formulario.findUnique({
      where: {
        slugPublico: slug
      },
      include: {
        preguntas: {
          orderBy: { orden: 'asc' },
        },
      },
    });

    if (!formulario) {
      console.error(`No se encontró el formulario con slug: ${slug}`);
      return null;
    }

    return formulario;
  } catch (error) {
    console.error('Error al obtener el formulario por slug:', error);
    return null;
  }
}