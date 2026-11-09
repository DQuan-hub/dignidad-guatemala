"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  LIDERAZGOS_DIGNIDAD,
  LINEA_TIEMPO_DIGNIDAD,
  PRINCIPIOS_IDEOLOGICOS,
  DOCUMENTOS_OFICIALES,
} from "@/data/liderazgos-historia";

export default function NosotrosPage() {
  const lideres = [
    {
      nombre: "Gabriel Romero Pérez",
      cargo: "Secretario General Provisional",
      origen: "Guatemala",
      cita: "Dignidad no es una franquicia electoral de ocasión; es el instrumento político que los pueblos de Guatemala levantaron con sus propias manos para rescatar las instituciones.",
      fotografia: "/media/social/photos/dialogo-territorial-bases.jpg",
      bio: "Militante histórico por los derechos humanos, la fiscalización comunitaria y la articulación plurinacional frente a la vieja política corporativa."
    },
    {
      nombre: "Neydi Juracán",
      cargo: "Coordinadora CCDA & Vocera Campesina",
      origen: "San José La Máquina & Altiplano",
      cita: "Quienes cultivan la milpa y defienden los ríos con sus vidas tienen derecho a gobernar y decidir el destino del presupuesto nacional.",
      fotografia: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
      bio: "Defensora de la soberanía alimentaria, lideresa del Comité Campesino del Altiplano (CCDA) y promotora del Buen Vivir campesino."
    },
    {
      nombre: "Sandra Xinico",
      cargo: "Dirigente Departamental & Articuladora de Bases",
      origen: "Pueblo Maya · Altiplano",
      cita: "La descolonización de la política en Guatemala pasa por la paridad real, el pluralismo jurídico y la alternancia de los cuatro pueblos en el poder.",
      fotografia: "/media/social/photos/voceria-asamblea-afiliacion.jpg",
      bio: "Antropóloga, columnista y dirigente comunitaria comprometida con la participación política protagónica de las mujeres indígenas."
    }
  ];

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16 pt-8 sm:pt-14">
      
      {/* 1. CABECERA EDITORIAL Y ENSAYO VISUAL A DOS COLUMNAS ESTILO KELVORA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Columna Izquierda Sticky (5 cols): Declaración de Identidad */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                <span>[01 / RAÍCES Y ORIGEN]</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#111C16] leading-[1.05]">
                Una fuerza política nacida del{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  caminar campesino
                </span>{" "}
                y comunitario.
              </h1>

              <p className="text-base text-[#526058] leading-relaxed">
                <strong>Dignidad Guatemala (#28 TSE)</strong> representa el encuentro entre las luchas históricas agrarias del Comité Campesino del Altiplano (CCDA), la resistencia de las autoridades indígenas ancestrales y la juventud urbana que exige un país sin corrupción.
              </p>

              <div className="p-5 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#111C16] font-bold block">
                  REGISTRO ANTE EL TSE
                </span>
                <p className="text-xs text-[#526058]">
                  Inscripción definitiva como Partido Político Número 28 de Guatemala con asambleas departamentales constituidas en los 22 departamentos.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#liderazgos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111C16] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C83E2B] transition"
                >
                  <span>Conocer Dirigencia</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D9822B]" />
                </a>
                <a
                  href="#documentos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#111C16]/15 text-[#111C16] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#C83E2B] transition"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C83E2B]" />
                  <span>Estatutos TSE</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha (7 cols): Ensayo Narrativo + Fotografías Documentales */}
            <div className="lg:col-span-7 space-y-10">
              
              <div className="rounded-3xl overflow-hidden border border-[#111C16]/10 bg-[#111C16] aspect-[16/10] relative shadow-sm">
                <img
                  src="/media/social/photos/asamblea-liderazgos-agua.jpg"
                  alt="Asamblea comunitaria de liderazgos de Dignidad"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 font-mono text-xs text-white/90">
                  Encuentro Plurinacional en defensa de la Madre Agua y los bienes comunes · Archivo @dignidad100
                </p>
              </div>

              <div className="space-y-6 text-[#111C16] text-base sm:text-lg leading-relaxed">
                <p>
                  Durante más de cuatro décadas, las comunidades rurales y los sectores populares de Guatemala vieron cómo los partidos tradicionales se convertían en empresas electorales de cartón. Las casillas a diputados se vendían al mejor postor y los gobiernos electos gobernaban de espaldas a los pueblos.
                </p>

                <p>
                  Frente a ese despojo sistemático, las bases del <strong>Comité Campesino del Altiplano (CCDA)</strong>, junto a comunidades q'eqchi'es, poqomchies, k'iches, kaqchikeles, mames, xinkas y garífunas, decidieron dar un paso histórico: no delegar más su representación y construir un partido político propio con asambleas soberanas.
                </p>

                <blockquote className="p-6 rounded-2xl bg-[#F3F6F4] border-l-4 border-[#C83E2B] font-serif text-xl sm:text-2xl italic text-[#111C16] leading-snug">
                  “No nos organizamos para negociar privilegios; nos organizamos para devolver la soberanía y la tierra a quienes la trabajan todos los días.”
                </blockquote>

                <p>
                  El proyecto legal culminó con la inscripción formal de <strong>Dignidad Guatemala ante el Tribunal Supremo Electoral con el número 28</strong>, habilitado plenamente para competir con candidaturas legítimas en las elecciones generales de 2027.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. LÍNEA DE TIEMPO INTERACTIVA KELVORA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3 pb-6 border-b border-[#111C16]/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              [02 / HITOS DE LA MEMORIA HISTÓRICA]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111C16]">
              El camino hacia el{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                partido #28.
              </span>
            </h2>
          </div>

          <div className="relative border-l-2 border-[#111C16]/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
            {LINEA_TIEMPO_DIGNIDAD.map((hito, idx) => (
              <div key={hito.codigo || hito.anio} className="relative group">
                {/* Punto indicador */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#111C16] border-2 border-white group-hover:bg-[#C83E2B] transition-colors" />

                <div className="space-y-3 max-w-2xl rounded-2xl bg-[#F3F6F4] p-6 border border-[#111C16]/10 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#111C16] text-white">
                      {hito.anio}
                    </span>
                    <span className="font-mono text-xs text-[#526058] uppercase">
                      Hito 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111C16]">
                    {hito.titulo}
                  </h3>

                  <p className="text-sm text-[#526058] leading-relaxed">
                    {hito.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. LIDERAZGOS VISIBLES CON CITAS DIRECTAS */}
      <section id="liderazgos" className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3 pb-6 border-b border-[#111C16]/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              [03 / LIDERAZGOS Y VOCERÍA POLÍTICA]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111C16]">
              Liderazgos de base con{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                mandato colectivo.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#526058]">
              Nuestras vocerías no responden a financistas ocultos; responden a las decisiones emanadas de las asambleas territoriales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lideres.map((lider) => (
              <article
                key={lider.nombre}
                className="rounded-3xl border border-[#111C16]/10 bg-white overflow-hidden flex flex-col justify-between p-7 shadow-xs hover:border-[#C83E2B]/50 transition duration-300"
              >
                <div className="space-y-6">
                  {/* Foto de Retrato */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#111C16] relative border border-[#111C16]/10">
                    <img
                      src={lider.fotografia}
                      alt={lider.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#111C16]">
                      {lider.nombre}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#C83E2B] font-bold mt-1">
                      {lider.cargo}
                    </p>
                    <p className="font-mono text-[11px] text-[#526058]">
                      📍 {lider.origen}
                    </p>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-[#111C16]/85 italic leading-relaxed pt-2 border-t border-[#111C16]/10">
                    “{lider.cita}”
                  </blockquote>
                </div>

                <div className="pt-6 mt-6 border-t border-[#111C16]/10 text-xs text-[#526058] leading-relaxed">
                  {lider.bio}
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. TRANSPARENCIA, PRINCIPIOS Y DESCARGA DE ESTATUTOS */}
      <section id="documentos" className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-3xl bg-[#111C16] text-white p-8 sm:p-14 space-y-10 shadow-xl">
            
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D9822B] font-bold">
                [04 / TRANSPARENCIA Y DOCUMENTOS OFICIALES]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Nuestros principios y estatutos son públicos.
              </h2>
              <p className="text-sm sm:text-base text-white/75">
                Creemos en la transparencia radical. Descarga los documentos legales presentados y aprobados ante el Registro de Ciudadanos del TSE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DOCUMENTOS_OFICIALES.map((doc) => (
                <div
                  key={doc.titulo}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#D9822B]">
                      {doc.categoria} · {doc.peso}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">
                      {doc.titulo}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {doc.descripcion}
                    </p>
                  </div>

                  <a
                    href={doc.urlDescarga}
                    download
                    className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white text-[#111C16] hover:bg-[#C83E2B] hover:text-white font-mono text-xs font-bold uppercase transition"
                  >
                    <span>Descargar PDF</span>
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
