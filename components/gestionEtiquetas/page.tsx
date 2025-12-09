"use client";

import { Plus, Pencil, Trash2, X, Check, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGestionEtiquetas } from "@/hooks/swr/useEtiquetas";

export default function GestionEtiquetas() {
  const {
    tags,
    loading,
    isDialogOpen,
    editingTag,
    tagName,
    submitting,
    setTagName,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDelete,
  } = useGestionEtiquetas();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Gestión de Etiquetas
              </h1>
              <p className="text-gray-600 mt-1">
                Administra las etiquetas para organizar tus testimonios
              </p>
            </div>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva Etiqueta
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {!loading && tags.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-l-4 border-l-blue-600 shadow-sm">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">
                  Total de Etiquetas
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {tags.length}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-green-600 shadow-sm">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">
                  Etiquetas en Uso
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {tags.filter((e) => (e._count?.testimonios || 0) > 0).length}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-orange-600 shadow-sm">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">
                  Total Testimonios
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {tags.reduce((sum, e) => sum + (e._count?.testimonios || 0), 0)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Todas las Etiquetas
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600">
                  Lista completa de etiquetas disponibles
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Cargando etiquetas...</p>
              </div>
            ) : tags.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Tag className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay etiquetas creadas aún
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  Comienza creando tu primera etiqueta para organizar mejor tus
                  testimonios
                </p>
                <Button
                  onClick={() => handleOpenDialog()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Crear primera etiqueta
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">
                        Nombre
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Testimonios
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">
                        Acciones
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tags.map((tag) => (
                      <TableRow
                        key={tag.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-100 rounded">
                              <Tag className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">
                              {tag.nombre}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
                          >
                            {tag._count?.testimonios || 0}{" "}
                            {tag._count?.testimonios === 1 ? "testimonio" : "testimonios"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(tag)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(tag.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag className="w-5 h-5 text-blue-600" />
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {editingTag ? "Editar Etiqueta" : "Nueva Etiqueta"}
                </DialogTitle>
              </div>
              <DialogDescription className="text-gray-600">
                {editingTag
                  ? "Modifica el nombre de la etiqueta existente"
                  : "Crea una nueva etiqueta para organizar tus testimonios"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <Label
                htmlFor="nombre"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Nombre de la Etiqueta
              </Label>
              <Input
                id="nombre"
                placeholder="Ej: Graduación, Servicio al Cliente, Producto..."
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !submitting && tagName.trim()) {
                    handleSubmit();
                  }
                }}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                autoFocus
              />
              <p className="text-sm text-gray-500 mt-2">
                El nombre debe ser descriptivo y único
              </p>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                disabled={submitting}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !tagName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {editingTag ? "Actualizar" : "Crear"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
