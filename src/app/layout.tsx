import { Roboto } from '@next/font/google';
import type { Metadata } from "next";
import "./globals.css";

// Defina a fonte Roboto
const roboto = Roboto({
  weight: ['400', '700'], // Inclua os pesos que deseja
  subsets: ['latin'], // Subconjuntos da fonte
});

export const metadata: Metadata = {
  title: "Timer comprar meu Tesla",
  description: "Um timer que ira cintar quando tempo demorei para comprar meu Tesla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Adicione a fonte Roboto ao body */}
      <body className={`${roboto.className} bg-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
