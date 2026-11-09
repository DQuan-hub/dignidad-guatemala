"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download, CheckCircle2, XCircle } from "lucide-react";
import { KelvoraAxisList } from "@/components/ui/KelvoraAxisRow";
import { EJES_PROGRAMATICOS } from "@/data/ejes-programaticos";

export default function EjesIndexPage() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16 pt-8 sm:pt-14">
      
      {/* 1. CABECERA EDITORIAL KELVORA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#141413]/12">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                <span>[PROYECTO DE PAÍS · 2027-2031]</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#141413] leading-[1.04]">
                Seis ejes nacidos del{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  mandato de las comunidades.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
                Cada uno de nuestros seis ejes cuenta con su propia página dedicada con diagnóstico territorial, iniciativas de ley concretas, fotografías documentales de nuestras bases y videos explicativos.
              </p>
            </div>

            <a
              href="/docs/plan-gobierno-dignidad-2027.pdf"
              download
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#111C16] hover:bg-[#C83E2B] text-[#F5F2EB] font-mono text-xs font-bold uppercase tracking-wider transition shrink-0 self-start lg:self-auto shadow-sm"
            >
              <Download className="w-4 h-4 text-[#D9822B]" />
              <span>Descargar Plan Completo (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. ÍNDICE INTERACTIVO DE LAS 6 RUTAS ESTILO KELVORA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#57534E]">
              ÍNDICE PROGRAMÁTICO · SELECCIONA UN EJE
            </span>
            <span className="font-mono text-xs text-[#C83E2B] font-bold">
              6 EJES ACTIVOS
            </span>
          </div>

          <KelvoraAxisList ejes={EJES_PROGRAMATICOS} />
        </div>
      </section>

      {/* 3. GRID BENTO CON DIAGNÓSTICO Y PROPUESTAS DESTACADAS */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              [VISTA DETALLADA]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              Compromisos legislativos y comunitarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EJES_PROGRAMATICOS.map((eje) => (
              <article
                key={eje.slug}
                className="rounded-3xl border border-[#141413]/12 bg-[#EBE5D8] p-7 flex flex-col justify-between space-y-6 hover:border-[#C83E2B]/50 transition duration-300 shadow-2xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#111C16] text-[#F5F2EB]">
                      Eje {eje.numero}
                    </span>
                    <span className="font-mono text-[11px] text-[#57534E]">
                      {eje.propuestasLegislativas.length} iniciativas
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#141413] leading-snug">
                    {eje.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#57534E] line-clamp-3 leading-relaxed">
                    {eje.subtitulo}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#141413]/10">
                    {eje.propuestasLegislativas.slice(0, 2).map((prop) => (
                      <div key={prop.codigo} className="text-xs text-[#141413]/80">
                        <strong className="text-[#C83E2B] font-mono">[{prop.codigo}]</strong> {prop.titulo}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#141413]/10">
                  <Link
                    href={`/ejes/${eje.slug}`}
                    className="inline-flex items-center justify-between w-full font-mono text-xs font-bold uppercase tracking-wider text-[#141413] hover:text-[#C83E2B] transition"
                  >
                    <span>Explorar Eje Completo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTRASTE ESTRUCTURAL: VIEJA POLÍTICA VS. DIGNIDAD GUATEMALA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-3xl bg-[#111C16] text-[#F5F2EB] p-8 sm:p-12 space-y-8">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D9822B] font-bold">
                [CONTRASTE DE MODELO]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Dos visiones para el país en 2027
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                <span className="font-mono text-xs uppercase font-bold text-[#C83E2B] block">
                  Vieja Política Corporativa
                </span>
                <ul className="space-y-3 text-xs sm:text-sm text-white/70">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#C83E2B] shrink-0 mt-0.5" />
                    <span>Ríos desviados y bienes naturales entregados a industrias extractivas sin consulta popular.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#C83E2B] shrink-0 mt-0.5" />
                    <span>Agricultura campesina abandonada a intermediarios y desnutrición infantil crónica del 46.5%.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#C83E2B] shrink-0 mt-0.5" />
                    <span>Pueblos indígenas excluidos del presupuesto nacional y autoridades ancestrales criminalizadas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#C83E2B] shrink-0 mt-0.5" />
                    <span>Más de Q30,000 millones saqueados anualmente en corrupción, obras fantasma y sobreprecios.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#C83E2B]/40 bg-[#C83E2B]/10 p-6 space-y-4">
                <span className="font-mono text-xs uppercase font-bold text-[#D9822B] block">
                  Propuesta Dignidad Guatemala (#28)
                </span>
                <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D9822B] shrink-0 mt-0.5" />
                    <span>Ley Plurinacional del Agua, gestión comunitaria y consultas del Convenio 169 vinculantes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D9822B] shrink-0 mt-0.5" />
                    <span>Reforma Rural Integral, compras estatales directas a cooperativas y defensa de semillas nativas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D9822B] shrink-0 mt-0.5" />
                    <span>Estado Plurinacional con paridad real, reconocimiento del pluralismo jurídico y presupuesto equitativo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D9822B] shrink-0 mt-0.5" />
                    <span>Muerte civil perpetua para corruptos y Comisiones Comunitarias de Auditoría Social vinculantes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
