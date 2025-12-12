# Instrucciones para Migración de Base de Datos

## ✅ Cambios Implementados

Se ha agregado el campo `categoriaAsignadaId` al modelo `User` para permitir que los administradores asignen una categoría específica a cada editor.

## 📝 Comando de Migración

Ejecuta el siguiente comando en la terminal:

```bash
npx prisma migrate dev --name add_categoria_asignada
```

**Nota:** Si PowerShell bloquea la ejecución de scripts, puedes:

### Opción 1: Usar CMD
```cmd
npx prisma migrate dev --name add_categoria_asignada
```

### Opción 2: Cambiar política de ejecución temporalmente
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
npx prisma migrate dev --name add_categoria_asignada
```

### Opción 3: Usar Node.js directamente
```bash
node -e "const { execSync } = require('child_process'); execSync('npx prisma migrate dev --name add_categoria_asignada', { stdio: 'inherit' });"
```

## 🔍 Verificación

Después de ejecutar la migración:

1. Verifica que se creó el archivo de migración en `prisma/migrations/`
2. Revisa que la base de datos se actualizó correctamente
3. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

## 📊 Estructura de la Relación

```
User
  ├─ categoriaAsignadaId: String? (nullable)
  └─ categoriaAsignada: Categoria?

Categoria
  └─ editoresAsignados: User[]
```

### Casos de Uso

1. **Crear Editor con Categoría:**
   - El admin selecciona una categoría al crear el editor
   - Se guarda `categoriaAsignadaId` en el registro del usuario

2. **Editar Categoría Asignada:**
   - El admin puede cambiar la categoría del editor en cualquier momento
   - Usar el modal de edición (botón con ícono de lápiz)

3. **Editor sin Categoría:**
   - `categoriaAsignadaId` puede ser `null`
   - El editor no tendrá acceso a ninguna categoría hasta que se le asigne una

## 🎯 Diferencias Importantes

| Campo | Propósito | Uso |
|-------|-----------|-----|
| `creadoPorId` | Usuario que **creó** la categoría | Historial/Auditoría |
| `categoriaAsignadaId` | Categoría donde el editor **puede trabajar** | Control de acceso/Permisos |

## ⚠️ Importante

Después de la migración, el campo `categoriaAsignadaId` estará en `null` para todos los usuarios existentes. Necesitarás:

1. Asignar categorías manualmente a editores existentes
2. O crear un script de migración de datos si es necesario

## 🚀 Próximos Pasos

1. Ejecutar la migración (comando arriba)
2. Reiniciar el servidor de desarrollo: `npm run dev`
3. Probar crear un editor con categoría asignada
4. Probar editar la categoría de un editor existente
