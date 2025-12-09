import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardProviders } from './DashboardProviders';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/login');

  const rol = session?.user?.rol ?? 'editor'; //duda aqui

  return (
    <DashboardProviders>
      <DashboardLayout role={rol}>{children}</DashboardLayout>
    </DashboardProviders>
  );
}
