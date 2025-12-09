import "./globals.css";
import { Nunito, Lato } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import AuthSessionProvider from '@/components/auth/SessionProvider';
import { Metadata } from 'next';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: {
    default: 'EduVoice CMS - Donde las voces importan',
    template: '%s | EduVoice CMS',
  },
  description: 'Plataforma moderna para gestionar testimonios y experiencias educativas',
  icons: {
    icon: '/EduVoiceCMS_logo-SN.png',
  },
  openGraph: {
    title: 'EduVoice CMS',
    description: 'Plataforma moderna para gestionar testimonios y experiencias educativas',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduVoice CMS',
    description: 'Plataforma moderna para gestionar testimonios y experiencias educativas',
  },
};
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${nunito.variable} ${lato.variable}`}>
      <body className="bg-gray-100" suppressHydrationWarning>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'var(--font-nunito)',
            },
            classNames: {
              toast: 'toast-custom',
              success: 'toast-success',
              error: 'toast-error',
              warning: 'toast-warning',
              info: 'toast-info',
            },
          }}
          richColors
        />
      </body>
    </html>
  );
}
