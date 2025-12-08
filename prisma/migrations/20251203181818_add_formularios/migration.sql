-- CreateTable
CREATE TABLE "Formulario" (
    "id" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "creadoPorId" TEXT NOT NULL,
    "nombreFormulario" TEXT NOT NULL,
    "descripcion" TEXT,
    "slugPublico" TEXT NOT NULL,
    "pedirNombre" BOOLEAN NOT NULL DEFAULT true,
    "pedirCorreo" BOOLEAN NOT NULL DEFAULT true,
    "permitirTexto" BOOLEAN NOT NULL DEFAULT true,
    "permitirTextoImagen" BOOLEAN NOT NULL DEFAULT false,
    "permitirVideo" BOOLEAN NOT NULL DEFAULT false,
    "mensajeGracias" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreguntaFormulario" (
    "id" TEXT NOT NULL,
    "formularioId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'texto',
    "requerida" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "opciones" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreguntaFormulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespuestaFormulario" (
    "id" TEXT NOT NULL,
    "formularioId" TEXT NOT NULL,
    "personaId" TEXT,
    "nombreCompleto" TEXT,
    "correo" TEXT,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL DEFAULT 5,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RespuestaFormulario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Formulario_slugPublico_key" ON "Formulario"("slugPublico");

-- CreateIndex
CREATE INDEX "Formulario_organizacionId_idx" ON "Formulario"("organizacionId");

-- CreateIndex
CREATE INDEX "Formulario_categoriaId_idx" ON "Formulario"("categoriaId");

-- CreateIndex
CREATE INDEX "Formulario_creadoPorId_idx" ON "Formulario"("creadoPorId");

-- CreateIndex
CREATE UNIQUE INDEX "Formulario_slugPublico_organizacionId_key" ON "Formulario"("slugPublico", "organizacionId");

-- CreateIndex
CREATE INDEX "PreguntaFormulario_formularioId_idx" ON "PreguntaFormulario"("formularioId");

-- CreateIndex
CREATE INDEX "RespuestaFormulario_formularioId_idx" ON "RespuestaFormulario"("formularioId");

-- CreateIndex
CREATE INDEX "RespuestaFormulario_personaId_idx" ON "RespuestaFormulario"("personaId");

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntaFormulario" ADD CONSTRAINT "PreguntaFormulario_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaFormulario" ADD CONSTRAINT "RespuestaFormulario_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaFormulario" ADD CONSTRAINT "RespuestaFormulario_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;
