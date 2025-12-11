const { execSync } = require('child_process');

console.log('🔄 Agregando solo la columna categoriaAsignadaId...\n');

try {
  // Crear una migración vacía y editarla manualmente
  console.log('Creando migración personalizada...');
  execSync('npx prisma migrate dev --create-only --name add_categoria_asignada', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('\n⚠️  Se creó un archivo de migración en prisma/migrations/');
  console.log('📝 Edita el archivo SQL para incluir solo:');
  console.log('\n-- AddForeignKey');
  console.log('ALTER TABLE "User" ADD COLUMN "categoriaAsignadaId" TEXT;');
  console.log('CREATE INDEX "User_categoriaAsignadaId_idx" ON "User"("categoriaAsignadaId");');
  console.log('ALTER TABLE "User" ADD CONSTRAINT "User_categoriaAsignadaId_fkey" FOREIGN KEY ("categoriaAsignadaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;');
  console.log('\nLuego ejecuta: npx prisma migrate dev');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
