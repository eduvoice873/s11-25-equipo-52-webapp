
"use client";

import { usePerfil } from "@/hooks/swr/usePerfil";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfileCard() {
  const { perfil, isLoading, isError, error, updatePerfil, refreshPerfil } = usePerfil();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    activo: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Verificar si el usuario es editor
  const isEditor = (session?.user as any)?.rol === "editor";

  // Refrescar perfil cuando el componente monta
  useEffect(() => {
    refreshPerfil();
  }, [perfil, isLoading, isError, error]);

  // Inicializar formulario cuando carga el perfil
  const handleEditClick = () => {
    if (perfil) {
      setFormData({
        name: perfil.name || "",
        password: "",
        activo: perfil.activo ?? true,
      });
      setIsEditing(true);
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Enviar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      // Validar que el nombre no esté vacío
      if (!formData.name || formData.name.trim().length < 2) {
        setSubmitError("El nombre debe tener al menos 2 caracteres");
        setIsSubmitting(false);
        return;
      }

      // Solo enviar campos que no estén vacíos
      const dataToUpdate: any = {
        name: formData.name.trim(),
        activo: formData.activo,
      };

      // Si se ingresó contraseña, incluirla
      if (formData.password) {
        dataToUpdate.password = formData.password;
      }

      await updatePerfil(dataToUpdate);
      setSubmitSuccess(true);
      setIsEditing(false);

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      let errorMessage = "Error al actualizar el perfil";

      if (err instanceof Error) {
        errorMessage = err.message;

        // Si el error contiene detalles de validación, mejorar el mensaje
        if (errorMessage.includes("Datos inválidos")) {
          errorMessage = "Por favor verifica los datos ingresados. Si cambias la contraseña, debe incluir mayúscula, minúscula, número y carácter especial.";
        }
      }

      setSubmitError(errorMessage);
      console.error("Error al actualizar perfil:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-500">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (isError || !perfil) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-red-600 text-center">
            <p className="font-semibold">Error al cargar el perfil</p>
            <p className="text-sm">{error?.message || "Intenta de nuevo más tarde"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Perfil de Usuario</h2>
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Editar
            </button>
          )}
        </div>

        {/* Mensajes de éxito y error */}
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Perfil actualizado exitosamente
          </div>
        )}

        {submitError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {submitError}
          </div>
        )}

        {!isEditing ? (
          // Vista de lectura
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <p className="mt-1 text-lg text-gray-900">{perfil.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{perfil.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <p className="mt-1 text-lg text-gray-900 capitalize">{perfil.rol || "Sin asignar"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <p className="mt-1">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${perfil.activo
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {perfil.activo ? "Activo" : "Inactivo"}
                </span>
              </p>
            </div>

            {perfil.organizacionNombre && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Organización</label>
                <p className="mt-1 text-lg text-gray-900">{perfil.organizacionNombre}</p>
              </div>
            )}
          </div>
        ) : (
          // Formulario de edición
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={50}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nueva Contraseña (dejar en blanco para no cambiar)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                minLength={8}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contraseña con mayúscula, minúscula, número y carácter especial"
              />
            </div>

            <div>
              <label htmlFor="activo" className="flex items-center">
                <input
                  type="checkbox"
                  id="activo"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleInputChange}
                  disabled={isEditor}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Cuenta Activa</span>
              </label>
              {isEditor && (
                <p className="text-sm text-gray-500 mt-1">
                  Los editores no pueden cambiar el estado de su cuenta. Contacta al administrador.
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition"
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
                className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}