"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Quote,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SocialVideoCard } from "@/components/ui/SocialVideoCard";
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
    relatedPosts.length >= 2
      ? relatedPosts
      : [...relatedPosts, ...allPosts.filter((p) => p.platform === "tiktok")].slice(0, 3);

  const [activePost, setActivePost] = useState<SocialMediaPost | null>(null);

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. CABECERA DOCUMENTAL DEL EJE */}
      <section className="py-14 lg:py-20 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/ejes"
              className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-[#C81E1E] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>[VOLVER AL ÍNDICE DE LOS 6 EJES PROGRAMÁTICOS]</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <SectionBadge code={eje.etiquetaSeccion}>
                Propuesta Programática · Dignidad #28
              </SectionBadge>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#231012] leading-[1.04]">
                {eje.titulo}:{" "}
                <span className="font-editorial-italic font-normal text-[#C81E1E]">
                  {eje.palabraClaveCursiva}.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#231012]/80 leading-relaxed">
                {eje.subtitulo} {eje.resumenCorto}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {eje.impactoComunitario.map((imp) => (
                  <div
                    key={imp.etiqueta}
                    className="p-4 rounded-2xl bg-[#F3EDE4]/65 border border-[#181313]/8"
                  >
                    <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#C81E1E]">
                      {imp.metrica}
                    </p>
                    <p className="text-xs font-bold text-[#231012] mt-1">
                      {imp.etiqueta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fotografía Principal del Eje con Pie de Prensa */}
            <figure className="lg:col-span-5 rounded-2xl bg-[#F3EDE4]/65 border border-[#181313]/8 p-3">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#7F1116]">
                <img
                  src={eje.imagenHero}
                  alt={eje.pieFotoHero}
                  width={640}
                  height={480}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 px-1 font-mono-code text-[11px] text-[#231012]/80 leading-snug">
                {eje.pieFotoHero}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. DIAGNÓSTICO REAL DE GUATEMALA Y GALERÍA DOCUMENTAL */}
      <section className="py-16 lg:py-24 border-b border-[#181313]/8 bg-[#F3EDE4]/65/40">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <SectionBadge code="[DIAGNÓSTICO NACIONAL]">
                Realidad Territorial en Guatemala
              </SectionBadge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#231012]">
                ¿Por qué es urgente transformar este eje desde la raíz?
              </h2>
              <p className="text-base sm:text-lg text-[#231012]/85 leading-relaxed">
                {eje.diagnosticoNacional.RealidadActual}
              </p>

              <div className="rounded-2xl bg-[#FAF8F5] border border-[#181313]/8 p-6 sm:p-8 space-y-4">
                <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#C81E1E]">
                  [CAUSAS ESTRUCTURALES IDENTIFICADAS EN ASAMBLEAS]
                </h3>
                <ul className="space-y-3">
                  {eje.diagnosticoNacional.CausasEstructurales.map((causa) => (
                    <li
                      key={causa}
                      className="flex items-start gap-3 text-sm text-[#231012]/85"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#C81E1E] mt-2 shrink-0" />
                      <span>{causa}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#7F1116] text-[#FAF6F0] p-7 space-y-5">
                <span className="font-mono-code text-xs font-bold text-[#FFD600] uppercase">
                  [DATOS CRÍTICOS DEL TERRITORIO]
                </span>
                <div className="divide-y divide-white/15 space-y-4">
                  {eje.diagnosticoNacional.DatosCriticos.map((dato) => (
                    <div key={dato.cifra} className="pt-4 first:pt-0">
                      <p className="text-3xl font-extrabold font-display text-[#FFD600]">
                        {dato.cifra}
                      </p>
                      <p className="text-sm text-[#FAF6F0]/85 mt-1">
                        {dato.contexto}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="rounded-2xl bg-[#FAF8F5] border border-[#181313]/8 p-6">
                <Quote className="w-5 h-5 text-[#C81E1E] mb-2" aria-hidden="true" />
                <blockquote className="text-sm sm:text-base italic text-[#231012] leading-relaxed mb-3">
                  “{eje.testimonioComunitario.cita}”
                </blockquote>
                <figcaption className="font-mono-code text-xs font-bold text-[#C81E1E]">
                  {eje.testimonioComunitario.autor} —{" "}
                  <cite className="not-italic text-[#231012]/75">
                    {eje.testimonioComunitario.comunidad}
                  </cite>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROPUESTAS LEGISLATIVAS CONCRETAS */}
      <section className="py-16 lg:py-24 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <SectionBadge code="[COMPROMISOS LEGISLATIVOS]">
              Propuestas Concretas Rumbo a 2027
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#231012]">
              Iniciativas de ley e intervención pública del Eje {eje.numero}.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {eje.propuestasLegislativas.map((prop) => (
              <div
                key={prop.codigo}
                className="rounded-2xl bg-[#F3EDE4]/65/60 border border-[#181313]/8 p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono-code text-xs mb-4">
                    <span className="font-bold text-[#C81E1E]">[{prop.codigo}]</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#7F1116] text-[#FFD600]">
                      {prop.plazo}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold font-display text-[#231012] mb-3">
                    {prop.titulo}
                  </h3>
                  <p className="text-sm text-[#231012]/80 leading-relaxed">
                    {prop.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contraste específico */}
          <div className="rounded-2xl bg-[#F3EDE4]/65/40 border border-[#181313]/8 p-6 sm:p-8 space-y-4">
            <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#C81E1E]">
              [COMPARATIVA EN {eje.titulo.toUpperCase()}]
            </h3>
            <div className="space-y-3">
              {eje.comparativaModelo.map((par, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#7F1116]/10"
                >
                  <div className="flex items-start gap-2.5 text-sm text-[#231012]/75">
                    <XCircle className="w-4 h-4 text-[#C81E1E] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{par.tradicional}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm font-semibold text-[#231012] md:border-l md:border-[#181313]/8 md:pl-4">
                    <CheckCircle2 className="w-4 h-4 text-red-800 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{par.dignidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIDEOS EXPLICATIVOS Y ARCHIVO DE REDES RELACIONADO */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionBadge code="[ARCHIVO EN TERRITORIO]">
                Videos y Crónicas de este Eje
              </SectionBadge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#231012] mt-3">
                Voces y registros desde TikTok (@dignidad100) e Instagram.
              </h2>
            </div>
            <Link
              href="/voces-y-redes"
              className="font-mono-code text-xs font-bold text-[#C81E1E] hover:underline"
            >
              [IR A VOCES Y REDES →]
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post, idx) => (
              <SocialVideoCard
                key={post.id}
                post={post}
                index={idx}
                onSelect={(p) => setActivePost(p)}
              />
            ))}
          </div>

          {/* Navegación entre Ejes */}
          <div className="mt-14 pt-8 border-t border-[#181313]/8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              href={`/ejes/${prevEje.slug}`}
              className="p-4 rounded-2xl bg-[#F3EDE4]/65 border border-[#181313]/8 hover:border-[#C81E1E] transition flex items-center gap-3"
            >
              <ArrowLeft className="w-4 h-4 text-[#C81E1E]" aria-hidden="true" />
              <div>
                <span className="font-mono-code text-[10px] text-[#231012]/65 block">
                  [EJE ANTERIOR · {prevEje.numero}]
                </span>
                <span className="text-sm font-bold text-[#231012]">
                  {prevEje.titulo}
                </span>
              </div>
            </Link>

            <Link
              href="/afiliate"
              className="inline-flex items-center justify-center bg-[#C81E1E] text-[#FAF6F0] font-bold text-sm px-6 py-4 rounded-full"
            >
              Afíliate en tu Municipio ↗
            </Link>

            <Link
              href={`/ejes/${nextEje.slug}`}
              className="p-4 rounded-2xl bg-[#F3EDE4]/65 border border-[#181313]/8 hover:border-[#C81E1E] transition flex items-center justify-end gap-3 text-right"
            >
              <div>
                <span className="font-mono-code text-[10px] text-[#231012]/65 block">
                  [SIGUIENTE EJE · {nextEje.numero}]
                </span>
                <span className="text-sm font-bold text-[#231012]">
                  {nextEje.titulo}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#C81E1E]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <VideoModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
}
