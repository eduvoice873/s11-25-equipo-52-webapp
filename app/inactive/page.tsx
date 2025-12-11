import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { AlertCircle, Mail, LogOut } from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function InactivePage() {
  const session = await auth();

  // Si no hay sesión o el usuario está activo, redirigir
  if (!session || session.user?.activo) {
    redirect('/login');
  }

  // Obtener información del usuario inactivo
  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: {
      id: true,
      name: true,
      email: true,
      rol: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Obtener información del administrador
  // Si es editor, buscar el admin de su organización
  let adminEmail: string | null = null;
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { organizacionId: true, rol: true },
  });

  if (userData?.rol === 'editor') {
    // Buscar un admin de la misma organización
    const admin = await prisma.user.findFirst({
      where: {
        organizacionId: userData.organizacionId,
        rol: 'admin',
      },
      select: { email: true },
    });
    adminEmail = admin?.email || null;
  } else if (userData?.rol === 'admin') {
    // Si es admin, buscar otro admin de la organización
    const admin = await prisma.user.findFirst({
      where: {
        organizacionId: userData.organizacionId,
        rol: 'admin',
        NOT: { id: user.id },
      },
      select: { email: true },
    });
    adminEmail = admin?.email || null;
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center from-red-50 to-orange-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Cuenta Inactiva
            </h1>

          </div>

          {/* Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              Tu cuenta está inactiva. Por favor, contacta con tu administrador para reactivarla.
            </p>
          </div>

          {/* Admin Contact */}
          {adminEmail ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-blue-900">
                <Mail className="w-5 h-5" />
                <span className="font-medium">Contacto del Administrador:</span>
              </div>
              <a
                href={`mailto:${adminEmail}`}
                className="inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {adminEmail}
              </a>
              <p className="text-xs text-blue-800">
                Haz clic para enviar un correo al administrador
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                No hay un administrador asignado. Por favor, contacta al soporte.
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Tu información:</strong>
            </p>
            <p className="text-sm text-gray-900 wrap-break-words">{user.email}</p>
          </div>

          {/* Logout Button */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
