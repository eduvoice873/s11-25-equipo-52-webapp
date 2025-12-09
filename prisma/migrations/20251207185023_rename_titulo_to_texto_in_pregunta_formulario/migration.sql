/*
Warnings:

- Column `titulo` on the `PreguntaFormulario` table has been renamed to `texto`.

*/
-- AlterTable
ALTER TABLE "PreguntaFormulario" RENAME COLUMN "titulo" TO "texto";