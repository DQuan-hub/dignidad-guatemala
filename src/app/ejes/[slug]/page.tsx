"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import { EJES_PROGRAMATICOS, findEjeBySlug } from "@/data/ejes-programaticos";
import socialFeedData from "@/data/social-feed.json";
import { getSocialFeedPosts, type SocialMediaPost } from "@/lib/utils";

export default function EjeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const eje = findEjeBySlug(slug);
  if (!eje) {
    notFound();
  }

  const ejeIndex = EJES_PROGRAMATICOS.findIndex((e) => e.slug === eje.slug);
  const prevEje =
    EJES_PROGRAMATICOS[
      (ejeIndex - 1 + EJES_PROGRAMATICOS.length) % EJES_PROGRAMATICOS.length
    ];
  const nextEje = EJES_PROGRAMATICOS[(ejeIndex + 1) % EJES_PROGRAMATICOS.length];

  const allPosts = getSocialFeedPosts(socialFeedData as never);
  const relatedPosts = allPosts.filter((p) => p.ejeSlug === eje.slug);
  const displayPosts =
    relatedPosts.length >= 1
      ? relatedPosts
      : allPosts.filter((p) => p.platform === "tiktok").slice(0, 2);

  const [activePost, setActivePost] = useState<SocialMediaPost | null>(null);

  return (
    <div>
      {/* ====================================================================
          1. OPENING STATEMENT: Cabecera del Eje Programático
         ==================================================================== */}
      <section id="opening" className="opening">
        <div className="op-second" style={{ minHeight: "auto", paddingTop: "104px" }}>
          <div
            style={{ gridColumn: "1 / -1" }}
            className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/20"
          >
            <Link className="m-link-2" href="/ejes">
              ← Volver a los 6 Ejes Programáticos
            </Link>
            <span className="m-text-5 text-[#FFD600]">
              {eje.etiquetaSeccion} · EJE [{eje.numero} / 06]
            </span>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <h1 className="m-text-2 op-statement">
              {eje.titulo} —{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                {eje.palabraClaveCursiva}
              </mark>
              .
            </h1>
            <p className="m-text-4 text-white/85 max-w-3xl mt-6">
              {eje.subtitulo} {eje.resumenCorto}
            </p>
          </div>

          <ul className="op-ledger">
            {eje.impactoComunitario.map((imp) => (
              <li key={imp.etiqueta}>
                <span className="m-rule" aria-hidden="true" />
                <span className="m-text-5">{imp.etiqueta}</span>
                <p className="m-text-3 text-white">{imp.metrica}</p>
                <p className="m-text">{imp.detalle}</p>
              </li>
            ))}
          </ul>

          <div className="op-more flex flex-wrap gap-6 items-center">
            <a className="m-btn-2" href="#iniciativas">
              <span className="m-btn-2__label">
                Ver Iniciativas de Ley del Eje {eje.numero}
              </span>
              <span className="m-btn-2__icon" aria-hidden="true">
                +
              </span>
            </a>
            {displayPosts[0] && (
              <button
                type="button"
                onClick={() => setActivePost(displayPosts[0])}
                className="m-link-2 cursor-pointer"
              >
                ▶ Ver video territorial (@dignidad100)
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. MONTH STYLE: Diagnóstico Nacional y Datos Críticos (Maize Gold)
         ==================================================================== */}
      <section id="month" className="month">
        <div className="mo-grid wrap grid-12">
          <div className="mo-intro">
            <span className="m-rule" aria-hidden="true" />
            <p className="m-text-5 text-[#C83E2B]">
              Diagnóstico Territorial · Eje {eje.numero}
            </p>
            <h2 className="m-text-3">
              Realidad nacional y causas estructurales que combatiremos.
            </h2>
            <p className="m-text mo-lead">
              {eje.diagnosticoNacional.RealidadActual}
            </p>
          </div>

          <ol className="mo-notes">
            {eje.diagnosticoNacional.CausasEstructurales.map((causa, idx) => (
              <li
                key={idx}
                className="mo-note"
                style={{ minHeight: "auto", paddingBottom: "24px" }}
              >
                <span className="mo-key is-on" aria-hidden="true">
                  {idx + 1}
                </span>
                <h3 className="m-text-4">Causa Estructural 0{idx + 1}</h3>
                <p className="m-text">{causa}</p>
              </li>
            ))}
          </ol>

          <article className="mo-sheet" aria-label="Datos Críticos del Eje">
            <header className="mo-sheet__head">
              <p className="m-text-5 text-[#C83E2B]">
                Expediente Estadístico · Eje {eje.numero}
              </p>
              <p className="mo-client">{eje.titulo}</p>
            </header>

            <div className="mo-part">
              <h3 className="m-text-5">1 · Cifras Clave del Diagnóstico</h3>
              <dl className="mo-rows">
                {eje.diagnosticoNacional.DatosCriticos.map((dato) => (
                  <div key={dato.cifra}>
                    <dt>{dato.contexto}</dt>
                    <dd className="font-bold text-[#C83E2B]">{dato.cifra}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mo-part">
              <h3 className="m-text-5">
                2 · Contraste: Vieja Política vs. Dignidad #28
              </h3>
              {eje.comparativaModelo.map((comp, idx) => (
                <dl key={idx} className="mo-rows mb-2">
                  <div>
                    <dt className="text-[#C83E2B] font-semibold">Antes:</dt>
                    <dd className="text-right text-xs">{comp.tradicional}</dd>
                  </div>
                  <div className="is-total">
                    <dt className="text-[#111C16]">Dignidad #28:</dt>
                    <dd className="text-right text-xs">{comp.dignidad}</dd>
                  </div>
                </dl>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ====================================================================
          3. FEES RISING BLOCKS: Paquete de Iniciativas de Ley (#iniciativas)
         ==================================================================== */}
      <section id="iniciativas" className="fees">
        <div className="wrap">
          <div className="fe-head grid-12">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              Iniciativas de ley para la bancada de Dignidad #28.
            </h2>
            <p className="m-text">
              Compromisos legislativos concretos con código de expediente y plazo de ejecución parlamentaria.
            </p>
          </div>

          <div className="fe-plans">
            {eje.propuestasLegislativas.map((prop, idx) => {
              const planColors = [
                "var(--color-5)",
                "var(--color-4)",
                "var(--color-3)",
              ];
              const heights = ["0.50", "0.74", "0.95"];

              return (
                <article
                  key={prop.codigo}
                  className="fe-plan"
                  style={
                    {
                      "--plan-color": planColors[idx % planColors.length],
                      "--h": heights[idx % heights.length],
                      "--i": idx,
                    } as React.CSSProperties
                  }
                >
                  <div className="fe-stage">
                    <span className="fe-fill" aria-hidden="true" />
                    <div className="fe-top">
                      <h3 className="m-text-4">{prop.plazo}</h3>
                      <p className="fe-price">
                        <data value={idx + 1}>{prop.codigo}</data>
                      </p>
                    </div>
                  </div>
                  <ul className="fe-list m-text">
                    <li>
                      <strong>Iniciativa:</strong> {prop.titulo}
                    </li>
                    <li>{prop.descripcion}</li>
                    <li>
                      <strong>Vía de aprobación:</strong> Bancada Plurinacional Dignidad #28 y cabildos abiertos.
                    </li>
                  </ul>
                  <Link className="m-btn" href="/afiliate">
                    <span className="m-btn__label">
                      Respaldar esta iniciativa con mi afiliación
                    </span>
                    <span className="m-btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. CASES SPLIT BLOCK: Testimonio Comunitario y Galería Documental
         ==================================================================== */}
      <section id="cases" className="cases" style={{ paddingTop: "0" }}>
        <div className="cs-list">
          <article
            className="cs-case"
            style={
              {
                "--case-color": "var(--color-5)",
                "--case-text": "var(--color-2)",
              } as React.CSSProperties
            }
          >
            <div className="cs-portrait">
              <span className="cs-glyph" aria-hidden="true">
                “
              </span>
              <figure
                className="cs-photo m-photo"
                style={{ "--photo-tint": "var(--color-3)" } as React.CSSProperties}
              >
                <img
                  className="m-photo__img"
                  src={eje.imagenHero}
                  alt={eje.pieFotoHero}
                />
              </figure>
              <p className="cs-who">
                <strong>{eje.testimonioComunitario.autor}</strong>
                <span className="m-text-6">
                  {eje.testimonioComunitario.comunidad}
                </span>
              </p>
            </div>

            <div className="cs-quote">
              <blockquote className="cs-text m-text-4">
                <p>“{eje.testimonioComunitario.cita}”</p>
              </blockquote>

              <div className="cs-fact m-text-6">
                <span className="m-rule" aria-hidden="true" />
                <p>{eje.pieFotoHero}</p>
                {displayPosts[0] && (
                  <button
                    type="button"
                    onClick={() => setActivePost(displayPosts[0])}
                    className="m-btn mt-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span className="m-btn__label">
                      Reproducir crónica en video de este eje
                    </span>
                  </button>
                )}
              </div>
            </div>
          </article>
        </div>

        {/* Navegador Inferior entre Ejes */}
        <div className="wrap py-12 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#111C16]">
          <Link className="m-btn" href={`/ejes/${prevEje.slug}`}>
            <span className="m-btn__arrow" aria-hidden="true">
              ←
            </span>
            <span className="m-btn__label">
              Anterior [{prevEje.numero}]: {prevEje.titulo}
            </span>
          </Link>

          <Link className="m-btn-2 justify-between" href={`/ejes/${nextEje.slug}`}>
            <span className="m-btn-2__label">
              Siguiente [{nextEje.numero}]: {nextEje.titulo}
            </span>
            <span className="m-btn-2__icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* ====================================================================
          5. CONTACT: Tarjeta Sede Activa GetInTouchContact
         ==================================================================== */}
      <section id="contact" className="contact wrap">
        <GetInTouchContact />
      </section>

      <VideoModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
}
