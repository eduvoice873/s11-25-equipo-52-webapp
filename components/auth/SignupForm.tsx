"use client";

import { useState } from "react";
import Link from "next/link";
import { SignupUserSchema } from "@/models/zod/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const newUserInitialState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

export default function SignupForm() {
  const [newUser, setNewUser] = useState(newUserInitialState);
  const [errors, setErrors] = useState<string[]>([]);
  const [disabledSignup, setDisabledSignup] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (disabledSignup) {
      setDisabledSignup(false);
    }

    setNewUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabledSignup(true);
    setErrors([]);

    const zodRes = SignupUserSchema.safeParse(newUser);

    console.log(zodRes.error?.issues);

    if (!zodRes.success) {
      zodRes.error.issues.forEach((error) => setErrors((prevState) => [...prevState, error.message]));
    } else {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const resAuth = await signIn("credentials", {
          ...newUser,
          redirect: false,
        });

        if (!resAuth.error) {
          router.push("/home");
        }
      } else {
        if (res.status === 400) {
          setErrors((prevState) => [...prevState, "Email asociado a otra cuenta"]);
        } else if (res.status === 500) {
          setErrors((prevState) => [...prevState, "Error interno del servidor"]);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-sm flex flex-col gap-4 border-2 border-foreground p-6">
      <input
        className="border"
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleChange}
        placeholder="Nombre de usuario"
      />
      <input
        className="border"
        type="text"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        className="border"
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <input
        className="border"
        type="password"
        name="confirm"
        value={newUser.confirm}
        onChange={handleChange}
        placeholder="Confirmar contraseña"
      />
      {errors.length > 0 && (
        <ul>
          {errors.map((error, i) => {
            return (
              <li key={i} className="text-xs text-red-500">
                {error}
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-col">
        <button disabled={disabledSignup} className="border-2">
          Continuar
        </button>
        <span>
          Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-yellow-500">
            Ingresar
          </Link>
        </span>
      </div>
    </form>
  );
}
