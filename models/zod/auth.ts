import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().min(1, 'El email es requerido'),
  password: z.string().min(1, 'Campo requerido'),
});

export const SignupUserSchema = z
  .object({
    name: z.string().min(2, "El nombre de usuario debe contener al menos 2 caracteres"),
    email: z.email("Email Inválido"),
    organizacion: z.string().min(2, "El nombre de la organización debe contener al menos 2 caracteres"),
    password: z
      .string()
      .regex(/[A-Z]/, "La contraseña debe contener al menos 1 letra en mayúscula")
      .regex(/[a-z]/, "La contraseña debe contener al menos 1 letra en minúscula")
      .regex(/[0-9]/, "La contraseña debe contener al menos 1 caracter numérico")
      .regex(/[\W_]/, "La contraseña debe contener al menos 1 caracter especial"),
    confirm: z.string(),
  })
  .refine(
    (data) => {
      return data.confirm === data.password;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirm"],
    }
  );

export type LoginUser = z.infer<typeof LoginUserSchema>;
export type SignupUser = z.infer<typeof SignupUserSchema>;
