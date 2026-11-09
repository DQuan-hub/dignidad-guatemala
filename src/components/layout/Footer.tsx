import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  return (
    <footer className="mx-auto my-12 w-full max-w-[1100px] px-6 sm:my-20 sm:px-10">
      {/* Tarjeta de doble marco estilo "Let's connect" de rbp-portfolio.vercel.app */}
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#181313]/8 bg-white p-1.5 shadow-xs">
        <div className="relative w-full overflow-hidden rounded-[1.6rem] bg-[#FAF8F5]">
          <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-8 md:grid-cols-[1.25fr_1fr] md:items-stretch">
            {/* Columna Izquierda: Invitación cálida y humana */}
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <BrandLogo size="sm" theme="light" />
                <h2 className="font-serif-display text-[2.1rem] sm:text-[2.65rem] font-medium leading-[1.06] tracking-tight text-[#181313]">
                  Construyamos juntos desde tu comunidad.
                </h2>
                <p className="max-w-[36ch] text-[17px] sm:text-[19px] leading-[1.45] tracking-tight text-[#181313]/65">
                  Las puertas de Dignidad Guatemala están abiertas en los 22 departamentos. Acércate a conversar, proponer o afiliarte en tu municipio.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/afiliate"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#B81D13] hover:bg-[#991B1B] px-5 text-sm font-medium text-white transition"
                >
                  <MapPin className="h-4 w-4 text-[#FFD600]" aria-hidden="true" />
                  <span>Buscar sede en mi departamento</span>
                </Link>

                <Link
                  href="/ejes"
                  className="group inline-flex h-11 items-center gap-2 rounded-xl border border-[#181313]/10 bg-white px-5 text-sm font-medium text-[#181313] shadow-2xs transition hover:bg-[#181313]/4"
                >
                  <span>Ver nuestras 6 propuestas</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta interna de redes y contacto directo (idéntica a rbp-portfolio.vercel.app) */}
            <div className="flex flex-col items-center justify-between gap-6 rounded-[1.2rem] border border-[#181313]/8 bg-white p-6 sm:p-8 text-center">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B81D13]">
                  Canales Oficiales Verificados
                </p>
                <p className="text-sm text-[#181313]/65">
                  Síguenos y escríbenos directamente en nuestras redes sociales
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="https://www.tiktok.com/@dignidad100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[#181313]/10 bg-[#FAF8F5] px-4 text-xs font-semibold text-[#181313]/80 transition hover:border-[#B81D13] hover:text-[#B81D13]"
                >
                  TikTok · @dignidad100
                </a>
                <a
                  href="https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[#181313]/10 bg-[#FAF8F5] px-4 text-xs font-semibold text-[#181313]/80 transition hover:border-[#B81D13] hover:text-[#B81D13]"
                >
                  Instagram · @dignidad.guate
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590226876540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[#181313]/10 bg-[#FAF8F5] px-4 text-xs font-semibold text-[#181313]/80 transition hover:border-[#B81D13] hover:text-[#B81D13]"
                >
                  Facebook Oficial
                </a>
                <a
                  href="https://wa.me/50255282027"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Dignidad Guatemala"
                  className="inline-flex h-11 items-center gap-1.5 justify-center rounded-xl border border-[#B81D13]/20 bg-[#B81D13]/8 px-4 text-xs font-semibold text-[#B81D13] transition hover:bg-[#B81D13] hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="mailto:organizate@dignidadguatemala.org.gt"
                  aria-label="Correo electrónico"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#181313]/10 bg-[#FAF8F5] text-[#181313]/75 transition hover:border-[#B81D13] hover:text-[#B81D13]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#181313]/60 pt-2 border-t border-[#181313]/8 w-full">
                <Link href="/" className="hover:text-[#B81D13]">
                  Inicio
                </Link>
                <Link href="/nosotros" className="hover:text-[#B81D13]">
                  Nosotros
                </Link>
                <Link href="/ejes" className="hover:text-[#B81D13]">
                  Propuestas
                </Link>
                <Link href="/voces-y-redes" className="hover:text-[#B81D13]">
                  Voces y Videos
                </Link>
                <Link href="/afiliate" className="hover:text-[#B81D13]">
                  Afíliate
                </Link>
              </div>

              <div className="flex flex-col items-center gap-0.5 text-center">
                <p className="text-[13px] tracking-tight text-[#181313]/70">
                  © {new Date().getFullYear()} Partido Político Dignidad Guatemala · Inscrito #28 ante el TSE
                </p>
                <p className="text-[12px] tracking-tight text-[#181313]/45">
                  Formación y participación ciudadana conforme al Art. 20(h) de la LEPP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
