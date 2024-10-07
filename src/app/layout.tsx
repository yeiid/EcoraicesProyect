import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Ecoraices",
  description: "location of species",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className} >
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {children}
        </body>
    </html>
  );
}
