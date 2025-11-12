"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const userInitialState = {
  name: "",
  email: "",
  password: "",
};

export default function LoginForm() {
  const [user, setUser] = useState(userInitialState);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);

    const res = await signIn("credentials", {
      ...user,
      redirect: false,
    });

    if (res.error) {
      if (res.error === "CredentialsSignin") {
        setErrors((prevState) => [...prevState, "Credenciales inválidas"]);
      } else {
        setErrors((prevState) => [...prevState, "Error desconocido"]);
      }
    } else {
      router.push("/home");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-sm flex flex-col gap-4 border-2 border-foreground p-6">
      <input
        className="border"
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nombre de usuario"
      />
      <input
        className="border"
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <div className="flex flex-col">
        <input
          className="border"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <span>
          <Link href="/login">Olvidaste tu contraseña?</Link>
        </span>
      </div>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, i) => {
            return (
              <li key={i} className="text-sm text-red-500">
                {error}
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-col">
        <button className="border-2">Continuar</button>
        <span>
          No tienes una cuenta?{" "}
          <Link href="/signup" className="text-yellow-500">
            Registrarse
          </Link>
        </span>
      </div>
    </form>
  );
}
