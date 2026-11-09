"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import socialFeedData from "@/data/social-feed.json";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/ejes", label: "Propuestas" },
  { href: "/voces-y-redes", label: "Voces" },
  { href: "/afiliate", label: "Sedes y Afiliación" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoSrc =
    (socialFeedData as { brand?: { logo?: string } })?.brand?.logo ||
    "/brand/logo-dignidad.jpg";

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 pt-2">
      <div className="mx-auto max-w-[1100px] flex items-center justify-between gap-3">
        {/* Marca rápida izquierda (visible en desktop) */}
        <Link
          href="/"
          aria-label="Dignidad Guatemala — Ir al inicio"
          className="inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-xs border border-[#181313]/8 hover:border-[#B81D13]/30 transition"
        >
          <span className="h-7 w-7 rounded-full overflow-hidden bg-[#B81D13] border border-[#181313]/10 shrink-0 flex items-center justify-center">
            <img
              src={logoSrc}
              alt="Logo Dignidad Guatemala"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-sm font-semibold tracking-tight text-[#181313]">
            Dignidad
          </span>
          <span className="rounded-full bg-[#B81D13]/10 px-2 py-0.5 text-[11px] font-semibold text-[#B81D13]">
            #28
          </span>
        </Link>

        {/* Píldora central flotante estilo rbp-portfolio.vercel.app */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md p-1.5 shadow-xs border border-[#181313]/8"
        >
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-[#181313] text-[#FAF8F5]"
                        : "text-[#181313]/65 hover:text-[#181313] hover:bg-[#181313]/4"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Acción directa derecha */}
        <div className="flex items-center gap-2">
          <Link
            href="/afiliate"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#B81D13] hover:bg-[#991B1B] text-white px-4 py-2 text-xs sm:text-sm font-medium shadow-xs transition"
          >
            <span>Afíliate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD600]" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#181313]/10 text-[#181313] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil limpio y directo */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden mx-auto max-w-[1100px] mt-2 rounded-3xl bg-white border border-[#181313]/10 p-3 shadow-lg space-y-1"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition",
                  isActive
                    ? "bg-[#181313] text-white"
                    : "text-[#181313]/80 hover:bg-[#FAF8F5]"
                )}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
