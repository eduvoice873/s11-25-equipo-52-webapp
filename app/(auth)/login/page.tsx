import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1>Ingresar</h1>
      <LoginForm />
    </div>
  );
}
