"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
  MapPin,
  Users,
  Compass,
  Scale,
  Sparkles,
  ChevronRight,
  MessageCircle,
  FileText
} from "lucide-react";
import { KelvoraAxisList } from "@/components/ui/KelvoraAxisRow";
import { SocialMediaGrid } from "@/components/ui/SocialMediaGrid";
import { VideoModal } from "@/components/ui/VideoModal";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import { EJES_PROGRAMATICOS } from "@/data/ejes-programaticos";
import { LIDERAZGOS_DIGNIDAD } from "@/data/liderazgos-historia";
import { SEDES_AFILIACION, DEPARTAMENTOS_GUATEMALA } from "@/data/sedes-afiliacion";
import socialFeedData from "@/data/social-feed.json";
import { getSocialFeedPosts, type SocialMediaPost } from "@/lib/utils";

export default function HomePage() {
  const posts = getSocialFeedPosts(socialFeedData as never);
  const featuredVideo =
    posts.find((p) => p.videoId === "7648750237963652359") || posts[0];
  const recentTikTok =
    posts.find((p) => p.platform === "tiktok" && p.type === "video") || posts[0];

  const [activeModalPost, setActiveModalPost] = useState<SocialMediaPost | null>(null);
  const [selectedQuickDepto, setSelectedQuickDepto] = useState<string>("Sololá");

  const quickSede =
    SEDES_AFILIACION.find((s) => s.departamento === selectedQuickDepto) ||
    SEDES_AFILIACION[0];

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-12">
      
      {/* 1. HERO EDITORIAL ASIMÉTRICO KELVORA */}
      <section className="relative w-full pt-8 sm:pt-14">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          {/* Encabezado Editorial Superior de Gran Formato */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#111C16]/10 bg-[#F3F6F4] px-4 py-1.5 font-mono text-xs font-semibold text-[#111C16] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#C83E2B]" />
              <span>PARTIDO POLÍTICO #28 · TSE GUATEMALA</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.4rem] font-bold tracking-tight text-[#111C16] leading-[1.03]">
              Construyendo un país con{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                dignidad
              </span>{" "}
              desde nuestros territorios.
            </h1>

            <p className="font-sans text-lg sm:text-xl text-[#526058] max-w-2xl leading-relaxed">
              Una fuerza política comunitaria y plurinacional. Caminamos junto a los cuatro pueblos rumbo a las elecciones generales de 2027 para defender el agua, la tierra y la justicia en Guatemala.
            </p>
          </div>

          {/* Grilla Asimétrica (12 columnas: 8 multimedia + 4 manifiesto y TikTok) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Columna Principal (8 cols): Fotografía documental de Asamblea */}
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-[#111C16]/10 bg-[#111C16] relative min-h-[380px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 shadow-sm group">
              <img
                src="/media/social/photos/asamblea-liderazgos-agua.jpg"
                alt="Asamblea plurinacional de Dignidad Guatemala"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5 text-white max-w-lg">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#D9822B]">
                    ASAMBLEA NACIONAL · ALTIPLANO CENTRAL
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                    “Madre Agua es un ser vivo con identidad, dignidad, derechos y misiones.”
                  </h3>
                  <p className="text-xs text-white/75 font-mono">
                    Autoridades ancestrales y delegadas territoriales · Archivo @dignidad100
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalPost(featuredVideo)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-[#111C16] px-5 py-3 text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105 shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-[#C83E2B] text-[#C83E2B]" />
                  <span>Ver video</span>
                </button>
              </div>
            </div>

            {/* Columna Lateral (4 cols): Manifiesto + Reproductor vertical rápido de TikTok */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6 rounded-3xl border border-[#111C16]/10 bg-[#F3F6F4] p-6 sm:p-7 shadow-xs">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                  [MANIFIESTO RUMBO A 2027]
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-[#111C16]">
                  No nacimos en despachos corporativos.
                </h3>
                <p className="text-xs sm:text-sm text-[#526058] leading-relaxed">
                  Nacimos en las asambleas comunitarias, en las parcelas campesinas de Suchitepéquez, en los comités de agua de Sololá y en las calles que exigen transparencia absoluta.
                </p>
              </div>

              {/* Tarjeta de Acceso Rápido al último video vertical de TikTok */}
              <div className="rounded-2xl border border-[#111C16]/10 bg-white p-4 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-black shrink-0 relative">
                    <img
                      src={recentTikTok.thumbnail || "/brand/logo-dignidad.jpg"}
                      alt="Miniatura TikTok"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-current" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#C83E2B] block truncate">
                      TIKTOK @DIGNIDAD100
                    </span>
                    <p className="text-xs font-bold text-[#111C16] truncate">
                      {recentTikTok.title || "Último pronunciamiento"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalPost(recentTikTok)}
                  className="w-9 h-9 rounded-full bg-[#111C16] text-white flex items-center justify-center shrink-0 hover:bg-[#C83E2B] transition cursor-pointer"
                  aria-label="Reproducir TikTok"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>

              <Link
                href="/nosotros"
                className="inline-flex items-center justify-between w-full font-mono text-xs font-bold uppercase tracking-wider text-[#111C16] hover:text-[#C83E2B] transition pt-2 border-t border-[#111C16]/10"
              >
                <span>Conoce nuestra historia</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO DE MÉTRICAS Y CONTEXTO POLÍTICO ESTILO KELVORA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="rounded-3xl border border-[#111C16]/10 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <span className="font-mono text-xs uppercase tracking-widest text-[#526058]">
                REGISTRO TSE
              </span>
              <div className="mt-4">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#111C16] tracking-tight block">
                  #28
                </span>
                <p className="text-xs sm:text-sm text-[#526058] mt-1 font-medium">
                  Partido político inscrito legalmente ante el TSE.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#111C16]/10 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <span className="font-mono text-xs uppercase tracking-widest text-[#526058]">
                TERRITORIO VIVO
              </span>
              <div className="mt-4">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#111C16] tracking-tight block">
                  22
                </span>
                <p className="text-xs sm:text-sm text-[#526058] mt-1 font-medium">
                  Departamentos con sedes y asambleas activas.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#111C16]/10 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <span className="font-mono text-xs uppercase tracking-widest text-[#526058]">
                PLURINACIONALIDAD
              </span>
              <div className="mt-4">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#111C16] tracking-tight block">
                  4
                </span>
                <p className="text-xs sm:text-sm text-[#526058] mt-1 font-medium">
                  Pueblos en unidad: Maya, Xinka, Garífuna y Mestizo.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111C16] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D9822B]">
                HORIZONTE POPULAR
              </span>
              <div className="mt-4">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight block">
                  2027
                </span>
                <p className="text-xs sm:text-sm text-white/70 mt-1 font-medium">
                  Elecciones generales para recuperar las instituciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ÍNDICE INTERACTIVO DE EJES PROGRAMÁTICOS (HOVER ROWS KELVORA) */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#141413]/12">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                [PROGRAMA POLÍTICO 2027-2031]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141413]">
                Nuestros seis ejes de{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  transformación.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#57534E]">
                Pasa el cursor por cada eje para ver la fotografía documental y haz clic para entrar a su diagnóstico completo e iniciativas de ley.
              </p>
            </div>

            <Link
              href="/ejes"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141413] hover:text-[#C83E2B] transition self-start sm:self-auto shrink-0"
            >
              <span>Ver los 6 ejes completos</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Lista de Filas Interactivas Kelvora */}
          <KelvoraAxisList ejes={EJES_PROGRAMATICOS} />
        </div>
      </section>

      {/* 4. CRÓNICA VISUAL DE REDES SOCIALES (@DIGNIDAD100 & @DIGNIDAD.GUATE) */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                [VOCES DESDE EL TERRITORIO]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141413]">
                Crónicas de asambleas y{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  comunidades.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#57534E]">
                Videos verticales reales y fotografías de jornadas comunitarias en los departamentos.
              </p>
            </div>

            <Link
              href="/multimedia"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141413] hover:text-[#C83E2B] transition self-start sm:self-auto shrink-0"
            >
              <span>Abrir Archivo Multimedia</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid de Medios con Reproductor Integrado */}
          <SocialMediaGrid
            posts={posts}
            limit={6}
            onSelectVideo={(p) => setActiveModalPost(p)}
          />
        </div>
      </section>

      {/* 5. BLOQUE DE AFILIACIÓN RÁPIDA Y CONSULTA POR DEPARTAMENTO */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-3xl border border-[#111C16]/10 bg-[#F3F6F4] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                [CENTRO DE AFILIACIÓN · TSE #28]
              </span>
              
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111C16]">
                Afíliate a Dignidad en tu{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  municipio.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#526058] leading-relaxed max-w-xl">
                El trámite es personal, libre y gratuito. Solo necesitas ser mayor de 18 años, contar con tu DPI vigente emitido por el RENAP y estar empadronado ante el Tribunal Supremo Electoral.
              </p>

              {/* Selector Rápido de Sede */}
              <div className="space-y-3 pt-2">
                <label
                  htmlFor="home-depto-quick-select"
                  className="font-mono text-xs font-bold text-[#111C16] uppercase block"
                >
                  Consulta rápida de sede departamental:
                </label>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <select
                    id="home-depto-quick-select"
                    value={selectedQuickDepto}
                    onChange={(e) => setSelectedQuickDepto(e.target.value)}
                    className="flex-1 h-12 px-4 rounded-xl bg-white border border-[#111C16]/15 font-sans text-sm font-semibold text-[#111C16]"
                  >
                    {DEPARTAMENTOS_GUATEMALA.filter((d) => d !== "Todos").map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  <Link
                    href={`/afiliate#mapa-sedes`}
                    className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono text-xs font-bold uppercase tracking-wider transition shrink-0"
                  >
                    <MapPin className="w-4 h-4 text-[#D9822B]" />
                    <span>Ver en mapa</span>
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#111C16]/10 text-xs text-[#526058] space-y-1 shadow-2xs">
                  <p className="font-bold text-[#111C16]">
                    {quickSede.nombre} — {quickSede.municipio}, {quickSede.departamento}
                  </p>
                  <p>{quickSede.direccion}</p>
                  <p className="font-mono text-[11px] text-[#C83E2B]">
                    Contacto: {quickSede.coordinador} · {quickSede.telefono}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-[#111C16] text-white p-8 rounded-2xl shadow-md">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D9822B]">
                  PASOS TSE
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  3 pasos para participar
                </h3>
                <ol className="space-y-3 pt-2 text-xs sm:text-sm text-white/80 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C83E2B] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Tener DPI vigente emitido por el RENAP.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C83E2B] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Verificar tu empadronamiento ante el TSE.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C83E2B] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Firmar la hoja oficial en tu sede o brigada móvil.</span>
                  </li>
                </ol>
              </div>

              <Link
                href="/afiliate"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white text-[#111C16] hover:bg-neutral-100 font-mono text-xs font-bold uppercase tracking-wider transition"
              >
                <span>Ir al Centro de Afiliación Completo</span>
                <ArrowUpRight className="w-4 h-4 text-[#C83E2B]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MÓDULO DE CONTACTO GET IN TOUCH */}
      <section className="w-full">
        <GetInTouchContact />
      </section>

      {/* Modal de Video Vertical */}
      <VideoModal
        post={activeModalPost}
        onClose={() => setActiveModalPost(null)}
      />
    </div>
  );
}
