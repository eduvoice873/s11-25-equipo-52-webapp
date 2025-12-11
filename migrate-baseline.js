const { execSync } = require('child_process');

console.log('🔄 Creando baseline de la base de datos...\n');
console.log('ℹ️  Esto marcará el estado actual como punto de partida\n');

try {
  // 1. Crear baseline con el estado actual
  console.log('Paso 1: Marcando migraciones existentes como aplicadas...');
  execSync('npx prisma migrate resolve --applied "0_init"', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  // 2. Crear nueva migración desde el estado actual
  console.log('\nPaso 2: Creando migración incremental...');
  execSync('npx prisma migrate dev --name add_categoria_asignada', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('\n✅ Baseline creado exitosamente, datos preservados');
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\n💡 Intenta con: node migrate.js (reset completo)');
  process.exit(1);
}
