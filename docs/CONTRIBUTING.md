# 🤝 Guía de Contribución - EduVoice CMS

## ¡Gracias por tu interés en contribuir!

EduVoice CMS es un proyecto de código abierto y agradecemos todas las contribuciones. Esta guía te ayudará a entender cómo puedes contribuir al proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Contribución](#proceso-de-contribución)
- [Guías de Estilo](#guías-de-estilo)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Pull Requests](#pull-requests)
- [Comunidad](#comunidad)

---

## Código de Conducta

Este proyecto adhiere al [Código de Conducta de Contributor Covenant](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables a los mantenedores del proyecto.

### Nuestro Compromiso

En el interés de fomentar un ambiente abierto y acogedor, nosotros como contribuyentes y mantenedores nos comprometemos a hacer de la participación en nuestro proyecto y nuestra comunidad una experiencia libre de acoso para todos.

### Nuestros Estándares

**Comportamientos que contribuyen a crear un ambiente positivo**:

- Usar lenguaje acogedor e inclusivo
- Ser respetuoso de diferentes puntos de vista y experiencias
- Aceptar críticas constructivas de manera positiva
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

**Comportamientos inaceptables**:

- Uso de lenguaje o imágenes sexualizadas
- Trolling, comentarios insultantes/despectivos
- Acoso público o privado
- Publicar información privada de otros sin permiso
- Otras conductas que podrían considerarse inapropiadas

---

## ¿Cómo puedo contribuir?

Hay muchas formas de contribuir a EduVoice CMS:

### 1. 🐛 Reportar Bugs

Encuentra y reporta errores en el sistema.

### 2. 💡 Sugerir Nuevas Features

Propón nuevas funcionalidades o mejoras.

### 3. 📝 Mejorar la Documentación

Corrige errores, aclara explicaciones, agrega ejemplos.

### 4. 💻 Contribuir con Código

Implementa nuevas features o corrige bugs.

### 5. 🎨 Diseño y UX

Mejora la interfaz de usuario y experiencia.

### 6. 🧪 Testing

Escribe tests o prueba nuevas features.

### 7. 🌍 Traducción

Ayuda a traducir la aplicación a otros idiomas.

### 8. 📢 Difusión

Comparte el proyecto, escribe artículos, haz videos.

---

## Proceso de Contribución

### Para Contribuyentes Primerizos

Si es tu primera contribución, aquí está el proceso paso a paso:

#### 1. Fork del Repositorio

```bash
# En GitHub, click en "Fork" en la esquina superior derecha
```

#### 2. Clonar tu Fork

```bash
git clone https://github.com/TU-USUARIO/S11-25-Equipo-52-WebApp.git
cd S11-25-Equipo-52-WebApp
```

#### 3. Configurar Upstream

```bash
git remote add upstream https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp.git
```

#### 4. Crear una Rama

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear rama de feature
git checkout -b feature/mi-nueva-feature

# O para un bugfix
git checkout -b fix/nombre-del-bug
```

#### 5. Hacer tus Cambios

- Escribe código limpio y bien documentado
- Sigue las [Guías de Estilo](#guías-de-estilo)
- Haz commits pequeños y descriptivos
- Agrega tests si es necesario

#### 6. Commit

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad X"
```

#### 7. Push

```bash
git push origin feature/mi-nueva-feature
```

#### 8. Crear Pull Request

- Ve a tu fork en GitHub
- Click en "Compare & pull request"
- Completa la plantilla de PR
- Espera el review

---

## Guías de Estilo

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

**Tipos**:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, espaciado (sin cambios de código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Mantenimiento, actualizar dependencias
- `perf`: Mejoras de performance

**Ejemplos**:

```bash
feat(testimonios): agregar filtro por estado
fix(auth): corregir validación de email
docs(readme): actualizar instrucciones de instalación
refactor(services): simplificar lógica de testimonios
test(api): agregar tests para endpoint de usuarios
chore(deps): actualizar next.js a v16
```

### Código TypeScript

#### Formato

```typescript
// ✅ Bueno
interface UserProps {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return prisma.user.findUnique({
    where: { id },
  });
}

// ❌ Malo
interface UserProps {
  id: string;
  name: string;
  email: string;
}
function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
```

#### Nombres Descriptivos

```typescript
// ✅ Bueno
const publishedTestimonials = testimonials.filter(
  (t) => t.estado === "publicado"
);
const hasPermission = user.rol === "admin";

// ❌ Malo
const t = testimonials.filter((x) => x.estado === "publicado");
const hp = user.rol === "admin";
```

#### Tipos Explícitos

```typescript
// ✅ Bueno
interface CreateTestimonioProps {
  titulo: string;
  texto: string;
  categoriaId: string;
}

function createTestimonio(data: CreateTestimonioProps): Promise<Testimonio> {
  // ...
}

// ❌ Malo
function createTestimonio(data: any) {
  // ...
}
```

### Componentes React

```typescript
// ✅ Bueno - Props explícitos, return limpio
interface TestimonialCardProps {
  testimonio: Testimonio;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TestimonialCard({
  testimonio,
  onEdit,
  onDelete
}: TestimonialCardProps) {
  return (
    <div className="card">
      <h3>{testimonio.titulo}</h3>
      <p>{testimonio.texto}</p>
      {onEdit && <button onClick={() => onEdit(testimonio.id)}>Editar</button>}
      {onDelete && <button onClick={() => onDelete(testimonio.id)}>Eliminar</button>}
    </div>
  );
}

// ❌ Malo - Sin tipos, props desestructurados en la firma
export function TestimonialCard(props: any) {
  return <div>{props.testimonio.titulo}</div>;
}
```

### Estilos (Tailwind CSS)

```typescript
// ✅ Bueno - Clases organizadas
<div className="
  flex items-center justify-between
  px-4 py-3
  bg-white rounded-lg shadow
  hover:shadow-md transition-shadow
">
  {/* Contenido */}
</div>

// ❌ Malo - Todas en una línea
<div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
```

### Comentarios

```typescript
// ✅ Bueno - Explica el "por qué"
// Usamos un delay para evitar rate limiting de la API
await sleep(1000);

// ❌ Malo - Explica el "qué" (obvio del código)
// Incrementa i en 1
i++;
```

---

## Reportar Bugs

### Antes de Reportar

1. **Busca en issues existentes** para ver si ya fue reportado
2. **Verifica** que estás usando la última versión
3. **Reproduce** el bug en un entorno limpio
4. **Recopila** información sobre el problema

### Template de Bug Report

Al crear un issue de bug, incluye:

```markdown
## Descripción del Bug

[Descripción clara y concisa del bug]

## Pasos para Reproducir

1. Ve a '...'
2. Haz click en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado

[Qué esperabas que sucediera]

## Comportamiento Actual

[Qué sucedió en realidad]

## Screenshots

[Si aplica, agrega screenshots]

## Entorno

- OS: [ej. Windows 11]
- Navegador: [ej. Chrome 120]
- Versión de Node: [ej. 20.10.0]
- Versión de EduVoice: [ej. 0.1.0]

## Contexto Adicional

[Cualquier otra información relevante]

## Logs de Error
```

[Pega aquí los logs de error]

```

```

### Ejemplo de Buen Bug Report

```markdown
## Descripción del Bug

Al intentar subir una imagen en el formulario de testimonio, la imagen no se sube y muestra un error de Cloudinary.

## Pasos para Reproducir

1. Ir a /dashboard/testimonios/nuevo
2. Completar el formulario
3. Hacer click en "Subir Imagen"
4. Seleccionar una imagen JPG de 2MB
5. Hacer click en "Guardar"

## Comportamiento Esperado

La imagen debería subirse a Cloudinary y guardarse el testimonio.

## Comportamiento Actual

Muestra error: "Failed to upload to Cloudinary: Invalid signature"

## Entorno

- OS: Windows 11
- Navegador: Chrome 120.0.6099.130
- Node: 20.10.0

## Logs de Error
```

Error: Cloudinary upload failed
at uploadImage (/app/api/upload/route.ts:45:11)

```

```

---

## Sugerir Mejoras

### Template de Feature Request

```markdown
## Feature Propuesto

[Descripción clara y concisa del feature]

## Problema que Resuelve

[Explica qué problema resuelve este feature]

## Solución Propuesta

[Describe cómo funcionaría el feature]

## Alternativas Consideradas

[Otras soluciones que consideraste]

## Información Adicional

[Screenshots, mockups, ejemplos de otros sistemas]

## Prioridad

- [ ] Alta (crítico para el proyecto)
- [ ] Media (importante pero no urgente)
- [ ] Baja (nice to have)
```

### Ejemplo de Buena Feature Request

```markdown
## Feature Propuesto

Sistema de notificaciones por email cuando un testimonio es aprobado/rechazado.

## Problema que Resuelve

Actualmente, los usuarios no reciben feedback automático sobre el estado de sus testimonios. Deben volver a la plataforma para verificar manualmente.

## Solución Propuesta

1. Integrar servicio de email (SendGrid, Resend)
2. Crear templates de email
3. Enviar email cuando el estado cambia a "aprobado" o "rechazado"
4. Incluir enlace al testimonio
5. Agregar preferencias de notificación en perfil de usuario

## Alternativas Consideradas

- Notificaciones in-app (más complejo)
- Webhooks (para integraciones avanzadas)

## Prioridad

- [x] Media (importante pero no urgente)
```

---

## Pull Requests

### Checklist Antes de Crear un PR

- [ ] He leído y seguido las guías de contribución
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests (si aplica)
- [ ] Todos los tests pasan localmente
- [ ] No hay conflictos con la rama main

### Template de Pull Request

```markdown
## Descripción

[Descripción clara de los cambios]

## Tipo de Cambio

- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (cambio que rompe compatibilidad)
- [ ] Documentación

## ¿Cómo se ha Testeado?

[Describe las pruebas realizadas]

## Screenshots (si aplica)

[Agrega screenshots de los cambios visuales]

## Checklist

- [ ] Mi código sigue las convenciones del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests
- [ ] Todos los tests pasan

## Issues Relacionados

Closes #[número del issue]
```

### Proceso de Review

1. **Automated Checks**: GitHub Actions ejecuta linting y tests
2. **Code Review**: Un mantenedor revisa el código
3. **Cambios Solicitados**: Si hay sugerencias, realiza los cambios
4. **Aprobación**: El PR es aprobado
5. **Merge**: El PR se mergea a main

### Responder a Reviews

```markdown
# ✅ Buena Respuesta

Gracias por la sugerencia. He actualizado el código para usar `useMemo` como indicaste.
Ver commit abc123.

# ❌ Mala Respuesta

No creo que sea necesario.
```

---

## Áreas que Necesitan Ayuda

### 🔴 Alta Prioridad

- [ ] Tests unitarios y de integración
- [ ] Documentación de API
- [ ] Performance optimization
- [ ] Accesibilidad (a11y)

### 🟡 Media Prioridad

- [ ] Internacionalización (i18n)
- [ ] Dark mode
- [ ] Más opciones de personalización de widgets
- [ ] Dashboard con analytics

### 🟢 Baja Prioridad

- [ ] Integración con más OAuth providers
- [ ] Aplicación móvil
- [ ] Más templates de emails
- [ ] Exportación de datos

---

## Guía para Mantenedores

### Merging PRs

```bash
# Actualizar main
git checkout main
git pull upstream main

# Mergear PR (squash)
git merge --squash feature/nueva-feature
git commit -m "feat: agregar nueva feature (#123)"
git push upstream main
```

### Release Process

1. Actualizar versión en `package.json`
2. Crear CHANGELOG
3. Crear tag: `git tag v1.0.0`
4. Push tags: `git push --tags`
5. Crear release en GitHub

---

## Comunidad

### Canales de Comunicación

- **GitHub Issues**: Para bugs y features
- **GitHub Discussions**: Para preguntas y discusiones
- **Discord**: Para chat en tiempo real
- **Email**: Para asuntos privados

### Recursos Útiles

- 📖 [Documentación](./docs/)
- 🎓 [Guía de Desarrollo](./docs/DEVELOPMENT.md)
- 🏗️ [Arquitectura](./docs/ARCHITECTURE.md)
- 🔌 [API Docs](./docs/API.md)

### Contributors

¡Gracias a todos los que han contribuido! 🎉

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Esto se puede automatizar con all-contributors -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## Preguntas Frecuentes

### ¿Puedo trabajar en un issue que ya está asignado?

No, por favor elige otro issue o espera a que esté disponible.

### ¿Cuánto tiempo toma que mi PR sea revisado?

Generalmente 2-5 días. Si ha pasado más tiempo, menciona a un mantenedor.

### ¿Qué pasa si mi PR es rechazado?

No te desanimes. Puede haber razones válidas. Lee el feedback y aprende de la experiencia.

### ¿Puedo contribuir si soy principiante?

¡Absolutamente! Busca issues etiquetados con `good first issue` o `help wanted`.

### ¿Necesito permiso para trabajar en un issue?

Para issues pequeños, no. Para features grandes, comenta en el issue primero.

---

## Licencia

Al contribuir a EduVoice CMS, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto (MIT License).

---

## Agradecimientos

Gracias por considerar contribuir a EduVoice CMS. Cada contribución, sin importar cuán pequeña, es valiosa y apreciada. ¡Juntos hacemos un mejor producto! 🚀

---

**¿Tienes preguntas?** [Abre un issue](https://github.com/No-Country-simulation/S11-25-Equipo-52-WebApp/issues) o contáctanos en Discord.

**¡Feliz coding!** 💻✨
