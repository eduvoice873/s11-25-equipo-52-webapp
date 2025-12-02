import "./globals.css";
import { Nunito, Lato } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "EduVoice",
  description: "Plataforma  moderna",
};
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${nunito.variable} ${lato.variable}`}>
      <body className="bg-gray-100" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
