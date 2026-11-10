"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import socialFeedData from "@/data/social-feed.json";

function XIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="0" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.887 2.872 2.895 2.895 0 0 1-2.896-2.892 2.897 2.897 0 0 1 2.896-2.893c.278 0 .545.038.8.11V9.37a6.34 6.34 0 0 0-.8-.051 6.34 6.34 0 0 0-6.34 6.333 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.332-6.34V9.012a8.214 8.214 0 0 0 4.77 1.517V7.085a4.767 4.767 0 0 1-1-.399z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.444.116-1.745.419-.348.35-.417.925-.417 1.889v1.672h4.595l-.597 3.667h-3.998v7.98h-4.462z" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/ejes", label: "6 Ejes" },
  { href: "/multimedia", label: "Multimedia" },
  { href: "/afiliate", label: "Sedes y Contacto" },
];

const SOCIAL_SHORTCUTS = [
  { label: "X @dignidadgt", href: "https://x.com/dignidadgt?s=11", icon: XIcon },
  { label: "Instagram @dignidad.guate", href: "https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw==", icon: InstagramIcon },
  { label: "TikTok @dignidad100", href: "https://www.tiktok.com/@dignidad100", icon: TikTokIcon },
  { label: "Facebook Dignidad", href: "https://www.facebook.com/profile.php?id=61590226876540", icon: FacebookIcon },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const travelRef = useRef(0);

  const logoSrc =
    (socialFeedData as { brand?: { logo?: string } })?.brand?.logo ||
    "/brand/logo-dignidad.jpg";

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      lastYRef.current = y;
      if (!delta) return;
      travelRef.current =
        Math.sign(delta) === Math.sign(travelRef.current)
          ? travelRef.current + delta
          : delta;
      if (y < 80) setHidden(false);
      else if (travelRef.current > 24) setHidden(true);
      else if (travelRef.current < -24) setHidden(false);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      id="nav"
      className={`nav ${hidden && !menuOpen ? "is-hidden" : ""}`}
      data-8b-section="navigation"
      onFocus={() => setHidden(false)}
    >
      <Link className="nav__logo" href="/">
        <img
          src={logoSrc}
          alt="Logo Dignidad Guatemala"
          width={24}
          height={24}
          className="w-6 h-6 rounded-none object-cover border border-white/25"
        />
        <span>Dignidad</span>
        <small>#28 · TSE</small>
      </Link>

      <Link className="nav__cta m-btn-2" href="/afiliate">
        <span className="m-btn-2__label">Afíliate al Partido</span>
        <span className="m-btn-2__icon" aria-hidden="true">
          +
        </span>
      </Link>

      <nav className="nav__links" aria-label="Navegación principal">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : link.href.startsWith("/#")
              ? false
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__link ${isActive ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Celdas editoriales de Redes Sociales en el Navbar */}
      <div className="nav__socials hidden lg:flex" aria-label="Redes sociales oficiales">
        {SOCIAL_SHORTCUTS.map((soc) => {
          const Icon = soc.icon;
          return (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav__social-link"
              title={soc.label}
              aria-label={soc.label}
            >
              <Icon />
            </a>
          );
        })}
      </div>

      <button
        className="nav__menu m-icon"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="menu"
        onClick={() => setMenuOpen(true)}
      >
        Menú +
      </button>

      <div className="menu" id="menu" hidden={!menuOpen}>
        <div className="menu__top">
          <Link
            className="nav__logo"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logoSrc}
              alt="Logo Dignidad Guatemala"
              width={24}
              height={24}
              className="w-6 h-6 rounded-none object-cover border border-white/25"
            />
            <span>Dignidad</span>
            <small>#28 · TSE</small>
          </Link>
          <button
            className="menu__close m-icon"
            type="button"
            onClick={() => setMenuOpen(false)}
          >
            Cerrar ×
          </button>
        </div>

        <nav className="menu__links" aria-label="Menú móvil">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Inicio · Radiografía
          </Link>
          <Link href="/nosotros" onClick={() => setMenuOpen(false)}>
            Nosotros y Dirigencia
          </Link>
          <Link href="/ejes" onClick={() => setMenuOpen(false)}>
            Los 6 Ejes Programáticos
          </Link>
          <Link href="/multimedia" onClick={() => setMenuOpen(false)}>
            Archivo Multimedia
          </Link>
          <Link href="/afiliate" onClick={() => setMenuOpen(false)}>
            Sedes y Contacto Directo
          </Link>
        </nav>

        {/* Canales oficiales en el Menú Móvil */}
        <div className="px-6 py-4 border-t border-white/15 space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-[#F5B800]">
            Canales Oficiales
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL_SHORTCUTS.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-white/5 border border-white/15 text-xs text-white hover:bg-[#C83226] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span className="font-mono truncate">{soc.label.split(" ")[0]}</span>
                </a>
              );
            })}
          </div>
        </div>

        <Link
          className="menu__cta m-btn-2"
          href="/afiliate"
          onClick={() => setMenuOpen(false)}
        >
          <span className="m-btn-2__label">Afíliate en tu departamento</span>
          <span className="m-btn-2__icon" aria-hidden="true">
            +
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
