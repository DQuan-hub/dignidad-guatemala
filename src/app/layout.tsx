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
    default: "Dignidad Guatemala (#28 TSE) — Un movimiento nacido de nuestra gente",
    template: "%s | Dignidad Guatemala (#28 TSE)",
  },
  description:
    "Portal oficial de Dignidad Guatemala (Partido Político #28 inscrito ante el Tribunal Supremo Electoral). Conoce nuestra historia, nuestras 6 propuestas para Guatemala y cómo afiliarte en los 22 departamentos.",
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
      <body className="min-h-screen flex flex-col bg-[#F5F2EB] text-[#141413] antialiased selection:bg-[#C83E2B] selection:text-white relative">
        {/* Grano analógico documental estilo Kelvora */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] bg-[radial-gradient(#141413_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />
        {/* Marco orgánico de ventana inspirado en rbp-portfolio.vercel.app */}
        <div className="site-frame site-frame--top" aria-hidden="true" />
        <div className="site-frame site-frame--left" aria-hidden="true" />
        <div className="site-frame site-frame--right" aria-hidden="true" />
        <svg
          className="site-corner site-corner--top-left"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="site-corner site-corner--top-right"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
            fill="currentColor"
          />
        </svg>

        {/* Overlay táctil de papel muy suave */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 opacity-[0.022] mix-blend-multiply paper-grain-overlay"
        />

        <Navbar />
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
