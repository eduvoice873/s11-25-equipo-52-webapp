# 🎓 EduVoice CMS

<div align="center">

<img src="public/EduVoiceCMS_logo.png" alt="EduVoice Logo" width="200"/>

### Gestión Inteligente de Testimonios para Instituciones Educativas

<p align="center">
  <a href="https://eduvoicecms.vercel.app/">Ver Demo en Vivo</a> •
  <a href="./docs/">Documentación</a> •
  <a href="https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues">Reportar Bug</a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNo-Country-simulation%2FS11-25-Equipo-52-WebApp)

</div>

---

## 📖 Tabla de Contenidos

- [🎯 Acerca del Proyecto](#-acerca-del-proyecto)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)
- [✨ Características](#-características-principales)
- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [🚀 Instalación y Setup](#-instalación-y-setup)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔌 API Reference](#-api-reference)
- [👥 Equipo](#-equipo)

---

## 🎯 Acerca del Proyecto

**EduVoice CMS** es la solución definitiva para centralizar la "prueba social" (social proof) de instituciones educativas. Permite recolectar, moderar y exhibir testimonios de estudiantes, profesores y exalumnos de manera profesional.

El problema que resolvemos es la dispersión de opiniones: EduVoice unifica todo en un dashboard intuitivo y ofrece widgets listos para integrar en cualquier LMS o sitio web institucional.

---

## 📸 Capturas de Pantalla

|        Dashboard Principal         |         Gestión de Testimonios         |
| :--------------------------------: | :------------------------------------: |
| ![Dashboard](public/dashboard.jpg) | ![Testimonios](public/testimonios.jpg) |
|    _Vista general de métricas_     |        _Moderación y filtrado_         |

---

## ✨ Características Principales

### 🔐 Administración y Seguridad

- **Roles y Permisos:** Sistema robusto con NextAuth (Admin/Editor).
- **Multi-Organización:** Gestiona múltiples sedes o departamentos.
- **Moderación:** Flujo de aprobación (Pendiente -> Aprobado -> Publicado).

### 📝 Recolección de Feedback

- **Multi-formato:** Soporte para Texto, Imagen y Video (vía Cloudinary).
- **Formularios Dinámicos:** Crea URLs únicas para campañas específicas.
- **Personalización:** Adapta los campos según la necesidad.

### 🎨 Integración Frontend

- **Widgets Embebibles:** Generador de código `<iframe>` o React component.
- **Diseño Responsive:** Se adapta a móviles y escritorio.
- **Voice Hub:** Muro de testimonios tipo "grid" o "carrusel".

---

## 🛠️ Stack Tecnológico

**Core:**

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + Radix UI
- **Iconos:** Lucide React

**Backend & Data:**

- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** NextAuth.js v5
- **Validación:** Zod

**Infraestructura:**

- **Media:** Cloudinary
- **Deploy:** Vercel

---

## 🚀 Instalación y Setup

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

- Node.js >= 20.x
- pnpm (recomendado)
- PostgreSQL local o remoto (ej. Neon, Supabase)

### 2. Clonar e Instalar

```bash
git clone https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp.git
cd S11-25-Equipo-52-WebApp
pnpm install
```

### 3. Variables de Entorno

Crea un archivo `.env` en la raíz basado en el siguiente ejemplo:

```env
# Base de Datos
DATABASE_URL="postgresql://user:pass@localhost:5432/eduvoice"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-key"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Cloudinary (Imágenes/Video)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### 4. Base de Datos

```bash
pnpm prisma migrate dev  # Crea las tablas
pnpm prisma generate     # Genera el cliente
pnpm prisma db seed      # (Opcional) Datos de prueba
```

### 5. Ejecutar

```bash
pnpm dev
```

Visita `http://localhost:3000`.

---

## 📂 Estructura del Proyecto

Resumen de los directorios más importantes:

```
/app
  ├── (auth)/           # Login y Registro
  ├── (dashboard)/      # Panel de administración (Protegido)
  ├── api/              # Endpoints REST (Next.js API Routes)
  ├── f/[slug]/         # Formularios públicos de recolección
  └── embed/            # Widgets para sitios externos
/components
  ├── ui/               # Componentes base (Botones, Inputs)
  └── dashboard/        # Componentes específicos del panel
/lib                    # Utilidades (DB connection, Auth config)
/prisma                 # Schema.prisma y migraciones
/docs                   # Documentación extendida
```

---

## 🔌 API Reference

El proyecto incluye documentación interactiva generada con Swagger.

- **URL Local:** `http://localhost:3000/api/docs`
- **Endpoints Clave:**
  - `GET /api/testimonials`
  - `POST /api/formularios/:slug/respuesta`
  - `GET /api/widgets/:id`

👉 [Ver Documentación Completa de API](./docs/API.md)

---

## 👥 Equipo

Este proyecto fue desarrollado durante la simulación de **No Country** (Cohorte S11-25).

| Rol                         | Nombre                | GitHub                            |
| :-------------------------- | :----------           | :-----------------------------    | 
|**Frontend Developer**       | *Aracely Cruz*        | [Link](https://github.com/aracely33) |
| **Frontend Developer**      | *Lidia Alicia*        | [Link](https://github.com/LidiaAliciaJG) |
| **Frontend Developer**      | *Alejandro Anchundia* | [Link](https://github.com/anchundiatech) |
| **Backend Developer**       | *SergioSergio Zuñiga* | [Link](https://github.com/SergioZF09) |
| **Teste QA**                      | *Aura Manjarrés*

---

<div align="center">
  <small>Desarrollado con ❤️ por el Equipo 52 - No Country Simulation</small>
</div>
