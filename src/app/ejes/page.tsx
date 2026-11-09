"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download, CheckCircle2, XCircle } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { VariableFontHover } from "@/components/ui/variable-font-hover";
import { EJES_PROGRAMATICOS } from "@/data/ejes-programaticos";

export default function EjesIndexPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. CABECERA PROYECTO DE PAÍS */}
      <section className="py-16 lg:py-24 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-5">
              <SectionBadge code="[PROYECTO DE PAÍS · 2027-2031]">
                Seis Grandes Áreas de Acción Programática
              </SectionBadge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#231012] leading-[1.03]">
                <VariableFontHover
                  className="justify-start text-left text-[#231012]"
                  fromFontVariationSettings="'wght' 300, 'slnt' 0"
                  toFontVariationSettings="'wght' 900, 'slnt' -10"
                  label="Un plan nacido en las comunidades"
                  staggerDuration={0.015}
                  staggerFrom="first"
                />{" "}
                por la{" "}
                <span className="font-editorial-italic font-semibold text-[#C81E1E]">
                  justicia y el Buen Vivir.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#231012]/80 leading-relaxed">
                Cada uno de nuestros seis ejes cuenta con su propia página dedicada con diagnóstico nacional, iniciativas de ley, fotografías documentales y videos explicativos desde los territorios.
              </p>
            </div>

            <a
              href="/docs/plan-gobierno-dignidad-2027.pdf"
              download
              className="inline-flex items-center gap-2.5 bg-[#7F1116] hover:bg-[#C81E1E] text-[#FAF6F0] font-bold text-sm px-6 py-4 rounded-full transition shrink-0 self-start lg:self-auto"
            >
              <Download className="w-4 h-4 text-[#FFD600]" aria-hidden="true" />
              <span>Descargar Plan Programático (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. GRID DOCUMENTAL DE LOS 6 EJES (CARGOFLOW BENTO) */}
      <section className="py-20 lg:py-28 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {EJES_PROGRAMATICOS.map((eje) => (
            <article
              key={eje.slug}
              className="rounded-3xl bg-white border border-[#181313]/8 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Fotografía Documental del Eje (5 cols) */}
              <figure className="lg:col-span-5 bg-[#7F1116] relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#181313]/8">
                <div className="relative aspect-[16/11] lg:aspect-auto lg:h-full overflow-hidden">
                  <img
                    src={eje.imagenHero}
                    alt={eje.pieFotoHero}
                    width={640}
                    height={460}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7F1116] via-transparent to-black/30" />
                  <span className="absolute top-4 left-4 font-mono-code text-xs font-bold bg-[#C81E1E] text-[#FAF6F0] px-3 py-1 rounded">
                    {eje.etiquetaSeccion}
                  </span>
                  <figcaption className="absolute bottom-3 left-4 right-4 font-mono-code text-[11px] text-[#FAF6F0]/90 leading-snug">
                    {eje.pieFotoHero}
                  </figcaption>
                </div>
              </figure>

              {/* Contenido Programático y Enlace a Ruta Individual (7 cols) */}
              <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-code text-xs font-bold text-[#C81E1E]">
                      RUTA: /ejes/{eje.slug}
                    </span>
                    <span className="font-mono-code text-xs text-[#231012]/70">
                      {eje.propuestasLegislativas.length} INICIATIVAS LEGISLATIVAS
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#231012]">
                    {eje.titulo}{" "}
                    <span className="font-editorial-italic font-normal text-[#C81E1E]">
                      — {eje.palabraClaveCursiva}
                    </span>
                  </h2>

                  <p className="text-base text-[#231012]/80 leading-relaxed">
                    {eje.subtitulo} {eje.resumenCorto}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {eje.propuestasLegislativas.map((ley) => (
                      <div
                        key={ley.codigo}
                        className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#181313]/8"
                      >
                        <span className="font-mono-code text-[10px] font-bold text-[#C81E1E] block mb-1">
                          [{ley.codigo}] · {ley.plazo}
                        </span>
                        <p className="text-xs font-bold text-[#231012] leading-snug">
                          {ley.titulo}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#181313]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {eje.impactoComunitario.map((m) => (
                      <div key={m.etiqueta}>
                        <span className="font-display font-extrabold text-lg text-[#231012] block leading-none">
                          {m.metrica}
                        </span>
                        <span className="font-mono-code text-[10px] text-[#231012]/70">
                          {m.etiqueta}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/ejes/${eje.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#C81E1E] hover:bg-[#7F1116] text-[#FAF6F0] font-bold text-sm px-6 py-3.5 rounded-full transition shrink-0"
                  >
                    <span>Entrar al Eje {eje.numero}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. CONTRASTE DE MODELOS */}
      <section className="py-20 lg:py-28 bg-[#F3EDE4]/65/50">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <SectionBadge code="[CONTRASTE ESTRUCTURAL]">
              Vieja Política vs. Dignidad Guatemala (#28)
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#231012]">
              Dos caminos frente al horizonte electoral de 2027.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#FAF8F5] border border-[#181313]/8 p-7 sm:p-8 space-y-4">
              <span className="font-mono-code text-xs font-bold text-[#C81E1E] uppercase">
                [MODELO TRADICIONAL DE DESPOJO]
              </span>
              <ul className="space-y-3.5 pt-2">
                {EJES_PROGRAMATICOS.map((eje) => (
                  <li key={eje.slug} className="flex items-start gap-3 text-sm text-[#231012]/80">
                    <XCircle className="w-4 h-4 text-[#C81E1E] shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      <strong className="text-[#231012]">{eje.titulo}:</strong>{" "}
                      {eje.comparativaModelo[0].tradicional}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#7F1116] text-[#FAF6F0] p-7 sm:p-8 space-y-4">
              <span className="font-mono-code text-xs font-bold text-[#FFD600] uppercase">
                [PROYECTO PLURINACIONAL DIGNIDAD #28]
              </span>
              <ul className="space-y-3.5 pt-2">
                {EJES_PROGRAMATICOS.map((eje) => (
                  <li key={eje.slug} className="flex items-start gap-3 text-sm text-[#FAF6F0]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD600] shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      <strong className="text-[#FFD600]">{eje.titulo}:</strong>{" "}
                      {eje.comparativaModelo[0].dignidad}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
