"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  FileText,
  Quote,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { VariableFontHover } from "@/components/ui/variable-font-hover";
import {
  LIDERAZGOS_DIGNIDAD,
  LINEA_TIEMPO_DIGNIDAD,
  PRINCIPIOS_IDEOLOGICOS,
  DOCUMENTOS_OFICIALES,
} from "@/data/liderazgos-historia";

export default function NosotrosPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. CABECERA EDITORIAL / CRÓNICA VISUAL */}
      <section className="py-16 lg:py-24 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionBadge code="[01 / CRÓNICA DE ORIGEN]">
                Historia, Raíces Comunitarias y Liderazgos
              </SectionBadge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#231012] leading-[1.03]">
                <VariableFontHover
                  className="justify-start text-left text-[#231012]"
                  fromFontVariationSettings="'wght' 300, 'slnt' 0"
                  toFontVariationSettings="'wght' 900, 'slnt' -10"
                  label="Nacidos de la resistencia campesina"
                  staggerDuration={0.015}
                  staggerFrom="first"
                />{" "}
                y de la{" "}
                <span className="font-editorial-italic font-semibold text-[#C81E1E]">
                  dignidad de los pueblos.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#231012]/80 leading-relaxed">
                <strong>Dignidad Guatemala (#28 TSE)</strong> no surgió en un despacho empresarial. Nació del caminar histórico del{" "}
                <strong>Comité Campesino del Altiplano (CCDA)</strong>, de las autoridades ancestrales de los pueblos Maya, Xinka y Garífuna, y de las familias trabajadoras mestizas del campo y la ciudad que decidieron construir su propio instrumento político.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#liderazgos"
                  className="inline-flex items-center gap-2 bg-[#7F1116] text-[#FAF6F0] font-bold text-sm px-6 py-3.5 rounded-full"
                >
                  <span>Conocer Dirigencia Nacional</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FFD600]" aria-hidden="true" />
                </a>
                <a
                  href="#documentos"
                  className="inline-flex items-center gap-2 bg-[#F3EDE4]/65 border border-[#181313]/10 text-[#231012] font-bold text-sm px-6 py-3.5 rounded-full"
                >
                  <FileText className="w-4 h-4 text-[#C81E1E]" aria-hidden="true" />
                  <span>Estatutos y Principios PDF</span>
                </a>
              </div>
            </div>

            {/* Marco Fotográfico Documental Principal */}
            <figure className="lg:col-span-5 rounded-2xl bg-[#F3EDE4]/65 border border-[#181313]/8 p-3.5 shadow-sm">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#7F1116]">
                <img
                  src="/media/social/photos/asamblea-liderazgos-agua.jpg"
                  alt="Delegación nacional y comunitaria de Dignidad Guatemala"
                  width={680}
                  height={510}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 px-1 font-mono-code text-[11px] text-[#231012]/80 flex items-center justify-between gap-2">
                <span>
                  Lideresas y autoridades portando la proclama por la Madre Agua · Archivo Dignidad
                </span>
                <span className="font-bold text-[#C81E1E] shrink-0">[TSE #28]</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. LÍNEA DE TIEMPO VERTICAL CON FOTOGRAFÍAS REALES DE LAS REDES */}
      <section className="py-20 lg:py-28 border-b border-[#181313]/8 bg-[#F3EDE4]/65/45">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <SectionBadge code="[02 / MEMORIA HISTÓRICA]">
              Línea de Tiempo Documental
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#231012]">
              De las parcelas y caminos a la{" "}
              <span className="font-editorial-italic font-normal text-[#C81E1E]">
                inscripción oficial ante el TSE.
              </span>
            </h2>
          </div>

          <div className="relative border-l-2 border-[#7F1116]/25 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
            {LINEA_TIEMPO_DIGNIDAD.map((hito, idx) => (
              <motion.article
                key={hito.codigo}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-[#FAF8F5] border border-[#181313]/8 p-6 sm:p-8"
              >
                {/* Nodo en la línea vertical */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[33px] sm:-left-[49px] top-8 h-4 w-4 rounded-full bg-[#C81E1E] border-4 border-[#FAF6F0]"
                />

                <div className="lg:col-span-7 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs">
                    <span className="font-bold text-[#C81E1E]">{hito.codigo}</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#F3EDE4]/65 text-[#231012] font-bold">
                      {hito.anio}
                    </span>
                    <span className="text-[#231012]/65 uppercase">
                      / {hito.categoria}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#231012]">
                    {hito.titulo}
                  </h3>

                  <p className="text-base text-[#231012]/80 leading-relaxed">
                    {hito.descripcion}
                  </p>
                </div>

                <figure className="lg:col-span-5 rounded-xl bg-[#F3EDE4]/65 border border-[#181313]/8 p-2.5">
                  <div className="rounded-lg overflow-hidden aspect-[16/10] bg-[#7F1116]">
                    <img
                      src={hito.fotografia}
                      alt={hito.pieFoto}
                      width={520}
                      height={325}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono-code text-[10px] text-[#231012]/75 px-1">
                    {hito.pieFoto}
                  </figcaption>
                </figure>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIRECTORIO DE LIDERAZGOS VISIBLES */}
      <section id="liderazgos" className="py-20 lg:py-28 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-14">
            <SectionBadge code="[03 / CONDUCCIÓN COLECTIVA]">
              Directorio de Liderazgos Visibles
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#231012]">
              Mujeres y hombres con mandato de las{" "}
              <span className="font-editorial-italic font-normal text-[#C81E1E]">
                asambleas comunitarias.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {LIDERAZGOS_DIGNIDAD.map((lider, idx) => (
              <article
                key={lider.id}
                className="rounded-2xl bg-white border border-[#181313]/8 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#7F1116] border-b border-[#181313]/8">
                    <img
                      src={lider.fotografia}
                      alt={lider.pieFoto}
                      width={520}
                      height={325}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 font-mono-code text-[10px] font-bold bg-[#7F1116]/85 text-[#FFD600] px-2.5 py-1 rounded">
                      [0{idx + 1} / DIRIGENCIA]
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-2xl font-extrabold font-display text-[#231012]">
                        {lider.nombre}
                      </h3>
                      <p className="font-mono-code text-xs font-bold text-[#C81E1E] uppercase tracking-wider mt-0.5">
                        {lider.cargo}
                      </p>
                      <p className="text-xs text-[#231012]/65 mt-1">
                        {lider.origen}
                      </p>
                    </div>

                    <p className="text-sm text-[#231012]/80 leading-relaxed">
                      {lider.trayectoria}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <figure className="p-4 rounded-xl bg-[#FAF8F5] border border-[#7F1116]/10">
                    <Quote
                      className="w-4 h-4 text-[#C81E1E] mb-1.5"
                      aria-hidden="true"
                    />
                    <blockquote className="text-xs italic text-[#231012]/90 leading-relaxed">
                      “{lider.cita}”
                    </blockquote>
                    <figcaption className="sr-only">
                      {lider.nombre} en <cite>Dignidad Guatemala</cite>
                    </figcaption>
                  </figure>

                  <div className="flex flex-wrap gap-1.5">
                    {lider.etiquetas.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-code text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-[#7F1116]/10 text-[#231012]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRINCIPIOS IDEOLÓGICOS (RETÍCULA CON BORDES VISIBLES CARGOFLOW) */}
      <section className="py-20 lg:py-28 border-b border-[#181313]/8 bg-[#F3EDE4]/65/40">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <SectionBadge code="[04 / PRINCIPIOS]">
              Horizonte Ideológico y Ético
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#231012]">
              Seis compromisos por el{" "}
              <span className="font-editorial-italic font-normal text-[#C81E1E]">
                Buen Vivir (Utz K&apos;aslemal).
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#181313]/8">
            {PRINCIPIOS_IDEOLOGICOS.map((principio) => (
              <div
                key={principio.numero}
                className="p-7 sm:p-8 bg-[#FAF8F5] border-r border-b border-[#181313]/8 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-code text-xs font-bold text-[#C81E1E] block mb-3">
                    [PRINCIPIO {principio.numero}]
                  </span>
                  <h3 className="text-xl font-extrabold font-display text-[#231012] mb-2.5">
                    {principio.titulo}
                  </h3>
                  <p className="text-sm text-[#231012]/80 leading-relaxed">
                    {principio.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DESCARGA DE ESTATUTOS Y DOCUMENTOS PÚBLICOS */}
      <section id="documentos" className="py-20 lg:py-28">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-4">
              <SectionBadge code="[05 / ARCHIVO PÚBLICO]">
                Estatutos y Documentos Oficiales TSE
              </SectionBadge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#231012]">
                Documentación pública para estudio en las comunidades.
              </h2>
            </div>

            <Link
              href="/afiliate"
              className="inline-flex items-center gap-2 bg-[#C81E1E] text-[#FAF6F0] font-bold text-sm px-6 py-3.5 rounded-full self-start lg:self-auto"
            >
              <span>Afíliate en tu Municipio ↗</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCUMENTOS_OFICIALES.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl bg-[#F3EDE4]/65/60 border border-[#181313]/8 p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono-code text-xs mb-3">
                    <span className="font-bold text-[#C81E1E]">
                      [{doc.categoria.toUpperCase()}]
                    </span>
                    <span className="text-[#231012]/70">
                      {doc.fecha} · {doc.paginas}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold font-display text-[#231012] mb-2">
                    {doc.titulo}
                  </h3>
                  <p className="text-sm text-[#231012]/80 leading-relaxed mb-6">
                    {doc.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181313]/8 flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-[#231012]/75">
                    {doc.peso}
                  </span>
                  <a
                    href={doc.urlDescarga}
                    download
                    className="inline-flex items-center gap-2 bg-[#7F1116] hover:bg-[#C81E1E] text-[#FAF6F0] font-bold text-xs px-4 py-2.5 rounded-full transition"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Descargar PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
