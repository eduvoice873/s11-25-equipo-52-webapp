# Generador de Widget VoicesHub

## Descripción

El generador de widgets permite crear códigos embed personalizados para mostrar testimonios aprobados en sitios web externos. Los testimonios se pueden filtrar por categoría y organización.

## Características

### ✅ Implementado

1. **Selector de Categoría**
   - Carga automática de categorías de la organización del usuario
   - Opción de mostrar todas las categorías o filtrar por una específica

2. **Filtro por Organización**
   - Se carga automáticamente la organización del usuario autenticado
   - Los testimonios se filtran por la organización

3. **Configuración del Widget**
   - Límite de testimonios (1-50)
   - Solo mostrar destacados (checkbox)
   - Tema claro/oscuro

4. **Códigos de Embed**
   - Código con iframe
   - Código con script (auto-ajuste de altura)

5. **API Pública**
   - `/api/public/testimonials` - Obtiene testimonios filtrados
   - `/api/public/categories` - Obtiene categorías disponibles
   - CORS habilitado para uso externo

## Archivos Creados/Modificados

### Nuevos Archivos

1. **`app/(dashboard)/widget-generator/page.tsx`**
   - Página del generador de widgets
   - Carga categorías y organización del usuario
   - Genera códigos embed personalizados

2. **`app/embed/voiceshub/page.tsx`**
   - Página embed para el widget
   - Recibe parámetros via query string
   - Renderiza el componente VoicesHubWidget

3. **`app/embed/voiceshub/layout.tsx`**
   - Layout limpio para embeds (sin header/footer)

4. **`components/widget/VoicesHubWidget.tsx`**
   - Componente público del widget
   - Carga testimonios via API pública
   - Soporte para temas claro/oscuro
   - Auto-ajuste de altura via postMessage

5. **`app/api/public/categories/route.ts`**
   - Endpoint público para obtener categorías
   - Soporta filtro por organizacionId
   - CORS habilitado

### Archivos Modificados

1. **`app/api/public/testimonials/route.ts`**
   - Ya existía, ahora optimizado para el widget

2. **`prisma/schema.prisma`**
   - Agregado valor `editar` al enum `DecisionRevision`

## Uso

### 1. Acceder al Generador

Navega a: `/widget-generator` (desde el dashboard)

### 2. Configurar el Widget

- **Organización**: Se carga automáticamente
- **Categoría**: Selecciona una específica o deja en "Todas las categorías"
- **Límite**: Número de testimonios a mostrar (1-50)
- **Destacados**: Marca para mostrar solo testimonios destacados
- **Tema**: Claro u Oscuro

### 3. Copiar Código

El generador muestra dos opciones:

**Opción A: Código con Script (Recomendado)**
```html
<div id="voiceshub-widget"></div>
<script>
  (function() {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://tudominio.com/embed/voiceshub?categoriaId=xxx&limit=10';
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.minHeight = '600px';
    iframe.onload = function() {
      window.addEventListener('message', function(e) {
        if (e.data.type === 'voiceshub-height') {
          iframe.style.height = e.data.height + 'px';
        }
      });
    };
    document.getElementById('voiceshub-widget').appendChild(iframe);
  })();
</script>
```

**Opción B: Código con iframe**
```html
<iframe
  src="https://tudominio.com/embed/voiceshub?categoriaId=xxx&limit=10"
  width="100%"
  height="600"
  frameborder="0"
  style="border: none; min-height: 600px;"
></iframe>
```

### 4. Pegar en tu Sitio Web

Copia el código generado y pégalo en cualquier página HTML de tu sitio web.

## Parámetros de Query String

El widget acepta los siguientes parámetros:

- `categoriaId` (opcional): ID de la categoría para filtrar
- `organizacionId` (opcional): ID de la organización para filtrar
- `limit` (opcional, default: 10): Número máximo de testimonios
- `destacados` (opcional): "true" para mostrar solo destacados
- `theme` (opcional, default: "light"): "light" o "dark"

**Ejemplo:**
```
/embed/voiceshub?categoriaId=abc123&limit=20&destacados=true&theme=dark
```

## Seguridad

- El widget consume endpoints públicos (no requiere autenticación)
- Solo muestra testimonios con estado `aprobado` o `publicado`
- CORS habilitado para permitir embeds desde cualquier dominio
- Cache configurado para optimizar rendimiento

## Próximos Pasos

Para completar la funcionalidad, ejecuta:

1. **Regenerar Prisma Client** (cuando el servidor no esté corriendo):
   ```bash
   npx prisma generate
   ```

2. **Aplicar migración de base de datos**:
   ```bash
   npx prisma migrate dev --name add_editar_to_decision_revision
   ```

3. **Reiniciar el servidor de desarrollo**

## Troubleshooting

### El widget no carga testimonios

- Verifica que existan testimonios aprobados en la categoría
- Revisa la consola del navegador para errores de CORS
- Confirma que el `categoriaId` u `organizacionId` sean correctos

### Error de TypeScript en VoicesHubWidget

- Asegúrate de ejecutar `npx prisma generate` después de modificar el schema
- Reinicia el servidor TypeScript en VS Code

### El iframe no ajusta su altura

- Usa el código con script en lugar del iframe simple
- Verifica que el sitio padre permita postMessage

## Soporte

Para más información, revisa:
- `/app/(dashboard)/widget-generator/page.tsx` - Código del generador
- `/components/widget/VoicesHubWidget.tsx` - Componente del widget
- `/app/api/public/testimonials/route.ts` - API de testimonios
