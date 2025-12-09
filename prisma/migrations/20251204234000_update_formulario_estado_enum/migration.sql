/*
  Warnings:

  - You are about to drop the column `activo` on the `Formulario` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoFormulario" AS ENUM ('borrador', 'publicado');

-- AlterTable
ALTER TABLE "Formulario" DROP COLUMN "activo",
ADD COLUMN     "estado" "EstadoFormulario" NOT NULL DEFAULT 'publicado';
