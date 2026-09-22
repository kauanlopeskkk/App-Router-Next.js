import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/app/Components/TopBar";

export const metadata: Metadata = {
  title: "Lista de Tarefas",
  description: "Aplicacao de tarefas criada com Next.js e TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
