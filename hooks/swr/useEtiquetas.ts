import { useState, useEffect } from "react";

interface Tag {
  id: string;
  nombre: string;
  organizacionId: string;
  _count?: {
    testimonios: number;
  };
}

export function useGestionEtiquetas() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [organizacionId, setOrganizacionId] = useState<string>("");

  useEffect(() => {
    fetchTags();
    fetchUserOrganization();
  }, []);

  const fetchUserOrganization = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const session = await response.json();
      if (session?.user?.organizacionId) {
        setOrganizacionId(session.user.organizacionId);
      }
    } catch (error) {
      console.error("Error al obtener organización del usuario:", error);
    }
  };

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tags");
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    } catch (error) {
      console.error("Error al cargar etiquetas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag);
      setTagName(tag.nombre);
    } else {
      setEditingTag(null);
      setTagName("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTag(null);
    setTagName("");
  };

  const handleSubmit = async () => {
    if (!tagName.trim()) return;

    setSubmitting(true);
    try {
      if (editingTag) {
        const response = await fetch(`/api/tags/${editingTag.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: tagName }),
        });

        if (response.ok) {
          await fetchTags();
          handleCloseDialog();
        }
      } else {
        const response = await fetch("/api/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: tagName,
            organizacionId: organizacionId,
          }),
        });

        if (response.ok) {
          await fetchTags();
          handleCloseDialog();
        }
      }
    } catch (error) {
      console.error("Error al guardar etiqueta:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta etiqueta?")) return;

    try {
      const response = await fetch(`/api/tags/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchTags();
      }
    } catch (error) {
      console.error("Error al eliminar etiqueta:", error);
    }
  };

  return {
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
  };
}
