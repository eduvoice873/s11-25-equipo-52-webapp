"use client";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "editor",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Inviting member:", data);

    // 👉 Aquí luego agregamos swr o fetch al backend
    // await fetch('/api/users', { method:'POST', body: JSON.stringify(data) })

    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New Member">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField label="Name" error={errors.name}>
          <Input
            placeholder="User Name"
            {...register("name", { required: "Name is required" })}
          />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <Input
            placeholder="user@email.com"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </FormField>

        <FormField label="Role" error={errors.role}>
          <select
            {...register("role")}
            className="border rounded-lg p-2"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2"
        >
          Send Invitation
        </button>
      </form>
    </Modal>
  );
}
