-- AlterTable: Add categoriaAsignadaId column to User table
ALTER TABLE "User" ADD COLUMN "categoriaAsignadaId" TEXT;

-- CreateIndex: Add index for better query performance
CREATE INDEX "User_categoriaAsignadaId_idx" ON "User"("categoriaAsignadaId");

-- AddForeignKey: Link User.categoriaAsignadaId to Categoria.id
ALTER TABLE "User" 
  ADD CONSTRAINT "User_categoriaAsignadaId_fkey" 
  FOREIGN KEY ("categoriaAsignadaId") 
  REFERENCES "Categoria"("id") 
  ON DELETE SET NULL 
  ON UPDATE CASCADE;
