/*
  Warnings:

  - You are about to drop the column `espacioId` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `padreId` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `espacioId` on the `Pregunta` table. All the data in the column will be lost.
  - You are about to drop the column `espacioId` on the `Testimonio` table. All the data in the column will be lost.
  - You are about to drop the `Espacio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoriaToEspacio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[correo]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creadoPorId` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Made the column `correo` on table `Persona` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoriaId` to the `Pregunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Testimonio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categoria" DROP CONSTRAINT "Categoria_padreId_fkey";

-- DropForeignKey
ALTER TABLE "Espacio" DROP CONSTRAINT "Espacio_creadoPorId_fkey";

-- DropForeignKey
ALTER TABLE "Espacio" DROP CONSTRAINT "Espacio_organizacionId_fkey";

-- DropForeignKey
ALTER TABLE "Pregunta" DROP CONSTRAINT "Pregunta_espacioId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonio" DROP CONSTRAINT "Testimonio_espacioId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriaToEspacio" DROP CONSTRAINT "_CategoriaToEspacio_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriaToEspacio" DROP CONSTRAINT "_CategoriaToEspacio_B_fkey";

-- DropIndex
DROP INDEX "Pregunta_espacioId_idx";

-- DropIndex
DROP INDEX "Testimonio_espacioId_idx";

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "espacioId",
DROP COLUMN "padreId",
DROP COLUMN "slug",
DROP COLUMN "tipo",
ADD COLUMN     "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creadoPorId" TEXT NOT NULL,
ADD COLUMN     "mensaje" TEXT,
ADD COLUMN     "titulo" TEXT;

-- AlterTable
ALTER TABLE "Persona" ALTER COLUMN "correo" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pregunta" DROP COLUMN "espacioId",
ADD COLUMN     "categoriaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Testimonio" DROP COLUMN "espacioId",
ADD COLUMN     "categoriaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Espacio";

-- DropTable
DROP TABLE "_CategoriaToEspacio";

-- CreateIndex
CREATE INDEX "Categoria_creadoPorId_idx" ON "Categoria"("creadoPorId");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_correo_key" ON "Persona"("correo");

-- CreateIndex
CREATE INDEX "Pregunta_categoriaId_idx" ON "Pregunta"("categoriaId");

-- CreateIndex
CREATE INDEX "Testimonio_categoriaId_idx" ON "Testimonio"("categoriaId");

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonio" ADD CONSTRAINT "Testimonio_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
