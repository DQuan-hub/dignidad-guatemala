import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" data-8b-section="footer">
      <div className="ft-cols grid-12">
        <div className="ft-col">
          <p className="m-text-5">Sede Central TSE #28</p>
          <p className="m-text">
            8a Avenida 14-32, Zona 1
            <br />
            Centro Histórico, Guatemala
          </p>
        </div>

        <div className="ft-col">
          <p className="m-text-5">Contacto Directo</p>
          <ul className="m-text">
            <li>
              <a className="m-link-2" href="tel:+50255282027">
                +502 5528 2027
              </a>
            </li>
            <li>
              <a
                className="m-link-2"
                href="mailto:contacto@dignidadguatemala.org"
              >
                contacto@dignidadguatemala.org
              </a>
            </li>
            <li>
              <a
                className="m-link-2"
                href="https://www.tiktok.com/@dignidad100"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok @dignidad100
              </a>
            </li>
            <li>
              <a
                className="m-link-2"
                href="https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram @dignidad.guate
              </a>
            </li>
          </ul>
        </div>

        <nav className="ft-col" aria-label="Páginas del partido">
          <p className="m-text-5">Secciones</p>
          <ul className="m-text">
            <li>
              <Link className="m-link-2" href="/">
                Inicio · Radiografía
              </Link>
            </li>
            <li>
              <Link className="m-link-2" href="/nosotros">
                Historia y Dirigencia
              </Link>
            </li>
            <li>
              <Link className="m-link-2" href="/ejes">
                Los 6 Ejes 2027
              </Link>
            </li>
            <li>
              <Link className="m-link-2" href="/multimedia">
                Voces y Multimedia
              </Link>
            </li>
            <li>
              <Link className="m-link-2" href="/afiliate">
                Centro de Afiliación
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="ft-col" aria-label="Documentos Oficiales">
          <p className="m-text-5">Documentos TSE</p>
          <ul className="m-text">
            <li>
              <a
                className="m-link-2"
                href="/docs/estatutos-dignidad-guatemala-tse28.pdf"
                download
              >
                Estatutos Oficiales
              </a>
            </li>
            <li>
              <a
                className="m-link-2"
                href="/docs/plan-gobierno-dignidad-2027.pdf"
                download
              >
                Plan Programático
              </a>
            </li>
            <li>
              <a
                className="m-link-2"
                href="/docs/declaracion-principios-plurinacionales.pdf"
                download
              >
                Principios Plurinacionales
              </a>
            </li>
          </ul>
        </nav>

        <p className="ft-year">
          <span className="sr-only">Horizonte Electoral </span>26/27
        </p>
      </div>

      <p className="ft-mark" style={{ "--len": 8 } as React.CSSProperties}>
        Dignidad
      </p>

      <div className="ft-base m-text-6">
        <p>
          © {new Date().getFullYear()} Partido Político Dignidad Guatemala · Registro Oficial #28 ante el Tribunal Supremo Electoral.
        </p>
        <p>
          Fuerza popular, campesina y plurinacional · Art. 20(h) LEPP · Elecciones Generales 2027.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
