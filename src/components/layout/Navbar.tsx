"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import socialFeedData from "@/data/social-feed.json";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/ejes", label: "6 Ejes" },
  { href: "/multimedia", label: "Multimedia" },
  { href: "/afiliate", label: "Sedes TSE" },
  { href: "/#contact", label: "Contacto" },
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
          className="w-6 h-6 rounded-full object-cover border border-white/25"
        />
        <span>Dignidad</span>
        <small>#28 · 26/27</small>
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
              className="w-6 h-6 rounded-full object-cover border border-white/25"
            />
            <span>Dignidad</span>
            <small>#28 · 26/27</small>
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
            Sedes TSE y Afiliación
          </Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>
            Contacto Directo
          </Link>
        </nav>

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
