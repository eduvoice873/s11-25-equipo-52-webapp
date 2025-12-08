# Widget de Testimonios Individuales

Esta funcionalidad permite generar códigos embed para mostrar testimonios individuales en sitios web externos.

## 🎯 Características

- **Modal de Códigos Embed**: Al hacer clic en "Compartir" en un testimonio aprobado, se abre un modal con los códigos necesarios
- **Dos Formatos de Embed**:
  - **Iframe**: Código HTML simple con iframe
  - **Script**: Código JavaScript para inserción dinámica
- **Vista Previa en Vivo**: El modal muestra una vista previa del testimonio tal como se verá embebido
- **Copiar con un Click**: Botón para copiar el código al portapapeles
- **Temas**: Soporte para tema claro y oscuro
- **Responsive**: El widget se adapta al ancho del contenedor

## 📋 Cómo Usar

### 1. Desde la Interfaz de Moderación

1. Ve a **Moderación** en el menú lateral
2. Selecciona un testimonio **aprobado**
3. Haz clic en el botón **"Compartir"** (icono Share2)
4. Se abrirá un modal con las opciones de embed
5. Elige entre "Iframe" o "Script"
6. Haz clic en **"Copiar Código"**
7. Pega el código en tu sitio web

### 2. Código Iframe

```html
<iframe
  src="https://tu-dominio.com/embed/testimonials/[ID_DEL_TESTIMONIO]"
  width="100%"
  height="400"
  frameborder="0"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="Testimonio"></iframe>
```

### 3. Código Script

```html
<!-- Widget de Testimonio Individual -->
<div id="testimonial-[ID_DEL_TESTIMONIO]"></div>
<script>
  (function () {
    var container = document.getElementById("testimonial-[ID_DEL_TESTIMONIO]");
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://tu-dominio.com/embed/testimonials/[ID_DEL_TESTIMONIO]";
    iframe.width = "100%";
    iframe.height = "400";
    iframe.frameBorder = "0";
    iframe.style.border = "1px solid #e5e7eb";
    iframe.style.borderRadius = "8px";
    container.appendChild(iframe);
  })();
</script>
```

## 🔌 API Endpoints

### Obtener Testimonio Individual (Público)

```
GET /api/public/testimonials/[id]
```

**Respuesta de ejemplo:**

```json
{
  "id": "uuid-del-testimonio",
  "titulo": "Excelente servicio",
  "texto": "Me encantó trabajar con este equipo...",
  "calificacion": 5,
  "fechaCreacion": "2025-12-06T...",
  "persona": {
    "nombreCompleto": "Juan Pérez",
    "cargo": "CEO",
    "fotoUrl": "https://..."
  },
  "medios": [
    {
      "url": "https://...",
      "tipo": "imagen"
    }
  ],
  "categoria": {
    "nombre": "Servicios"
  }
}
```

**Características:**

- ✅ CORS habilitado
- ✅ Solo retorna testimonios aprobados
- ✅ Respuesta 404 si no existe o no está aprobado
- ✅ Incluye información de persona, medios y categoría

## 🎨 Personalización

### Temas

Puedes especificar el tema agregando un parámetro a la URL:

```html
<!-- Tema oscuro -->
<iframe
  src="https://tu-dominio.com/embed/testimonials/[ID]?theme=dark"
  ...></iframe>

<!-- Tema claro (por defecto) -->
<iframe
  src="https://tu-dominio.com/embed/testimonials/[ID]?theme=light"
  ...></iframe>
```

### Dimensiones

Puedes ajustar el ancho y alto del iframe según tus necesidades:

```html
<iframe
  src="..."
  width="800px"  <!-- Ancho fijo -->
  height="500"   <!-- Altura personalizada -->
  ...
></iframe>
```

## 🔒 Seguridad

- Solo se pueden embeber testimonios con estado **"aprobado"**
- El endpoint público valida el estado antes de retornar datos
- CORS configurado para permitir uso desde cualquier dominio
- Los datos sensibles no se exponen en la API pública

## 📱 Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Responsive (se adapta a móviles)
- ✅ Funciona con HTTP y HTTPS
- ✅ Compatible con sistemas de gestión de contenido (WordPress, etc.)

## 🛠️ Componentes Técnicos

### Frontend

- `components/testimonial/EmbedCodeModal.tsx` - Modal para generar códigos
- `components/widget/SingleTestimonialWidget.tsx` - Widget de visualización
- `app/embed/testimonials/[id]/page.tsx` - Página de embed

### Backend

- `app/api/public/testimonials/[id]/route.ts` - API pública para obtener testimonio

### Integración

- `components/ui/testimonial/Admin.tsx` - Componente actualizado con botón de compartir
