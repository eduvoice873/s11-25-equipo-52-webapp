# 🏗️ Arquitectura de EduVoice CMS

## Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Stack Tecnológico](#stack-tecnológico)
- [Capas de la Aplicación](#capas-de-la-aplicación)
- [Patrones de Diseño](#patrones-de-diseño)
- [Flujo de Datos](#flujo-de-datos)
- [Seguridad](#seguridad)
- [Escalabilidad](#escalabilidad)

---

## Visión General

EduVoice CMS está construido con una arquitectura moderna basada en Next.js 16, utilizando el App Router y Server Components. La aplicación sigue una arquitectura de capas bien definida que separa las responsabilidades y facilita el mantenimiento y la escalabilidad.

### Principios Arquitectónicos

1. **Separation of Concerns**: Cada capa tiene responsabilidades bien definidas
2. **Single Responsibility**: Los componentes y servicios tienen una única razón para cambiar
3. **DRY (Don't Repeat Yourself)**: Reutilización de código a través de servicios y componentes
4. **API First**: La API REST es independiente del frontend
5. **Type Safety**: TypeScript en toda la aplicación para prevenir errores
6. **Progressive Enhancement**: Funcionalidad básica sin JavaScript, mejorada con interactividad

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐│
│  │   Navegador     │  │   Widget JS     │  │  Mobile App ││
│  │   Web App       │  │   (Embed)       │  │  (Futuro)   ││
│  └─────────────────┘  └─────────────────┘  └─────────────┘│
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CAPA DE PRESENTACIÓN                    │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Pages     │  │ Components │  │   Layouts  │    │  │
│  │  │  (RSC)     │  │  (Client)  │  │   (RSC)    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ▼                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  API LAYER                           │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐  │  │
│  │  │  API Routes    │  │  Server Actions          │  │  │
│  │  │  (REST)        │  │  (Form Handling)         │  │  │
│  │  └────────────────┘  └──────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ▼                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CAPA DE NEGOCIO                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Services  │  │    DTOs    │  │ Validators │    │  │
│  │  │            │  │            │  │   (Zod)    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ▼                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           CAPA DE ACCESO A DATOS                     │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │         Prisma ORM (Client)                    │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    INFRAESTRUCTURA                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │ PostgreSQL │  │ Cloudinary │  │  NextAuth          │   │
│  │    DB      │  │   CDN      │  │  (OAuth)           │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológico

### Frontend

- **Next.js 16.0.7**: Framework React con App Router y Server Components
- **React 19.2.0**: Biblioteca UI con Server Components
- **TypeScript 5.x**: Lenguaje con tipado estático
- **Tailwind CSS 3.x**: Framework CSS utility-first
- **Radix UI**: Componentes UI primitivos accesibles
- **React Hook Form**: Gestión de formularios con validación
- **SWR**: React Hooks para data fetching con caché

### Backend

- **Next.js API Routes**: Endpoints REST
- **NextAuth.js 5.0**: Autenticación y autorización
- **Prisma 6.19**: ORM moderno para TypeScript
- **Zod 4.x**: Validación de esquemas y tipos
- **Bcrypt**: Hash de contraseñas

### Base de Datos

- **PostgreSQL 14+**: Base de datos relacional
- **Prisma Migrations**: Control de versiones del esquema

### Servicios Externos

- **Cloudinary**: Almacenamiento y optimización de medios
- **Google OAuth**: Autenticación social
- **Vercel** (opcional): Plataforma de deployment

### Herramientas de Desarrollo

- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Prisma Studio**: GUI para base de datos
- **Swagger**: Documentación de API

---

## Capas de la Aplicación

### 1. Capa de Presentación

**Responsabilidad**: Renderizar la interfaz de usuario y manejar interacciones del usuario.

#### Server Components (RSC)

- **Ubicación**: `app/**/page.tsx`, `app/**/layout.tsx`
- **Características**:
  - Se ejecutan en el servidor
  - Acceso directo a la base de datos
  - No envían JavaScript al cliente
  - Ideal para contenido estático y datos iniciales

```typescript
// Ejemplo: app/(dashboard)/testimonios/page.tsx
import { auth } from '@/lib/auth';
import { getTestimonios } from '@/models/testimonial/testimonialService';

export default async function TestimoniosPage() {
  const session = await auth();
  const testimonios = await getTestimonios(session.user.organizacionId);

  return (
    <TestimoniosList testimonios={testimonios} />
  );
}
```

#### Client Components

- **Ubicación**: `components/**/*.tsx`
- **Características**:
  - Interactividad (onClick, onChange, etc.)
  - Hooks de React (useState, useEffect, etc.)
  - Acceso a APIs del navegador
  - Marcados con `"use client"`

```typescript
// Ejemplo: components/testimonial/TestimonioCard.tsx
'use client';

import { useState } from 'react';

export function TestimonioCard({ testimonio }) {
  const [liked, setLiked] = useState(false);

  return (
    <div onClick={() => setLiked(!liked)}>
      {/* ... */}
    </div>
  );
}
```

### 2. Capa de API

**Responsabilidad**: Exponer endpoints REST para operaciones CRUD y lógica de negocio.

#### API Routes

- **Ubicación**: `app/api/**/route.ts`
- **Características**:
  - Handlers HTTP (GET, POST, PUT, DELETE, PATCH)
  - Validación de entrada con Zod
  - Autenticación y autorización
  - Manejo de errores

```typescript
// Ejemplo: app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createTestimonio } from "@/models/testimonial/testimonialService";
import { CreateTestimonioSchema } from "@/models/zod/testimonial";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = CreateTestimonioSchema.parse(body);

    const testimonio = await createTestimonio(validated);

    return NextResponse.json(testimonio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
```

#### Server Actions

- **Ubicación**: Archivos con `"use server"`
- **Características**:
  - Funciones que se ejecutan en el servidor
  - Integradas con formularios
  - Revalidación automática de caché

```typescript
// Ejemplo: app/formulario/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createRespuesta } from "@/models/respuesta/respuestaService";

export async function submitFormulario(formData: FormData) {
  const respuesta = await createRespuesta({
    nombre: formData.get("nombre"),
    correo: formData.get("correo"),
    // ...
  });

  revalidatePath("/testimonios");
  return respuesta;
}
```

### 3. Capa de Negocio

**Responsabilidad**: Lógica de negocio, validaciones y transformaciones de datos.

#### Services

- **Ubicación**: `models/**/[entity]Service.ts`
- **Características**:
  - Operaciones CRUD
  - Lógica de negocio compleja
  - Transformaciones de datos
  - Transacciones

```typescript
// Ejemplo: models/testimonial/testimonialService.ts
import prisma from "@/lib/db";
import { Testimonio, CreateTestimonioDTO } from "./dto/testimonio";

export async function createTestimonio(
  data: CreateTestimonioDTO
): Promise<Testimonio> {
  // Validaciones de negocio
  if (data.calificacion < 1 || data.calificacion > 5) {
    throw new Error("La calificación debe estar entre 1 y 5");
  }

  // Lógica de negocio
  const testimonio = await prisma.testimonio.create({
    data: {
      ...data,
      estado: "borrador",
      creadoEn: new Date(),
    },
    include: {
      persona: true,
      categoria: true,
    },
  });

  return testimonio;
}

export async function moderateTestimonio(
  id: string,
  decision: "aprobar" | "rechazar",
  notas?: string
): Promise<Testimonio> {
  return await prisma.$transaction(async (tx) => {
    // Actualizar testimonio
    const testimonio = await tx.testimonio.update({
      where: { id },
      data: {
        estado: decision === "aprobar" ? "aprobado" : "rechazado",
      },
    });

    // Crear registro de revisión
    await tx.revision.create({
      data: {
        testimonioId: id,
        decision,
        notas,
      },
    });

    return testimonio;
  });
}
```

#### DTOs (Data Transfer Objects)

- **Ubicación**: `models/**/dto/*.ts`
- **Características**:
  - Interfaces TypeScript
  - Definición de estructuras de datos
  - Separación entre modelo de DB y API

```typescript
// Ejemplo: models/testimonial/dto/testimonio.ts
export interface Testimonio {
  id: string;
  titulo: string;
  texto: string;
  calificacion: number;
  estado: EstadoTestimonio;
  persona: Persona;
  categoria: Categoria;
  medios: Medio[];
  creadoEn: Date;
  actualizadoEn: Date;
}

export interface CreateTestimonioDTO {
  titulo: string;
  texto: string;
  calificacion: number;
  personaId: string;
  categoriaId: string;
}

export interface UpdateTestimonioDTO extends Partial<CreateTestimonioDTO> {
  id: string;
}
```

#### Validadores (Zod)

- **Ubicación**: `models/zod/*.ts`
- **Características**:
  - Esquemas de validación
  - Type inference automático
  - Mensajes de error personalizados

```typescript
// Ejemplo: models/zod/testimonial.ts
import { z } from "zod";

export const CreateTestimonioSchema = z.object({
  titulo: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200),
  texto: z.string().min(10).max(2000).optional(),
  calificacion: z.number().int().min(1).max(5),
  personaId: z.string().uuid(),
  categoriaId: z.string().uuid(),
});

export type CreateTestimonioInput = z.infer<typeof CreateTestimonioSchema>;
```

### 4. Capa de Acceso a Datos

**Responsabilidad**: Interacción con la base de datos.

#### Prisma Client

- **Ubicación**: `lib/db.ts`
- **Características**:
  - Cliente singleton
  - Type-safe queries
  - Migraciones automáticas
  - Relaciones y joins

```typescript
// lib/db.ts
import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

---

## Patrones de Diseño

### 1. Repository Pattern

Los servicios actúan como repositorios que encapsulan el acceso a datos.

### 2. DTO Pattern

Los DTOs separan las estructuras de datos de la API de las entidades de base de datos.

### 3. Service Layer Pattern

La lógica de negocio está centralizada en servicios reutilizables.

### 4. Factory Pattern

Uso de funciones factory para crear instancias de objetos complejos.

### 5. Singleton Pattern

El cliente de Prisma es un singleton para evitar múltiples conexiones.

### 6. Middleware Pattern

NextAuth y otros middlewares para interceptar y procesar requests.

---

## Flujo de Datos

### Flujo de Lectura (Server Component)

```
1. Usuario accede a la página
2. Next.js ejecuta Server Component
3. Server Component llama al Service
4. Service consulta Prisma
5. Prisma consulta PostgreSQL
6. Datos retornan a través de las capas
7. Server Component renderiza HTML
8. HTML se envía al cliente
```

### Flujo de Escritura (Client Component + API)

```
1. Usuario interactúa con formulario
2. Client Component valida datos
3. Client Component hace fetch a API Route
4. API Route valida con Zod
5. API Route llama al Service
6. Service ejecuta lógica de negocio
7. Service actualiza vía Prisma
8. Prisma actualiza PostgreSQL
9. Respuesta retorna a través de las capas
10. Client Component actualiza UI
```

### Flujo de Autenticación

```
1. Usuario intenta acceder a recurso protegido
2. Middleware verifica sesión con NextAuth
3. Si no hay sesión, redirige a /login
4. Usuario ingresa credenciales
5. NextAuth valida contra base de datos
6. Si válido, crea sesión con JWT
7. Cookie de sesión se establece
8. Usuario es redirigido al recurso
```

---

## Seguridad

### 1. Autenticación

- NextAuth.js con múltiples providers
- JWT para tokens de sesión
- Refresh tokens para sesiones largas
- Hash de contraseñas con bcrypt (10 rounds)

### 2. Autorización

- Role-Based Access Control (RBAC)
- Roles: `admin`, `editor`
- Middleware para proteger rutas
- Verificación de permisos en cada endpoint

### 3. Validación de Datos

- Validación en cliente con React Hook Form
- Validación en servidor con Zod
- Sanitización de inputs
- Prevención de SQL Injection (Prisma)

### 4. Protección CSRF

- Tokens CSRF en formularios
- SameSite cookies
- Verificación de origen

### 5. Seguridad de API

- Rate limiting (futuro)
- CORS configurado
- Headers de seguridad
- HTTPS en producción

### 6. Protección de Datos

- Encriptación en tránsito (HTTPS)
- Encriptación en reposo (PostgreSQL)
- Backup regular de base de datos
- No exposición de información sensible en logs

---

## Escalabilidad

### Horizontal Scaling

- Aplicación stateless (excepto sesiones en DB)
- Load balancer compatible
- CDN para assets estáticos (Cloudinary)

### Vertical Scaling

- Optimización de queries con Prisma
- Índices en base de datos
- Caching con SWR en cliente
- Next.js caching en servidor

### Database Scaling

- Connection pooling con Prisma
- Read replicas (futuro)
- Índices optimizados
- Particionamiento (futuro)

### Performance Optimization

- Server Components para reducir JavaScript
- Image optimization con next/image
- Code splitting automático
- Lazy loading de componentes
- ISR (Incremental Static Regeneration) para páginas públicas

---

## Diagrama de Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND                                 │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Dashboard   │  │  Landing     │  │  Testimonios    │  │
│  │  (Protected) │  │  (Public)    │  │  (Public/Embed) │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│         │                  │                    │           │
│         └──────────────────┴────────────────────┘           │
│                            │                                │
│                    ┌───────▼────────┐                      │
│                    │   API Gateway   │                      │
│                    │  (API Routes)   │                      │
│                    └───────┬────────┘                      │
└────────────────────────────┼──────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────┐
│                    SERVICES                                │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │ Testimonial  │  │  Category    │  │  Organization   │ │
│  │  Service     │  │  Service     │  │   Service       │ │
│  └──────────────┘  └──────────────┘  └─────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │    User      │  │  Formulario  │  │   Moderación    │ │
│  │  Service     │  │  Service     │  │   Service       │ │
│  └──────────────┘  └──────────────┘  └─────────────────┘ │
└────────────────────────────┬──────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  Prisma Client   │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   PostgreSQL     │
                    │    Database      │
                    └──────────────────┘
```

---

## Conclusión

La arquitectura de EduVoice CMS está diseñada para ser:

- **Mantenible**: Código organizado y fácil de entender
- **Escalable**: Preparada para crecer con la demanda
- **Segura**: Protección en todas las capas
- **Performante**: Optimizada para velocidad
- **Extensible**: Fácil de agregar nuevas funcionalidades

Esta arquitectura proporciona una base sólida para el desarrollo continuo y la evolución del sistema.
