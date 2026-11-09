"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Play,
  FileText,
  Calendar,
  Sparkles
} from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
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
    <div className="flex flex-col gap-16 sm:gap-24 pb-16 pt-6 sm:pt-10">
      
      {/* 1. CABECERA EDITORIAL KELVORA DEL EJE */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#141413]/10">
            <Link
              href="/ejes"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#141413] hover:text-[#C83E2B] transition"
            >
              <ArrowLeft className="w-4 h-4 text-[#C83E2B]" />
              <span>Volver a los 6 Ejes Programáticos</span>
            </Link>

            <span className="font-mono text-xs font-bold text-[#C83E2B] uppercase">
              EJE [{eje.numero} / 06]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                <span>{eje.etiquetaSeccion}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#141413] leading-[1.05]">
                {eje.titulo}{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  — {eje.palabraClaveCursiva}.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
                {eje.subtitulo} {eje.resumenCorto}
              </p>

              {/* Métricas de Impacto */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {eje.impactoComunitario.map((imp) => (
                  <div
                    key={imp.etiqueta}
                    className="p-4 rounded-2xl bg-[#EBE5D8] border border-[#141413]/10"
                  >
                    <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#C83E2B]">
                      {imp.metrica}
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs font-bold text-[#141413] mt-1 line-clamp-1">
                      {imp.etiqueta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fotografía Documental Principal con Pie Periodístico */}
            <figure className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#141413]/12 bg-[#111C16] p-2 shadow-sm">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                <img
                  src={eje.imagenHero}
                  alt={eje.pieFotoHero}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-3 font-mono text-[11px] text-white/80 leading-snug">
                {eje.pieFotoHero}
              </figcaption>
            </figure>
          </div>

        </div>
      </section>

      {/* 2. DIAGNÓSTICO NACIONAL Y DATOS CRÍTICOS */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2 pb-4 border-b border-[#141413]/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              [DIAGNÓSTICO TERRITORIAL]
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141413]">
              Realidad nacional y causas estructurales
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#141413] leading-relaxed">
              <div className="p-6 rounded-2xl bg-[#EBE5D8] border border-[#141413]/10">
                <h3 className="font-display font-bold text-lg mb-2 text-[#141413]">
                  Situación Actual en las Comunidades
                </h3>
                <p className="text-[#57534E]">
                  {eje.diagnosticoNacional.RealidadActual}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#C83E2B] font-bold">
                  Causas que combatiremos desde el primer día:
                </h4>
                <ul className="space-y-2.5">
                  {eje.diagnosticoNacional.CausasEstructurales.map((causa, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#57534E]">
                      <span className="w-5 h-5 rounded-full bg-[#111C16] text-[#F5F2EB] flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{causa}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tarjetas de Datos Críticos */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#57534E] font-bold">
                Cifras clave del diagnóstico:
              </h4>
              {eje.diagnosticoNacional.DatosCriticos.map((dato) => (
                <div
                  key={dato.cifra}
                  className="p-5 rounded-2xl bg-white border border-[#141413]/10 space-y-1 shadow-2xs"
                >
                  <span className="font-display text-3xl font-extrabold text-[#C83E2B]">
                    {dato.cifra}
                  </span>
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    {dato.contexto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROPUESTAS LEGISLATIVAS Y COMUNITARIAS CONCRETAS */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2 pb-4 border-b border-[#141413]/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              [ACCIÓN PARLAMENTARIA Y COMUNITARIA]
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141413]">
              Iniciativas de ley para la bancada de Dignidad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eje.propuestasLegislativas.map((prop) => (
              <div
                key={prop.codigo}
                className="rounded-3xl border border-[#141413]/12 bg-[#EBE5D8] p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C83E2B]">
                      [{prop.codigo}]
                    </span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#111C16] text-[#F5F2EB]">
                      {prop.plazo}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#141413] leading-snug">
                    {prop.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {prop.descripcion}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#141413]/10 flex items-center gap-2 text-xs font-mono text-[#141413]">
                  <FileText className="w-3.5 h-3.5 text-[#C83E2B]" />
                  <span>Prioridad legislativa</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALERÍA DOCUMENTAL Y VIDEO TERRITORIAL */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2 pb-4 border-b border-[#141413]/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              [REGISTRO DOCUMENTAL EN TERRITORIO]
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141413]">
              Fotos y crónicas vinculadas a este eje
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eje.galeriaDocumental.map((foto, idx) => (
              <figure
                key={idx}
                className="rounded-3xl overflow-hidden border border-[#141413]/12 bg-[#EBE5D8] p-2 space-y-2 shadow-2xs"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#111C16]">
                  <img
                    src={foto.src}
                    alt={foto.pieDeFoto}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-3 space-y-1">
                  <p className="font-mono text-[11px] font-bold text-[#C83E2B]">
                    📍 {foto.territorio}
                  </p>
                  <p className="text-xs text-[#57534E] leading-snug">
                    {foto.pieDeFoto}
                  </p>
                </figcaption>
              </figure>
            ))}

            {/* Video de TikTok Vinculado */}
            {displayPosts.slice(0, 1).map((vid) => (
              <div
                key={vid.id}
                className="rounded-3xl border border-[#141413]/12 bg-[#111C16] text-white p-6 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase font-bold text-[#D9822B]">
                    VIDEO EXPLICATIVO · @DIGNIDAD100
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {vid.title || vid.location}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-3">
                    {vid.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePost(vid)}
                  className="w-full py-3 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Reproducir video vertical</span>
                </button>
              </div>
            ))}
          </div>

          {/* Testimonio de Autoridades */}
          <div className="p-8 rounded-3xl bg-[#EBE5D8] border border-[#141413]/10 space-y-4">
            <span className="font-mono text-xs uppercase font-bold text-[#C83E2B] tracking-wider block">
              VOZ DESDE LA ASAMBLEA TERRITORIAL
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl italic text-[#141413] leading-relaxed">
              “{eje.testimonioComunitario.cita}”
            </blockquote>
            <p className="font-mono text-xs text-[#57534E]">
              — <strong>{eje.testimonioComunitario.autor}</strong> · {eje.testimonioComunitario.comunidad}
            </p>
          </div>
        </div>
      </section>

      {/* 5. NAVEGADOR INFERIOR ENTRE EJES */}
      <section className="w-full border-t border-[#141413]/12 pt-10">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <Link
              href={`/ejes/${prevEje.slug}`}
              className="p-6 rounded-2xl border border-[#141413]/10 bg-[#EBE5D8] hover:border-[#C83E2B] transition group flex items-center gap-4"
            >
              <ArrowLeft className="w-5 h-5 text-[#C83E2B] group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="font-mono text-[10px] uppercase text-[#57534E] block">
                  Eje Anterior [{prevEje.numero}]
                </span>
                <span className="font-display font-bold text-base text-[#141413] group-hover:text-[#C83E2B] transition-colors">
                  {prevEje.titulo}
                </span>
              </div>
            </Link>

            <Link
              href={`/ejes/${nextEje.slug}`}
              className="p-6 rounded-2xl border border-[#141413]/10 bg-[#EBE5D8] hover:border-[#C83E2B] transition group flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase text-[#57534E] block">
                  Siguiente Eje [{nextEje.numero}]
                </span>
                <span className="font-display font-bold text-base text-[#141413] group-hover:text-[#C83E2B] transition-colors">
                  {nextEje.titulo}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C83E2B] group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </div>
      </section>

      <VideoModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
}
