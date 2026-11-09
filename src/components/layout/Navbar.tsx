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
  { href: "/ejes", label: "Ejes Programáticos" },
  { href: "/multimedia", label: "Multimedia" },
  { href: "/afiliate", label: "Sedes y Afiliación" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoSrc =
    (socialFeedData as { brand?: { logo?: string } })?.brand?.logo ||
    "/brand/logo-dignidad.jpg";

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 pt-1">
      <div className="mx-auto max-w-[1180px] flex items-center justify-between gap-4">
        
        {/* Marca izquierda: Logo oficial + Partido #28 */}
        <Link
          href="/"
          aria-label="Dignidad Guatemala — Ir al inicio"
          className="inline-flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-2 shadow-xs border border-[#111C16]/10 hover:border-[#C83E2B]/40 transition group"
        >
          <span className="h-8 w-8 rounded-full overflow-hidden bg-[#111C16] border border-[#111C16]/15 shrink-0 flex items-center justify-center">
            <img
              src={logoSrc}
              alt="Logo Oficial Dignidad Guatemala"
              width={32}
              height={32}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight text-[#111C16]">
              Dignidad
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#526058]">
              Guatemala #28
            </span>
          </div>
        </Link>

        {/* Barra Central Flotante Minimalista */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md p-1.5 shadow-xs border border-[#111C16]/10"
        >
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) ||
                    (link.href === "/multimedia" && pathname.startsWith("/voces-y-redes"));

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs lg:text-sm font-semibold transition-all duration-300",
                      isActive
                        ? "bg-[#111C16] text-white shadow-xs"
                        : "text-[#526058] hover:text-[#111C16] hover:bg-[#111C16]/5"
                    )}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C83E2B] animate-pulse" />
                    )}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Botón Píldora "Afíliate ↗" con micro-interacción */}
        <div className="flex items-center gap-2">
          <Link
            href="/afiliate"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#C83E2B] hover:bg-[#A93322] text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
              Afíliate
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#FFD600] relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Botón móvil hamburguesa */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#111C16]/10 text-[#111C16] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-[1180px] rounded-2xl bg-white border border-[#111C16]/10 p-4 shadow-xl space-y-2">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-xl font-display font-semibold text-sm transition-colors",
                      isActive
                        ? "bg-[#111C16] text-white"
                        : "text-[#526058] hover:bg-[#111C16]/5 hover:text-[#111C16]"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C83E2B]" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="pt-2 border-t border-[#111C16]/10">
            <Link
              href="/afiliate"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C83E2B] text-white text-sm font-bold shadow-xs"
            >
              <span>Afíliate en tu departamento</span>
              <ArrowUpRight className="w-4 h-4 text-[#FFD600]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
