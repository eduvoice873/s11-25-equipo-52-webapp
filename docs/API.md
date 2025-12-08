# 🔌 Documentación de API - EduVoice CMS

## Tabla de Contenidos

- [Introducción](#introducción)
- [Autenticación](#autenticación)
- [Códigos de Estado](#códigos-de-estado)
- [Endpoints](#endpoints)
  - [Autenticación](#endpoints-de-autenticación)
  - [Usuarios](#endpoints-de-usuarios)
  - [Organizaciones](#endpoints-de-organizaciones)
  - [Categorías](#endpoints-de-categorías)
  - [Testimonios](#endpoints-de-testimonios)
  - [Formularios](#endpoints-de-formularios)
  - [Personas](#endpoints-de-personas)
  - [Etiquetas](#endpoints-de-etiquetas)
  - [Medios](#endpoints-de-medios)
  - [Revisiones](#endpoints-de-revisiones)
- [Paginación y Filtros](#paginación-y-filtros)
- [Manejo de Errores](#manejo-de-errores)
- [Rate Limiting](#rate-limiting)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## Introducción

La API de EduVoice CMS es una API REST que permite gestionar todos los recursos del sistema. Está construida con Next.js API Routes y utiliza JSON para las peticiones y respuestas.

### URL Base

```
Desarrollo: http://localhost:3000/api
Producción:  https://tu-dominio.com/api
```

### Documentación Interactiva

La API cuenta con documentación Swagger interactiva:

```
http://localhost:3000/api/docs
```

### Formato de Respuestas

Todas las respuestas de la API están en formato JSON:

```json
{
  "data": {},
  "message": "Success",
  "timestamp": "2024-12-07T10:30:00.000Z"
}
```

### Headers Requeridos

```http
Content-Type: application/json
Accept: application/json
```

---

## Autenticación

### Tipos de Autenticación

1. **Session-based (NextAuth)**: Para aplicaciones web
2. **API Key** (futuro): Para integraciones externas

### Session-based Authentication

EduVoice usa NextAuth con cookies para mantener la sesión.

#### Login

```http
POST /api/auth/signin/credentials
```

**Body**:

```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "user": {
    "id": "clx...",
    "name": "Usuario",
    "email": "usuario@example.com",
    "rol": "admin",
    "organizacionId": "..."
  },
  "sessionToken": "..."
}
```

#### Verificar Sesión

```http
GET /api/auth/session
```

**Response**:

```json
{
  "user": {
    "id": "clx...",
    "name": "Usuario",
    "email": "usuario@example.com",
    "rol": "admin"
  },
  "expires": "2024-12-31T23:59:59.999Z"
}
```

#### Logout

```http
POST /api/auth/signout
```

### Protección de Rutas

Las rutas protegidas requieren una sesión activa. Si no hay sesión, retornan:

```json
{
  "error": "Unauthorized",
  "message": "Debe iniciar sesión"
}
```

---

## Códigos de Estado

| Código | Significado           | Descripción                     |
| ------ | --------------------- | ------------------------------- |
| 200    | OK                    | Solicitud exitosa               |
| 201    | Created               | Recurso creado exitosamente     |
| 204    | No Content            | Solicitud exitosa sin contenido |
| 400    | Bad Request           | Error en los datos enviados     |
| 401    | Unauthorized          | No autenticado                  |
| 403    | Forbidden             | Sin permisos                    |
| 404    | Not Found             | Recurso no encontrado           |
| 409    | Conflict              | Conflicto (ej: email duplicado) |
| 422    | Unprocessable Entity  | Validación fallida              |
| 500    | Internal Server Error | Error del servidor              |

---

## Endpoints

### Endpoints de Autenticación

#### POST /api/auth/signup

Registrar nuevo usuario.

**Body**:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123!",
  "organizacionId": "clx..."
}
```

**Response (201)**:

```json
{
  "id": "clx...",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "editor"
}
```

---

### Endpoints de Usuarios

#### GET /api/users

Listar todos los usuarios (requiere rol admin).

**Query Params**:

- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Resultados por página (default: 10)
- `organizacionId` (opcional): Filtrar por organización
- `rol` (opcional): Filtrar por rol (admin, editor)

**Response (200)**:

```json
{
  "users": [
    {
      "id": "clx...",
      "name": "Usuario 1",
      "email": "user1@example.com",
      "rol": "admin",
      "activo": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### GET /api/users/:id

Obtener usuario por ID.

**Response (200)**:

```json
{
  "id": "clx...",
  "name": "Usuario",
  "email": "user@example.com",
  "rol": "admin",
  "activo": true,
  "organizacion": {
    "id": "clx...",
    "nombre": "Mi Org"
  },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST /api/users

Crear nuevo usuario (requiere rol admin).

**Body**:

```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "Password123!",
  "rol": "editor",
  "organizacionId": "clx..."
}
```

**Response (201)**:

```json
{
  "id": "clx...",
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "rol": "editor"
}
```

#### PUT /api/users/:id

Actualizar usuario.

**Body**:

```json
{
  "name": "Nombre Actualizado",
  "activo": false
}
```

**Response (200)**:

```json
{
  "id": "clx...",
  "name": "Nombre Actualizado",
  "activo": false
}
```

#### DELETE /api/users/:id

Eliminar usuario (soft delete).

**Response (204)**: No content

---

### Endpoints de Organizaciones

#### GET /api/organizations

Listar organizaciones.

**Response (200)**:

```json
{
  "organizations": [
    {
      "id": "clx...",
      "nombre": "Universidad ABC",
      "slug": "universidad-abc",
      "creadoEn": "2024-01-01T00:00:00.000Z",
      "_count": {
        "usuarios": 10,
        "categorias": 5,
        "testimonios": 150
      }
    }
  ]
}
```

#### GET /api/organizations/:id

Obtener organización por ID.

**Response (200)**:

```json
{
  "id": "clx...",
  "nombre": "Universidad ABC",
  "slug": "universidad-abc",
  "usuarios": [...],
  "categorias": [...],
  "stats": {
    "totalTestimonios": 150,
    "testimoniosPublicados": 120,
    "testimoniosPendientes": 30
  }
}
```

#### POST /api/organizations

Crear organización.

**Body**:

```json
{
  "nombre": "Nueva Universidad",
  "slug": "nueva-universidad"
}
```

**Response (201)**:

```json
{
  "id": "clx...",
  "nombre": "Nueva Universidad",
  "slug": "nueva-universidad"
}
```

---

### Endpoints de Categorías

#### GET /api/categories

Listar categorías.

**Query Params**:

- `organizacionId`: ID de la organización (requerido)
- `tipo` (opcional): Filtrar por tipo

**Response (200)**:

```json
{
  "categories": [
    {
      "id": "clx...",
      "nombre": "Testimonios de Graduados",
      "tipo": "cliente",
      "mensaje": "Comparte tu experiencia",
      "creadoEn": "2024-01-01T00:00:00.000Z",
      "_count": {
        "testimonios": 25
      }
    }
  ]
}
```

#### GET /api/categories/:id

Obtener categoría por ID.

**Response (200)**:

```json
{
  "id": "clx...",
  "nombre": "Testimonios de Graduados",
  "tipo": "cliente",
  "mensaje": "Comparte tu experiencia",
  "titulo": "¿Qué opinas de tu experiencia?",
  "organizacion": {...},
  "testimonios": [...],
  "formularios": [...]
}
```

#### POST /api/categories

Crear categoría.

**Body**:

```json
{
  "nombre": "Nueva Categoría",
  "organizacionId": "clx...",
  "tipo": "producto",
  "mensaje": "Mensaje de solicitud",
  "titulo": "Título del formulario"
}
```

**Response (201)**:

```json
{
  "id": "clx...",
  "nombre": "Nueva Categoría",
  "tipo": "producto"
}
```

#### PUT /api/categories/:id

Actualizar categoría.

**Body**:

```json
{
  "nombre": "Categoría Actualizada",
  "mensaje": "Nuevo mensaje"
}
```

#### DELETE /api/categories/:id

Eliminar categoría.

**Response (204)**: No content

---

### Endpoints de Testimonios

#### GET /api/testimonials

Listar testimonios.

**Query Params**:

- `categoriaId` (opcional): Filtrar por categoría
- `estado` (opcional): Filtrar por estado (borrador, en_revision, aprobado, publicado)
- `destacado` (opcional): true/false
- `page` (opcional): Número de página
- `limit` (opcional): Resultados por página
- `sort` (opcional): Campo para ordenar (creadoEn, calificacion)
- `order` (opcional): asc/desc

**Response (200)**:

```json
{
  "testimonials": [
    {
      "id": "clx...",
      "titulo": "Excelente experiencia",
      "texto": "La universidad superó mis expectativas...",
      "calificacion": 5,
      "estado": "publicado",
      "destacado": true,
      "modalidad": "texto_imagen",
      "persona": {
        "nombreCompleto": "María García",
        "fotoUrl": "https://..."
      },
      "categoria": {
        "nombre": "Graduados"
      },
      "medios": [
        {
          "tipo": "imagen",
          "url": "https://..."
        }
      ],
      "publicadoEn": "2024-12-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15
  }
}
```

#### GET /api/testimonials/:id

Obtener testimonio por ID.

**Response (200)**:

```json
{
  "id": "clx...",
  "titulo": "Excelente experiencia",
  "texto": "Contenido completo del testimonio...",
  "calificacion": 5,
  "estado": "publicado",
  "persona": {...},
  "categoria": {...},
  "medios": [...],
  "etiquetas": [...],
  "revisiones": [...]
}
```

#### POST /api/testimonials

Crear testimonio.

**Body**:

```json
{
  "titulo": "Mi testimonio",
  "texto": "Contenido del testimonio...",
  "calificacion": 5,
  "personaId": "clx...",
  "categoriaId": "clx...",
  "modalidad": "texto_imagen"
}
```

**Response (201)**:

```json
{
  "id": "clx...",
  "titulo": "Mi testimonio",
  "estado": "borrador"
}
```

#### PUT /api/testimonials/:id

Actualizar testimonio.

**Body**:

```json
{
  "titulo": "Título actualizado",
  "texto": "Texto actualizado",
  "destacado": true
}
```

#### DELETE /api/testimonials/:id

Eliminar testimonio.

**Response (204)**: No content

#### PATCH /api/testimonials/:id/moderate

Moderar testimonio (aprobar/rechazar).

**Body**:

```json
{
  "decision": "aprobar",
  "notas": "Testimonio aprobado, excelente contenido"
}
```

**Response (200)**:

```json
{
  "id": "clx...",
  "estado": "aprobado",
  "revision": {
    "id": "clx...",
    "decision": "aprobar",
    "notas": "...",
    "creadoEn": "2024-12-07T10:30:00.000Z"
  }
}
```

#### PATCH /api/testimonials/:id/edit

Editar testimonio (por moderador).

**Body**:

```json
{
  "titulo": "Título editado",
  "texto": "Texto editado",
  "notasEdicion": "Se corrigió ortografía"
}
```

#### GET /api/testimonials/:id/history

Obtener historial de revisiones.

**Response (200)**:

```json
{
  "testimonial": {...},
  "revisiones": [
    {
      "id": "clx...",
      "decision": "aprobar",
      "notas": "Aprobado",
      "revisor": {
        "name": "Admin User"
      },
      "creadoEn": "2024-12-07T10:30:00.000Z"
    }
  ]
}
```

#### GET /api/testimonials/category/:categoriaId

Listar testimonios de una categoría.

#### GET /api/testimonials/person/:personaId

Listar testimonios de una persona.

---

### Endpoints de Formularios

#### GET /api/formularios

Listar formularios.

**Query Params**:

- `organizacionId`: ID de organización (requerido)
- `categoriaId` (opcional): Filtrar por categoría
- `estado` (opcional): borrador/publicado

**Response (200)**:

```json
{
  "formularios": [
    {
      "id": "clx...",
      "nombreFormulario": "Encuesta de Satisfacción",
      "descripcion": "Cuéntanos tu experiencia",
      "slugPublico": "satisfaccion-2024",
      "estado": "publicado",
      "categoria": {
        "nombre": "Graduados"
      },
      "_count": {
        "respuestas": 45
      }
    }
  ]
}
```

#### GET /api/formularios/:slug

Obtener formulario por slug (público).

**Response (200)**:

```json
{
  "id": "clx...",
  "nombreFormulario": "Encuesta de Satisfacción",
  "descripcion": "Cuéntanos tu experiencia",
  "pedirNombre": true,
  "pedirCorreo": true,
  "permitirTexto": true,
  "permitirTextoImagen": true,
  "permitirVideo": false,
  "mensajeGracias": "¡Gracias por tu testimonio!",
  "preguntas": [
    {
      "id": "clx...",
      "texto": "¿Qué te pareció el curso?",
      "tipo": "texto",
      "requerida": true,
      "orden": 1
    }
  ],
  "categoria": {...}
}
```

#### POST /api/formularios

Crear formulario.

**Body**:

```json
{
  "nombreFormulario": "Nuevo Formulario",
  "descripcion": "Descripción del formulario",
  "organizacionId": "clx...",
  "categoriaId": "clx...",
  "slugPublico": "nuevo-formulario",
  "pedirNombre": true,
  "pedirCorreo": true,
  "permitirTexto": true,
  "preguntas": [
    {
      "texto": "Pregunta 1",
      "tipo": "texto",
      "requerida": true,
      "orden": 1
    }
  ]
}
```

#### POST /api/formularios/:slug/respuesta

Enviar respuesta a formulario (público).

**Body**:

```json
{
  "nombreCompleto": "Juan Pérez",
  "correo": "juan@example.com",
  "titulo": "Gran experiencia",
  "texto": "Me encantó el curso...",
  "calificacion": 5,
  "imagenUrl": "https://...",
  "respuestas": [
    {
      "preguntaId": "clx...",
      "respuesta": "Respuesta a la pregunta"
    }
  ]
}
```

**Response (201)**:

```json
{
  "id": "clx...",
  "mensaje": "¡Gracias por tu testimonio!",
  "estado": "pendiente"
}
```

---

### Endpoints de Personas

#### GET /api/persons

Listar personas.

**Response (200)**:

```json
{
  "persons": [
    {
      "id": "clx...",
      "nombreCompleto": "María García",
      "correo": "maria@example.com",
      "fotoUrl": "https://...",
      "_count": {
        "testimonios": 3
      }
    }
  ]
}
```

#### GET /api/persons/:id

Obtener persona por ID.

#### POST /api/persons

Crear persona.

**Body**:

```json
{
  "nombreCompleto": "Juan Pérez",
  "correo": "juan@example.com",
  "fotoUrl": "https://..."
}
```

---

### Endpoints de Etiquetas

#### GET /api/tags

Listar etiquetas.

**Query Params**:

- `organizacionId`: ID de organización (requerido)

**Response (200)**:

```json
{
  "tags": [
    {
      "id": "clx...",
      "nombre": "destacado",
      "_count": {
        "testimonios": 15
      }
    }
  ]
}
```

#### POST /api/tags

Crear etiqueta.

**Body**:

```json
{
  "nombre": "nueva-etiqueta",
  "organizacionId": "clx..."
}
```

---

### Endpoints de Medios

#### POST /api/upload

Subir archivo a Cloudinary.

**Body** (multipart/form-data):

```
file: [archivo]
tipo: "imagen" | "video"
```

**Response (201)**:

```json
{
  "url": "https://res.cloudinary.com/...",
  "publicId": "eduvoice/...",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "bytes": 245678
}
```

#### GET /api/medios

Listar medios.

#### DELETE /api/medios/:id

Eliminar medio.

---

### Endpoints de Revisiones

#### GET /api/reviewers

Listar revisiones.

**Query Params**:

- `testimonioId` (opcional): Filtrar por testimonio
- `revisorId` (opcional): Filtrar por revisor

**Response (200)**:

```json
{
  "revisiones": [
    {
      "id": "clx...",
      "decision": "aprobar",
      "notas": "Excelente testimonio",
      "testimonio": {...},
      "revisor": {...},
      "creadoEn": "2024-12-07T10:30:00.000Z"
    }
  ]
}
```

---

## Paginación y Filtros

### Paginación

Endpoints que retornan listas soportan paginación:

**Query Params**:

```
?page=1&limit=20
```

**Response**:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Ordenamiento

```
?sort=creadoEn&order=desc
```

### Filtros

Múltiples filtros se pueden combinar:

```
?estado=publicado&destacado=true&categoriaId=clx...
```

---

## Manejo de Errores

### Formato de Error

```json
{
  "error": "ValidationError",
  "message": "Email ya está en uso",
  "details": [
    {
      "field": "email",
      "message": "Email must be unique"
    }
  ],
  "timestamp": "2024-12-07T10:30:00.000Z"
}
```

### Errores Comunes

#### 400 Bad Request

```json
{
  "error": "BadRequest",
  "message": "Datos inválidos",
  "details": [
    {
      "field": "calificacion",
      "message": "Must be between 1 and 5"
    }
  ]
}
```

#### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Debe iniciar sesión"
}
```

#### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "No tiene permisos para esta acción"
}
```

#### 404 Not Found

```json
{
  "error": "NotFound",
  "message": "Testimonio no encontrado"
}
```

---

## Rate Limiting

_Próximamente_

Límites planificados:

- 100 requests/minuto por IP (público)
- 1000 requests/minuto por usuario autenticado

---

## Ejemplos de Uso

### JavaScript/Fetch

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch(
    "http://localhost:3000/api/auth/signin/credentials",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Importante para cookies
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};

// Obtener testimonios
const getTestimonials = async () => {
  const response = await fetch(
    "http://localhost:3000/api/testimonials?estado=publicado&limit=10"
  );
  const data = await response.json();
  return data.testimonials;
};

// Crear testimonio
const createTestimonio = async (data) => {
  const response = await fetch("http://localhost:3000/api/testimonials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await response.json();
};
```

### cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/signin/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eduvoice.com","password":"admin123"}' \
  -c cookies.txt

# Listar testimonios
curl http://localhost:3000/api/testimonials?estado=publicado

# Crear testimonio
curl -X POST http://localhost:3000/api/testimonials \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "titulo": "Gran experiencia",
    "texto": "Me encantó...",
    "calificacion": 5,
    "personaId": "clx...",
    "categoriaId": "clx..."
  }'
```

### Python/Requests

```python
import requests

# Login
session = requests.Session()
login_data = {
    "email": "admin@eduvoice.com",
    "password": "admin123"
}
response = session.post(
    "http://localhost:3000/api/auth/signin/credentials",
    json=login_data
)

# Listar testimonios
testimonials = session.get(
    "http://localhost:3000/api/testimonials",
    params={"estado": "publicado", "limit": 10}
).json()

# Crear testimonio
new_testimonio = {
    "titulo": "Gran experiencia",
    "texto": "Me encantó...",
    "calificacion": 5,
    "personaId": "clx...",
    "categoriaId": "clx..."
}
response = session.post(
    "http://localhost:3000/api/testimonials",
    json=new_testimonio
)
```

---

## Recursos Adicionales

- 📖 [Swagger UI](http://localhost:3000/api/docs) - Documentación interactiva
- 📖 [Postman Collection](#) - Colección de endpoints (próximamente)
- 💬 [Discord](https://discord.gg/nocountry) - Soporte de la comunidad

---

¿Encontraste un problema o tienes una pregunta? [Abre un issue](https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues).
