"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  MapPin,
  Droplets,
  Sprout,
  Users,
  HeartHandshake,
  Scale,
  Flag,
  ChevronDown,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { SocialVideoCard } from "@/components/ui/SocialVideoCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { VariableFontHover } from "@/components/ui/variable-font-hover";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import { Component as BgGradient } from "@/components/ui/bg-gredient";
import { EJES_PROGRAMATICOS } from "@/data/ejes-programaticos";
import { LIDERAZGOS_DIGNIDAD } from "@/data/liderazgos-historia";
import { SEDES_AFILIACION, DEPARTAMENTOS_GUATEMALA } from "@/data/sedes-afiliacion";
import socialFeedData from "@/data/social-feed.json";
import { getSocialFeedPosts, type SocialMediaPost } from "@/lib/utils";

const EJE_ICONS = [Droplets, Sprout, Users, HeartHandshake, Scale, Flag];

const FORMAS_DE_PARTICIPAR = [
  {
    step: "Opción 1 · Afiliación",
    title: "Afíliate con tu DPI vigente",
    subtitle: "Para ciudadanos empadronados en los 22 departamentos",
    description:
      "Ejercer tu derecho a participar es sencillo y gratuito. Solo necesitas presentar tu DPI vigente y firmar tu hoja oficial en la sede de tu departamento.",
    items: [
      "DPI vigente emitido por el RENAP",
      "Estar empadronado ante el TSE",
      "Participación con voz y voto en asambleas municipales",
    ],
    ctaLabel: "Afiliarme en mi municipio",
    href: "/afiliate",
  },
  {
    step: "Opción 2 · Voluntariado",
    title: "Súmate como voluntario o joven",
    subtitle: "Comunicación comunitaria, formación y fiscalización",
    description:
      "Si quieres apoyar en jornadas de información, comunicación en redes sociales, formación ciudadana o defensa del voto rumbo a 2027, este espacio es para ti.",
    items: [
      "Brigadas culturales y juveniles en tu departamento",
      "Red de comunicación popular en TikTok, Instagram y Facebook",
      "Escuela de formación política y liderazgo comunitario",
    ],
    ctaLabel: "Inscribirme como voluntario",
    href: "/afiliate#formulario-afiliacion",
  },
  {
    step: "Opción 3 · Tu Comunidad",
    title: "Abre un comité en tu aldea o barrio",
    subtitle: "Organización directa desde las bases",
    description:
      "Coordinamos visitas de nuestras brigadas departamentales para escuchar las necesidades de tu comunidad y conformar juntos el comité municipal de Dignidad.",
    items: [
      "Acompañamiento directo de la coordinadora departamental",
      "Mesas de diálogo sobre agua, tierra, salud y caminos",
      "Material informativo y estatutos oficiales del partido",
    ],
    ctaLabel: "Solicitar visita a mi comunidad",
    href: "/afiliate#formulario-afiliacion",
  },
];

const PREGUNTAS_FRECUENTES = [
  {
    question: "¿Qué requisitos necesito para afiliarme a Dignidad Guatemala?",
    answer:
      "Únicamente ser ciudadano guatemalteco mayor de 18 años, contar con tu Documento Personal de Identificación (DPI) vigente emitido por el RENAP y estar empadronado ante el Tribunal Supremo Electoral (TSE). El trámite es personal, libre y completamente gratuito.",
  },
  {
    question: "¿En qué departamentos tienen sedes y coordinadores activos?",
    answer:
      "Contamos con articulación y puntos de atención en los 22 departamentos del país. En la sección 'Sedes y Afiliación' puedes buscar tu departamento en el mapa interactivo para ver la dirección, horario y WhatsApp directo del coordinador.",
  },
  {
    question: "¿Cuál es el origen de Dignidad Guatemala (#28 TSE)?",
    answer:
      "Dignidad nació del caminar histórico de comunidades campesinas (como el Comité Campesino del Altiplano - CCDA), autoridades indígenas, mujeres organizadas, juventud y trabajadores del campo y la ciudad que construyeron un instrumento político propio e inscrito legalmente como el partido #28 ante el TSE.",
  },
  {
    question: "¿Puedo participar si nunca antes he estado en un partido político?",
    answer:
      "Por supuesto. La gran mayoría de nuestras bases son vecinas, agricultores, docentes, estudiantes y comerciantes que participan por primera vez porque buscan una política honesta, cercana y nacida desde las comunidades.",
  },
];

export default function HomePage() {
  const posts = getSocialFeedPosts(socialFeedData as never);
  const featuredVideo =
    posts.find((p) => p.videoId === "7648750237963652359") || posts[0];
  const recentPosts = posts.slice(0, 4);

  const [activeModalPost, setActiveModalPost] = useState<SocialMediaPost | null>(
    null
  );
  const [selectedQuickDepto, setSelectedQuickDepto] = useState<string>("Sololá");

  const quickSede =
    SEDES_AFILIACION.find((s) => s.departamento === selectedQuickDepto) ||
    SEDES_AFILIACION[0];

  const vocesPrincipales = LIDERAZGOS_DIGNIDAD.filter((l) => l.destacado);

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-8">
      {/* 1. HERO NATURAL Y CALMADO — ESTRUCTURA RBP-PORTFOLIO.VERCEL.APP */}
      <section className="relative w-full">
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-8 sm:px-10 sm:pt-20 sm:pb-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-10">
            {/* Columna Izquierda: Saludo humano, titular limpio y acciones claras */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-5"
            >
              <p className="inline-flex items-center gap-2 text-[17px] sm:text-[19px] leading-tight tracking-tight font-medium text-[#B81D13]">
                <span className="h-2 w-2 rounded-full bg-[#B81D13]" aria-hidden="true" />
                <span>Partido Político #28 · Guatemala</span>
              </p>

              <h1 className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-medium leading-[1.06] tracking-tight text-[#181313]">
                <VariableFontHover
                  className="justify-start text-left text-[#181313]"
                  fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 800, 'slnt' -8"
                  label="Un movimiento nacido"
                  staggerDuration={0.015}
                  staggerFrom="first"
                />{" "}
                <span className="block font-serif-display italic font-normal text-[#B81D13]">
                  de nuestra propia gente.
                </span>
              </h1>

              <p className="max-w-[38ch] text-[18px] sm:text-[20px] leading-[1.45] tracking-tight text-[#181313]/65">
                Caminamos junto a las comunidades, agricultores, mujeres y jóvenes de los 22 departamentos para devolverle la dignidad, el agua y la justicia a Guatemala.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/afiliate"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#B81D13] hover:bg-[#991B1B] px-5 text-sm font-medium text-white shadow-xs transition"
                >
                  <span>Afíliate en tu departamento</span>
                </Link>

                <Link
                  href="/ejes"
                  className="group inline-flex h-11 items-center gap-2 rounded-xl border border-[#181313]/10 bg-white px-5 text-sm font-medium text-[#181313] shadow-2xs transition hover:bg-[#181313]/4"
                >
                  <span>Conoce nuestras propuestas</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>

            {/* Columna Derecha: Retrato / Fotografía de Asamblea en doble marco estilo rbp-portfolio.vercel.app */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex justify-stretch md:justify-end"
            >
              <div className="relative aspect-[4/3.6] w-full md:max-w-[460px] overflow-hidden rounded-[2rem] border border-[#181313]/8 bg-white p-1.5 shadow-xs">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-[#181313]">
                  <img
                    src="/media/social/photos/asamblea-liderazgos-agua.jpg"
                    alt="Asamblea comunitaria de liderazgos de Dignidad Guatemala"
                    width={900}
                    height={750}
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  {/* Botón limpio para ver el video real de la asamblea */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="text-white">
                      <p className="text-xs font-medium text-[#FFD600]">
                        Encuentro de Comunidades · Archivo Oficial
                      </p>
                      <p className="text-sm font-medium leading-snug">
                        Defensa de la Madre Agua y organización territorial
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalPost(featuredVideo)}
                      aria-label="Reproducir video de la asamblea"
                      className="inline-flex h-11 px-4 shrink-0 items-center gap-2 rounded-xl bg-white/95 hover:bg-white text-[#181313] text-xs font-semibold shadow-md transition cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-[#B81D13] text-[#B81D13]" aria-hidden="true" />
                      <span>Ver video</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DATOS CLAVE EN TARJETA LIMPIA */}
      <StatsStrip />

      {/* 3. NUESTRAS 6 PROPUESTAS — TARJETAS MASONRY ESTILO RBP-PORTFOLIO.VERCEL.APP */}
      <section className="relative w-full">
        <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
          <div className="flex flex-col items-center gap-4 pb-12 text-center sm:pb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#181313]/10 bg-white px-3.5 py-1 text-xs font-medium text-[#B81D13]">
              Proyecto de País · 6 Ejes de Trabajo
            </span>
            <h2 className="font-serif-display text-[2.35rem] font-medium leading-[1.06] tracking-tight text-[#181313] md:text-[3rem] lg:text-[3.35rem]">
              Nuestras propuestas para Guatemala
            </h2>
            <p className="max-w-[40ch] text-[17px] leading-[1.45] tracking-tight text-[#181313]/65 sm:text-[19px]">
              Seis compromisos nacidos de escuchar a las familias trabajadoras, comunidades indígenas y productores del país.
            </p>
          </div>

          {/* Grid de 2 columnas estilo rbp-portfolio.vercel.app */}
          <div className="columns-1 gap-6 md:columns-2 md:gap-7">
            {EJES_PROGRAMATICOS.map((eje, idx) => {
              const IconComponent = EJE_ICONS[idx % EJE_ICONS.length];
              return (
                <div key={eje.slug} className="mb-6 break-inside-avoid md:mb-7">
                  <Link
                    href={`/ejes/${eje.slug}`}
                    className="project-card flex flex-col gap-4 rounded-3xl border border-[#181313]/8 bg-white p-3 sm:p-3.5 block"
                  >
                    <header className="flex items-center justify-between gap-2.5 px-1 pt-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#181313]/10 bg-[#FAF8F5] text-[#B81D13]">
                          <IconComponent className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium tracking-tight text-[#181313]">
                          {eje.etiquetaSeccion.replace(/^\[|\]$/g, "")}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#B81D13]">
                        Eje {eje.numero}
                      </span>
                    </header>

                    <div
                      className="project-card__image relative w-full overflow-hidden rounded-2xl bg-[#FAF8F5] ring-1 ring-[#181313]/6"
                      style={{ aspectRatio: idx % 2 === 0 ? "1.48" : "1.34" }}
                    >
                      <div className="project-card__image-inner h-full w-full">
                        <img
                          src={eje.imagenHero}
                          alt={eje.titulo}
                          loading="lazy"
                          width={640}
                          height={440}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 px-1 pb-1">
                      <h3 className="text-[20px] font-medium leading-[1.22] tracking-tight text-[#181313] sm:text-[22px]">
                        {eje.titulo}
                      </h3>
                      <p className="text-[14px] leading-relaxed tracking-tight text-[#181313]/65 sm:text-[15px]">
                        {eje.resumenCorto}
                      </p>
                    </div>

                    <div className="flex items-center justify-between px-1 pb-2 text-[12px] tracking-tight text-[#181313]/55">
                      <span>{eje.pieFotoHero.split("·")[0]}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#B81D13]">
                        Leer propuesta completa
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/ejes"
              className="group inline-flex items-center gap-2 rounded-xl border border-[#181313]/10 bg-white px-5 py-2.5 text-sm font-medium text-[#181313] transition hover:bg-[#181313]/4"
            >
              <span>Ver todas las propuestas e iniciativas de ley</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HISTORIA HUMANA Y CERCANA — INSPIRADA EN CASASANMIGUELGT.COM */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <div className="rounded-[2rem] border border-[#181313]/8 bg-white p-1.5 shadow-2xs">
          <div className="rounded-[1.6rem] bg-[#F3EDE4]/65 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-medium text-[#B81D13] border border-[#181313]/8">
                Nuestra Historia y Raíces
              </span>

              <h2 className="font-serif-display text-[2.1rem] sm:text-[2.65rem] font-medium leading-[1.08] tracking-tight text-[#181313]">
                Donde la tradición comunitaria se une con el corazón de Guatemala.
              </h2>

              <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.6] text-[#181313]/75">
                <p>
                  Inspirados por el trabajo diario de quienes siembran el maíz desde la madrugada en el Altiplano, la Costa Sur y las Verapaces, <strong>Dignidad Guatemala</strong> nació para honrar la palabra y el esfuerzo honesto de nuestras familias.
                </p>
                <p>
                  Aquí no solo defendemos la tierra, el agua y los bosques comunales; construimos un puente vivo entre generaciones. Desde el caminar histórico del <strong>Comité Campesino del Altiplano (CCDA)</strong> hasta las juventudes universitarias y urbanas, cada asamblea municipal es una invitación abierta a cuidar el futuro de nuestro país.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/nosotros"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#181313] hover:bg-[#B81D13] px-5 text-sm font-medium text-white transition"
                >
                  <span>Conocer nuestra historia y liderazgos</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="overflow-hidden rounded-2xl border border-[#181313]/10 bg-white p-2 shadow-xs">
                <img
                  src="/media/social/photos/jornada-adhesion-comunitaria.jpg"
                  alt="Jornada de adhesión comunitaria de mujeres y campesinos en el Altiplano"
                  width={640}
                  height={420}
                  loading="lazy"
                  className="w-full h-auto rounded-xl object-cover"
                />
                <p className="px-2 pt-2.5 pb-1 text-xs text-[#181313]/65">
                  Jornada comunitaria de adhesiones con participación de mujeres y autoridades locales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELIGE CÓMO PARTICIPAR (3 OPCIONES CLARAS AL ESTILO CASASANMIGUELGT.COM) */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <div className="flex flex-col items-center gap-3 pb-10 text-center sm:pb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#181313]/10 bg-white px-3.5 py-1 text-xs font-medium text-[#B81D13]">
            Puertas Abiertas en los 22 Departamentos
          </span>
          <h2 className="font-serif-display text-[2.25rem] sm:text-[2.85rem] font-medium leading-[1.06] tracking-tight text-[#181313]">
            Elige cómo sumarte a Dignidad
          </h2>
          <p className="max-w-[42ch] text-[17px] leading-[1.45] text-[#181313]/65">
            Tanto si deseas afiliarte en tu municipio, participar como voluntario o invitar a una brigada a tu comunidad, tenemos un espacio para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FORMAS_DE_PARTICIPAR.map((item) => (
            <article
              key={item.title}
              className="project-card flex flex-col justify-between rounded-3xl border border-[#181313]/8 bg-white p-6 sm:p-7"
            >
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-[#B81D13]/10 px-3 py-1 text-xs font-semibold text-[#B81D13]">
                  {item.step}
                </span>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#181313]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#181313]/50 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#181313]/70 leading-relaxed">
                  {item.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-[#181313]/8">
                  {item.items.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-[#181313]/75"
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-[#B81D13] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#181313]/8">
                <Link
                  href={item.href}
                  className="inline-flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-[#FAF8F5] hover:bg-[#B81D13] text-[#181313] hover:text-white border border-[#181313]/10 text-sm font-medium transition"
                >
                  <span>{item.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. VOCES Y VIDEOS REALES DE REDES SOCIALES (@DIGNIDAD100) */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#181313]/10 bg-white px-3.5 py-1 text-xs font-medium text-[#B81D13]">
              Videos y Crónicas desde el Territorio
            </span>
            <h2 className="font-serif-display text-[2.2rem] sm:text-[2.75rem] font-medium leading-[1.06] tracking-tight text-[#181313]">
              Lo que vivimos en nuestras comunidades
            </h2>
          </div>

          <Link
            href="/voces-y-redes"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#181313]/10 bg-white px-4 py-2.5 text-sm font-medium text-[#181313] hover:bg-[#181313]/4 transition self-start sm:self-auto"
          >
            <span>Ver todos los videos y fotos</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post) => (
            <SocialVideoCard
              key={post.id}
              post={post}
              onSelect={(p) => setActiveModalPost(p)}
            />
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIOS Y VOCES AUTÉNTICAS */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <div className="flex flex-col items-center gap-3 pb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#181313]/10 bg-white px-3.5 py-1 text-xs font-medium text-[#B81D13]">
            Liderazgos con Raíz Comunitaria
          </span>
          <h2 className="font-serif-display text-[2.2rem] sm:text-[2.75rem] font-medium leading-[1.06] tracking-tight text-[#181313]">
            Voces que caminan con el pueblo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vocesPrincipales.map((lider) => (
            <article
              key={lider.id}
              className="flex flex-col justify-between rounded-3xl border border-[#181313]/8 bg-white p-6 shadow-2xs"
            >
              <div className="space-y-4">
                <p className="text-[15px] leading-relaxed text-[#181313]/80 italic">
                  “{lider.cita}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-[#181313]/8">
                <img
                  src={lider.fotografia}
                  alt={lider.nombre}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover border border-[#181313]/10 shrink-0"
                />
                <div>
                  <h3 className="text-sm font-semibold text-[#181313]">
                    {lider.nombre}
                  </h3>
                  <p className="text-xs text-[#B81D13] font-medium">
                    {lider.cargo}
                  </p>
                  <p className="text-[11px] text-[#181313]/50">{lider.origen}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. BUSCADOR RÁPIDO DE SEDE POR DEPARTAMENTO + PREGUNTAS FRECUENTES (ESTILO CASASANMIGUELGT.COM) */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Buscador rápido de departamento (5 columnas) */}
          <div className="lg:col-span-5 rounded-3xl border border-[#181313]/8 bg-white p-6 sm:p-7 space-y-5 shadow-2xs">
            <span className="inline-block rounded-full bg-[#B81D13]/10 px-3 py-1 text-xs font-semibold text-[#B81D13]">
              Consulta Rápida · 22 Departamentos
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#181313]">
              Ubica tu sede más cercana
            </h2>
            <p className="text-sm text-[#181313]/65 leading-relaxed">
              Selecciona tu departamento para consultar de inmediato la dirección, el coordinador y el enlace directo de WhatsApp.
            </p>

            <div>
              <label
                htmlFor="home-depto-select"
                className="block text-xs font-semibold text-[#181313]/75 mb-2"
              >
                Selecciona tu departamento:
              </label>
              <select
                id="home-depto-select"
                value={selectedQuickDepto}
                onChange={(e) => setSelectedQuickDepto(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#181313]/15 text-sm font-medium text-[#181313]"
              >
                {DEPARTAMENTOS_GUATEMALA.filter((d) => d !== "Todos").map(
                  (dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] border border-[#181313]/8 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#B81D13] font-semibold">
                <span>{quickSede.departamento} · {quickSede.municipio}</span>
                <span>{quickSede.telefono}</span>
              </div>
              <h3 className="text-base font-semibold text-[#181313]">
                {quickSede.nombre}
              </h3>
              <p className="text-xs text-[#181313]/70">{quickSede.direccion}</p>
              <p className="text-xs text-[#181313]/60">
                <strong>Horario:</strong> {quickSede.horario}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={quickSede.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#B81D13] px-3.5 py-2 text-xs font-medium text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Escribir por WhatsApp</span>
                </a>
                <Link
                  href="/afiliate#mapa-sedes"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#181313]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#181313]"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#B81D13]" aria-hidden="true" />
                  <span>Ver en el mapa</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Preguntas Frecuentes (7 columnas) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#181313]/8 bg-white p-6 sm:p-7 space-y-5 shadow-2xs">
            <span className="inline-block rounded-full bg-[#FAF8F5] border border-[#181313]/10 px-3 py-1 text-xs font-medium text-[#181313]/75">
              Preguntas Frecuentes
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#181313]">
              Resolvemos tus dudas sobre cómo participar
            </h2>

            <div className="divide-y divide-[#181313]/8">
              {PREGUNTAS_FRECUENTES.map((faq, idx) => (
                <details
                  key={faq.question}
                  open={idx === 0}
                  className="group py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-[#181313] hover:text-[#B81D13]">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-[#181313]/50 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#181313]/70">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. ÁREA DE CONTACTO RÉPLICA EXACTA DE LA PLANTILLA GET IN TOUCH */}
      <section id="contacto" className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <GetInTouchContact />
      </section>

      <VideoModal
        post={activeModalPost}
        onClose={() => setActiveModalPost(null)}
      />
    </div>
  );
}
