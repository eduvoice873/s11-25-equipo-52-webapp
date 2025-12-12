const { execSync } = require('child_process');

console.log('🔄 Reseteando base de datos y ejecutando migraciones...\n');
console.log('⚠️  ADVERTENCIA: Esto borrará todos los datos de la base de datos\n');

try {
  // Reset de la base de datos
  execSync('npx prisma migrate reset --force', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('\n✅ Base de datos reseteada y migraciones aplicadas exitosamente');
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
