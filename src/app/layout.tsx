import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dignidad Guatemala (#28 TSE) — Fuerza popular y plurinacional 26/27",
    template: "%s | Dignidad Guatemala (#28 TSE)",
  },
  description:
    "Portal oficial de Dignidad Guatemala (Partido Político #28 inscrito ante el Tribunal Supremo Electoral). Conoce nuestra historia, nuestros 6 ejes programáticos para Guatemala y cómo afiliarte en los 22 departamentos.",
  icons: {
    icon: "/brand/logo-dignidad.jpg",
    apple: "/brand/logo-dignidad.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-GT"
      className={`${plusJakarta.variable} ${playfairDisplay.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#111C16] antialiased selection:bg-[#C83E2B] selection:text-white relative">
        <Navbar />
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
