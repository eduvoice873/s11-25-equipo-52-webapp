# 🎓 EduVoice CMS

<div align="center">

![EduVoice Logo](public/EduVoiceCMS_logo.png)

**Sistema de Gestión de Testimonios**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Demo](#) · [Documentación](./docs/) · [Reportar Bug](https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues) · [Solicitar Feature](https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías](#-tecnologías)
- [Comenzando](#-comenzando)
  - [Prerrequisitos](#prerrequisitos)
  - [Instalación](#instalación)
  - [Configuración](#configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación](#-documentación)
- [API](#-api)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Equipo](#-equipo)

---

## 🎯 Acerca del Proyecto

**EduVoice CMS** es una plataforma integral de gestión de testimonios diseñada específicamente para instituciones. Permite recolectar, moderar, gestionar y mostrar testimonios de estudiantes, profesores y exalumnos de manera profesional y organizada.

### ¿Por qué EduVoice CMS?

- **Gestión Centralizada**: Administra todos los testimonios de tu institución desde un solo lugar
- **Sistema de Moderación**: Revisa y aprueba testimonios antes de publicarlos
- **Formularios Personalizables**: Crea formularios adaptados a tus necesidades
- **Widgets Embebibles**: Integra testimonios en cualquier sitio web
- **Multi-formato**: Soporte para texto, imágenes y videos
- **Multi-organización**: Ideal para redes educativas

---

## ✨ Características Principales

### 🔐 Gestión de Usuarios y Roles

- Sistema de autenticación robusto con NextAuth
- Roles diferenciados (Admin, Editor)
- Gestión de múltiples organizaciones
- Integración con Google OAuth

### 📝 Sistema de Testimonios

- Creación y edición de testimonios
- Soporte para múltiples formatos (texto, imagen, video)
- Sistema de calificación (estrellas)
- Estados del testimonio: borrador, en revisión, aprobado, publicado
- Etiquetado y categorización
- Historial de cambios

### 🔍 Sistema de Moderación

- Flujo de revisión y aprobación
- Comentarios y notas de revisión
- Decisiones: aprobar, rechazar, solicitar edición
- Trazabilidad completa

### 📋 Formularios Personalizables

- Constructor de formularios dinámico
- Campos configurables (nombre, correo, calificación)
- URLs públicas únicas para cada formulario
- Soporte para preguntas personalizadas
- Página de agradecimiento personalizable

### 🏷️ Organización Flexible

- Categorías personalizadas por organización
- Etiquetas para clasificación adicional
- Espacios de trabajo separados por organización
- Gestión de personas (testificadores)

### 🎨 Widgets y Embeds

- Generador de widgets personalizables
- Widgets embebibles en cualquier sitio web
- Estilos personalizables
- Responsive design
- [Ver documentación de widgets](./docs/WIDGET_GENERATOR.md)

### 📊 API REST Completa

- Documentación interactiva con Swagger
- Endpoints para todas las entidades
- Filtros y búsqueda avanzada
- Paginación y ordenamiento

### ☁️ Gestión de Medios

- Integración con Cloudinary
- Optimización automática de imágenes
- Soporte para videos
- Gestión de metadatos

---

## 🛠️ Tecnologías

### Frontend

- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes UI accesibles
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[SWR](https://swr.vercel.app/)** - React Hooks para data fetching

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - API REST
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticación
- **[Prisma](https://www.prisma.io/)** - ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos
- **[Zod](https://zod.dev/)** - Validación de esquemas

### Herramientas y Servicios

- **[Cloudinary](https://cloudinary.com/)** - Gestión de medios
- **[React Hook Form](https://react-hook-form.com/)** - Gestión de formularios
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de contraseñas
- **[Swagger](https://swagger.io/)** - Documentación de API
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificaciones toast

---

## 🚀 Comenzando

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** >= 18.x
- **pnpm** >= 8.x (recomendado) o npm
- **PostgreSQL** >= 14.x
- **Git**

```bash
# Verificar versiones
node --version
pnpm --version
psql --version
```

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp.git
cd S11-25-Equipo-52-WebApp
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/eduvoice?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/eduvoice?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-muy-seguro-aqui"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Ejecutar migraciones de base de datos**

```bash
pnpm prisma migrate dev
```

5. **Generar el cliente de Prisma**

```bash
pnpm prisma generate
```

6. **(Opcional) Poblar la base de datos con datos de prueba**

```bash
pnpm prisma db seed
```

### Configuración

Para más detalles sobre la configuración, consulta la [Guía de Instalación Completa](./docs/INSTALLATION.md).

---

## 💻 Uso

### Modo Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Modo Producción

```bash
# Build
pnpm build

# Start
pnpm start
```

### Otros Comandos

```bash
# Linting
pnpm lint

# Prisma Studio (GUI para la base de datos)
pnpm prisma studio

# Ver documentación de API
# Navega a http://localhost:3000/api/docs
```

---

## 📁 Estructura del Proyecto

```
S11-25-Equipo-52-WebApp/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── login/                # Página de login
│   │   └── signup/               # Página de registro
│   ├── (dashboard)/              # Rutas del dashboard (protegidas)
│   │   ├── home/                 # Dashboard principal
│   │   ├── users/                # Gestión de usuarios
│   │   ├── categories/           # Gestión de categorías
│   │   ├── gestionTestimonio/    # Gestión de testimonios
│   │   └── widget-generator/     # Generador de widgets
│   ├── api/                      # API Routes
│   │   ├── [...nextauth]/        # Endpoints de autenticación
│   │   ├── testimonials/         # CRUD de testimonios
│   │   ├── categories/           # CRUD de categorías
│   │   ├── users/                # CRUD de usuarios
│   │   ├── formularios/          # Gestión de formularios
│   │   └── ...                   # Otros endpoints
│   ├── landing/                  # Landing page pública
│   ├── testimonios/              # Visualización pública
│   ├── f/[slug]/                 # Formularios públicos
│   └── embed/                    # Widgets embebibles
├── components/                   # Componentes React
│   ├── auth/                     # Componentes de autenticación
│   ├── dashboard/                # Componentes del dashboard
│   ├── testimonial/              # Componentes de testimonios
│   ├── ui/                       # Componentes UI base (Radix)
│   └── widget/                   # Componentes de widgets
├── lib/                          # Utilidades y configuración
│   ├── auth.ts                   # Configuración de NextAuth
│   ├── db.ts                     # Cliente de Prisma
│   └── utils.ts                  # Funciones auxiliares
├── models/                       # Servicios y DTOs
│   ├── category/                 # Lógica de categorías
│   ├── testimonial/              # Lógica de testimonios
│   ├── organization/             # Lógica de organizaciones
│   ├── user/                     # Lógica de usuarios
│   └── zod/                      # Esquemas de validación
├── prisma/                       # ORM y base de datos
│   ├── schema.prisma             # Esquema de la base de datos
│   └── migrations/               # Migraciones
├── docs/                         # Documentación
│   ├── INSTALLATION.md           # Guía de instalación
│   ├── ARCHITECTURE.md           # Arquitectura del sistema
│   ├── API.md                    # Documentación de API
│   ├── DATABASE.md               # Modelos de base de datos
│   ├── DEVELOPMENT.md            # Guía de desarrollo
│   ├── DEPLOYMENT.md             # Guía de deployment
│   ├── WIDGET_GENERATOR.md       # Documentación de widgets
│   └── CONTRIBUTING.md           # Guía de contribución
├── types/                        # Tipos TypeScript globales
├── public/                       # Archivos estáticos
├── .env                          # Variables de entorno (no commitear)
├── next.config.ts                # Configuración de Next.js
├── tailwind.config.js            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── package.json                  # Dependencias del proyecto
```

---

## 📚 Documentación

La documentación completa está disponible en el directorio [`/docs`](./docs/):

- **[Guía de Instalación](./docs/INSTALLATION.md)** - Instalación detallada y configuración
- **[Arquitectura del Sistema](./docs/ARCHITECTURE.md)** - Diseño y estructura del proyecto
- **[Documentación de API](./docs/API.md)** - Endpoints y ejemplos de uso
- **[Guía de Base de Datos](./docs/DATABASE.md)** - Modelos y relaciones
- **[Guía de Desarrollo](./docs/DEVELOPMENT.md)** - Mejores prácticas y convenciones
- **[Guía de Deployment](./docs/DEPLOYMENT.md)** - Deploy en producción
- **[Generador de Widgets](./docs/WIDGET_GENERATOR.md)** - Cómo crear y usar widgets
- **[Guía de Contribución](./docs/CONTRIBUTING.md)** - Cómo contribuir al proyecto

---

## 🔌 API

EduVoice CMS proporciona una API REST completa documentada con Swagger.

### Acceder a la Documentación Interactiva

```
http://localhost:3000/api/docs
```

### Endpoints Principales

#### Testimonios

- `GET /api/testimonials` - Listar testimonios
- `POST /api/testimonials` - Crear testimonio
- `GET /api/testimonials/:id` - Obtener testimonio
- `PUT /api/testimonials/:id` - Actualizar testimonio
- `DELETE /api/testimonials/:id` - Eliminar testimonio
- `PATCH /api/testimonials/:id/moderate` - Moderar testimonio

#### Categorías

- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría
- `GET /api/categories/:id` - Obtener categoría
- `PUT /api/categories/:id` - Actualizar categoría
- `DELETE /api/categories/:id` - Eliminar categoría

#### Usuarios

- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

#### Formularios

- `GET /api/formularios` - Listar formularios
- `POST /api/formularios` - Crear formulario
- `GET /api/formularios/:slug` - Obtener formulario por slug
- `POST /api/formularios/:slug/respuesta` - Enviar respuesta

Para más detalles, consulta la [Documentación Completa de API](./docs/API.md).

---

## 🗺️ Roadmap

### ✅ Fase 1 - Completada

- [x] Sistema de autenticación
- [x] CRUD de testimonios
- [x] Sistema de categorías
- [x] Gestión de usuarios
- [x] Sistema de moderación
- [x] Formularios personalizables
- [x] Generador de widgets

### 🚧 Fase 2 - En Progreso

- [ ] Dashboard con métricas y analytics
- [ ] Sistema de notificaciones en tiempo real
- [ ] Búsqueda avanzada y filtros
- [ ] Exportación de datos (CSV, PDF)
- [ ] Temas personalizables para widgets

### 📋 Fase 3 - Planificado

- [ ] Aplicación móvil
- [ ] Integraciones con CRM
- [ ] Sistema de webhooks
- [ ] Análisis de sentimiento con IA
- [ ] Multi-idioma (i18n)

---

## 🤝 Contribuir

Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Lee nuestra [Guía de Contribución](./docs/CONTRIBUTING.md) para más detalles.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Equipo

### S11-25 Equipo 52

Desarrollado con ❤️ por el equipo de No Country

**Equipo de Desarrollo:**

- 🎨 **Frontend Developers** - Implementación de UI/UX
- ⚙️ **Backend Developers** - API y lógica de negocio
- 🗄️ **Database Architects** - Diseño de base de datos
- 🎭 **UX/UI Designers** - Diseño de interfaces

---

## 📞 Contacto

- **Project Link**: [https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp](https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp)
- **Issues**: [https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues](https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues)

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [No Country](https://www.nocountry.tech/)

---

<div align="center">

**[⬆ Volver arriba](#-eduvoice-cms)**

Hecho con ❤️ para la comunidad educativa

</div>

```
s11-25-equipo-52-webapp
├─ .hintrc
├─ app
│  ├─ (auth)
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ (dashboard)
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ users
│  │     └─ page.tsx
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ organization
│  │  │  │  └─ [organizacionId]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [creadoPorId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ organizations
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [userId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ persons
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ questions
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ users
│  │  │  └─ route.ts
│  │  └─ [...nextauth]
│  │     └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ dashboard-category
│  │  └─ page.tsx
│  ├─ documentation
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ generated
│  ├─ globals.css
│  ├─ guides
│  │  ├─ data.ts
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ landing
│  │  ├─ components
│  │  │  ├─ ApiSection.tsx
│  │  │  ├─ Cta.tsx
│  │  │  ├─ Features.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Prices.tsx
│  │  │  ├─ Problem.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ testimonials-data.ts
│  │  │  ├─ UseCases.tsx
│  │  │  ├─ WallofLove.tsx
│  │  │  └─ WallOfLovePreview.tsx
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ orgs
│  │  ├─ components
│  │  │  └─ OrgWallOfLove.tsx
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pricing
│  │  └─ page.tsx
│  ├─ privacy
│  │  └─ page.tsx
│  ├─ style-guide
│  │  └─ page.tsx
│  ├─ support
│  │  └─ page.tsx
│  ├─ terms
│  │  └─ page.tsx
│  └─ wall-of-love
│     └─ page.tsx
├─ components
│  ├─ auth
│  │  ├─ GoogleBtn.tsx
│  │  ├─ LoginForm.tsx
│  │  ├─ SignoutBtn.tsx
│  │  └─ SignupForm.tsx
│  ├─ dashboard
│  │  └─ DashboardLayout.tsx
│  ├─ ui
│  │  ├─ alert.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ design-system
│  │  │  └─ index.ts
│  │  ├─ dialog.tsx
│  │  ├─ FormField.tsx
│  │  ├─ input.tsx
│  │  ├─ menuItems.tsx
│  │  ├─ navbar.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ SidebarItem.tsx
│  │  ├─ textarea.tsx
│  │  ├─ theme.ts
│  │  └─ typography.tsx
│  └─ users
│     └─ UsersTable.tsx
├─ components.json
├─ eslint.config.mjs
├─ lib
│  ├─ auth.ts
│  ├─ db.ts
│  └─ utils.ts
├─ models
│  ├─ category
│  │  ├─ categoryService.ts
│  │  └─ dto
│  │     └─ category.ts
│  ├─ categoryFull
│  │  ├─ createCategoryFullService.ts
│  │  └─ dto
│  │     └─ categoryFull.ts
│  ├─ organization
│  │  ├─ dto
│  │  │  └─ organization.ts
│  │  └─ organizationService.ts
│  ├─ person
│  │  ├─ dto
│  │  │  └─ person.ts
│  │  └─ personService.ts
│  ├─ question
│  │  ├─ dto
│  │  │  └─ question.ts
│  │  └─ questionService.ts
│  └─ zod
│     └─ auth.ts
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20251111214910_init
│  │  │  └─ migration.sql
│  │  ├─ 20251113163612_eduvoice1
│  │  │  └─ migration.sql
│  │  ├─ 20251117220212_category_to_space
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ EduVoiceCMS_logo.png
│  ├─ EduVoiceCMS_logo.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.js
└─ tsconfig.json

```

```
s11-25-equipo-52-webapp
├─ .hintrc
├─ app
│  ├─ (auth)
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ (dashboard)
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ users
│  │     └─ page.tsx
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ organization
│  │  │  │  └─ [organizacionId]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [creadoPorId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ organizations
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [userId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ persons
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ questions
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ users
│  │  │  └─ route.ts
│  │  └─ [...nextauth]
│  │     └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ dashboard-category
│  │  └─ page.tsx
│  ├─ documentation
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ generated
│  ├─ globals.css
│  ├─ guides
│  │  ├─ data.ts
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ landing
│  │  ├─ components
│  │  │  ├─ ApiSection.tsx
│  │  │  ├─ Cta.tsx
│  │  │  ├─ Features.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Prices.tsx
│  │  │  ├─ Problem.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ testimonials-data.ts
│  │  │  ├─ UseCases.tsx
│  │  │  ├─ WallofLove.tsx
│  │  │  └─ WallOfLovePreview.tsx
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ orgs
│  │  ├─ components
│  │  │  └─ OrgWallOfLove.tsx
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pricing
│  │  └─ page.tsx
│  ├─ privacy
│  │  └─ page.tsx
│  ├─ style-guide
│  │  └─ page.tsx
│  ├─ support
│  │  └─ page.tsx
│  ├─ terms
│  │  └─ page.tsx
│  └─ wall-of-love
│     └─ page.tsx
├─ components
│  ├─ auth
│  │  ├─ GoogleBtn.tsx
│  │  ├─ LoginForm.tsx
│  │  ├─ SignoutBtn.tsx
│  │  └─ SignupForm.tsx
│  ├─ dashboard
│  │  └─ DashboardLayout.tsx
│  ├─ ui
│  │  ├─ alert.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ design-system
│  │  │  └─ index.ts
│  │  ├─ dialog.tsx
│  │  ├─ FormField.tsx
│  │  ├─ input.tsx
│  │  ├─ menuItems.tsx
│  │  ├─ navbar.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ SidebarItem.tsx
│  │  ├─ textarea.tsx
│  │  ├─ theme.ts
│  │  └─ typography.tsx
│  └─ users
│     └─ UsersTable.tsx
├─ components.json
├─ eslint.config.mjs
├─ lib
│  ├─ auth.ts
│  ├─ db.ts
│  └─ utils.ts
├─ models
│  ├─ category
│  │  ├─ categoryService.ts
│  │  └─ dto
│  │     └─ category.ts
│  ├─ categoryFull
│  │  ├─ createCategoryFullService.ts
│  │  └─ dto
│  │     └─ categoryFull.ts
│  ├─ organization
│  │  ├─ dto
│  │  │  └─ organization.ts
│  │  └─ organizationService.ts
│  ├─ person
│  │  ├─ dto
│  │  │  └─ person.ts
│  │  └─ personService.ts
│  ├─ question
│  │  ├─ dto
│  │  │  └─ question.ts
│  │  └─ questionService.ts
│  └─ zod
│     └─ auth.ts
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20251111214910_init
│  │  │  └─ migration.sql
│  │  ├─ 20251113163612_eduvoice1
│  │  │  └─ migration.sql
│  │  ├─ 20251117220212_category_to_space
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ EduVoiceCMS_logo.png
│  ├─ EduVoiceCMS_logo.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
└─ types
   ├─ next-auth.d.ts
   └─ sidebar.ts

```

```
s11-25-equipo-52-webapp
├─ .hintrc
├─ app
│  ├─ (auth)
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ (dashboard)
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ users
│  │     └─ page.tsx
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ organization
│  │  │  │  └─ [organizacionId]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [creadoPorId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ organizations
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [userId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ persons
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ questions
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ users
│  │  │  └─ route.ts
│  │  └─ [...nextauth]
│  │     └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ dashboard-category
│  │  └─ page.tsx
│  ├─ documentation
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ generated
│  ├─ globals.css
│  ├─ guides
│  │  ├─ data.ts
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ landing
│  │  ├─ components
│  │  │  ├─ ApiSection.tsx
│  │  │  ├─ Cta.tsx
│  │  │  ├─ Features.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Prices.tsx
│  │  │  ├─ Problem.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ testimonials-data.ts
│  │  │  ├─ UseCases.tsx
│  │  │  ├─ WallofLove.tsx
│  │  │  └─ WallOfLovePreview.tsx
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ orgs
│  │  ├─ components
│  │  │  └─ OrgWallOfLove.tsx
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pricing
│  │  └─ page.tsx
│  ├─ privacy
│  │  └─ page.tsx
│  ├─ style-guide
│  │  └─ page.tsx
│  ├─ support
│  │  └─ page.tsx
│  ├─ terms
│  │  └─ page.tsx
│  └─ wall-of-love
│     └─ page.tsx
├─ components
│  ├─ auth
│  │  ├─ GoogleBtn.tsx
│  │  ├─ LoginForm.tsx
│  │  ├─ SignoutBtn.tsx
│  │  └─ SignupForm.tsx
│  ├─ dashboard
│  │  └─ DashboardLayout.tsx
│  ├─ ui
│  │  ├─ alert.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ design-system
│  │  │  └─ index.ts
│  │  ├─ dialog.tsx
│  │  ├─ FormField.tsx
│  │  ├─ input.tsx
│  │  ├─ menuItems.tsx
│  │  ├─ navbar.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ SidebarItem.tsx
│  │  ├─ textarea.tsx
│  │  ├─ theme.ts
│  │  └─ typography.tsx
│  └─ users
│     ├─ mockData
│     └─ UsersTable.tsx
├─ components.json
├─ eslint.config.mjs
├─ lib
│  ├─ auth.ts
│  ├─ db.ts
│  └─ utils.ts
├─ models
│  ├─ category
│  │  ├─ categoryService.ts
│  │  └─ dto
│  │     └─ category.ts
│  ├─ categoryFull
│  │  ├─ createCategoryFullService.ts
│  │  └─ dto
│  │     └─ categoryFull.ts
│  ├─ organization
│  │  ├─ dto
│  │  │  └─ organization.ts
│  │  └─ organizationService.ts
│  ├─ person
│  │  ├─ dto
│  │  │  └─ person.ts
│  │  └─ personService.ts
│  ├─ question
│  │  ├─ dto
│  │  │  └─ question.ts
│  │  └─ questionService.ts
│  └─ zod
│     └─ auth.ts
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20251111214910_init
│  │  │  └─ migration.sql
│  │  ├─ 20251113163612_eduvoice1
│  │  │  └─ migration.sql
│  │  ├─ 20251117220212_category_to_space
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ EduVoiceCMS_logo.png
│  ├─ EduVoiceCMS_logo.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
└─ types
   ├─ next-auth.d.ts
   ├─ sidebar.ts
   └─ user.ts

```

```
s11-25-equipo-52-webapp
├─ .hintrc
├─ app
│  ├─ (auth)
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ (dashboard)
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ testimonios
│  │  └─ users
│  │     └─ page.tsx
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ organization
│  │  │  │  └─ [organizacionId]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [creadoPorId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ organizations
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [userId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ persons
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ questions
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ users
│  │  │  └─ route.ts
│  │  └─ [...nextauth]
│  │     └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ dashboard-category
│  │  └─ page.tsx
│  ├─ documentation
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ generated
│  ├─ globals.css
│  ├─ guides
│  │  ├─ data.ts
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ landing
│  │  ├─ components
│  │  │  ├─ ApiSection.tsx
│  │  │  ├─ Cta.tsx
│  │  │  ├─ Features.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Prices.tsx
│  │  │  ├─ Problem.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ testimonials-data.ts
│  │  │  ├─ UseCases.tsx
│  │  │  ├─ WallofLove.tsx
│  │  │  └─ WallOfLovePreview.tsx
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ orgs
│  │  ├─ components
│  │  │  └─ OrgWallOfLove.tsx
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pricing
│  │  └─ page.tsx
│  ├─ privacy
│  │  └─ page.tsx
│  ├─ style-guide
│  │  └─ page.tsx
│  ├─ support
│  │  └─ page.tsx
│  ├─ terms
│  │  └─ page.tsx
│  └─ wall-of-love
│     └─ page.tsx
├─ components
│  ├─ auth
│  │  ├─ GoogleBtn.tsx
│  │  ├─ LoginForm.tsx
│  │  ├─ SignoutBtn.tsx
│  │  └─ SignupForm.tsx
│  ├─ dashboard
│  │  ├─ DashboardLayout.tsx
│  │  └─ EmptyUsers.tsx
│  ├─ ui
│  │  ├─ alert.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ design-system
│  │  │  └─ index.ts
│  │  ├─ dialog.tsx
│  │  ├─ FormField.tsx
│  │  ├─ input.tsx
│  │  ├─ menuItems.tsx
│  │  ├─ navbar.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ SidebarItem.tsx
│  │  ├─ textarea.tsx
│  │  ├─ theme.ts
│  │  └─ typography.tsx
│  └─ users
│     ├─ mockUsers.ts
│     └─ UsersTable.tsx
├─ components.json
├─ eslint.config.mjs
├─ lib
│  ├─ auth.ts
│  ├─ db.ts
│  └─ utils.ts
├─ models
│  ├─ category
│  │  ├─ categoryService.ts
│  │  └─ dto
│  │     └─ category.ts
│  ├─ categoryFull
│  │  ├─ createCategoryFullService.ts
│  │  └─ dto
│  │     └─ categoryFull.ts
│  ├─ organization
│  │  ├─ dto
│  │  │  └─ organization.ts
│  │  └─ organizationService.ts
│  ├─ person
│  │  ├─ dto
│  │  │  └─ person.ts
│  │  └─ personService.ts
│  ├─ question
│  │  ├─ dto
│  │  │  └─ question.ts
│  │  └─ questionService.ts
│  └─ zod
│     └─ auth.ts
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20251111214910_init
│  │  │  └─ migration.sql
│  │  ├─ 20251113163612_eduvoice1
│  │  │  └─ migration.sql
│  │  ├─ 20251117220212_category_to_space
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ EduVoiceCMS_logo.png
│  ├─ EduVoiceCMS_logo.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
└─ types
   ├─ next-auth.d.ts
   ├─ sidebar.ts
   └─ user.ts

```
