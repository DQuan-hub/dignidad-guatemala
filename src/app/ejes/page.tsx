"use client";

import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import { EJES_PROGRAMATICOS } from "@/data/ejes-programaticos";

export default function EjesIndexPage() {
  return (
    <div>
      {/* ====================================================================
          1. OPENING STATEMENT: Proyecto de País 2027–2031
         ==================================================================== */}
      <section id="opening" className="opening">
        <div className="op-second" style={{ minHeight: "auto", paddingTop: "104px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="m-text-5 text-[#FFD600] mb-4">
              Programa Político Plurinacional · Horizonte 2027–2031
            </p>
            <h1 className="m-text-2 op-statement">
              Seis ejes nacidos del{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                mandato de las comunidades
              </mark>{" "}
              para transformar{" "}
              <mark
                className="m-mark"
                style={{ "--mark-color": "var(--color-4)" } as React.CSSProperties}
              >
                Guatemala
              </mark>{" "}
              desde la raíz.
            </h1>
          </div>

          <ul className="op-ledger">
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">06 Ejes Estructurales</span>
              <p className="m-text">
                Cada eje cuenta con su propio diagnóstico nacional, indicadores de impacto y paquetes de iniciativas legislativas para los primeros 100 días.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Mandato Territorial</span>
              <p className="m-text">
                Elaborado en asambleas departamentales junto a organizaciones campesinas, pueblos indígenas, mujeres, maestros y juventudes.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Presupuesto Auditado</span>
              <p className="m-text">
                Financiamiento viable mediante el rescate de más de Q30,000 millones anuales hoy desviados por redes de corrupción.
              </p>
            </li>
          </ul>

          <div className="op-more flex flex-wrap gap-6 items-center">
            <a
              className="m-btn-2"
              href="/docs/plan-gobierno-dignidad-2027.pdf"
              download
            >
              <span className="m-btn-2__label">
                Descargar Plan de Gobierno Completo (PDF)
              </span>
              <Download className="w-4 h-4" />
            </a>
            <a className="m-link-2" href="#services">
              Explorar los 6 bloques programáticos ↓
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SERVICES SLABS: Los 6 Ejes Programáticos en Bloques de Color
         ==================================================================== */}
      <section id="services" className="services" style={{ paddingTop: "72px" }}>
        <div className="sv-head wrap grid-12">
          <span className="m-rule" aria-hidden="true" />
          <h2 className="m-text-3">
            Selecciona cualquiera de los seis ejes para abrir su expediente legislativo.
          </h2>
          <p className="m-text">
            Haz clic en el botón de cada bloque para consultar las cifras departamentales, galería documental y leyes propuestas.
          </p>
        </div>

        <div className="sv-slabs">
          {EJES_PROGRAMATICOS.map((eje, idx) => {
            const slabConfigs = [
              {
                slabColor: "var(--color-3)",
                photoTint: "var(--color-4)",
                textClass: "is-light-text",
              },
              {
                slabColor: "var(--color-5)",
                photoTint: "var(--color-3)",
                textClass: "is-dark-text",
              },
              {
                slabColor: "var(--color-4)",
                photoTint: "var(--color-5)",
                textClass: "is-dark-text",
              },
            ];
            const cfg = slabConfigs[idx % slabConfigs.length];

            return (
              <article
                key={eje.slug}
                className={`sv-slab ${cfg.textClass}`}
                style={
                  {
                    "--slab-color": cfg.slabColor,
                    "--photo-tint": cfg.photoTint,
                  } as React.CSSProperties
                }
              >
                <div className="sv-slab__in wrap grid-12">
                  <span className="m-rule" aria-hidden="true" />
                  <h3 className="m-text-2 sv-name">
                    {eje.numero} · {eje.palabraClaveCursiva}
                  </h3>

                  <div className="sv-copy">
                    <p className="m-text-5">{eje.etiquetaSeccion}</p>
                    <p className="m-text-4">{eje.titulo}</p>
                    <p className="m-text">{eje.subtitulo}</p>
                    <p className="m-text">{eje.resumenCorto}</p>
                  </div>

                  <div className="sv-photo m-photo">
                    <img
                      className="m-photo__img"
                      src={eje.imagenHero}
                      alt={eje.pieFotoHero}
                      loading="lazy"
                    />
                    <span className="sv-dots" aria-hidden="true" />
                  </div>

                  <div className="sv-list">
                    <p className="m-text-5">
                      Iniciativas Legislativas del Eje {eje.numero}
                    </p>
                    <ul className="m-text">
                      {eje.propuestasLegislativas.map((prop) => (
                        <li key={prop.codigo}>
                          <strong>[{prop.codigo}] {prop.titulo}:</strong>{" "}
                          {prop.descripcion}
                        </li>
                      ))}
                      {eje.impactoComunitario.map((imp) => (
                        <li key={imp.etiqueta}>
                          <strong>Meta {imp.metrica}:</strong> {imp.etiqueta} (
                          {imp.detalle})
                        </li>
                      ))}
                    </ul>
                    <Link className="m-btn" href={`/ejes/${eje.slug}`}>
                      <span className="m-btn__label">
                        Abrir página dedicada del Eje {eje.numero}
                      </span>
                      <span className="m-btn__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          3. MONTH SHEET: Contraste Estructural Vieja Política vs. Dignidad #28
         ==================================================================== */}
      <section id="month" className="month">
        <div className="mo-grid wrap grid-12">
          <div className="mo-intro">
            <span className="m-rule" aria-hidden="true" />
            <p className="m-text-5 text-[#C83E2B]">Contraste de Modelo 2027</p>
            <h2 className="m-text-3">
              Dos visiones opuestas para el futuro de Guatemala.
            </h2>
            <p className="m-text mo-lead">
              Mientras la vieja política corporativa gobierna para proteger monopolios y contratos amañados, Dignidad #28 legisla desde las comunidades.
            </p>
          </div>

          <ol className="mo-notes">
            <li className="mo-note" style={{ minHeight: "auto", paddingBottom: "24px" }}>
              <span className="mo-key is-on" aria-hidden="true">
                1
              </span>
              <h3 className="m-text-4">Bienes Naturales y Madre Agua</h3>
              <p className="m-text">
                Frente al desvío de ríos y licencias extractivas sin consulta, proponemos la Ley Plurinacional de Madre Agua y consultas vinculantes (Convenio 169).
              </p>
            </li>
            <li className="mo-note" style={{ minHeight: "auto", paddingBottom: "24px" }}>
              <span className="mo-key is-on" aria-hidden="true">
                2
              </span>
              <h3 className="m-text-4">Economía Campesina y Alimentación</h3>
              <p className="m-text">
                Frente al abandono agrario y el 46.5% de desnutrición crónica, impulsamos compras estatales directas a cooperativas y defensa de semillas nativas.
              </p>
            </li>
            <li className="mo-note" style={{ minHeight: "auto", paddingBottom: "24px" }}>
              <span className="mo-key is-on" aria-hidden="true">
                3
              </span>
              <h3 className="m-text-4">Justicia y Cero Impunidad</h3>
              <p className="m-text">
                Frente al saqueo de Q30,000 millones anuales, establecemos muerte civil para corruptos y auditoría social vinculante desde los COCODE.
              </p>
            </li>
          </ol>

          <article className="mo-sheet" aria-label="Tabla Comparativa de Modelos">
            <header className="mo-sheet__head">
              <p className="m-text-5 text-[#C83E2B]">
                Comparativa Programática · Elecciones 2027
              </p>
              <p className="mo-client">
                Vieja Política vs. Dignidad Guatemala (#28 TSE)
              </p>
            </header>

            {EJES_PROGRAMATICOS.slice(0, 4).map((eje) => (
              <div key={eje.slug} className="mo-part">
                <h3 className="m-text-5">
                  Eje {eje.numero} · {eje.titulo}
                </h3>
                <dl className="mo-rows">
                  <div>
                    <dt className="text-[#C83E2B] font-semibold">Vieja Política:</dt>
                    <dd className="text-right text-xs max-w-[260px]">
                      {eje.comparativaModelo[0]?.tradicional}
                    </dd>
                  </div>
                  <div className="is-total">
                    <dt className="text-[#111C16]">Dignidad #28:</dt>
                    <dd className="text-right text-xs max-w-[260px]">
                      {eje.comparativaModelo[0]?.dignidad}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* ====================================================================
          4. CONTACT: Tarjeta Sede Activa GetInTouchContact
         ==================================================================== */}
      <section id="contact" className="contact wrap">
        <GetInTouchContact />
      </section>
    </div>
  );
}
