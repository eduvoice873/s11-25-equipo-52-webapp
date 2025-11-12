import SignupForm from "@/components/auth/SignupForm";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1>Registrarse</h1>
      <SignupForm />
    </div>
  );
}
